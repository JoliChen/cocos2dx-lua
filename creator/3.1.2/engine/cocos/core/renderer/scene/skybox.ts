/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */

import { builtinResMgr } from '../../builtin';
import { Material } from '../../assets/material';
import { Mesh } from '../../../3d/assets/mesh';
import { TextureCube } from '../../assets/texture-cube';
import { UNIFORM_ENVIRONMENT_BINDING } from '../../pipeline/define';
import { MaterialInstance } from '../core/material-instance';
import { samplerLib } from '../core/sampler-lib';
import { Model } from './model';
import { legacyCC } from '../../global-exports';
import { DescriptorSet } from '../../gfx';
import { SkyboxPool, NULL_HANDLE, SkyboxView, SkyboxHandle } from '../core/memory-pools';
import { SkyboxInfo } from '../../scene-graph/scene-globals';
import { Root } from '../../root';
import { GlobalDSManager } from '../../pipeline/global-descriptor-set-manager';

let skybox_mesh: Mesh | null = null;
let skybox_material: Material | null = null;

export class Skybox {
    get model (): Model | null {
        return this._model;
    }

    /**
     * @en Whether activate skybox in the scene
     * @zh 是否启用天空盒？
     */
    get enabled (): boolean {
        return SkyboxPool.get(this._handle, SkyboxView.ENABLE) as unknown as boolean;
    }

    set enabled (val: boolean) {
        SkyboxPool.set(this._handle, SkyboxView.ENABLE, val ? 1 : 0);
        if (val) this.activate(); else this._updatePipeline();
    }

    /**
     * @en Whether use environment lighting
     * @zh 是否启用环境光照？
     */
    get useIBL (): boolean {
        return SkyboxPool.get(this._handle, SkyboxView.USE_IBL) as unknown as boolean;
    }

    set useIBL (val: boolean) {
        SkyboxPool.set(this._handle, SkyboxView.USE_IBL, val ? 1 : 0);
        this._updatePipeline();
    }

    /**
     * @en Whether enable RGBE data support in skybox shader
     * @zh 是否需要开启 shader 内的 RGBE 数据支持？
     */
    get isRGBE (): boolean {
        return SkyboxPool.get(this._handle, SkyboxView.IS_RGBE) as unknown as boolean;
    }

    set isRGBE (val: boolean) {
        if (val) {
            if (skybox_material) {
                skybox_material.recompileShaders({ USE_RGBE_CUBEMAP: val });
            }

            if (this._model) {
                this._model.setSubModelMaterial(0, skybox_material!);
            }
        }
        SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, val ? 1 : 0);
        this._updatePipeline();
    }

    /**
     * @en The texture cube used for the skybox
     * @zh 使用的立方体贴图
     */
    get envmap (): TextureCube | null {
        return this._envmap;
    }

    set envmap (val: TextureCube | null) {
        this._envmap = val || this._default;
        if (this._envmap) {
            (legacyCC.director.root as Root).pipeline.pipelineSceneData.ambient.albedoArray[3] = this._envmap.mipmapLevel;
            this._updateGlobalBinding();
        }
    }

    protected _envmap: TextureCube | null = null;
    protected _globalDSManager: GlobalDSManager | null = null;
    protected _model: Model | null = null;
    protected _default: TextureCube | null = null;
    protected _handle: SkyboxHandle = NULL_HANDLE;

    get handle () : SkyboxHandle {
        return this._handle;
    }

    constructor () {
        this._handle = SkyboxPool.alloc();
    }

    public initialize (skyboxInfo: SkyboxInfo) {
        SkyboxPool.set(this._handle, SkyboxView.ENABLE, skyboxInfo.enabled ? 1 : 0);
        SkyboxPool.set(this._handle, SkyboxView.USE_IBL, skyboxInfo.useIBL ? 1 : 0);
        SkyboxPool.set(this._handle, SkyboxView.IS_RGBE, skyboxInfo.isRGBE ? 1 : 0);
        this._envmap = skyboxInfo.envmap;
    }

    public activate () {
        const pipeline = legacyCC.director.root.pipeline;
        const ambient = pipeline.pipelineSceneData.ambient;
        this._globalDSManager = pipeline.globalDSManager;
        this._default = builtinResMgr.get<TextureCube>('default-cube-texture');

        if (!this._model) {
            this._model = legacyCC.director.root.createModel(legacyCC.renderer.scene.Model) as Model;
            // @ts-expect-error private member access
            this._model._initLocalDescriptors = () => {};
        }

        SkyboxPool.set(this._handle, SkyboxView.MODEL, this._model.handle);
        if (!this._envmap) {
            this._envmap = this._default;
        }
        ambient.albedoArray[3] = this._envmap.mipmapLevel;

        if (!skybox_material) {
            const mat = new Material();
            mat.initialize({ effectName: 'skybox', defines: { USE_RGBE_CUBEMAP: this.isRGBE } });
            skybox_material = new MaterialInstance({ parent: mat });
        } else {
            skybox_material.recompileShaders({ USE_RGBE_CUBEMAP: this.isRGBE });
        }

        if (this.enabled) {
            if (!skybox_mesh) { skybox_mesh = legacyCC.utils.createMesh(legacyCC.primitives.box({ width: 2, height: 2, length: 2 })) as Mesh; }
            this._model.initSubModel(0, skybox_mesh.renderingSubMeshes[0], skybox_material);
        }
        this._updateGlobalBinding();
        this._updatePipeline();
    }

    protected _updatePipeline () {
        const value = this.useIBL ? (this.isRGBE ? 2 : 1) : 0;
        const root = legacyCC.director.root as Root;
        const pipeline = root.pipeline;
        const current = pipeline.macros.CC_USE_IBL;
        if (current === value) { return; }
        pipeline.macros.CC_USE_IBL = value;
        root.onGlobalPipelineStateChanged();
    }

    protected _updateGlobalBinding () {
        const texture = this.envmap!.getGFXTexture()!;
        const sampler = samplerLib.getSampler(legacyCC.director._device, this.envmap!.getSamplerHash());
        this._globalDSManager!.bindSampler(UNIFORM_ENVIRONMENT_BINDING, sampler);
        this._globalDSManager!.bindTexture(UNIFORM_ENVIRONMENT_BINDING, texture);
        this._globalDSManager!.update();
    }

    public destroy () {
        if (this._handle) {
            SkyboxPool.free(this._handle);
            this._handle = NULL_HANDLE;
        }
    }
}

legacyCC.Skybox = Skybox;
