
--------------------------------
-- @module FxAtlasManager
-- @parent_module flashx

--------------------------------
-- 计算图集数量<br>
-- return 心跳单元数量
-- @function [parent=#FxAtlasManager] numAtlas 
-- @param self
-- @return unsigned short#unsigned short ret (return value: unsigned short)
        
--------------------------------
-- 载入图集纹理<br>
-- param plistPath 图集配置路径<br>
-- param callback 回调
-- @function [parent=#FxAtlasManager] loadAtlasTexture 
-- @param self
-- @param #string plistPath
-- @param #function callback
-- @return FxAtlasManager#FxAtlasManager self (return value: flashx.FxAtlasManager)
        
--------------------------------
-- 释放一次图集<br>
-- param plistPath 图集配置路径
-- @function [parent=#FxAtlasManager] releaseAtlas 
-- @param self
-- @param #string plistPath
-- @return FxAtlasManager#FxAtlasManager self (return value: flashx.FxAtlasManager)
        
--------------------------------
-- 引用一次图集<br>
-- param plistPath 图集配置路径<br>
-- param texture 图集纹理
-- @function [parent=#FxAtlasManager] retainAtlas 
-- @param self
-- @param #string plistPath
-- @param #cc.Texture2D texture
-- @return bool#bool ret (return value: bool)
        
--------------------------------
-- 使用设定的纹理格式载入图片<br>
-- param imagePath 图片路径<br>
-- param callback 回调<br>
-- param format 纹理格式<br>
-- return 纹理
-- @function [parent=#FxAtlasManager] loadImageByFormat 
-- @param self
-- @param #string imagePath
-- @param #function callback
-- @param #int format
-- @return Texture2D#Texture2D ret (return value: cc.Texture2D)
        
--------------------------------
-- 是否已载入图集<br>
-- param plistPath 图集配置路径<br>
-- return atlas
-- @function [parent=#FxAtlasManager] isAtlasLoaded 
-- @param self
-- @param #string plistPath
-- @return bool#bool ret (return value: bool)
        
return nil
