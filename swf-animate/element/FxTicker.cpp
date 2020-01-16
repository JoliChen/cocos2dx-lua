//
//  FxTicker.cpp
//
//  Created by joli on 2018/12/19.
//  Copyright © 2018 uzone. All rights reserved.
//

#include "FxTicker.h"

#if FX_USING_SCRIPT
#include "CCLuaEngine.h"
#endif

NS_FLASHX_BEGIN

FxTicker::FxTicker()
{
#if FX_USING_SCRIPT
    _scriptTickHandler = FX_SCRIPT_NONE_FUN;
#endif
}

FxTicker::~FxTicker()
{
#if FX_USING_SCRIPT
    setScriptTickHandler(FX_SCRIPT_NONE_FUN);
#endif
}

#if FX_USING_SCRIPT
void FxTicker::setScriptTickHandler(FX_SCRIPT_FUNCTION scriptHandler /* FX_SCRIPT_NONE_FUN */)
{
    if (scriptHandler != _scriptTickHandler) {
        if (FxIsScriptFunction(_scriptTickHandler)) {
            LuaEngine::getInstance()->removeScriptHandler(_scriptTickHandler);
        }
        _scriptTickHandler = scriptHandler;
    }
}
#endif

void FxTicker::onTick()
{
    // FXLOG("%lu FxUnit::%s", clock(), __func__);
#if FX_USING_SCRIPT
    if (FxIsScriptFunction(_scriptTickHandler)) {
        LuaStack *stack = LuaEngine::getInstance()->getLuaStack();
        stack->executeFunctionByHandler(_scriptTickHandler, 0);
        stack->clean();
    }
#endif
}

NS_FLASHX_END /* NS_FLASHX_BEGIN */
