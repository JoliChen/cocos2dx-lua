//
//  FxFilterSprite.h
//
//  Created by joli on 2018/8/25.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxFilterSprite_h
#define FxFilterSprite_h

#include "flashx/shaders/FxShaderSprite.h"

NS_FLASHX_BEGIN

class FxFilterSprite : public FxShaderSprite {
public:
    static FxFilterSprite* create();
    static FxFilterSprite* create(const std::string& filename);
    static FxFilterSprite* create(const std::string& filename, const cocos2d::Rect& rect);
    
    static FxFilterSprite* createWithTexture(Texture2D *texture);
    static FxFilterSprite* createWithTexture(Texture2D *texture, const cocos2d::Rect& rect, bool rotated = false);
    static FxFilterSprite* createWithSpriteFrame(SpriteFrame *spriteFrame);
    static FxFilterSprite* createWithSpriteFrameName(const std::string& spriteFrameName);
    
    
    void clearColorFilter() {
        //m_isNorm = true;
        //setGLProgram(GLProgramCache::getInstance()->getGLProgram(GLProgram::SHADER_NAME_POSITION_TEXTURE_COLOR_NO_MVP));
        colorMatrix.setIdentity();
    }
    
    void setColorFilter(const Mat4& matrix) {
        colorMatrix.set(matrix);
    }
    
    inline const Mat4& getColorFilter() const {
        return colorMatrix;
    }
    
protected:
    void initShader();
    void updateShader(const Mat4 &transform);

private:
    FxFilterSprite();
    ~FxFilterSprite();
    
    GLProgramState* filterGLState;
    Mat4 colorMatrix;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxFilterSprite_h */
