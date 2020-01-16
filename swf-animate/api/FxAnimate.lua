
--------------------------------
-- @module FxAnimate
-- @extend Node,FxFBF
-- @parent_module flashx

--------------------------------
-- 
-- @function [parent=#FxAnimate] getArtManager 
-- @param self
-- @return FxArtManager#FxArtManager ret (return value: flashx.FxArtManager)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] delScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] setScriptFrameEndedHandler 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] setCircle 
-- @param self
-- @param #bool circle
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 清理
-- @function [parent=#FxAnimate] cleanupAnimate 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] gotoAndStop 
-- @param self
-- @param #unsigned short frame
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] getCurrentFrame 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] suicide 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] pauseEff 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] hasScriptFrameEndedHandler 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 初始化<br>
-- param animateId 动画ID
-- @function [parent=#FxAnimate] initWithID 
-- @param self
-- @param #unsigned int animateId
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] isDead 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] play 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] stop 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] delAllScriptEnterFrameHandlers 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] getTotalFrames 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] hasScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] isCircle 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] gotoAndPlay 
-- @param self
-- @param #unsigned short frame
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] isPaused 
-- @param self
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] addScriptEnterFrameHandler 
-- @param self
-- @param #unsigned short frame
-- @param #int handler
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] removeFromParent 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] retain 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] getReferenceCount 
-- @param self
-- @return unsigned int#unsigned int ret (return value: unsigned int)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] release 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxAnimate] FxAnimate 
-- @param self
-- @return FxAnimate#FxAnimate self (return value: flashx.FxAnimate)
        
return nil
