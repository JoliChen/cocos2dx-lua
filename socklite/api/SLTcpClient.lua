
--------------------------------
-- @module SLTcpClient
-- @extend SLTcpDelegate
-- @parent_module socklite

--------------------------------
-- close callback<br>
-- param session TCP会话<br>
-- param isOk 是否成功
-- @function [parent=#SLTcpClient] onCloseResp 
-- @param self
-- @param #socklite.SLTcpSession session
-- @param #bool isOk
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- ********************************************* SLTcpDelegate **************************************************<br>
-- connect callback<br>
-- param session TCP会话<br>
-- param isOk 是否成功
-- @function [parent=#SLTcpClient] onConnectResp 
-- @param self
-- @param #socklite.SLTcpSession session
-- @param #bool isOk
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 主线程心跳<br>
-- param dt 单位时间
-- @function [parent=#SLTcpClient] update 
-- @param self
-- @param #float dt
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 
-- @function [parent=#SLTcpClient] setEventListener 
-- @param self
-- @param #int listener
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- *********************************************** SLTcpDelegate ************************************************
-- @function [parent=#SLTcpClient] isSocketConnect 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 接收数据包<br>
-- param session TCP会话<br>
-- param ipacket 数据包
-- @function [parent=#SLTcpClient] onRecvPacket 
-- @param self
-- @param #socklite.SLTcpSession session
-- @param #socklite.SLTcpRecvPacket ipacket
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 连接<br>
-- param host 主机地址<br>
-- param port 主机端口
-- @function [parent=#SLTcpClient] connect 
-- @param self
-- @param #char host
-- @param #unsigned short port
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- disconnect callback<br>
-- param session TCP会话
-- @function [parent=#SLTcpClient] onDisconnect 
-- @param self
-- @param #socklite.SLTcpSession session
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 发送数据包<br>
-- param packet 数据包<br>
-- param immediatelyDelete 是否立即删除数据包
-- @function [parent=#SLTcpClient] sendPacket 
-- @param self
-- @param #socklite.SLTcpPacket packet
-- @param #bool immediatelyDelete
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 断开连接<br>
-- param cleanup 清除缓存
-- @function [parent=#SLTcpClient] close 
-- @param self
-- @return SLTcpClient#SLTcpClient self (return value: socklite.SLTcpClient)
        
--------------------------------
-- 
-- @function [parent=#SLTcpClient] create 
-- @param self
-- @return SLTcpClient#SLTcpClient ret (return value: socklite.SLTcpClient)
        
return nil
