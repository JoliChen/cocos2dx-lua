
--------------------------------
-- @module FxUnitManager
-- @extend Ref
-- @parent_module flashx

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
-- 移除单元<br>
-- param unit 单元对象
-- @function [parent=#FxUnitManager] removeUnit 
-- @param self
-- @param #flashx.FxUnit unit
-- @return FxUnitManager#FxUnitManager self (return value: flashx.FxUnitManager)
        
--------------------------------
-- 移除未使用的单元
-- @function [parent=#FxUnitManager] removeUnusedUnits 
-- @param self
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
-- 构造心跳单元<br>
-- return 心跳单元
-- @function [parent=#FxUnitManager] fetchTicker 
-- @param self
-- @return FxTicker#FxTicker ret (return value: flashx.FxTicker)
        
--------------------------------
-- 构建动画<br>
-- param animateId 动画ID<br>
-- return 动画
-- @function [parent=#FxUnitManager] fetchAnimate 
-- @param self
-- @param #unsigned int animateId
-- @return FxAnimate#FxAnimate ret (return value: flashx.FxAnimate)
        
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
        
--------------------------------
-- 
-- @function [parent=#FxUnitManager] create 
-- @param self
-- @return FxUnitManager#FxUnitManager ret (return value: flashx.FxUnitManager)
        
return nil
