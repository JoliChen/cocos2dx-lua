
--------------------------------
-- @module FxArtManager
-- @extend FxUnitManager,FxAtlasManager,FxDataManager
-- @parent_module flashx

--------------------------------
-- 获取动画资源列表<br>
-- param animateId 动画ID
-- @function [parent=#FxArtManager] getAnimateRes 
-- @param self
-- @param #unsigned int animateId
-- @return array_table#array_table ret (return value: array_table)
        
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
