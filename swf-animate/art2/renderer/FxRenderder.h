//
//  FxRenderder.h
//
//  Created by joli on 2018/8/22.
//  Copyright ? 2018Äê uzone. All rights reserved.
//

#ifndef FxRenderder_h
#define FxRenderder_h

#include "flashx/art2/renderer/FxRenderProtocol.h"
#include "flashx/art2/renderer/attr/FxAttrKeySet.h"
#include "flashx/art2/renderer/attr/FxAttrValueSet.h"

NS_FLASHX_BEGIN

extern void FxApplyRenderder(FxRenderProtocol* render, const FxAttrKeySet* keys, const FxAttrValueSet* values);

NS_FLASHX_END /* NS_FLASHX_BEGIN */

#endif /* FxRenderder_h */
