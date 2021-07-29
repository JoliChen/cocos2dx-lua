//
//  SLUtils.hpp
//
//  Created by joli on 2020/12/2.
//

#ifndef SLUtils_hpp
#define SLUtils_hpp

#include "socklite/base/SLMacros.h"

NS_SOCKLITE_BEGIN

extern int unz_memory(const char *inBuf, int inLen, char **outBuf, int outHint);
extern int unz_memory(const char *inBuf, int inLen, char **outBuf, int *outLen, int outHint);

extern int zip_memory(const char *inBuf, int inLen, char **outBuf);

NS_SOCKLITE_END

#endif /* SLUtils_hpp */
