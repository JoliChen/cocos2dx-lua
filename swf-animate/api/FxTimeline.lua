
--------------------------------
-- @module FxTimeline
-- @extend Ref
-- @parent_module flashx

--------------------------------
-- 启动
-- @function [parent=#FxTimeline] startup 
-- @param self
-- @return FxTimeline#FxTimeline self (return value: flashx.FxTimeline)
        
--------------------------------
-- return 是否运行
-- @function [parent=#FxTimeline] running 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 设置帧频<br>
-- param fps 帧频
-- @function [parent=#FxTimeline] setFPS 
-- @param self
-- @param #unsigned char fps
-- @return FxTimeline#FxTimeline self (return value: flashx.FxTimeline)
        
--------------------------------
-- 关闭
-- @function [parent=#FxTimeline] shutdown 
-- @param self
-- @return FxTimeline#FxTimeline self (return value: flashx.FxTimeline)
        
--------------------------------
-- return 帧频
-- @function [parent=#FxTimeline] getFPS 
-- @param self
-- @return unsigned char#unsigned char ret (return value: unsigned char)
        
--------------------------------
-- 
-- @function [parent=#FxTimeline] FxTimeline 
-- @param self
-- @param #flashx.FxUnitManager unitManager
-- @return FxTimeline#FxTimeline self (return value: flashx.FxTimeline)
        
return nil
