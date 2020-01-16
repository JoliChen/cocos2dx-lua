#include "flashx/shaders/FxShaderSprite.h"

NS_FLASHX_BEGIN

FxShaderSprite::FxShaderSprite(void)
{
}

FxShaderSprite::~FxShaderSprite()
{
    //FXLOG("%s", __func__);
}

bool FxShaderSprite::initWithTexture(Texture2D* texture, const cocos2d::Rect& rect){
	do {
		CC_BREAK_IF(!Sprite::initWithTexture(texture, rect));
		/*
		auto glprogram = GLProgram::createWithByteArrays(ccPositionTextureColor_vert, ccFxShader_colorFilter_frag);
		auto glprogramstate = GLProgramState::getOrCreateWithGLProgram(glprogram);
		setGLProgramState(glprogramstate);
		*/
        initShader();
		CHECK_GL_ERROR_DEBUG();
		return true;
	} while (0);
	return false;
}

void FxShaderSprite::draw(Renderer *renderer, const Mat4 &transform, uint32_t flags)
{
#if CC_USE_CULLING
	// Don't do calculate the culling if the transform was not updated
	_insideBounds = (flags & FLAGS_TRANSFORM_DIRTY) ? renderer->checkVisibility(transform, _contentSize) : _insideBounds;
	if (_insideBounds)
#endif /* CC_USE_CULLING */
	{
		_customCommand.init(_globalZOrder);
		_customCommand.func = CC_CALLBACK_0(FxShaderSprite::drawShader, this, transform);
		renderer->addCommand(&_customCommand);
#if CC_SPRITE_DEBUG_DRAW
		_debugDrawNode->clear();
		Vec2 vertices[4] = {
			Vec2(_quad.bl.vertices.x, _quad.bl.vertices.y),
			Vec2(_quad.br.vertices.x, _quad.br.vertices.y),
			Vec2(_quad.tr.vertices.x, _quad.tr.vertices.y),
			Vec2(_quad.tl.vertices.x, _quad.tl.vertices.y),
		};
		_debugDrawNode->drawPoly(vertices, 4, true, Color4F(1.0, 1.0, 1.0, 1.0));
#endif /* CC_SPRITE_DEBUG_DRAW */
	}
}

void FxShaderSprite::drawShader(const Mat4 &transform)
{
    updateShader(transform);
	GL::blendFunc(_blendFunc.src, _blendFunc.dst);
	GL::bindTexture2D(_texture->getName());
	GL::enableVertexAttribs(GL::VERTEX_ATTRIB_FLAG_POS_COLOR_TEX);

#define kQuadSize sizeof(_quad.bl)
	size_t offset = (size_t)&_quad;

	// vertex
	int diff = offsetof(V3F_C4B_T2F, vertices);
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_POSITION, 3, GL_FLOAT, GL_FALSE, kQuadSize, (void*)(offset + diff));
	// texCoods
	diff = offsetof(V3F_C4B_T2F, texCoords);
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_TEX_COORD, 2, GL_FLOAT, GL_FALSE, kQuadSize, (void*)(offset + diff));
	// color
	diff = offsetof(V3F_C4B_T2F, colors);
	glVertexAttribPointer(GLProgram::VERTEX_ATTRIB_COLOR, 4, GL_UNSIGNED_BYTE, GL_TRUE, kQuadSize, (void*)(offset + diff));

	glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);

	CHECK_GL_ERROR_DEBUG();
	CC_INCREMENT_GL_DRAWN_BATCHES_AND_VERTICES(1, 4);
}

NS_FLASHX_END
