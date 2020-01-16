#ifndef FxShaderSprite_h
#define FxShaderSprite_h

#include "cocos2d.h"
#include "flashx/basic/FxMacros.h"

USING_NS_CC;

NS_FLASHX_BEGIN

class FxShaderSprite : public Sprite
{
public:
	virtual bool initWithTexture(Texture2D* texture, const cocos2d::Rect& rect)  override;
    virtual void draw(Renderer *renderer, const Mat4 &transform, uint32_t flags) override;
    
	void drawShader(const Mat4 &transform);
    
protected:
    FxShaderSprite();
    virtual ~FxShaderSprite();
    
    virtual void initShader() = 0;
    
    virtual void updateShader(const Mat4 &transform) = 0;
    
    
	CustomCommand _customCommand;
};

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxShaderSprite_h */
