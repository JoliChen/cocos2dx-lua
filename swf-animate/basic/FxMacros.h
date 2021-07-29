#ifndef __FLASHX_FXMACROS_H__
#define __FLASHX_FXMACROS_H__

#if defined(COCOS2D_DEBUG) && COCOS2D_DEBUG > 0
#define FX_DEBUG
#endif

#ifdef FX_DEBUG
#include "base/ccMacros.h"
#define FXLOG(format, ...) CCLOG(("[flashx] " format), ##__VA_ARGS__)
#define FX_ASSERT(cond, msg) CCASSERT(cond, msg)
#else
#define FXLOG(format, ...)
#define FX_ASSERT(cond, msg)
#endif

#define FX_DELETE(p)            do { delete (p);   (p) = nullptr; } while(0)
#define FX_DELETE_ARRAY(p)      do { delete[] (p); (p) = nullptr; } while(0)
#define FX_SAFE_DELETE(p)       if (p) { FX_DELETE(p); }
#define FX_SAFE_DELETE_ARRAY(p) if (p) { FX_DELETE_ARRAY(p); }
#define FX_SAFE_FREE(p)         do { if(p) { free(p); (p) = nullptr; } } while(0)

#define NS_FLASHX_BEGIN     namespace flashx {
#define NS_FLASHX_END       }
#define USING_NS_FLASHX     using namespace flashx

#ifndef FX_USING_CPP
#define FX_USING_CPP 0
#endif

#ifndef FX_USING_SCRIPT
#define FX_USING_SCRIPT 1
#endif

#if FX_USING_SCRIPT
typedef int FX_SCRIPT_FUNCTION;
#define FX_SCRIPT_NONE_FUN 0
#define FxIsScriptFunction(functionId) (FX_SCRIPT_NONE_FUN != functionId)
#endif

#define forit(data, it)     for(auto it=data.begin(); it!=data.end(); it++)
#define whileit(data, it)   auto it = data.begin(); while (it != data.end())

#endif //__FLASHX_FXMACROS_H__
