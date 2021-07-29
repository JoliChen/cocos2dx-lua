//
//  SLUtils.cpp
//
//  Created by joli on 2020/12/2.
//

#include "socklite/client/SLUtils.h"
#include <stdlib.h>
#include <zlib.h>

NS_SOCKLITE_BEGIN

int unz_memory(const char *inBuf, int inLen, char **outBuf, int outHint)
{
    int outLen = 0;
    int err = unz_memory(inBuf, inLen, outBuf, &outLen, outHint);
    if (err != Z_OK || *outBuf == nullptr)
    {
        switch (err)
        {
            case Z_MEM_ERROR:
                SL_LOG("%s error:Out of memory while decompressing map data", __func__);
                break;
            case Z_VERSION_ERROR:
                SL_LOG("%s error:Incompatible zlib version", __func__);
                break;
            case Z_DATA_ERROR:
                SL_LOG("%s error:Incorrect zlib compressed data", __func__);
                break;
            default:
                SL_LOG("%s error:Unknown error while decompressing map data", __func__);
                break;
        }
        SL_SAFE_FREE(*outBuf);
        outLen = 0;
    }
    return outLen;
}

#define BUFFER_INC_FACTOR (2)

int unz_memory(const char *inBuf, int inLen, char **outBuf, int *outLen, int outHint)
{
    /* ret value */
    int err = Z_OK;
    
    ssize_t bufferSize = outHint;
    *outBuf = (char*)malloc(bufferSize);
    
    z_stream d_stream; /* decompression stream */
    d_stream.zalloc = (alloc_func)0;
    d_stream.zfree  = (free_func)0;
    d_stream.opaque = (voidpf)0;
    
    d_stream.next_in   = (Bytef *)inBuf;
    d_stream.avail_in  = static_cast<unsigned int>(inLen);
    d_stream.next_out  = (Bytef *)*outBuf;
    d_stream.avail_out = static_cast<unsigned int>(bufferSize);
    
    if( (err = inflateInit(&d_stream)) != Z_OK )
        return err;
    
    for (;;)
    {
        err = inflate(&d_stream, Z_NO_FLUSH);
        
        if (err == Z_STREAM_END)
        {
            break;
        }
        
        switch (err)
        {
            case Z_NEED_DICT:
                err = Z_DATA_ERROR;
            case Z_DATA_ERROR:
            case Z_MEM_ERROR:
                inflateEnd(&d_stream);
                return err;
        }
        
        // not enough memory ?
        if (err != Z_STREAM_END)
        {
            *outBuf = (char*)realloc(*outBuf, bufferSize * BUFFER_INC_FACTOR);
            
            /* not enough memory, ouch */
            if (! *outBuf )
            {
                SL_LOG("%s error: realloc failed", __func__);
                inflateEnd(&d_stream);
                return Z_MEM_ERROR;
            }
            
            d_stream.next_out = (Bytef *)(*outBuf + bufferSize);
            d_stream.avail_out = static_cast<unsigned int>(bufferSize);
            bufferSize *= BUFFER_INC_FACTOR;
        }
    }
    
    *outLen = bufferSize - d_stream.avail_out;
    err = inflateEnd(&d_stream);
    return err;
}

int zip_memory(const char *inBuf, int inLen, char **outBuf)
{
    int outLen = compressBound(inLen);
    *outBuf = (char*)malloc(outLen);
    if (!(*outBuf))
    {
        SL_LOG("%s error: malloc out %d failed", __func__, outLen);
        return 0;
    }
    do {
        const int err = compress((Bytef*)*outBuf, (uLongf*)&outLen, (Bytef*)inBuf, (uLong)inLen);
        if (err != Z_OK)
        {
            SL_LOG("%s error: compress ret:%d", __func__, err);
            break;
        }
    } while (0);
    return outLen;
}

NS_SOCKLITE_END
