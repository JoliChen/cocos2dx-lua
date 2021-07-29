
--------------------------------
-- @module FxArtManager
-- @extend FxUnitManager
-- @parent_module flashx

--------------------------------
-- @overload self, flashx.FxAnimateData         
-- @overload self, unsigned int         
-- @function [parent=#FxArtManager] getAnimateRes
-- @param self
-- @param #unsigned int animateId
-- @return array_table#array_table ret (return value: array_table)

--------------------------------
-- 归还资源集<br>
-- param retianRes 引用的动画资源表
-- @function [parent=#FxArtManager] releaseAtlasSet 
-- @param self
-- @param #array_table retianRes
-- @return FxArtManager#FxArtManager self (return value: flashx.FxArtManager)
        
--------------------------------
-- 引用动画资源<br>
-- param animateData 动画数据<br>
-- param retianRes 引用的动画资源表
-- @function [parent=#FxArtManager] retainAnimateRes 
-- @param self
-- @param #flashx.FxAnimateData animateData
-- @param #array_table retianRes
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 初始化<br>
-- param animateDir 动画根目录<br>
-- param actPkgPath 动作数据包路径
-- @function [parent=#FxArtManager] init 
-- @param self
-- @param #string animateDir
-- @param #string actPkgPath
-- @return FxArtManager#FxArtManager self (return value: flashx.FxArtManager)
        
--------------------------------
-- 构建异步动画<br>
-- param animateId 动画ID<br>
-- param handler 动画资源加载回调
-- @function [parent=#FxArtManager] newAsyncAnimate 
-- @param self
-- @param #unsigned int animateId
-- @param #function handler
-- @return FxAsyncAnimate#FxAsyncAnimate ret (return value: flashx.FxAsyncAnimate)
        
--------------------------------
-- 构建动画<br>
-- param animateId 动画ID<br>
-- return 动画
-- @function [parent=#FxArtManager] newAnimate 
-- @param self
-- @param #unsigned int animateId
-- @return FxAnimate#FxAnimate ret (return value: flashx.FxAnimate)
        
--------------------------------
-- 
-- @function [parent=#FxArtManager] disposeInstance 
-- @param self
-- @return FxArtManager#FxArtManager self (return value: flashx.FxArtManager)
        
--------------------------------
-- 
-- @function [parent=#FxArtManager] getInstance 
-- @param self
-- @return FxArtManager#FxArtManager ret (return value: flashx.FxArtManager)
        
return nil
