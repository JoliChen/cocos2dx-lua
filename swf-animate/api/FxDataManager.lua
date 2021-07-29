
--------------------------------
-- @module FxDataManager
-- @parent_module flashx

--------------------------------
-- 获取序列帧数据<br>
-- param sheetId 序列帧数据ID<br>
-- return 序列帧数据
-- @function [parent=#FxDataManager] getSheetData 
-- @param self
-- @param #unsigned int sheetId
-- @return FxSheetData#FxSheetData ret (return value: flashx.FxSheetData)
        
--------------------------------
-- attributes key set
-- @function [parent=#FxDataManager] getAllAttrKeys 
-- @param self
-- @return FxAttrKeySet#FxAttrKeySet ret (return value: flashx.FxAttrKeySet)
        
--------------------------------
-- @overload self, flashx.FxAnimateData         
-- @overload self, unsigned int         
-- @overload self, flashx.FxAnimateData, array_table         
-- @function [parent=#FxDataManager] getAnimateAtlases
-- @param self
-- @param #flashx.FxAnimateData animateData
-- @param #array_table atlasArray
-- @return FxDataManager#FxDataManager self (return value: flashx.FxDataManager)

--------------------------------
-- 清理缓存的数据
-- @function [parent=#FxDataManager] clear 
-- @param self
-- @return FxDataManager#FxDataManager self (return value: flashx.FxDataManager)
        
--------------------------------
-- 获取动画数据<br>
-- param animateId 动画ID<br>
-- return 动画数据
-- @function [parent=#FxDataManager] getAnimateData 
-- @param self
-- @param #unsigned int animateId
-- @return FxAnimateData#FxAnimateData ret (return value: flashx.FxAnimateData)
        
--------------------------------
-- 设置动画数据文件目录<br>
-- param animateDir animate output dir<br>
-- param actionDir   action output dir
-- @function [parent=#FxDataManager] init 
-- @param self
-- @param #string animateDir
-- @param #string actionDir
-- @return FxDataManager#FxDataManager self (return value: flashx.FxDataManager)
        
--------------------------------
-- 引用动画资源<br>
-- param animateData 动画数据<br>
-- param saveRetains 引用的动画资源表
-- @function [parent=#FxDataManager] retainAnimateAtlases 
-- @param self
-- @param #flashx.FxAnimateData animateData
-- @param #array_table saveRetains
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 
-- @function [parent=#FxDataManager] getInstance 
-- @param self
-- @return FxDataManager#FxDataManager ret (return value: flashx.FxDataManager)
        
return nil
