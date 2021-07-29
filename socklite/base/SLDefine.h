//
//  SLDefine.h
//
//  Created by joli on 2018/9/7.
//
#ifndef SLDefine_h
#define SLDefine_h

#include "socklite/base/SLMacros.h"

NS_SOCKLITE_BEGIN

typedef unsigned int    u32;
typedef unsigned short  u16;
typedef unsigned char   u8;
typedef char            byte;
typedef float           f32;
typedef double          f64;

#define SEND_BUF_SIZE (16*1024)
#define RECV_BUF_SIZE (32*1024)
#define RECV_BUF_IEND (RECV_BUF_SIZE-1)
#define MAX_PACKET_SIZE (30*1024)
#define PACKET_SIZE_BT 2
typedef u16  packet_size;
typedef byte packet_byte;

NS_SOCKLITE_END/* NS_SOCKLITE_BEGIN */

#endif/* SLDefine_h */
