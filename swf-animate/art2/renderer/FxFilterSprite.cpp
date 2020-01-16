//
//  FxFilterSprite.cpp
//  uzonenative
//
//  Created by joli on 2018/8/25.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/art2/renderer/FxFilterSprite.h"
#include "flashx/shaders/FxShaders.h"

NS_FLASHX_BEGIN

FxFilterSprite* FxFilterSprite::create()
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    if (sprite && sprite->init()) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::create(const std::string& filename)
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    if (sprite && sprite->initWithFile(filename)) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::create(const std::string& filename, const cocos2d::Rect& rect)
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    if (sprite && sprite->initWithFile(filename, rect)) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::createWithTexture(Texture2D *texture)
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    Rect rect = Rect::ZERO;
    rect.size = texture->getContentSize();
    if (sprite && sprite->initWithTexture(texture, rect)) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::createWithTexture(Texture2D *texture, const cocos2d::Rect& rect, bool rotated)
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    if (sprite && sprite->initWithTexture(texture, rect)) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::createWithSpriteFrame(SpriteFrame *spriteFrame)
{
    FxFilterSprite *sprite = new (std::nothrow) FxFilterSprite();
    if (sprite && spriteFrame && sprite->initWithSpriteFrame(spriteFrame)) {
        sprite->autorelease();
        return sprite;
    }
    CC_SAFE_DELETE(sprite);
    return nullptr;
}

FxFilterSprite* FxFilterSprite::createWithSpriteFrameName(const std::string& spriteFrameName)
{
    SpriteFrame *frame = SpriteFrameCache::getInstance()->getSpriteFrameByName(spriteFrameName);
#ifdef FX_DEBUG
    FX_ASSERT(frame != nullptr, ("Invalid spriteFrameName:"+spriteFrameName).c_str());
#endif
    return createWithSpriteFrame(frame);
}

FxFilterSprite::FxFilterSprite():filterGLState(nullptr)
{
    colorMatrix.setIdentity();
}

FxFilterSprite::~FxFilterSprite()
{
    CC_SAFE_RELEASE_NULL(filterGLState);
}

void FxFilterSprite::initShader()
{
    if (!filterGLState) {
        auto glProgram = GLProgramCache::getInstance()->getGLProgram(FxShaderColorFilter_name);
        if (nullptr == glProgram) {
            glProgram = GLProgram::createWithByteArrays(ccPositionTextureColor_vert, FxShaderColorFilter_frag);
            GLProgramCache::getInstance()->addGLProgram(glProgram, FxShaderColorFilter_name);
        }
        filterGLState = GLProgramState::getOrCreateWithGLProgram(glProgram);
        CC_SAFE_RETAIN(filterGLState);
    }
    setGLProgramState(filterGLState);
}

void FxFilterSprite::updateShader(const Mat4 &transform)
{
    // auto glProgramState = getGLProgramState();
    filterGLState->setUniformMat4("u_colorMat", colorMatrix);
    // filterGLState->setUniformFloat("u_brightness", 0);
    filterGLState->apply(transform);
    setGLProgramState(filterGLState);
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */

