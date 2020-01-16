
--------------------------------
-- @module FxUnitManager
-- @parent_module flashx

--------------------------------
-- 构造心跳单元<br>
-- return 心跳单元
-- @function [parent=#FxUnitManager] newTicker 
-- @param self
-- @return FxUnit#FxUnit ret (return value: flashx.FxUnit)
        
--------------------------------
-- 计算心跳单元数量<br>
-- return 心跳单元数量
-- @function [parent=#FxUnitManager] numUnits 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 启动时间轴
-- @function [parent=#FxUnitManager] resumeTimeline 
-- @param self
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- 回收心跳单元
-- @function [parent=#FxUnitManager] delUnit 
-- @param self
-- @param #flashx.FxUnit unit
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- 设置时间轴帧频<br>
-- param fps 帧频
-- @function [parent=#FxUnitManager] setFPS 
-- @param self
-- @param #unsigned char fps
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- 垃圾回收
-- @function [parent=#FxUnitManager] gc 
-- @param self
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- 停止时间轴
-- @function [parent=#FxUnitManager] pauseTimeline 
-- @param self
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- return 时间轴帧频
-- @function [parent=#FxUnitManager] getFPS 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
return nil
