//
//  FxAtlasManager.h
//
//  Created by joli on 2018/8/14.
//  Copyright © 2018年 uzone. All rights reserved.
//

#ifndef FxAtlasManager_h
#define FxAtlasManager_h

#include "cocos2d.h"
USING_NS_CC;

#include "flashx/basic/FxString.h"
#include "flashx/basic/FxDigits.h"

NS_FLASHX_BEGIN

class FxAtlasItem;
typedef std::function<void(Texture2D* texture)> loadTexHandler;

/**
 * 图集管理器
 */
class FxAtlasManager {
public:
    static FxAtlasManager* getInstance();
    
    /**
     * 计算图集数量
     * @return 心跳单元数量
     */
    u16 numAtlas() const {
        return atlasMap.size();
    }
    
    /**
     * 是否已载入图集
     * @param plistPath 图集配置路径
     * @return atlas
     */
    const bool isAtlasLoaded(const fxstr& plistPath) const {
        return atlasMap.find(plistPath) != atlasMap.end();
    }

    /**
     * 引用一次图集
     * @param plistPath 图集配置路径
     * @param texture 图集纹理
     */
    bool retainAtlas(const fxstr& plistPath, Texture2D* texture = nullptr);
    
    /**
     * 释放一次图集
     * @param plistPath 图集配置路径
     */
    void releaseAtlas(const fxstr& plistPath);
    
    /**
     * 载入图集纹理
     * @param plistPath 图集配置路径
     * @param callback 回调
     */
    void loadAtlasTexture(const fxstr& plistPath, const loadTexHandler& callback);
    
    /**
     * 使用设定的纹理格式载入图片
     * @param imagePath 图片路径
     * @param callback 回调
     * @param format 纹理格式
     * @return 纹理
     */
    Texture2D* loadImageByFormat(const fxstr& imagePath,
                                 const loadTexHandler& callback = nullptr,
                                 Texture2D::PixelFormat format = Texture2D::PixelFormat::RGBA4444);

    /**
     * 删除未使用的图集
     */
    void removeUnsuedAtlas();
    
private:
    FxAtlasManager();
    ~FxAtlasManager();
    
    /**
     * 保存图集
     * @param plistPath 图集配置路径
     * @param texture 图集纹理
     */
    FxAtlasItem* putAtlas(const fxstr& plistPath, Texture2D* texture);
    
    cocos2d::Map<fxstr, FxAtlasItem*> atlasMap;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxAtlasManager_h */
