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

import { Color, Vec3 } from '../../math';
import { AmbientPool, NULL_HANDLE, AmbientView, AmbientHandle } from '../core/memory-pools';
import { legacyCC } from '../../global-exports';
import { AmbientInfo } from '../../scene-graph/scene-globals';

export class Ambient {
    public static SUN_ILLUM = 65000.0;
    public static SKY_ILLUM = 20000.0;

    get colorArray (): Float32Array {
        return this._colorArray;
    }

    get albedoArray (): Float32Array {
        return this._albedoArray;
    }

    /**
     * @en Enable ambient
     * @zh 是否开启环境光
     */
    set enabled (val: boolean) {
        AmbientPool.set(this._handle, AmbientView.ENABLE, val ? 1 : 0);
    }
    get enabled (): boolean {
        return AmbientPool.get(this._handle, AmbientView.ENABLE) as unknown as boolean;
    }
    /**
     * @en Sky color
     * @zh 天空颜色
     */
    get skyColor (): Color {
        return this._skyColor;
    }

    set skyColor (color: Color) {
        this._skyColor.set(color);
        Color.toArray(this._colorArray, this._skyColor);
        AmbientPool.setVec4(this._handle, AmbientView.SKY_COLOR, this._skyColor);
    }

    /**
     * @en Sky illuminance
     * @zh 天空亮度
     */
    get skyIllum (): number {
        return AmbientPool.get(this._handle, AmbientView.ILLUM);
    }

    set skyIllum (illum: number) {
        AmbientPool.set(this._handle, AmbientView.ILLUM, illum);
    }

    /**
     * @en Ground color
     * @zh 地面颜色
     */
    get groundAlbedo (): Color {
        return this._groundAlbedo;
    }

    set groundAlbedo (color: Color) {
        this._groundAlbedo.set(color);
        Vec3.toArray(this._albedoArray, this._groundAlbedo);
        AmbientPool.setVec4(this._handle, AmbientView.GROUND_ALBEDO, this._groundAlbedo);
    }
    protected _skyColor = new Color(51, 128, 204, 1.0);
    protected _groundAlbedo = new Color(51, 51, 51, 255);
    protected _albedoArray = Float32Array.from([0.2, 0.2, 0.2, 1.0]);
    protected _colorArray = Float32Array.from([0.2, 0.5, 0.8, 1.0]);
    protected _handle: AmbientHandle = NULL_HANDLE;

    get handle () : AmbientHandle {
        return this._handle;
    }

    constructor () {
        this._handle = AmbientPool.alloc();
    }

    public initialize (ambientInfo: AmbientInfo) {
        this._skyColor.set(ambientInfo.skyColor);
        this._groundAlbedo.set(ambientInfo.groundAlbedo);
        Color.toArray(this._colorArray, this._skyColor);
        Vec3.toArray(this._albedoArray, this._groundAlbedo);
        AmbientPool.setVec4(this._handle, AmbientView.SKY_COLOR, this._skyColor);
        AmbientPool.setVec4(this._handle, AmbientView.GROUND_ALBEDO, this._groundAlbedo);
        AmbientPool.set(this._handle, AmbientView.ILLUM, ambientInfo.skyIllum);
    }

    public destroy () {
        if (this._handle) {
            AmbientPool.free(this._handle);
            this._handle = NULL_HANDLE;
        }
    }
}

legacyCC.Ambient = Ambient;
