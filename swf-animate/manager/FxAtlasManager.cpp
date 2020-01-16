//
//  FxAtlasManager.cpp
//
//  Created by joli on 2018/8/14.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#include "flashx/manager/FxAtlasManager.h"

NS_FLASHX_BEGIN

#define TEX_FORMAT ".png"
#define insSpFrameCache() SpriteFrameCache::getInstance()
#define insTextureCache() Director::getInstance()->getTextureCache()

class FxAtlasItem : public Ref {
public:
    inline void pushFrame(SpriteFrame* sprFrame) { frames.pushBack(sprFrame); }
private:
    cocos2d::Vector<SpriteFrame*> frames;
};

static fxstr getImagePath(const fxstr& plistPath)
{
    fxstr path = plistPath;
    const size_t& pos = path.find_last_of(".");
    return path.erase(pos).append(TEX_FORMAT);
}

FxAtlasManager* FxAtlasManager::getInstance() {
    static FxAtlasManager instance;
    return &instance;
}

FxAtlasManager::FxAtlasManager() {}

FxAtlasManager::~FxAtlasManager() {}

bool FxAtlasManager::retainAtlas(const fxstr& plistPath, Texture2D* texture /* nullptr */)
{
    auto atlasIter = atlasMap.find(plistPath);
    if (atlasMap.end() != atlasIter) {
        //FXLOG("%s:%s", __func__, plistPath.c_str());
        atlasIter->second->retain();
        return true;
    }
    if (!texture) {
        const fxstr& imagePath = getImagePath(plistPath);
        texture = insTextureCache()->addImage(imagePath);
    }
    if (texture) {
        FxAtlasItem *atlasItem = putAtlas(plistPath, texture);
        if (atlasItem) {
            //FXLOG("%s:%s", __func__, plistPath.c_str());
            atlasItem->retain();
            return true;
        }
    }
    FXLOG("%s load texture failed:%s", __func__, plistPath.c_str());
    return false;
}

void FxAtlasManager::releaseAtlas(const fxstr& plistPath)
{
    auto atlasIter = atlasMap.find(plistPath);
    if (atlasMap.end() == atlasIter) {
        return;
    }
    FxAtlasItem *atlasItem = atlasIter->second;
    if (atlasItem) {
        //FXLOG("%s:%s", __func__, plistPath.c_str());
        atlasItem->release();
    }
}

void FxAtlasManager::removeUnsuedAtlas()
{
    std::vector<fxstr> removes;
    forit(atlasMap, altasItr) {
        if (altasItr->second->getReferenceCount() == 1) {
            removes.push_back(altasItr->first);
        }
    }
    
    for(const auto &plistPath : removes) {
        atlasMap.erase(plistPath);
        insSpFrameCache()->removeSpriteFramesFromFile(plistPath);// remove spframes
        insTextureCache()->removeTextureForKey(getImagePath(plistPath));// remove texture
    }
    
//    atlasMap.erase(removes);
//    insSpFrameCache()->removeUnusedSpriteFrames();
//    insTextureCache()->removeUnusedTextures();
    
    // FXLOG("%s:%lu", __func__, removes.size());
}

FxAtlasItem* FxAtlasManager::putAtlas(const fxstr& plistPath, Texture2D* texture)
{
    SpriteFrameCache *sfc = insSpFrameCache();
    ValueMap plistDict = sfc->getPlistDataLocal(plistPath);
    if (plistDict.empty()) {
        return nullptr;
    }
    
    // FXLOG("%s:%s", __func__, plistPath.c_str());
    sfc->addSpriteFramesWithFile(plistPath, texture);
    FxAtlasItem *atlasItem = new FxAtlasItem();
    if (atlasItem) {
        const ValueMap& frameDict = plistDict["frames"].asValueMap();
        forit(frameDict, iter) {
            atlasItem->pushFrame(sfc->getSpriteFrameByName(iter->first));
        }
        atlasMap.insert(plistPath, atlasItem);
        atlasItem->release();
        return atlasItem;
    }
    
    FX_SAFE_DELETE(atlasItem);
    return nullptr;
}

void FxAtlasManager::loadAtlasTexture(const fxstr& plistPath, const loadTexHandler& callback)
{
    const fxstr& imagePath = getImagePath(plistPath);
    // FXLOG("%s load texture:%s", __func__, imagePath.c_str());
    insTextureCache()->addImageAsync(imagePath, callback);
}

Texture2D* FxAtlasManager::loadImageByFormat(const fxstr& imagePath,
                                             const loadTexHandler& callback /* nullptr */,
                                             Texture2D::PixelFormat format /* Texture2D::PixelFormat::RGBA4444 */)
{
    const Texture2D::PixelFormat& def = Texture2D::getDefaultAlphaPixelFormat();
    Texture2D::setDefaultAlphaPixelFormat(format);
    // async
    if (callback) {
        insTextureCache()->addImageAsync(imagePath, [callback, def](Texture2D* texture) {
            Texture2D::setDefaultAlphaPixelFormat(def);
            callback(texture);
        });
        return nullptr;
    }
    // synchronized
    Texture2D* texture = insTextureCache()->addImage(imagePath);
    Texture2D::setDefaultAlphaPixelFormat(def);
    return texture;
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
