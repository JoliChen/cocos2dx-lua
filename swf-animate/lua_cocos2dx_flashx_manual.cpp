#include "flashx/lua_cocos2dx_flashx_manual.hpp"
#include "flashx/flashx.h"
#include "flashx/manager/FxUnitManager.h"
#include "flashx/art2/animate/FxAnimate.h"
#include "flashx/art2/animate/FxAsyncAnimate.h"
#include "scripting/lua-bindings/manual/tolua_fix.h"
#include "scripting/lua-bindings/manual/LuaBasicConversions.h"


static int lua_flashx_FxUnitManager_fetchAsyncAnimate(lua_State* tolua_S)
{
    if (nullptr == tolua_S)
        return 0 ;

    int argc = 0;
    flashx::FxUnitManager* self = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
	if (!tolua_isusertype(tolua_S,1,"flashx.FxUnitManager",0,&tolua_err)) goto tolua_lerror;
#endif

    self = static_cast<flashx::FxUnitManager*>(tolua_tousertype(tolua_S,1,0));

#if COCOS2D_DEBUG >= 1
	if (nullptr == self) {
		tolua_error(tolua_S,"invalid 'self' in function 'lua_flashx_FxUnitManager_fetchAsyncAnimate'\n", NULL);
		return 0;
	}
#endif
    argc = lua_gettop(tolua_S) - 1;

    if (1 == argc) 
    {
        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxUnitManager:fetchAsyncAnimate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_fetchAsyncAnimate'", nullptr);
            return 0;
        }
        flashx::FxAsyncAnimate* ret = self->fetchAsyncAnimate(arg0);
        object_to_luaval<flashx::FxAsyncAnimate>(tolua_S, "flashx.FxAsyncAnimate",(flashx::FxAsyncAnimate*)ret);
        return 1;
    }
    if (2 == argc)
    {

        unsigned int arg0;

        ok &= luaval_to_uint32(tolua_S, 2,&arg0, "flashx.FxUnitManager:fetchAsyncAnimate");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_cocos2dx_flashx_FxUnitManager_fetchAsyncAnimate'", nullptr);
            return 0;
        }

#if COCOS2D_DEBUG >= 1
        if (!toluafix_isfunction(tolua_S,3,"LUA_FUNCTION",0,&tolua_err))
        {
            goto tolua_lerror;
        }
#endif
        LUA_FUNCTION handler = (  toluafix_ref_function(tolua_S, 3, 0));
        flashx::FxAsyncAnimate* ret = self->fetchAsyncAnimate(arg0, [handler](flashx::FxAsyncAnimate* tex, bool succeed){
            LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
            stack->pushObject(tex, "flashx.FxAsyncAnimate");
            stack->pushBoolean(succeed);
            stack->executeFunctionByHandler(handler, 2);
            stack->clean();
        });
		object_to_luaval<flashx::FxAsyncAnimate>(tolua_S, "flashx.FxAsyncAnimate", (flashx::FxAsyncAnimate*)ret);

        return 1;
    }

    luaL_error(tolua_S, "%s function of TextureCache has wrong number of arguments: %d, was expecting %d\n", "flashx.FxUnitManager:fetchAsyncAnimate", argc, 1);

#if COCOS2D_DEBUG >= 1
tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_flashx_FxUnitManager_fetchAsyncAnimate'.",&tolua_err);
#endif
    return 0;
}

int lua_flashx_FxDataManager_initAsync(lua_State* tolua_S)
{
    int argc = 0;
    flashx::FxDataManager* cobj = nullptr;
    bool ok  = true;

#if COCOS2D_DEBUG >= 1
    tolua_Error tolua_err;
#endif


#if COCOS2D_DEBUG >= 1
    if (!tolua_isusertype(tolua_S,1,"flashx.FxDataManager",0,&tolua_err)) goto tolua_lerror;
#endif

    cobj = (flashx::FxDataManager*)tolua_tousertype(tolua_S,1,0);

#if COCOS2D_DEBUG >= 1
    if (!cobj)
    {
        tolua_error(tolua_S,"invalid 'cobj' in function 'lua_flashx_FxDataManager_initAsync'", nullptr);
        return 0;
    }
#endif

    argc = lua_gettop(tolua_S)-1;
    if (argc == 3)
    {
        std::string arg0;
        std::string arg1;
        ok &= luaval_to_std_string(tolua_S, 2,&arg0, "flashx.FxDataManager:initAsync");
        ok &= luaval_to_std_string(tolua_S, 3,&arg1, "flashx.FxDataManager:initAsync");
        if(!ok)
        {
            tolua_error(tolua_S,"invalid arguments in function 'lua_flashx_FxDataManager_initAsync'", nullptr);
            return 0;
        }
#if COCOS2D_DEBUG >= 1
        if (!toluafix_isfunction(tolua_S,4,"LUA_FUNCTION",0,&tolua_err)) {
            goto tolua_lerror;
        }
#endif
        LUA_FUNCTION handler = toluafix_ref_function(tolua_S,4,0);
        cobj->initAsync(arg0, arg1, [handler](){
            LuaStack* stack = LuaEngine::getInstance()->getLuaStack();
            stack->executeFunctionByHandler(handler, 0);
            stack->clean();
        });
        lua_settop(tolua_S, 1);
        return 1;
    }
    luaL_error(tolua_S, "%s has wrong number of arguments: %d, was expecting %d \n", "flashx.FxDataManager:initAsync",argc, 3);
    return 0;

#if COCOS2D_DEBUG >= 1
    tolua_lerror:
    tolua_error(tolua_S,"#ferror in function 'lua_flashx_FxDataManager_initAsync'.",&tolua_err);
#endif

    return 0;
}

static void extendFxUnitManager(lua_State* tolua_S)
{
    lua_pushstring(tolua_S, "flashx.FxUnitManager");
    lua_rawget(tolua_S, LUA_REGISTRYINDEX);
    if (lua_istable(tolua_S,-1))
    {
        tolua_function(tolua_S, "fetchAsyncAnimate", lua_flashx_FxUnitManager_fetchAsyncAnimate);
    }
    lua_pop(tolua_S, 1);
}

static void extendFxDataManager(lua_State* tolua_S)
{
    lua_pushstring(tolua_S, "flashx.FxDataManager");
    lua_rawget(tolua_S, LUA_REGISTRYINDEX);
    if (lua_istable(tolua_S,-1))
    {
        tolua_function(tolua_S, "initAsync", lua_flashx_FxDataManager_initAsync);
    }
    lua_pop(tolua_S, 1);
}

int register_all_cocos2dx_flashx_manual(lua_State* tolua_S)
{
    if (NULL == tolua_S)
        return 0;

    extendFxUnitManager(tolua_S);
    extendFxDataManager(tolua_S);

    return 0;
}
