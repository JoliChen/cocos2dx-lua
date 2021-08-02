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

import {
    TextureType, TextureUsageBit, Format, RenderPass, Texture, Framebuffer,
    RenderPassInfo, Device, TextureInfo, FramebufferInfo } from '../../gfx';
import { Root } from '../../root';
import { RenderWindowHandle, RenderWindowPool, RenderWindowView, FramebufferPool, NULL_HANDLE } from './memory-pools';
import { Camera } from '../scene';

export interface IRenderWindowInfo {
    title?: string;
    width: number;
    height: number;
    renderPassInfo: RenderPassInfo;
    swapchainBufferIndices?: number;
    shouldSyncSizeWithSwapchain?: boolean;
}

/**
 * @en The render window represents the render target, it could be an off screen frame buffer or the on screen buffer.
 * @zh 渲染窗口代表了一个渲染目标，可以是离屏的帧缓冲，也可以是屏幕缓冲
 */
export class RenderWindow {
    /**
     * @en Get window width.
     * @zh 窗口宽度。
     */
    get width (): number {
        return this._width;
    }

    /**
     * @en Get window height.
     * @zh 窗口高度。
     */
    get height (): number {
        return this._height;
    }

    /**
     * @en Get window frame buffer.
     * @zh 帧缓冲对象。
     */
    get framebuffer (): Framebuffer {
        return FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER));
    }

    get shouldSyncSizeWithSwapchain () {
        return this._shouldSyncSizeWithSwapchain;
    }

    /**
     * @en Whether it has on screen attachments
     * @zh 这个渲染窗口是否指向在屏缓冲
     */
    get hasOnScreenAttachments () {
        return RenderWindowPool.get(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS) === 1;
    }

    /**
     * @en Whether it has off screen attachments
     * @zh 这个渲染窗口是否指向离屏缓冲
     */
    get hasOffScreenAttachments () {
        return RenderWindowPool.get(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS) === 1;
    }

    get handle () : RenderWindowHandle {
        return this._poolHandle;
    }

    get cameras () {
        return this._cameras;
    }

    /**
     * @private
     */
    public static registerCreateFunc (root: Root) {
        root._createWindowFun = (_root: Root): RenderWindow => new RenderWindow(_root);
    }

    protected _title = '';
    protected _width = 1;
    protected _height = 1;
    protected _nativeWidth = 1;
    protected _nativeHeight = 1;
    protected _renderPass: RenderPass | null = null;
    protected _colorTextures: (Texture | null)[] = [];
    protected _depthStencilTexture: Texture | null = null;
    protected _swapchainBufferIndices = 0;
    protected _shouldSyncSizeWithSwapchain = false;
    protected _poolHandle: RenderWindowHandle = NULL_HANDLE;
    protected _cameras: Camera[] = [];

    private constructor (root: Root) {
    }

    public initialize (device: Device, info: IRenderWindowInfo): boolean {
        this._poolHandle = RenderWindowPool.alloc();

        if (info.title !== undefined) {
            this._title = info.title;
        }

        if (info.swapchainBufferIndices !== undefined) {
            this._swapchainBufferIndices = info.swapchainBufferIndices;
        }

        if (info.shouldSyncSizeWithSwapchain !== undefined) {
            this._shouldSyncSizeWithSwapchain = info.shouldSyncSizeWithSwapchain;
        }

        this._width = info.width;
        this._height = info.height;
        this._nativeWidth = this._width;
        this._nativeHeight = this._height;

        const { colorAttachments, depthStencilAttachment } = info.renderPassInfo;
        for (let i = 0; i < colorAttachments.length; i++) {
            if (colorAttachments[i].format === Format.UNKNOWN) {
                colorAttachments[i].format = device.colorFormat;
            }
        }
        if (depthStencilAttachment && depthStencilAttachment.format === Format.UNKNOWN) {
            depthStencilAttachment.format = device.depthStencilFormat;
        }

        this._renderPass = device.createRenderPass(info.renderPassInfo);

        for (let i = 0; i < colorAttachments.length; i++) {
            let colorTex: Texture | null = null;
            if (!(this._swapchainBufferIndices & (1 << i))) {
                colorTex = device.createTexture(new TextureInfo(
                    TextureType.TEX2D,
                    TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED,
                    colorAttachments[i].format,
                    this._width,
                    this._height,
                ));
                RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
            } else {
                RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
            }
            this._colorTextures.push(colorTex);
        }

        // Use the sign bit to indicate depth attachment
        if (depthStencilAttachment) {
            if (this._swapchainBufferIndices >= 0) {
                this._depthStencilTexture = device.createTexture(new TextureInfo(
                    TextureType.TEX2D,
                    TextureUsageBit.DEPTH_STENCIL_ATTACHMENT | TextureUsageBit.SAMPLED,
                    depthStencilAttachment.format,
                    this._width,
                    this._height,
                ));
                RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_OFF_SCREEN_ATTACHMENTS, 1);
            } else {
                RenderWindowPool.set(this._poolHandle, RenderWindowView.HAS_ON_SCREEN_ATTACHMENTS, 1);
            }
        }

        const hFBO = FramebufferPool.alloc(device, new FramebufferInfo(
            this._renderPass,
            this._colorTextures,
            this._depthStencilTexture,
        ));
        RenderWindowPool.set(this._poolHandle, RenderWindowView.FRAMEBUFFER, hFBO);

        return true;
    }

    public destroy () {
        this.clearCameras();
        if (this._depthStencilTexture) {
            this._depthStencilTexture.destroy();
            this._depthStencilTexture = null;
        }

        for (let i = 0; i < this._colorTextures.length; i++) {
            const colorTexture = this._colorTextures[i];
            if (colorTexture) {
                colorTexture.destroy();
            }
        }
        this._colorTextures.length = 0;

        if (this._poolHandle) {
            FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER)).destroy();
            this._poolHandle = NULL_HANDLE;
        }
    }

    /**
     * @en Resize window.
     * @zh 重置窗口大小。
     * @param width The new width.
     * @param height The new height.
     */
    public resize (width: number, height: number) {
        this._width = width;
        this._height = height;

        if (width > this._nativeWidth
            || height > this._nativeHeight) {
            this._nativeWidth = width;
            this._nativeHeight = height;

            let needRebuild = false;

            if (this._depthStencilTexture) {
                this._depthStencilTexture.resize(width, height);
                needRebuild = true;
            }

            for (let i = 0; i < this._colorTextures.length; i++) {
                const colorTex = this._colorTextures[i];
                if (colorTex) {
                    colorTex.resize(width, height);
                    needRebuild = true;
                }
            }

            const framebuffer = FramebufferPool.get(RenderWindowPool.get(this._poolHandle, RenderWindowView.FRAMEBUFFER));
            if (needRebuild && framebuffer) {
                framebuffer.destroy();
                framebuffer.initialize(new FramebufferInfo(
                    this._renderPass!,
                    this._colorTextures,
                    this._depthStencilTexture,
                ));
            }
        }

        for (const camera of this._cameras) {
            if (camera.isWindowSize) {
                camera.resize(width, height);
            }
        }
    }

    public extractRenderCameras (cameras: Camera[]) {
        for (let j = 0; j < this._cameras.length; j++) {
            const camera = this._cameras[j];
            if (camera.enabled) {
                camera.update();
                cameras.push(camera);
            }
        }
    }

    /**
     * @zh
     * 添加渲染相机
     * @param camera 渲染相机
     */
    public attachCamera (camera: Camera) {
        for (let i = 0; i < this._cameras.length; i++) {
            if (this._cameras[i] === camera) {
                return;
            }
        }
        this._cameras.push(camera);
        this.sortCameras();
    }

    /**
     * @zh
     * 移除渲染相机
     * @param camera 相机
     */
    public detachCamera (camera: Camera) {
        for (let i = 0; i < this._cameras.length; ++i) {
            if (this._cameras[i] === camera) {
                this._cameras.splice(i, 1);
                return;
            }
        }
    }

    /**
     * @zh
     * 销毁全部渲染相机
     */
    public clearCameras () {
        this._cameras.length = 0;
    }

    public sortCameras () {
        this._cameras.sort((a: Camera, b: Camera) => a.priority - b.priority);
    }
}
