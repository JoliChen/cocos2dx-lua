/****************************************************************************
 Copyright (c) 2020-2021 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#include "BatchedBuffer.h"
#include "gfx-base/GFXBuffer.h"
#include "gfx-base/GFXDescriptorSet.h"
#include "gfx-base/GFXDevice.h"
#include "gfx-base/GFXInputAssembler.h"
#include "helper/SharedMemory.h"

namespace cc {
namespace pipeline {
map<uint, map<uint, BatchedBuffer *>> BatchedBuffer::_buffers;
BatchedBuffer *                       BatchedBuffer::get(uint pass) {
    return BatchedBuffer::get(pass, 0);
}
BatchedBuffer *BatchedBuffer::get(uint pass, uint extraKey) {
    auto &record = _buffers[pass];
    auto &buffer = record[extraKey];
    if (buffer == nullptr) buffer = CC_NEW(BatchedBuffer(GET_PASS(pass)));
    return buffer;
}

BatchedBuffer::BatchedBuffer(const PassView *pass)
: _pass(pass),
  _device(gfx::Device::getInstance()) {
}

BatchedBuffer::~BatchedBuffer() = default;

void BatchedBuffer::destroy() {
    for (auto &batch : _batches) {
        for (auto *vb : batch.vbs) {
            vb->destroy();
        }

        for (auto *data : batch.vbDatas) {
            CC_FREE(data);
        }

        batch.indexBuffer->destroy();
        batch.ia->destroy();
        batch.ubo->destroy();

        CC_FREE(batch.indexData);
    }
    _batches.clear();
}

void BatchedBuffer::merge(const SubModelView *subModel, uint passIdx, const ModelView *model) {
    const auto *const subMesh          = subModel->getSubMesh();
    const auto *const flatBuffersID    = subMesh->getFlatBufferArrayID();
    const auto flatBuffersCount = flatBuffersID ? flatBuffersID[0] : 0;
    if (flatBuffersCount == 0) {
        return;
    }

    const auto *const flatBuffer    = subMesh->getFlatBuffer(flatBuffersID[1]);
    uint       vbSize        = 0;
    uint       indexSize     = 0;
    const auto vbCount       = flatBuffer->count;
    const auto *const pass          = subModel->getPassView(passIdx);
    auto *const       shader        = subModel->getShader(passIdx);
    auto *const       descriptorSet = subModel->getDescriptorSet();
    bool       isBatchExist  = false;

    for (auto &batch : _batches) {
        if (batch.vbs.size() == flatBuffersCount && batch.mergeCount < UBOLocalBatched::BATCHING_COUNT) {
            isBatchExist = true;
            for (uint j = 0; j < flatBuffersCount; ++j) {
                auto *const vb = batch.vbs[j];
                if (vb->getStride() != subMesh->getFlatBuffer(flatBuffersID[j + 1])->stride) {
                    isBatchExist = false;
                    break;
                }
            }

            if (isBatchExist) {
                for (uint j = 0; j < flatBuffersCount; ++j) {
                    const auto *const flatBuffer   = subMesh->getFlatBuffer(flatBuffersID[j + 1]);
                    auto *            batchVB      = batch.vbs[j];
                    auto *            vbData       = batch.vbDatas[j];
                    const uint vbBufSizeOld = batchVB->getSize();
                    vbSize                  = (vbCount + batch.vbCount) * flatBuffer->stride;
                    if (vbSize > vbBufSizeOld) {
                        auto *vbDataNew = static_cast<uint8_t *>(CC_MALLOC(vbSize));
                        memcpy(vbDataNew, vbData, vbBufSizeOld);
                        batchVB->resize(vbSize);
                        CC_FREE(vbData);
                        batch.vbDatas[j] = vbDataNew;
                        vbData           = vbDataNew;
                    }

                    auto        size   = 0U;
                    auto       offset = batch.vbCount * flatBuffer->stride;
                    auto *const data   = flatBuffer->getBuffer(&size);
                    memcpy(vbData + offset, data, size);
                }

                auto *indexData = batch.indexData;
                indexSize      = (vbCount + batch.vbCount) * sizeof(float);
                if (indexSize > batch.indexBuffer->getSize()) {
                    auto *newIndexData = static_cast<float *>(CC_MALLOC(indexSize));
                    memcpy(newIndexData, indexData, batch.indexBuffer->getSize());
                    CC_FREE(indexData);
                    batch.indexData = newIndexData;
                    indexData       = batch.indexData;
                    batch.indexBuffer->resize(indexSize);
                }

                const auto start      = batch.vbCount;
                const auto end        = start + vbCount;
                const auto mergeCount = batch.mergeCount;
                if (indexData[start] != mergeCount || indexData[end - 1] != mergeCount) {
                    for (auto j = start; j < end; j++) {
                        indexData[j] = mergeCount + 0.1F; // guard against underflow
                    }
                }

                // update world matrix
                const auto  offset      = UBOLocalBatched::MAT_WORLDS_OFFSET + batch.mergeCount * 16;
                const auto &worldMatrix = model->getTransform()->worldMatrix;
                memcpy(batch.uboData.data() + offset, worldMatrix.m, sizeof(worldMatrix));

                if (!batch.mergeCount) {
                    descriptorSet->bindBuffer(UBOLocalBatched::BINDING, batch.ubo);
                    descriptorSet->update();
                    batch.pass          = pass;
                    batch.shader        = shader;
                    batch.descriptorSet = descriptorSet;
                }

                ++batch.mergeCount;
                batch.vbCount += vbCount;
                auto prevCount = batch.ia->getVertexCount();
                batch.ia->setVertexCount(prevCount + vbCount);
                return;
            }
        }
    }

    // Create a new batch
    vector<gfx::Buffer *> vbs(flatBuffersCount, nullptr);
    vector<uint8_t *>     vbDatas(flatBuffersCount, nullptr);
    vector<gfx::Buffer *> totalVBs(flatBuffersCount + 1, nullptr);

    for (uint i = 0; i < flatBuffersCount; ++i) {
        const auto *const flatBuffer = subMesh->getFlatBuffer(flatBuffersID[i + 1]);
        auto *            newVB      = _device->createBuffer({
            gfx::BufferUsageBit::VERTEX | gfx::BufferUsageBit::TRANSFER_DST,
            gfx::MemoryUsageBit::HOST | gfx::MemoryUsageBit::DEVICE,
            flatBuffer->count * flatBuffer->stride,
            flatBuffer->stride,
        });
        auto              size       = 0U;
        auto *            data       = flatBuffer->getBuffer(&size);
        newVB->update(data, size);

        vbs[i]     = newVB;
        vbDatas[i] = static_cast<uint8_t *>(CC_MALLOC(newVB->getSize()));
        memset(vbDatas[i], 0, newVB->getSize());
        totalVBs[i] = newVB;
    }

    const auto indexBufferSize = vbCount * sizeof(float);
    auto *     indexBuffer     = _device->createBuffer({
        gfx::BufferUsageBit::VERTEX | gfx::BufferUsageBit::TRANSFER_DST,
        gfx::MemoryUsageBit::HOST | gfx::MemoryUsageBit::DEVICE,
        static_cast<uint>(indexBufferSize),
        sizeof(float),
    });
    auto *     indexData       = static_cast<float *>(CC_MALLOC(indexBufferSize));
    memset(indexData, 0, indexBufferSize);
    indexBuffer->update(indexData, static_cast<uint>(indexBufferSize));
    totalVBs[flatBuffersCount] = indexBuffer;

    vector<gfx::Attribute> attributes = subModel->getInputAssembler()->getAttributes();
    gfx::Attribute         attrib     = {
        "a_dyn_batch_id",
        gfx::Format::R32F,
        false,
        flatBuffersCount,
    };
    attributes.emplace_back(std::move(attrib));

    auto *ia = _device->createInputAssembler({std::move(attributes), std::move(totalVBs)});

    auto *ubo = _device->createBuffer({
        gfx::BufferUsageBit::UNIFORM | gfx::BufferUsageBit::TRANSFER_DST,
        gfx::MemoryUsageBit::HOST | gfx::MemoryUsageBit::DEVICE,
        UBOLocalBatched::SIZE,
        UBOLocalBatched::SIZE,
    });

    descriptorSet->bindBuffer(UBOLocalBatched::BINDING, ubo);
    descriptorSet->update();

    std::array<float, UBOLocalBatched::COUNT> uboData;
    const auto &                              worldMatrix = model->getTransform()->worldMatrix;
    memcpy(uboData.data() + UBOLocalBatched::MAT_WORLDS_OFFSET, worldMatrix.m, sizeof(worldMatrix));
    BatchedItem item = {
        std::move(vbs),                  //vbs
        std::move(vbDatas),              //vbDatas
        indexBuffer,                     //indexBuffer
        static_cast<float *>(indexData), //indexData
        vbCount,                         //vbCount
        1,                               //mergeCount
        ia,                              //ia
        ubo,                             //ubo
        uboData,                         //uboData
        descriptorSet,                   //descriptorSet
        pass,                            //pass
        shader,                          //shader
    };
    _batches.emplace_back(std::move(item));
}

void BatchedBuffer::clear() {
    for (auto &batch : _batches) {
        batch.vbCount    = 0;
        batch.mergeCount = 0;
        batch.ia->setVertexCount(0);
    }
}

void BatchedBuffer::setDynamicOffset(uint idx, uint value) {
    _dynamicOffsets[idx] = value;
}

} // namespace pipeline
} // namespace cc
