
--------------------------------
-- @module SLTcpSession
-- @parent_module socklite

--------------------------------
-- 发送<br>
-- param buffer 字节数组 （为了省一次内存拷贝，外部不要销毁这个堆数组，将销毁操作交由内部调用。）<br>
-- param length 字节长度
-- @function [parent=#SLTcpSession] send 
-- @param self
-- @param #char buffer
-- @param #unsigned short length
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 主线程心跳<br>
-- param dt 单位时间
-- @function [parent=#SLTcpSession] mainThreadTick 
-- @param self
-- @param #float dt
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 连接<br>
-- param host 主机地址<br>
-- param port 主机端口
-- @function [parent=#SLTcpSession] connect 
-- @param self
-- @param #char host
-- @param #unsigned short port
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 设置事件代理<br>
-- param delegate 代理对象
-- @function [parent=#SLTcpSession] setDelegate 
-- @param self
-- @param #socklite.SLTcpDelegate delegate
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 
-- @function [parent=#SLTcpSession] isSocketConnect 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 关闭
-- @function [parent=#SLTcpSession] close 
-- @param self
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 同步关闭<br>
-- param cleanup 是否清理缓存
-- @function [parent=#SLTcpSession] synchronizeClose 
-- @param self
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
--------------------------------
-- 
-- @function [parent=#SLTcpSession] SLTcpSession 
-- @param self
-- @return SLTcpSession#SLTcpSession self (return value: socklite.SLTcpSession)
        
return nil
