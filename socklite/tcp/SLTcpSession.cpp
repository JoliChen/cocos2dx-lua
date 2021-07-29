//
//  SLTcpClient.cpp
//
//  Created by joli on 2018/9/7.
//  Copyright © 2018年 uzone. All rights reserved.
//

#include "socklite/tcp/SLTcpSession.h"
//#include "cocos2d.h"

NS_SOCKLITE_BEGIN

//:_isDestroyed(std::make_shared<std::atomic<bool>>(false))
SLTcpSession::SLTcpSession()
:_delegate(NULL)
,_connStat(SLConnState::DISCONN)
,_connTime(0.0f)
,_sendBufLen(0)
,_recvBufLen(0)
,_recvBufPos(0)
{
    SL_ASSERT(0 == (RECV_BUF_SIZE & RECV_BUF_IEND), "recv buffer size need pow2");
    memset(_sendBuffer, 0, SEND_BUF_SIZE);
    memset(_recvBuffer, 0, RECV_BUF_SIZE);
}

SLTcpSession::~SLTcpSession()
{
//    *_isDestroyed = true;
    _connStat = SLConnState::DISCONN;
    _delegate = NULL;
    _sendBufLen = 0;
    _recvBufLen = 0;
    _recvBufPos = 0;
    
}

void SLTcpSession::setDelegate(SLTcpDelegate *delegate)
{
    _delegate = delegate;
}

void SLTcpSession::update(const f32 &dt)
{
    switch (_connStat) {
        case SLConnState::CONNED: {
            if (_socket.sl_valid()) {
                this->handleIO();
            } else {
                _connStat = SLConnState::DISCONN;
                _delegate->onDisconnect(this);
            }
            break;
        }
        case SLConnState::CONNING: {
            _connTime += dt;
            if (_connTime > MAX_SOCK_CONN_SEC) {
                _connTime = 0.0;
                _connStat = SLConnState::DISCONN;
                _delegate->onConnectResp(this, false);// connect timeout
            } else if (_socket.sl_check_conn()) {
                _connTime = 0.0;
                _connStat = SLConnState::CONNED;
                _delegate->onConnectResp(this, true);
            }
            break;
        }
        default: break;
    }
}

void SLTcpSession::close()
{
    _socket.sl_close();
    _connStat = SLConnState::DISCONN;
    _connTime = 0.0;
    _sendBufLen = 0;
    _recvBufLen = 0;
    _recvBufPos = 0;
    memset(_sendBuffer, 0, SEND_BUF_SIZE);
    memset(_recvBuffer, 0, RECV_BUF_SIZE);
}

void SLTcpSession::connect(std::string host, u16 port)
{
    SL_ASSERT(_connStat == SLConnState::DISCONN, "socket not disconnected");
    if (_socket.sl_start_conn(host.c_str(), port, SOCK_STREAM, IPPROTO_TCP)) {
        _connTime = 0.0;
        _connStat = SLConnState::CONNING;
    }
}

bool SLTcpSession::send(const char *buf, const int &len)
{
    if (!_socket.sl_valid())
    {
        return false;
    }
    if (_sendBufLen + len > SEND_BUF_SIZE)
    {
        flushout();
        if (_sendBufLen + len > SEND_BUF_SIZE)
        {
            SL_LOG("error: Send buffer is full");
            return false;
        }
    }
    memmove(_sendBuffer + _sendBufLen, buf, len);
    _sendBufLen += len;
    return true;
}

void SLTcpSession::flushout()
{
    const int outlen = _socket.sl_send(_sendBuffer, _sendBufLen);
    if (outlen > 0)
    {
        const int buflen = _sendBufLen - outlen;
        if (buflen > 0)
        {
            memmove(_sendBuffer, _sendBuffer + outlen, buflen);//align bytes
        }
        else if (buflen < 0)
        {
            SL_LOG("error: Flush out overflow %d_%d/%d", _sendBufLen, buflen, SEND_BUF_SIZE);
            _sendBufLen = 0;
            return;
        }
        _sendBufLen = buflen;
    }
}

void SLTcpSession::flushin(int depth/*0*/)
{
    if (_recvBufLen >= RECV_BUF_SIZE)
    {
        return;
    }
    int savelen, savepos, usedpos;
    usedpos = _recvBufPos + _recvBufLen;
    if(usedpos < RECV_BUF_SIZE)
    {
        savelen = RECV_BUF_SIZE - usedpos;
        savepos = usedpos;
    }
    else
    {
        savelen = RECV_BUF_SIZE - _recvBufLen;
        savepos = usedpos & RECV_BUF_IEND;
    }
    if (savepos + savelen > RECV_BUF_SIZE)
    {
        SL_LOG("error: savepos:%d + savelen:%d > RECV_BUF_SIZE:%d", savepos, savelen, RECV_BUF_SIZE);
        return;
    }
    const int inlen = _socket.sl_recv(_recvBuffer + savepos, savelen);
    if (inlen > 0)
    {
        const int buflen = _recvBufLen + inlen;
        if (buflen > RECV_BUF_SIZE)
        {
            SL_LOG("error: Flush in overflow %d_%d/%d", _recvBufLen, buflen, RECV_BUF_SIZE);
            _recvBufLen = RECV_BUF_SIZE;
            return;
        }
        _recvBufLen = buflen;
        if (inlen == savelen && buflen < RECV_BUF_SIZE)
        {
            if (++depth < 2)
            {
                flushin(depth);
            }
        }
    }
}

void SLTcpSession::handleIO()
{
    if (_sendBufLen > 0) {
        this->flushout();
    }
    
    while (_socket.sl_valid()) {
        if (_recvBufLen < PACKET_SIZE_BT)
        {
            flushin();
            SL_BREAK_IF(_recvBufLen < PACKET_SIZE_BT);
        }
        
        const int pktlen = ((u8)_recvBuffer[(_recvBufPos+1) & RECV_BUF_IEND]) << 8 | ((u8)_recvBuffer[_recvBufPos]);//little-endian
        if (pktlen <= 0 || pktlen > MAX_PACKET_SIZE)
        {
            SL_LOG("error: Incorrect packet length:%d", pktlen);
            _recvBufPos = 0;
            _recvBufLen = 0;//clear recv buffer
            break;
        }
        if (pktlen > _recvBufLen)
        {
            flushin();
            SL_BREAK_IF(pktlen > _recvBufLen);//unfinished
        }
        
        static packet_byte buf[MAX_PACKET_SIZE] = {0};
        if (_recvBufPos + pktlen > RECV_BUF_SIZE)
        {
            const int cutlen = RECV_BUF_SIZE - _recvBufPos;
            memmove(buf, _recvBuffer + _recvBufPos, cutlen);//read head
            memmove(buf + cutlen, _recvBuffer, pktlen - cutlen);//read tail
        }
        else
        {
            memmove(buf, _recvBuffer + _recvBufPos, pktlen);//no rewind
        }
        _recvBufPos = (_recvBufPos + pktlen) & RECV_BUF_IEND;
        _recvBufLen -= pktlen;
        _delegate->onRecvPacket(this, buf + PACKET_SIZE_BT, pktlen - PACKET_SIZE_BT);
    }
}

NS_SOCKLITE_END /* NS_SOCKLITE_BEGIN */
