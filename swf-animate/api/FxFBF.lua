
--------------------------------
-- @module FxFBF
-- @extend FxUnit
-- @parent_module flashx

--------------------------------
-- 当前帧索引，范围:[0, totalFrames-1]。<br>
-- return u16
-- @function [parent=#FxFBF] getCurrentFrame 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 是否注册进帧事件<br>
-- param frame   帧索引<br>
-- param handler 回调<br>
-- return 注册
-- @function [parent=#FxFBF] hasScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 注册进帧事件<br>
-- param frame   帧索引<br>
-- param handler 回调
-- @function [parent=#FxFBF] addScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 删除所有进帧事件
-- @function [parent=#FxFBF] delAllScriptEnterFrameHandlers 
-- @param self
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 是否注册播放完毕事件<br>
-- return 注册
-- @function [parent=#FxFBF] hasScriptFrameEndedHandler 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] getStep 
-- @param self
-- @return char#char ret (return value: char)
        
--------------------------------
-- 注册播放完毕事件<br>
-- setScriptFrameEndedHandler<br>
-- param handler 进帧回调
-- @function [parent=#FxFBF] setScriptFrameEndedHandler 
-- @param self
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] playing 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 跳到指定帧开始播放<br>
-- param frame 帧索引
-- @function [parent=#FxFBF] gotoAndPlay 
-- @param self
-- @param #unsigned short frame
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] getTotalFrames 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 删除进帧事件<br>
-- param frame   帧索引<br>
-- param handler 回调
-- @function [parent=#FxFBF] delScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] setLoop 
-- @param self
-- @param #bool loop
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] loop 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 跳到指定帧停止<br>
-- param frame 帧索引
-- @function [parent=#FxFBF] gotoAndStop 
-- @param self
-- @param #unsigned short frame
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 心跳
-- @function [parent=#FxFBF] onTick 
-- @param self
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
--------------------------------
-- 
-- @function [parent=#FxFBF] FxFBF 
-- @param self
-- @return FxFBF#FxFBF self (return value: flashx.FxFBF)
        
return nil
