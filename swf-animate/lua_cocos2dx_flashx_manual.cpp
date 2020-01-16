#include "flashx/lua_cocos2dx_flashx_manual.hpp"
#include "flashx/flashx.h"
#include "flashx/art2/animate/FxAnimate.h"
#include "flashx/art2/animate/FxAsyncAnimate.h"
#include "flashx/art2/manager/FxArtManager.h"
#include "scripting/lua-bindings/manual/tolua_fix.h"
#include "scripting/lua-bindings/manual/LuaBasicConversions.h"


static int lua_flashx_FxArtManager_newAsyncAnimate(lua_State* tolua_S)
{
    if (nullptr == tolua_S)
        return 0 ;

    int argc = 0;
    flashx::FxArtManager* self = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
	if (!tolua_isusertype(tolua_S,1,"flashx.FxArtManager",0,&tolua_err)) goto tolua_lerror;
#endif

    self = static_cast<flashx::FxArtManager*>(tolua_tousertype(tolua_S,1,0));

#if COCOS2D_DEBUG >= 1
	if (nullptr == self) {
		tolua_error(tolua_S,"invalid 'self' in function 'lua_flashx_FxArtManager_newAsyncAnimate'\n", NULL);
		return 0;
	}
#endif
    argc = lua_gettop(tolua_S) - 1;

    if (1 == argc) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxArtManager:newAsyncAnimate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxArtManager_newAsyncAnimate'", nullptr);
            return 0;
        }
        flashx::FxAsyncAnimate* ret = self->newAsyncAnimate(arg0);
        object_to_luaval<flashx::FxAsyncAnimate>(tolua_S, "flashx.FxAsyncAnimate",(flashx::FxAsyncAnimate*)ret);
        return 1;
    }
    if (2 == argc)
    {

        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxArtManager:newAsyncAnimate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxArtManager_newAsyncAnimate'", nullptr);
            return 0;
        }

#if COCOS2D_DEBUG >= 1
        if (!toluafix_isfunction(tolua_S,3,"LUA_FUNCTION",0,&tolua_err))
        {
            goto tolua_lerror;
        }
#endif
        LUA_FUNCTION handler = (  toluafix_ref_function(tolua_S, 3, 0)); 

        flashx::FxAsyncAnimate* ret = self->newAsyncAnimate(arg0, [=](flashx::FxAsyncAnimate* tex, bool succeed){
            int ID = (tex) ? (int)tex->_ID : -1;
            int* luaID = (tex) ? &tex->_luaID : nullptr;
            toluafix_pushusertype_ccobject(tolua_S, ID, luaID, (void*)tex, "flashx.FxAsyncAnimate");
            tolua_pushboolean(tolua_S, succeed);
            LuaEngine::getInstance()->getLuaStack()->executeFunctionByHandler(handler,2);
            LuaEngine::getInstance()->removeScriptHandler(handler);
        });
		object_to_luaval<flashx::FxAsyncAnimate>(tolua_S, "flashx.FxAsyncAnimate", (flashx::FxAsyncAnimate*)ret);

        return 1;
    }

    luaL_error(tolua_S, "%s function of TextureCache has wrong number of arguments: %d, was expecting %d\n", "flashx.FxArtManager:newAsyncAnimate", argc, 1);

#if COCOS2D_DEBUG >= 1
tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_flashx_FxArtManager_newAsyncAnimate'.",&tolua_err);
#endif
    return 0;
}


static void extendFxArtManager(lua_State* tolua_S)
{
    lua_pushstring(tolua_S, "flashx.FxArtManager");
    lua_rawget(tolua_S, LUA_REGISTRYINDEX);
    if (lua_istable(tolua_S,-1))
    {
        tolua_function(tolua_S, "newAsyncAnimate", lua_flashx_FxArtManager_newAsyncAnimate);
    }
    lua_pop(tolua_S, 1);
}


int register_all_cocos2dx_flashx_manual(lua_State* tolua_S)
{
    if (NULL == tolua_S)
        return 0;

    extendFxArtManager(tolua_S);

    return 0;
}
