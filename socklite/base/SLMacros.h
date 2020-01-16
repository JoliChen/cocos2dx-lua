//
//  SLMacros.h
//
//  Created by joli on 2018/9/6.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef SLMacros_h
#define SLMacros_h

#include <stddef.h>

#if defined(COCOS2D_DEBUG) && COCOS2D_DEBUG > 0
#define SOCKLITE_DEBUG
#endif

#ifdef SOCKLITE_DEBUG
#include "base/ccMacros.h"
#define SL_LOG(format, ...) CCLOG(("[socklite] " format), ##__VA_ARGS__)
#define SL_ASSERT(cond, msg) CCASSERT(cond, msg)
#else
#define SL_LOG(format, ...)
#define SL_ASSERT(cond, msg)
#endif

#define SL_DELETE(p)            do { delete (p);   (p) = NULL; } while(0)
#define SL_DELETE_ARRAY(p)      do { delete[] (p); (p) = NULL; } while(0)
#define SL_SAFE_DELETE(p)       if (p) { SL_DELETE(p); }
#define SL_SAFE_DELETE_ARRAY(p) if (p) { SL_DELETE_ARRAY(p); }
#define SL_BREAK_IF(cond)       if (cond) { break; }

#define NS_SOCKLITE_BEGIN   namespace socklite {
#define NS_SOCKLITE_END     }
#define USING_NS_SOCKLITE   using namespace socklite

#endif /* SLMacros_h */
