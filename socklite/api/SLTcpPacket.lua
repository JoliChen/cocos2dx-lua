
--------------------------------
-- @module SLTcpPacket
-- @parent_module socklite

--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getCmd 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadFloat 
-- @param self
-- @return float#float ret (return value: float)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadString 
-- @param self
-- @return string#string ret (return value: string)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadS32 
-- @param self
-- @return int#int ret (return value: int)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadS16 
-- @param self
-- @return short#short ret (return value: short)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadU8 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] isReadable 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadLongLong 
-- @param self
-- @return long long#long long ret (return value: long long)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] init 
-- @param self
-- @param #unsigned char sn
-- @param #unsigned char module
-- @param #unsigned char cmd
-- @param #char body
-- @param #unsigned char style
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getStyle 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getModule 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getSn 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadU16 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadU32 
-- @param self
-- @return unsigned int#unsigned int ret (return value: unsigned int)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getPacketType 
-- @param self
-- @return int#int ret (return value: int)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] ReadS8 
-- @param self
-- @return char#char ret (return value: char)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] setPacketType 
-- @param self
-- @param #int type
-- @return SLTcpPacket#SLTcpPacket self (return value: socklite.SLTcpPacket)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] getBody 
-- @param self
-- @return FxByteArray#FxByteArray ret (return value: flashx.FxByteArray)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] newPacket 
-- @param self
-- @param #unsigned char sn
-- @param #unsigned char module
-- @param #unsigned char cmd
-- @param #char body
-- @param #unsigned char style
-- @return SLTcpPacket#SLTcpPacket ret (return value: socklite.SLTcpPacket)
        
--------------------------------
-- 
-- @function [parent=#SLTcpPacket] deletePacket 
-- @param self
-- @param #socklite.SLTcpPacket packet
-- @return SLTcpPacket#SLTcpPacket self (return value: socklite.SLTcpPacket)
        
return nil
