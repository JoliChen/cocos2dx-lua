System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './sprite-frame-7d9f333d.js', './sprite-a3b66458.js', './renderable-2d-10fe359a.js', './deprecated-6bde9d8e.js', './ZipUtils-3ae2be0b.js'], function (exports) {
  'use strict';
  var ccenum, Vec2, Color, Size, Rect, logID, errorID, _createClass, ccclass, type, CCInteger, executeInEditMode, _inheritsLoose, warn, _applyDecoratedDescriptor, help, menu, requireComponent, _initializerDefineProperty, _assertThisInitialized, Component, Mat4, Vec3, SystemEventType, Node, CCBoolean, CCObject, BlendFactor, CCString, Asset, serializable, displayOrder, _createForOfIteratorHelperLoose, sys, editable, EDITOR, SAXParser, director, TextAsset, SpriteFrame, Label, Sprite, UITransform, MeshRenderData, Renderable2D, codec, _p;
  return {
    setters: [function (module) {
      ccenum = module.dz;
      Vec2 = module.cW;
      Color = module.da;
      Size = module.d6;
      Rect = module.d8;
      logID = module.c;
      errorID = module.f;
      _createClass = module.eu;
      ccclass = module.es;
      type = module.ey;
      CCInteger = module.dU;
      executeInEditMode = module.fZ;
      _inheritsLoose = module.et;
      warn = module.w;
      _applyDecoratedDescriptor = module.ev;
      help = module.f$;
      menu = module.g0;
      requireComponent = module.gD;
      _initializerDefineProperty = module.eH;
      _assertThisInitialized = module.eL;
      Component = module.eo;
      Mat4 = module.d3;
      Vec3 = module.cY;
      SystemEventType = module.ej;
      Node = module.el;
      CCBoolean = module.dW;
      CCObject = module.dP;
      BlendFactor = module.V;
      CCString = module.dX;
      Asset = module.e1;
      serializable = module.eI;
      displayOrder = module.eE;
      _createForOfIteratorHelperLoose = module.t;
      sys = module.eg;
      editable = module.ez;
      EDITOR = module.eK;
    }, function (module) {
      SAXParser = module.y;
      director = module.f;
    }, function () {}, function () {}, function () {}, function (module) {
      TextAsset = module.T;
    }, function () {}, function (module) {
      SpriteFrame = module.S;
    }, function (module) {
      Label = module.c;
      Sprite = module.a;
    }, function (module) {
      UITransform = module.U;
      MeshRenderData = module.M;
      Renderable2D = module.R;
    }, function () {}, function (module) {
      codec = module.c;
      _p = module._;
    }],
    execute: function () {

      var Orientation;

      (function (Orientation) {
        Orientation[Orientation["ORTHO"] = 0] = "ORTHO";
        Orientation[Orientation["HEX"] = 1] = "HEX";
        Orientation[Orientation["ISO"] = 2] = "ISO";
      })(Orientation || (Orientation = {}));

      ccenum(Orientation);
      var Property;

      (function (Property) {
        Property[Property["NONE"] = 0] = "NONE";
        Property[Property["MAP"] = 1] = "MAP";
        Property[Property["LAYER"] = 2] = "LAYER";
        Property[Property["OBJECTGROUP"] = 3] = "OBJECTGROUP";
        Property[Property["OBJECT"] = 4] = "OBJECT";
        Property[Property["TILE"] = 5] = "TILE";
      })(Property || (Property = {}));

      ccenum(Property);
      var TileFlag;

      (function (TileFlag) {
        TileFlag[TileFlag["HORIZONTAL"] = 2147483648] = "HORIZONTAL";
        TileFlag[TileFlag["VERTICAL"] = 1073741824] = "VERTICAL";
        TileFlag[TileFlag["DIAGONAL"] = 536870912] = "DIAGONAL";
        TileFlag[TileFlag["FLIPPED_ALL"] = 4026531840] = "FLIPPED_ALL";
        TileFlag[TileFlag["FLIPPED_MASK"] = 268435455] = "FLIPPED_MASK";
      })(TileFlag || (TileFlag = {}));

      ccenum(TileFlag);
      var StaggerAxis;

      (function (StaggerAxis) {
        StaggerAxis[StaggerAxis["STAGGERAXIS_X"] = 0] = "STAGGERAXIS_X";
        StaggerAxis[StaggerAxis["STAGGERAXIS_Y"] = 1] = "STAGGERAXIS_Y";
      })(StaggerAxis || (StaggerAxis = {}));

      ccenum(StaggerAxis);
      var StaggerIndex;

      (function (StaggerIndex) {
        StaggerIndex[StaggerIndex["STAGGERINDEX_ODD"] = 0] = "STAGGERINDEX_ODD";
        StaggerIndex[StaggerIndex["STAGGERINDEX_EVEN"] = 1] = "STAGGERINDEX_EVEN";
      })(StaggerIndex || (StaggerIndex = {}));

      ccenum(StaggerIndex);
      var RenderOrder;

      (function (RenderOrder) {
        RenderOrder[RenderOrder["RightDown"] = 0] = "RightDown";
        RenderOrder[RenderOrder["RightUp"] = 1] = "RightUp";
        RenderOrder[RenderOrder["LeftDown"] = 2] = "LeftDown";
        RenderOrder[RenderOrder["LeftUp"] = 3] = "LeftUp";
      })(RenderOrder || (RenderOrder = {}));

      ccenum(RenderOrder);
      var TMXObjectType;

      (function (TMXObjectType) {
        TMXObjectType[TMXObjectType["RECT"] = 0] = "RECT";
        TMXObjectType[TMXObjectType["ELLIPSE"] = 1] = "ELLIPSE";
        TMXObjectType[TMXObjectType["POLYGON"] = 2] = "POLYGON";
        TMXObjectType[TMXObjectType["POLYLINE"] = 3] = "POLYLINE";
        TMXObjectType[TMXObjectType["IMAGE"] = 4] = "IMAGE";
        TMXObjectType[TMXObjectType["TEXT"] = 5] = "TEXT";
      })(TMXObjectType || (TMXObjectType = {}));

      ccenum(TMXObjectType);
      var TMXTilesetInfo = function () {
        function TMXTilesetInfo() {
          this.name = '';
          this.firstGid = 0;
          this.spacing = 0;
          this.margin = 0;
          this.sourceImage = void 0;
          this.imageName = null;
          this.imageSize = new Size(0, 0);
          this.tileOffset = new Vec2(0, 0);
          this._tileSize = new Size(0, 0);
          this.collection = false;
        }

        var _proto = TMXTilesetInfo.prototype;

        _proto.rectForGID = function rectForGID(gid_, result) {
          var rect = result || new Rect(0, 0, 0, 0);
          rect.width = this._tileSize.width;
          rect.height = this._tileSize.height;
          var gid = gid_;
          gid &= TileFlag.FLIPPED_MASK;
          gid -= this.firstGid;
          var max_x = Math.floor((this.imageSize.width - this.margin * 2 + this.spacing) / (this._tileSize.width + this.spacing));
          rect.x = Math.round(gid % max_x * (this._tileSize.width + this.spacing) + this.margin);
          rect.y = Math.round(Math.floor(gid / max_x) * (this._tileSize.height + this.spacing) + this.margin);
          return rect;
        };

        return TMXTilesetInfo;
      }();
      var TMXObjectGroupInfo = function () {
        function TMXObjectGroupInfo() {
          this.properties = {};
          this.name = '';
          this.objects = [];
          this.visible = true;
          this.opacity = 0;
          this.color = new Color(255, 255, 255, 255);
          this.offset = new Vec2(0, 0);
          this.draworder = 'topdown';
          this.tintColor = null;
        }

        var _proto2 = TMXObjectGroupInfo.prototype;

        _proto2.getProperties = function getProperties() {
          return this.properties;
        };

        _proto2.setProperties = function setProperties(value) {
          this.properties = value;
        };

        return TMXObjectGroupInfo;
      }();
      var TMXLayerInfo = function () {
        function TMXLayerInfo() {
          this.properties = {};
          this.name = '';
          this.layerSize = null;
          this.tiles = [];
          this.visible = true;
          this.opacity = 0;
          this.ownTiles = true;
          this.minGID = 100000;
          this.maxGID = 0;
          this.offset = new Vec2(0, 0);
          this.tintColor = null;
        }

        var _proto3 = TMXLayerInfo.prototype;

        _proto3.getProperties = function getProperties() {
          return this.properties;
        };

        _proto3.setProperties = function setProperties(value) {
          this.properties = value;
        };

        return TMXLayerInfo;
      }();
      TMXLayerInfo.ATTRIB_NONE = 1 << 0;
      TMXLayerInfo.ATTRIB_BASE64 = 1 << 1;
      TMXLayerInfo.ATTRIB_GZIP = 1 << 2;
      TMXLayerInfo.ATTRIB_ZLIB = 1 << 3;
      var TMXImageLayerInfo = function TMXImageLayerInfo() {
        this.name = '';
        this.visible = true;
        this.width = 0;
        this.height = 0;
        this.offset = new Vec2(0, 0);
        this.opacity = 0;
        this.trans = new Color(255, 255, 255, 255);
        this.sourceImage = void 0;
        this.tintColor = null;
      };

      function uint8ArrayToUint32Array(uint8Arr) {
        if (uint8Arr.length % 4 !== 0) return null;
        var arrLen = uint8Arr.length / 4;
        var retArr = window.Uint32Array ? new Uint32Array(arrLen) : [];

        for (var i = 0; i < arrLen; i++) {
          var offset = i * 4;
          retArr[i] = uint8Arr[offset] + uint8Arr[offset + 1] * (1 << 8) + uint8Arr[offset + 2] * (1 << 16) + uint8Arr[offset + 3] * (1 << 24);
        }

        return retArr;
      }

      function strToHAlign(value) {
        var hAlign = Label.HorizontalAlign;

        switch (value) {
          case 'center':
            return hAlign.CENTER;

          case 'right':
            return hAlign.RIGHT;

          default:
            return hAlign.LEFT;
        }
      }

      function strToVAlign(value) {
        var vAlign = Label.VerticalAlign;

        switch (value) {
          case 'center':
            return vAlign.CENTER;

          case 'bottom':
            return vAlign.BOTTOM;

          default:
            return vAlign.TOP;
        }
      }

      function strToColor(value) {
        if (!value) {
          return new Color(0, 0, 0, 255);
        }

        value = value.indexOf('#') !== -1 ? value.substring(1) : value;

        if (value.length === 8) {
          var a = parseInt(value.substr(0, 2), 16) || 255;
          var r = parseInt(value.substr(2, 2), 16) || 0;
          var g = parseInt(value.substr(4, 2), 16) || 0;
          var b = parseInt(value.substr(6, 2), 16) || 0;
          return new Color(r, g, b, a);
        } else {
          var _r = parseInt(value.substr(0, 2), 16) || 0;

          var _g = parseInt(value.substr(2, 2), 16) || 0;

          var _b = parseInt(value.substr(4, 2), 16) || 0;

          return new Color(_r, _g, _b, 255);
        }
      }

      function getPropertyList(node, map) {
        var res = [];
        var properties = node.getElementsByTagName('properties');

        for (var i = 0; i < properties.length; ++i) {
          var property = properties[i].getElementsByTagName('property');

          for (var j = 0; j < property.length; ++j) {
            res.push(property[j]);
          }
        }

        map = map || {};

        for (var _i = 0; _i < res.length; _i++) {
          var element = res[_i];
          var name = element.getAttribute('name');
          var type = element.getAttribute('type') || 'string';
          var value = element.getAttribute('value');

          if (type === 'int') {
            value = parseInt(value);
          } else if (type === 'float') {
            value = parseFloat(value);
          } else if (type === 'bool') {
            value = value === 'true';
          } else if (type === 'color') {
            value = strToColor(value);
          }

          map[name] = value;
        }

        return map;
      }

      var TMXMapInfo = function () {
        function TMXMapInfo(tmxFile, tsxContentMap, spfTexturesMap, textureSizes, imageLayerTextures) {
          this.properties = {};
          this.orientation = null;
          this.parentElement = null;
          this.parentGID = 0;
          this.layerAttrs = 0;
          this.storingCharacters = false;
          this.currentString = null;
          this.renderOrder = RenderOrder.RightDown;
          this._supportVersion = [1, 4, 0];
          this._objectGroups = [];
          this._allChildren = [];
          this._mapSize = new Size(0, 0);
          this._tileSize = new Size(0, 0);
          this._layers = [];
          this._tilesets = [];
          this._imageLayers = [];
          this._tileProperties = new Map();
          this._tileAnimations = {};
          this._tsxContentMap = null;
          this._spriteFrameMap = null;
          this._spfSizeMap = {};
          this._staggerAxis = null;
          this._staggerIndex = null;
          this._hexSideLength = 0;
          this._imageLayerSPF = null;
          this.initWithXML(tmxFile, tsxContentMap, spfTexturesMap, textureSizes, imageLayerTextures);
        }

        var _proto = TMXMapInfo.prototype;

        _proto.getOrientation = function getOrientation() {
          return this.orientation;
        };

        _proto.setOrientation = function setOrientation(value) {
          this.orientation = value;
        };

        _proto.getStaggerAxis = function getStaggerAxis() {
          return this._staggerAxis;
        };

        _proto.setStaggerAxis = function setStaggerAxis(value) {
          this._staggerAxis = value;
        };

        _proto.getStaggerIndex = function getStaggerIndex() {
          return this._staggerIndex;
        };

        _proto.setStaggerIndex = function setStaggerIndex(value) {
          this._staggerIndex = value;
        };

        _proto.getHexSideLength = function getHexSideLength() {
          return this._hexSideLength;
        };

        _proto.setHexSideLength = function setHexSideLength(value) {
          this._hexSideLength = value;
        };

        _proto.getMapSize = function getMapSize() {
          return new Size(this._mapSize.width, this._mapSize.height);
        };

        _proto.setMapSize = function setMapSize(value) {
          this._mapSize.width = value.width;
          this._mapSize.height = value.height;
        };

        _proto.getTileSize = function getTileSize() {
          return new Size(this._tileSize.width, this._tileSize.height);
        };

        _proto.setTileSize = function setTileSize(value) {
          this._tileSize.width = value.width;
          this._tileSize.height = value.height;
        };

        _proto.getLayers = function getLayers() {
          return this._layers;
        };

        _proto.setLayers = function setLayers(value) {
          this._allChildren.push(value);

          this._layers.push(value);
        };

        _proto.getImageLayers = function getImageLayers() {
          return this._imageLayers;
        };

        _proto.setImageLayers = function setImageLayers(value) {
          this._allChildren.push(value);

          this._imageLayers.push(value);
        };

        _proto.getTilesets = function getTilesets() {
          return this._tilesets;
        };

        _proto.setTilesets = function setTilesets(value) {
          this._tilesets.push(value);
        };

        _proto.getObjectGroups = function getObjectGroups() {
          return this._objectGroups;
        };

        _proto.setObjectGroups = function setObjectGroups(value) {
          this._allChildren.push(value);

          this._objectGroups.push(value);
        };

        _proto.getAllChildren = function getAllChildren() {
          return this._allChildren;
        };

        _proto.getParentElement = function getParentElement() {
          return this.parentElement;
        };

        _proto.setParentElement = function setParentElement(value) {
          this.parentElement = value;
        };

        _proto.getParentGID = function getParentGID() {
          return this.parentGID;
        };

        _proto.setParentGID = function setParentGID(value) {
          this.parentGID = value;
        };

        _proto.getLayerAttribs = function getLayerAttribs() {
          return this.layerAttrs;
        };

        _proto.setLayerAttribs = function setLayerAttribs(value) {
          this.layerAttrs = value;
        };

        _proto.getStoringCharacters = function getStoringCharacters() {
          return this.storingCharacters;
        };

        _proto.setStoringCharacters = function setStoringCharacters(value) {
          this.storingCharacters = value;
        };

        _proto.getProperties = function getProperties() {
          return this.properties;
        };

        _proto.setProperties = function setProperties(value) {
          this.properties = value;
        };

        _proto.initWithXML = function initWithXML(tmxString, tsxMap, spfTextureMap, textureSizes, imageLayerTextures) {
          this._tilesets.length = 0;
          this._layers.length = 0;
          this._imageLayers.length = 0;
          this._tsxContentMap = tsxMap;
          this._spriteFrameMap = spfTextureMap;
          this._imageLayerSPF = imageLayerTextures;
          this._spfSizeMap = textureSizes;
          this._objectGroups.length = 0;
          this._allChildren.length = 0;
          this.properties = {};
          this._tileProperties = new Map();
          this._tileAnimations = new Map();
          this.currentString = '';
          this.storingCharacters = false;
          this.layerAttrs = TMXLayerInfo.ATTRIB_NONE;
          this.parentElement = null;
          return this.parseXMLString(tmxString);
        };

        _proto.parseXMLString = function parseXMLString(xmlStr, tilesetFirstGid) {
          var parser = new SAXParser();
          var mapXML = parser.parse(xmlStr);
          var i;
          var map = mapXML.documentElement;
          var orientationStr = map.getAttribute('orientation');
          var staggerAxisStr = map.getAttribute('staggeraxis');
          var staggerIndexStr = map.getAttribute('staggerindex');
          var hexSideLengthStr = map.getAttribute('hexsidelength');
          var renderorderStr = map.getAttribute('renderorder');
          var version = map.getAttribute('version') || '1.0.0';

          if (map.nodeName === 'map') {
            var versionArr = version.split('.');
            var supportVersion = this._supportVersion;

            for (i = 0; i < supportVersion.length; i++) {
              var v = parseInt(versionArr[i]) || 0;
              var sv = supportVersion[i];

              if (sv < v) {
                logID(7216, version);
                break;
              }
            }

            if (orientationStr === 'orthogonal') this.orientation = Orientation.ORTHO;else if (orientationStr === 'isometric') this.orientation = Orientation.ISO;else if (orientationStr === 'hexagonal') this.orientation = Orientation.HEX;else if (orientationStr !== null) logID(7217, orientationStr);

            if (renderorderStr === 'right-up') {
              this.renderOrder = RenderOrder.RightUp;
            } else if (renderorderStr === 'left-up') {
              this.renderOrder = RenderOrder.LeftUp;
            } else if (renderorderStr === 'left-down') {
              this.renderOrder = RenderOrder.LeftDown;
            } else {
              this.renderOrder = RenderOrder.RightDown;
            }

            if (staggerAxisStr === 'x') {
              this.setStaggerAxis(StaggerAxis.STAGGERAXIS_X);
            } else if (staggerAxisStr === 'y') {
              this.setStaggerAxis(StaggerAxis.STAGGERAXIS_Y);
            }

            if (staggerIndexStr === 'odd') {
              this.setStaggerIndex(StaggerIndex.STAGGERINDEX_ODD);
            } else if (staggerIndexStr === 'even') {
              this.setStaggerIndex(StaggerIndex.STAGGERINDEX_EVEN);
            }

            if (hexSideLengthStr) {
              this.setHexSideLength(parseFloat(hexSideLengthStr));
            }

            var mapSize = new Size(0, 0);
            mapSize.width = parseFloat(map.getAttribute('width'));
            mapSize.height = parseFloat(map.getAttribute('height'));
            this.setMapSize(mapSize);
            mapSize = new Size(0, 0);
            mapSize.width = parseFloat(map.getAttribute('tilewidth'));
            mapSize.height = parseFloat(map.getAttribute('tileheight'));
            this.setTileSize(mapSize);
            this.properties = getPropertyList(map);
          }

          var tilesets = map.getElementsByTagName('tileset');

          if (map.nodeName !== 'map') {
            tilesets = [];
            tilesets.push(map);
          }

          for (i = 0; i < tilesets.length; i++) {
            var curTileset = tilesets[i];
            var tsxName = curTileset.getAttribute('source');

            if (tsxName) {
              var currentFirstGID = parseInt(curTileset.getAttribute('firstgid'));
              var tsxXmlString = this._tsxContentMap[tsxName];

              if (tsxXmlString) {
                this.parseXMLString(tsxXmlString, currentFirstGID);
              }
            } else {
              var images = curTileset.getElementsByTagName('image');
              var collection = images.length > 1;
              var firstImage = images[0];
              var firstImageName = firstImage.getAttribute('source');
              firstImageName = firstImageName.replace(/\\/g, '/');
              var tiles = curTileset.getElementsByTagName('tile');
              var tileCount = tiles && tiles.length || 1;
              var tile = null;
              var tilesetName = curTileset.getAttribute('name') || '';
              var tilesetSpacing = parseInt(curTileset.getAttribute('spacing')) || 0;
              var tilesetMargin = parseInt(curTileset.getAttribute('margin')) || 0;
              var fgid = tilesetFirstGid || parseInt(curTileset.getAttribute('firstgid')) || 0;
              var tilesetSize = new Size(0, 0);
              tilesetSize.width = parseFloat(curTileset.getAttribute('tilewidth'));
              tilesetSize.height = parseFloat(curTileset.getAttribute('tileheight'));
              var curTileOffset = curTileset.getElementsByTagName('tileoffset')[0];
              var tileOffsetX = 0;
              var tileOffsetY = 0;

              if (curTileOffset) {
                tileOffsetX = parseFloat(curTileOffset.getAttribute('x')) || 0;
                tileOffsetY = parseFloat(curTileOffset.getAttribute('y')) || 0;
              }

              var tileset = null;

              for (var tileIdx = 0; tileIdx < tileCount; tileIdx++) {
                var curImage = images[tileIdx] ? images[tileIdx] : firstImage;
                if (!curImage) continue;
                var curImageName = curImage.getAttribute('source');
                curImageName = curImageName.replace(/\\/g, '/');

                if (!tileset || collection) {
                  tileset = new TMXTilesetInfo();
                  tileset.name = tilesetName;
                  tileset.firstGid = fgid & TileFlag.FLIPPED_MASK;
                  tileset.tileOffset.x = tileOffsetX;
                  tileset.tileOffset.y = tileOffsetY;
                  tileset.collection = collection;

                  if (!collection) {
                    tileset.imageName = curImageName;
                    tileset.imageSize.width = parseFloat(curImage.getAttribute('width')) || 0;
                    tileset.imageSize.height = parseFloat(curImage.getAttribute('height')) || 0;
                    tileset.sourceImage = this._spriteFrameMap[curImageName];

                    if (!tileset.sourceImage) {
                      var nameWithPostfix = TMXMapInfo.getNameWithPostfix(curImageName);
                      tileset.imageName = nameWithPostfix;
                      tileset.sourceImage = this._spriteFrameMap[nameWithPostfix];

                      if (!tileset.sourceImage) {
                        var shortName = TMXMapInfo.getShortName(curImageName);
                        tileset.imageName = shortName;
                        tileset.sourceImage = this._spriteFrameMap[shortName];

                        if (!tileset.sourceImage) {
                          console.error("[error]: " + shortName + " not find in [" + Object.keys(this._spriteFrameMap).join(', ') + "]");
                          errorID(7221, curImageName);
                          console.warn("Please try asset type of " + curImageName + " to 'sprite-frame'");
                        }
                      }
                    }
                  }

                  tileset.spacing = tilesetSpacing;
                  tileset.margin = tilesetMargin;
                  tileset._tileSize.width = tilesetSize.width;
                  tileset._tileSize.height = tilesetSize.height;
                  this.setTilesets(tileset);
                }

                tile = tiles && tiles[tileIdx];

                if (!tile) {
                  continue;
                }

                this.parentGID = fgid + (parseInt(tile.getAttribute('id')) || 0);
                var tileImages = tile.getElementsByTagName('image');

                if (tileImages && tileImages.length > 0) {
                  var image = tileImages[0];
                  var imageName = image.getAttribute('source');
                  imageName = imageName.replace(/\\/g, '/');
                  tileset.imageName = imageName;
                  tileset.imageSize.width = parseFloat(image.getAttribute('width')) || 0;
                  tileset.imageSize.height = parseFloat(image.getAttribute('height')) || 0;
                  tileset._tileSize.width = tileset.imageSize.width;
                  tileset._tileSize.height = tileset.imageSize.height;
                  tileset.sourceImage = this._spriteFrameMap[imageName];

                  if (!tileset.sourceImage) {
                    var _nameWithPostfix = TMXMapInfo.getNameWithPostfix(imageName);

                    tileset.imageName = _nameWithPostfix;
                    tileset.sourceImage = this._spriteFrameMap[_nameWithPostfix];

                    if (!tileset.sourceImage) {
                      var _shortName = TMXMapInfo.getShortName(imageName);

                      tileset.imageName = _shortName;
                      tileset.sourceImage = this._spriteFrameMap[_shortName];

                      if (!tileset.sourceImage) {
                        errorID(7221, imageName);
                        console.warn("Please try asset type of " + imageName + " to 'sprite-frame'");
                      }
                    }
                  }

                  tileset.firstGid = this.parentGID & TileFlag.FLIPPED_MASK;
                }

                var pid = (TileFlag.FLIPPED_MASK & this.parentGID) >>> 0;

                this._tileProperties.set(pid, getPropertyList(tile));

                var animations = tile.getElementsByTagName('animation');

                if (animations && animations.length > 0) {
                  var animation = animations[0];
                  var framesData = animation.getElementsByTagName('frame');
                  var animationProp = {
                    frames: [],
                    dt: 0,
                    frameIdx: 0
                  };

                  this._tileAnimations.set(pid, animationProp);

                  var frames = animationProp.frames;

                  for (var frameIdx = 0; frameIdx < framesData.length; frameIdx++) {
                    var frame = framesData[frameIdx];
                    var tileid = fgid + (parseInt(frame.getAttribute('tileid')) || 0);
                    var duration = parseFloat(frame.getAttribute('duration')) || 0;
                    frames.push({
                      tileid: tileid,
                      duration: duration / 1000,
                      grid: null
                    });
                  }
                }
              }
            }
          }

          var childNodes = map.childNodes;

          for (i = 0; i < childNodes.length; i++) {
            var childNode = childNodes[i];

            if (this._shouldIgnoreNode(childNode)) {
              continue;
            }

            if (childNode.nodeName === 'imagelayer') {
              var imageLayer = this._parseImageLayer(childNode);

              if (imageLayer) {
                this.setImageLayers(imageLayer);
              }
            }

            if (childNode.nodeName === 'layer') {
              var layer = this._parseLayer(childNode);

              this.setLayers(layer);
            }

            if (childNode.nodeName === 'objectgroup') {
              var objectGroup = this._parseObjectGroup(childNode);

              this.setObjectGroups(objectGroup);
            }
          }

          return map;
        };

        _proto._shouldIgnoreNode = function _shouldIgnoreNode(node) {
          return node.nodeType === 3 || node.nodeType === 8 || node.nodeType === 4;
        };

        _proto._parseImageLayer = function _parseImageLayer(selLayer) {
          var datas = selLayer.getElementsByTagName('image');
          if (!datas || datas.length === 0) return null;
          var imageLayer = new TMXImageLayerInfo();
          imageLayer.name = selLayer.getAttribute('name');
          imageLayer.offset.x = parseFloat(selLayer.getAttribute('offsetx')) || 0;
          imageLayer.offset.y = parseFloat(selLayer.getAttribute('offsety')) || 0;
          var visible = selLayer.getAttribute('visible');
          imageLayer.visible = !(visible === '0');
          var opacity = selLayer.getAttribute('opacity');
          imageLayer.opacity = opacity ? Math.round(255 * parseFloat(opacity)) : 255;
          var tintColor = selLayer.getAttribute('tintcolor');
          imageLayer.tintColor = tintColor ? strToColor(tintColor) : null;
          var data = datas[0];
          var source = data.getAttribute('source');
          imageLayer.sourceImage = this._imageLayerSPF[source];
          imageLayer.width = parseInt(data.getAttribute('width')) || 0;
          imageLayer.height = parseInt(data.getAttribute('height')) || 0;
          imageLayer.trans = strToColor(data.getAttribute('trans'));

          if (!imageLayer.sourceImage) {
            errorID(7221, source);
            console.warn("Please try asset type of " + source + " to 'sprite-frame'");
            return null;
          }

          return imageLayer;
        };

        _proto._parseLayer = function _parseLayer(selLayer) {
          var data = selLayer.getElementsByTagName('data')[0];
          var layer = new TMXLayerInfo();
          layer.name = selLayer.getAttribute('name');
          var layerSize = new Size(0, 0);
          layerSize.width = parseFloat(selLayer.getAttribute('width'));
          layerSize.height = parseFloat(selLayer.getAttribute('height'));
          layer.layerSize = layerSize;
          var visible = selLayer.getAttribute('visible');
          layer.visible = !(visible === '0');
          var opacity = selLayer.getAttribute('opacity');
          if (opacity) layer.opacity = Math.round(255 * parseFloat(opacity));else layer.opacity = 255;
          layer.offset = new Vec2(parseFloat(selLayer.getAttribute('offsetx')) || 0, parseFloat(selLayer.getAttribute('offsety')) || 0);
          var tintColor = selLayer.getAttribute('tintcolor');
          layer.tintColor = tintColor ? strToColor(tintColor) : null;
          var nodeValue = '';

          for (var j = 0; j < data.childNodes.length; j++) {
            nodeValue += data.childNodes[j].nodeValue;
          }

          nodeValue = nodeValue.trim();
          var compression = data.getAttribute('compression');
          var encoding = data.getAttribute('encoding');

          if (compression && compression !== 'gzip' && compression !== 'zlib') {
            logID(7218);
            return null;
          }

          var tiles;

          switch (compression) {
            case 'gzip':
              tiles = codec.unzipBase64AsArray(nodeValue, 4);
              break;

            case 'zlib':
              {
                var inflator = new _p.Inflate(codec.Base64.decodeAsArray(nodeValue, 1));
                tiles = uint8ArrayToUint32Array(inflator.decompress());
                break;
              }

            case null:
            case '':
              if (encoding === 'base64') tiles = codec.Base64.decodeAsArray(nodeValue, 4);else if (encoding === 'csv') {
                tiles = [];
                var csvTiles = nodeValue.split(',');

                for (var csvIdx = 0; csvIdx < csvTiles.length; csvIdx++) {
                  tiles.push(parseInt(csvTiles[csvIdx]));
                }
              } else {
                var selDataTiles = data.getElementsByTagName('tile');
                tiles = [];

                for (var xmlIdx = 0; xmlIdx < selDataTiles.length; xmlIdx++) {
                  tiles.push(parseInt(selDataTiles[xmlIdx].getAttribute('gid')));
                }
              }
              break;

            default:
              if (this.layerAttrs === TMXLayerInfo.ATTRIB_NONE) logID(7219);
              break;
          }

          if (tiles) {
            layer.tiles = new Uint32Array(tiles);
          }

          layer.properties = getPropertyList(selLayer);
          return layer;
        };

        _proto._parseObjectGroup = function _parseObjectGroup(selGroup) {
          var objectGroup = new TMXObjectGroupInfo();
          objectGroup.name = selGroup.getAttribute('name') || '';
          objectGroup.offset = new Vec2(parseFloat(selGroup.getAttribute('offsetx')), parseFloat(selGroup.getAttribute('offsety')));
          var opacity = selGroup.getAttribute('opacity');
          if (opacity) objectGroup.opacity = Math.round(255 * parseFloat(opacity));else objectGroup.opacity = 255;
          var tintColor = selGroup.getAttribute('tintcolor');
          objectGroup.tintColor = tintColor ? strToColor(tintColor) : null;
          var visible = selGroup.getAttribute('visible');
          if (visible && parseInt(visible) === 0) objectGroup.visible = false;
          var color = selGroup.getAttribute('color');
          if (color) objectGroup.color.fromHEX(color);
          var draworder = selGroup.getAttribute('draworder');
          if (draworder) objectGroup.draworder = draworder;
          objectGroup.setProperties(getPropertyList(selGroup));
          var objects = selGroup.getElementsByTagName('object');

          if (objects) {
            for (var j = 0; j < objects.length; j++) {
              var selObj = objects[j];
              var objectProp = {};
              objectProp.id = selObj.getAttribute('id') || j;
              objectProp.name = selObj.getAttribute('name') || '';
              objectProp.width = parseFloat(selObj.getAttribute('width')) || 0;
              objectProp.height = parseFloat(selObj.getAttribute('height')) || 0;
              objectProp.x = parseFloat(selObj.getAttribute('x')) || 0;
              objectProp.y = parseFloat(selObj.getAttribute('y')) || 0;
              objectProp.rotation = parseFloat(selObj.getAttribute('rotation')) || 0;
              getPropertyList(selObj, objectProp);
              var visibleAttr = selObj.getAttribute('visible');
              objectProp.visible = !(visibleAttr && parseInt(visibleAttr) === 0);
              var texts = selObj.getElementsByTagName('text');

              if (texts && texts.length > 0) {
                var text = texts[0];
                objectProp.type = TMXObjectType.TEXT;
                objectProp.wrap = text.getAttribute('wrap') === '1';
                objectProp.color = strToColor(text.getAttribute('color'));
                objectProp.halign = strToHAlign(text.getAttribute('halign'));
                objectProp.valign = strToVAlign(text.getAttribute('valign'));
                objectProp.pixelsize = parseInt(text.getAttribute('pixelsize')) || 16;
                objectProp.text = text.childNodes[0].nodeValue;
              }

              var gid = selObj.getAttribute('gid');

              if (gid) {
                objectProp.gid = parseInt(gid);
                objectProp.type = TMXObjectType.IMAGE;
              }

              var ellipse = selObj.getElementsByTagName('ellipse');

              if (ellipse && ellipse.length > 0) {
                objectProp.type = TMXObjectType.ELLIPSE;
              }

              var polygonProps = selObj.getElementsByTagName('polygon');

              if (polygonProps && polygonProps.length > 0) {
                objectProp.type = TMXObjectType.POLYGON;
                var selPgPointStr = polygonProps[0].getAttribute('points');
                if (selPgPointStr) objectProp.points = this._parsePointsString(selPgPointStr);
              }

              var polylineProps = selObj.getElementsByTagName('polyline');

              if (polylineProps && polylineProps.length > 0) {
                objectProp.type = TMXObjectType.POLYLINE;
                var selPlPointStr = polylineProps[0].getAttribute('points');
                if (selPlPointStr) objectProp.polylinePoints = this._parsePointsString(selPlPointStr);
              }

              if (!objectProp.type) {
                objectProp.type = TMXObjectType.RECT;
              }

              objectGroup.objects.push(objectProp);
            }

            if (draworder !== 'index') {
              objectGroup.objects.sort(function (a, b) {
                return a.y - b.y;
              });
            }
          }

          return objectGroup;
        };

        _proto._parsePointsString = function _parsePointsString(pointsString) {
          if (!pointsString) return null;
          var points = [];
          var pointsStr = pointsString.split(' ');

          for (var i = 0; i < pointsStr.length; i++) {
            var selPointStr = pointsStr[i].split(',');
            points.push({
              x: parseFloat(selPointStr[0]),
              y: parseFloat(selPointStr[1])
            });
          }

          return points;
        };

        _proto.setTileAnimations = function setTileAnimations(animations) {
          this._tileAnimations = animations;
        };

        _proto.getTileAnimations = function getTileAnimations() {
          return this._tileAnimations;
        };

        _proto.getTileProperties = function getTileProperties() {
          return this._tileProperties;
        };

        _proto.setTileProperties = function setTileProperties(tileProperties) {
          this._tileProperties = tileProperties;
        };

        _proto.getCurrentString = function getCurrentString() {
          return this.currentString;
        };

        _proto.setCurrentString = function setCurrentString(currentString) {
          this.currentString = currentString;
        };

        TMXMapInfo.getNameWithPostfix = function getNameWithPostfix(name) {
          name = name.replace(/\\/g, '/');
          var slashIndex = name.lastIndexOf('/') + 1;
          var strLen = name.length;
          return name.substring(slashIndex, strLen);
        };

        TMXMapInfo.getShortName = function getShortName(name) {
          name = name.replace(/\\/g, '/');
          var slashIndex = name.lastIndexOf('/') + 1;
          var dotIndex = name.lastIndexOf('.');
          dotIndex = dotIndex < 0 ? name.length : dotIndex;
          return name.substring(slashIndex, dotIndex);
        };

        _createClass(TMXMapInfo, [{
          key: "mapSize",
          get: function get() {
            return this._mapSize;
          }
        }, {
          key: "tileSize",
          get: function get() {
            return this._tileSize;
          }
        }, {
          key: "mapWidth",
          get: function get() {
            return this._mapSize.width;
          },
          set: function set(width) {
            this._mapSize.width = width;
          }
        }, {
          key: "mapHeight",
          get: function get() {
            return this._mapSize.height;
          },
          set: function set(height) {
            this._mapSize.height = height;
          }
        }, {
          key: "tileWidth",
          get: function get() {
            return this._tileSize.width;
          },
          set: function set(width) {
            this._tileSize.width = width;
          }
        }, {
          key: "tileHeight",
          get: function get() {
            return this._tileSize.height;
          },
          set: function set(height) {
            this._tileSize.height = height;
          }
        }]);

        return TMXMapInfo;
      }();

      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _temp;
      var TiledTile = exports('TiledTile', (_dec = ccclass('cc.TiledTile'), _dec2 = help('i18n:cc.TiledTile'), _dec3 = menu('TiledMap/TiledTile'), _dec4 = requireComponent(UITransform), _dec5 = type(CCInteger), _dec6 = type(CCInteger), _dec7 = type(CCInteger), _dec8 = type(CCInteger), _dec9 = type(CCInteger), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = executeInEditMode(_class = (_class2 = (_temp = function (_Component) {
        _inheritsLoose(TiledTile, _Component);

        function TiledTile() {
          var _this;

          _this = _Component.call(this) || this;
          _this._layer = null;

          _initializerDefineProperty(_this, "_x", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_y", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TiledTile.prototype;

        _proto.onEnable = function onEnable() {
          var parent = this.node.parent;
          this._layer = parent.getComponent('cc.TiledLayer');

          this._resetTile();

          this.updateInfo();
        };

        _proto.onDisable = function onDisable() {
          this._resetTile();
        };

        _proto._resetTile = function _resetTile() {
          if (this._layer && this._layer.getTiledTileAt(this._x, this._y) === this) {
            this._layer.setTiledTileAt(this._x, this._y, null);
          }
        };

        _proto.updateInfo = function updateInfo() {
          if (!this._layer) return;
          var x = this._x;
          var y = this._y;

          if (this._layer.getTiledTileAt(x, y)) {
            warn('There is already a TiledTile at [%s, %s]', x, y);
            return;
          }

          var p = this._layer.getPositionAt(x, y);

          this.node.setPosition(p.x, p.y);

          this._layer.setTiledTileAt(x, y, this);
        };

        _createClass(TiledTile, [{
          key: "x",
          get: function get() {
            return this._x;
          },
          set: function set(value) {
            if (value === this._x) return;

            if (this._layer && this._layer.isInvalidPosition(value, this._y)) {
              warn("Invalid x, the valid value is between [%s] ~ [%s]", 0, this._layer.layerSize.width);
              return;
            }

            this._resetTile();

            this._x = value;
            this.updateInfo();
          }
        }, {
          key: "y",
          get: function get() {
            return this._y;
          },
          set: function set(value) {
            if (value === this._y) return;

            if (this._layer && this._layer.isInvalidPosition(this._x, value)) {
              warn("Invalid y, the valid value is between [%s] ~ [%s]", 0, this._layer.layerSize.height);
              return;
            }

            this._resetTile();

            this._y = value;
            this.updateInfo();
          }
        }, {
          key: "grid",
          get: function get() {
            if (this._layer) {
              return this._layer.getTileGIDAt(this._x, this._y);
            }

            return 0;
          },
          set: function set(value) {
            if (this._layer) {
              this._layer.setTileGIDAt(value, this._x, this._y);
            }
          }
        }]);

        return TiledTile;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_x", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_y", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "x", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "x"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "y", [_dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "y"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "grid", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "grid"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class) || _class));

      function fillTextureGrids(tileset, texGrids, spFrame) {
        var spf = spFrame || tileset.sourceImage;
        var tex = spf.texture;
        var collection = tileset.collection;

        if (!tileset.imageSize.width || !tileset.imageSize.height) {
          var sourceImage = tileset.sourceImage;
          tileset.imageSize.width = sourceImage.width;
          tileset.imageSize.height = sourceImage.height;
        }

        var imageWidth = tileset.imageSize.width;
        var imageHeight = tileset.imageSize.height;
        var tw = tileset._tileSize.width;
        var th = tileset._tileSize.height;
        var texWidth = spf.width;
        var texHeight = spf.height;
        var spacing = tileset.spacing;
        var margin = tileset.margin;
        var count = 1;

        if (!collection) {
          var cols = Math.floor((imageWidth - margin * 2 + spacing) / (tw + spacing));
          var rows = Math.floor((imageHeight - margin * 2 + spacing) / (th + spacing));
          count = Math.max(1, rows * cols);
        }

        var firstGid = tileset.firstGid;
        var grid = null;
        var override = !!texGrids.get(firstGid);
        var maxGid = tileset.firstGid + count;
        var gid = firstGid;

        for (; gid < maxGid; ++gid) {
          if (override && !texGrids.get(gid)) {
            override = false;
          }

          if (!override && texGrids.get(gid)) {
            break;
          }

          grid = {
            tileset: tileset,
            x: 0,
            y: 0,
            width: tw,
            height: th,
            t: 0,
            l: 0,
            r: 0,
            b: 0,
            cx: 0,
            cy: 0,
            offsetX: 0,
            offsetY: 0,
            rotated: false,
            gid: gid,
            spriteFrame: spf,
            texture: tex
          };
          tileset.rectForGID(gid, grid);

          if (!spFrame || count > 1) {
            if (spFrame) {
              grid._name = spFrame.name;
              var lm = spFrame.unbiasUV[0];
              var bm = spFrame.rotated ? spFrame.unbiasUV[1] : spFrame.unbiasUV[5];
              grid.l = lm + (grid.x + 0.5) / texWidth;
              grid.t = bm + (grid.y + 0.5) / texHeight;
              grid.r = lm + (grid.x + grid.width - 0.5) / texWidth;
              grid.b = bm + (grid.y + grid.height - 0.5) / texHeight;
              grid._rect = new Rect(grid.x, grid.y, grid.width, grid.height);
            } else {
              grid.l = grid.x / texWidth;
              grid.t = grid.y / texHeight;
              grid.r = (grid.x + grid.width) / texWidth;
              grid.b = (grid.y + grid.height) / texHeight;
              grid._rect = new Rect(grid.x, grid.y, grid.width, grid.height);
            }
          } else if (spFrame.rotated) {
            grid._rotated = true;
            grid._name = spFrame.name;
            grid._rect = spFrame.getRect();
            grid.l = spFrame.unbiasUV[0];
            grid.t = spFrame.unbiasUV[1];
            grid.r = spFrame.unbiasUV[4];
            grid.b = spFrame.unbiasUV[3];
          } else {
            grid._name = spFrame.name;
            grid._rect = spFrame.getRect();
            grid.l = spFrame.unbiasUV[0];
            grid.t = spFrame.unbiasUV[5];
            grid.r = spFrame.unbiasUV[2];
            grid.b = spFrame.unbiasUV[1];
          }

          grid.cx = (grid.l + grid.r) / 2;
          grid.cy = (grid.t + grid.b) / 2;
          texGrids.set(gid, grid);
        }
      }
      function loadAllTextures(textures, loadedCallback) {
        var totalNum = textures.length;

        if (totalNum === 0) {
          loadedCallback();
          return;
        }

        var curNum = 0;

        var itemCallback = function itemCallback() {
          curNum++;

          if (curNum >= totalNum) {
            loadedCallback();
          }
        };

        for (var i = 0; i < totalNum; i++) {
          var tex = textures[i];

          if (!tex.loaded) {
            tex.once('load', function () {
              itemCallback();
            });
          } else {
            itemCallback();
          }
        }
      }

      var _dec$1, _class$1, _temp$1, _dec2$1, _class3, _temp2;

      var _mat4_temp = new Mat4();

      var _vec2_temp = new Vec2();

      var _vec3_temp = new Vec3();

      var _vec3_temp2 = new Vec3();

      var _tempRowCol = {
        row: 0,
        col: 0
      };
      var TiledUserNodeData = exports('TiledUserNodeData', (_dec$1 = ccclass('cc.TiledUserNodeData'), _dec$1(_class$1 = (_temp$1 = function (_Component) {
        _inheritsLoose(TiledUserNodeData, _Component);

        function TiledUserNodeData() {
          var _this;

          _this = _Component.call(this) || this;
          _this._index = -1;
          _this._row = -1;
          _this._col = -1;
          _this._tiledLayer = null;
          return _this;
        }

        return TiledUserNodeData;
      }(Component), _temp$1)) || _class$1));
      var TiledLayer = exports('TiledLayer', (_dec2$1 = ccclass('cc.TiledLayer'), _dec2$1(_class3 = (_temp2 = function (_Renderable2D) {
        _inheritsLoose(TiledLayer, _Renderable2D);

        function TiledLayer() {
          var _this2;

          _this2 = _Renderable2D.call(this) || this;
          _this2._userNodeGrid = {};
          _this2._userNodeMap = {};
          _this2._userNodeDirty = false;
          _this2.tiledTiles = [];
          _this2._viewPort = {
            x: -1,
            y: -1,
            width: -1,
            height: -1
          };
          _this2._cullingRect = {
            leftDown: {
              row: -1,
              col: -1
            },
            rightTop: {
              row: -1,
              col: -1
            }
          };
          _this2._cullingDirty = true;
          _this2._rightTop = {
            row: -1,
            col: -1
          };
          _this2._layerInfo = null;
          _this2._mapInfo = null;
          _this2._topOffset = 0;
          _this2._downOffset = 0;
          _this2._leftOffset = 0;
          _this2._rightOffset = 0;
          _this2.tiles = [];
          _this2.vertices = [];
          _this2._verticesDirty = true;
          _this2._layerName = '';
          _this2._layerSize = void 0;
          _this2._minGID = void 0;
          _this2._maxGID = void 0;
          _this2._layerOrientation = null;
          _this2._opacity = void 0;
          _this2._tintColor = void 0;
          _this2.texGrids = null;
          _this2._textures = [];
          _this2._tilesets = [];
          _this2._leftDownToCenterX = 0;
          _this2._leftDownToCenterY = 0;
          _this2._hasTiledNodeGrid = false;
          _this2._hasAniGrid = false;
          _this2._animations = null;
          _this2._enableCulling = void 0;
          _this2.colorChanged = false;
          _this2._properties = void 0;
          _this2.renderOrder = void 0;
          _this2._staggerAxis = void 0;
          _this2._staggerIndex = void 0;
          _this2._hexSideLength = void 0;
          _this2._mapTileSize = void 0;
          _this2._odd_even = void 0;
          _this2._diffX1 = void 0;
          _this2._diffY1 = void 0;
          _this2._useAutomaticVertexZ = void 0;
          _this2._vertexZvalue = void 0;
          _this2._offset = void 0;
          _this2._meshRenderDataArray = null;
          _this2._meshRenderDataArrayIdx = 0;
          return _this2;
        }

        var _proto = TiledLayer.prototype;

        _proto.hasTiledNode = function hasTiledNode() {
          return this._hasTiledNodeGrid;
        };

        _proto.hasAnimation = function hasAnimation() {
          return this._hasAniGrid;
        };

        _proto.addUserNode = function addUserNode(node) {
          var dataComp = node.getComponent(TiledUserNodeData);

          if (dataComp) {
            warn('CCTiledLayer:addUserNode node has been added');
            return false;
          }

          dataComp = node.addComponent(TiledUserNodeData);
          node.parent = this.node;
          this._userNodeMap[node.uuid] = dataComp;
          dataComp._row = -1;
          dataComp._col = -1;
          dataComp._tiledLayer = this;

          this._nodeLocalPosToLayerPos(node.getPosition(), _vec2_temp);

          this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

          this._addUserNodeToGrid(dataComp, _tempRowCol);

          this._updateCullingOffsetByUserNode(node);

          node.on(SystemEventType.TRANSFORM_CHANGED, this._userNodePosChange, dataComp);
          node.on(SystemEventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);
          return true;
        };

        _proto.removeUserNode = function removeUserNode(node) {
          var dataComp = node.getComponent(TiledUserNodeData);

          if (!dataComp) {
            warn('CCTiledLayer:removeUserNode node is not exist');
            return false;
          }

          node.off(SystemEventType.TRANSFORM_CHANGED, this._userNodePosChange, dataComp);
          node.off(SystemEventType.SIZE_CHANGED, this._userNodeSizeChange, dataComp);

          this._removeUserNodeFromGrid(dataComp);

          delete this._userNodeMap[node.uuid];

          node._removeComponent(dataComp);

          dataComp.destroy();
          node.removeFromParent();
          return true;
        };

        _proto.destroyUserNode = function destroyUserNode(node) {
          this.removeUserNode(node);
          node.destroy();
        };

        _proto._nodeLocalPosToLayerPos = function _nodeLocalPosToLayerPos(nodePos, out) {
          out.x = nodePos.x + this._leftDownToCenterX;
          out.y = nodePos.y + this._leftDownToCenterY;
        };

        _proto.getNodesByRowCol = function getNodesByRowCol(row, col) {
          var rowData = this._userNodeGrid[row];
          if (!rowData) return null;
          return rowData[col];
        };

        _proto.getNodesCountByRow = function getNodesCountByRow(row) {
          var rowData = this._userNodeGrid[row];
          if (!rowData) return 0;
          return rowData.count;
        };

        _proto._updateAllUserNode = function _updateAllUserNode() {
          this._userNodeGrid = {};

          for (var dataId in this._userNodeMap) {
            var dataComp = this._userNodeMap[dataId];

            this._nodeLocalPosToLayerPos(dataComp.node.getPosition(), _vec2_temp);

            this._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

            this._addUserNodeToGrid(dataComp, _tempRowCol);

            this._updateCullingOffsetByUserNode(dataComp.node);
          }
        };

        _proto._updateCullingOffsetByUserNode = function _updateCullingOffsetByUserNode(node_) {
          var node = node_._uiProps.uiTransformComp.contentSize;

          if (this._topOffset < node.height) {
            this._topOffset = node.height;
          }

          if (this._downOffset < node.height) {
            this._downOffset = node.height;
          }

          if (this._leftOffset < node.width) {
            this._leftOffset = node.width;
          }

          if (this._rightOffset < node.width) {
            this._rightOffset = node.width;
          }
        };

        _proto._userNodeSizeChange = function _userNodeSizeChange() {
          var dataComp = this;
          var node = dataComp.node;
          var self = dataComp._tiledLayer;

          self._updateCullingOffsetByUserNode(node);

          self._userNodeDirty = true;
          self.markForUpdateRenderData();
        };

        _proto._userNodePosChange = function _userNodePosChange() {
          var dataComp = this;
          var node = dataComp.node;
          var self = dataComp._tiledLayer;

          self._nodeLocalPosToLayerPos(node.getPosition(), _vec2_temp);

          self._positionToRowCol(_vec2_temp.x, _vec2_temp.y, _tempRowCol);

          self._limitInLayer(_tempRowCol);

          if (_tempRowCol.row === dataComp._row && _tempRowCol.col === dataComp._col) return;

          self._removeUserNodeFromGrid(dataComp);

          self._addUserNodeToGrid(dataComp, _tempRowCol);
        };

        _proto._removeUserNodeFromGrid = function _removeUserNodeFromGrid(dataComp) {
          var row = dataComp._row;
          var col = dataComp._col;
          var index = dataComp._index;
          var rowData = this._userNodeGrid[row];
          var colData = rowData && rowData[col];

          if (colData) {
            rowData.count--;
            colData.count--;
            colData.list[index] = null;

            if (colData.count <= 0) {
              colData.list.length = 0;
              colData.count = 0;
            }
          }

          dataComp._row = -1;
          dataComp._col = -1;
          dataComp._index = -1;
          this._userNodeDirty = true;
          this.markForUpdateRenderData();
        };

        _proto._limitInLayer = function _limitInLayer(rowCol) {
          var row = rowCol.row;
          var col = rowCol.col;
          if (row < 0) rowCol.row = 0;
          if (row > this._rightTop.row) rowCol.row = this._rightTop.row;
          if (col < 0) rowCol.col = 0;
          if (col > this._rightTop.col) rowCol.col = this._rightTop.col;
        };

        _proto._addUserNodeToGrid = function _addUserNodeToGrid(dataComp, tempRowCol) {
          var row = tempRowCol.row;
          var col = tempRowCol.col;
          var rowData = this._userNodeGrid[row] = this._userNodeGrid[row] || {
            count: 0
          };
          var colData = rowData[col] = rowData[col] || {
            count: 0,
            list: []
          };
          dataComp._row = row;
          dataComp._col = col;
          dataComp._index = colData.list.length;
          rowData.count++;
          colData.count++;
          colData.list.push(dataComp);
          this._userNodeDirty = true;
        };

        _proto.isUserNodeDirty = function isUserNodeDirty() {
          return this._userNodeDirty;
        };

        _proto.setUserNodeDirty = function setUserNodeDirty(value) {
          this._userNodeDirty = value;
        };

        _proto.onEnable = function onEnable() {
          _Renderable2D.prototype.onEnable.call(this);

          this.node.on(SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
          this.node.on(SystemEventType.TRANSFORM_CHANGED, this.updateCulling, this);
          this.node.on(SystemEventType.SIZE_CHANGED, this.updateCulling, this);
          this.node.parent.on(SystemEventType.TRANSFORM_CHANGED, this.updateCulling, this);
          this.node.parent.on(SystemEventType.SIZE_CHANGED, this.updateCulling, this);
          this.markForUpdateRenderData();
          this.scheduleOnce(this.updateCulling.bind(this));
        };

        _proto.onDisable = function onDisable() {
          _Renderable2D.prototype.onDisable.call(this);

          this.node.parent.off(SystemEventType.SIZE_CHANGED, this.updateCulling, this);
          this.node.parent.off(SystemEventType.TRANSFORM_CHANGED, this.updateCulling, this);
          this.node.off(SystemEventType.SIZE_CHANGED, this.updateCulling, this);
          this.node.off(SystemEventType.TRANSFORM_CHANGED, this.updateCulling, this);
          this.node.off(SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
        };

        _proto._syncAnchorPoint = function _syncAnchorPoint() {
          var node = this.node;
          var trans = node._uiProps.uiTransformComp;
          var scale = node.getScale();
          this._leftDownToCenterX = trans.width * trans.anchorX * scale.x;
          this._leftDownToCenterY = trans.height * trans.anchorY * scale.y;
          this._cullingDirty = true;
          this.markForUpdateRenderData();
        };

        _proto.onDestroy = function onDestroy() {
          _Renderable2D.prototype.onDestroy.call(this);
        };

        _proto.getLayerName = function getLayerName() {
          return this._layerName;
        };

        _proto.setLayerName = function setLayerName(layerName) {
          this._layerName = layerName;
        };

        _proto.getProperty = function getProperty(propertyName) {
          return this._properties[propertyName];
        };

        _proto.getPositionAt = function getPositionAt(pos, y) {
          var x;

          if (y !== undefined) {
            x = Math.floor(pos);
            y = Math.floor(y);
          } else {
            x = Math.floor(pos.x);
            y = Math.floor(pos.y);
          }

          switch (this._layerOrientation) {
            case Orientation.ORTHO:
              return this._positionForOrthoAt(x, y);

            case Orientation.ISO:
              return this._positionForIsoAt(x, y);

            case Orientation.HEX:
              return this._positionForHexAt(x, y);
          }

          return null;
        };

        _proto.isInvalidPosition = function isInvalidPosition(x, y) {
          return x >= this._layerSize.width || y >= this._layerSize.height || x < 0 || y < 0;
        };

        _proto._positionForIsoAt = function _positionForIsoAt(x, y) {
          var offsetX = 0;
          var offsetY = 0;

          var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          var gidAndFlags = this.tiles[index];

          if (gidAndFlags) {
            var gid = (gidAndFlags & TileFlag.FLIPPED_MASK) >>> 0;
            var tileset = this.texGrids.get(gid).tileset;
            var offset = tileset.tileOffset;
            offsetX = offset.x;
            offsetY = offset.y;
          }

          return new Vec2(this._mapTileSize.width * 0.5 * (this._layerSize.height + x - y - 1) + offsetX, this._mapTileSize.height * 0.5 * (this._layerSize.width - x + this._layerSize.height - y - 2) - offsetY);
        };

        _proto._positionForOrthoAt = function _positionForOrthoAt(x, y) {
          var offsetX = 0;
          var offsetY = 0;

          var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          var gidAndFlags = this.tiles[index];

          if (gidAndFlags) {
            var gid = (gidAndFlags & TileFlag.FLIPPED_MASK) >>> 0;
            var tileset = this.texGrids.get(gid).tileset;
            var offset = tileset.tileOffset;
            offsetX = offset.x;
            offsetY = offset.y;
          }

          return new Vec2(x * this._mapTileSize.width + offsetX, (this._layerSize.height - y - 1) * this._mapTileSize.height - offsetY);
        };

        _proto._positionForHexAt = function _positionForHexAt(col, row) {
          var tileWidth = this._mapTileSize.width;
          var tileHeight = this._mapTileSize.height;
          var rows = this._layerSize.height;

          var index = Math.floor(col) + Math.floor(row) * this._layerSize.width;

          var gid = (this.tiles[index] & TileFlag.FLIPPED_MASK) >>> 0;
          var offset;

          if (this.texGrids.get(gid)) {
            offset = this.texGrids.get(gid).tileset.tileOffset;
          } else {
            offset = {
              x: 0,
              y: 0
            };
          }

          var odd_even = this._staggerIndex === StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;
          var x = 0;
          var y = 0;
          var diffX = 0;
          var diffY = 0;

          switch (this._staggerAxis) {
            case StaggerAxis.STAGGERAXIS_Y:
              diffX = 0;

              if (row % 2 === 1) {
                diffX = tileWidth / 2 * odd_even;
              }

              x = col * tileWidth + diffX + offset.x;
              y = (rows - row - 1) * (tileHeight - (tileHeight - this._hexSideLength) / 2) - offset.y;
              break;

            case StaggerAxis.STAGGERAXIS_X:
              diffY = 0;

              if (col % 2 === 1) {
                diffY = tileHeight / 2 * -odd_even;
              }

              x = col * (tileWidth - (tileWidth - this._hexSideLength) / 2) + offset.x;
              y = (rows - row - 1) * tileHeight + diffY - offset.y;
              break;
          }

          return new Vec2(x, y);
        };

        _proto.setTilesGIDAt = function setTilesGIDAt(gids, beginCol, beginRow, totalCols) {
          if (!gids || gids.length === 0 || totalCols <= 0) return;
          if (beginRow < 0) beginRow = 0;
          if (beginCol < 0) beginCol = 0;
          var gidsIdx = 0;
          var endCol = beginCol + totalCols;

          for (var row = beginRow;; row++) {
            for (var col = beginCol; col < endCol; col++) {
              if (gidsIdx >= gids.length) return;

              this._updateTileForGID(gids[gidsIdx], col, row);

              gidsIdx++;
            }
          }
        };

        _proto.setTileGIDAt = function setTileGIDAt(gid, x, y, flags) {
          var ugid = (gid & TileFlag.FLIPPED_MASK) >>> 0;
          x = Math.floor(x);
          y = Math.floor(y);

          if (this.isInvalidPosition(x, y)) {
            throw new Error('cc.TiledLayer.setTileGIDAt(): invalid position');
          }

          if (!this.tiles || !this._tilesets || this._tilesets.length === 0) {
            logID(7238);
            return;
          }

          if (ugid !== 0 && ugid < this._tilesets[0].firstGid) {
            logID(7239, gid);
            return;
          }

          flags = flags || 0;

          this._updateTileForGID((ugid | flags) >>> 0, x, y);
        };

        _proto._updateTileForGID = function _updateTileForGID(gidAndFlags, x, y) {
          var idx = 0 | x + y * this._layerSize.width;
          if (idx >= this.tiles.length) return;
          var oldGIDAndFlags = this.tiles[idx];
          if (gidAndFlags === oldGIDAndFlags) return;
          var gid = (gidAndFlags & TileFlag.FLIPPED_MASK) >>> 0;
          var grid = this.texGrids.get(gid);

          if (grid) {
            this.tiles[idx] = gidAndFlags;

            this._updateVertex(x, y);
          } else {
            this.tiles[idx] = 0;
          }

          this._cullingDirty = true;
        };

        _proto.getTileGIDAt = function getTileGIDAt(x, y) {
          if (this.isInvalidPosition(x, y)) {
            throw new Error('cc.TiledLayer.getTileGIDAt(): invalid position');
          }

          if (!this.tiles) {
            logID(7237);
            return null;
          }

          var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          var tile = this.tiles[index];
          return (tile & TileFlag.FLIPPED_MASK) >>> 0;
        };

        _proto.getTileFlagsAt = function getTileFlagsAt(x, y) {
          if (this.isInvalidPosition(x, y)) {
            throw new Error('TiledLayer.getTileFlagsAt: invalid position');
          }

          if (!this.tiles) {
            logID(7240);
            return null;
          }

          var idx = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          var tile = this.tiles[idx];
          return (tile & TileFlag.FLIPPED_ALL) >>> 0;
        };

        _proto.setCullingDirty = function setCullingDirty(value) {
          this._cullingDirty = value;
        };

        _proto.isCullingDirty = function isCullingDirty() {
          return this._cullingDirty;
        };

        _proto.updateViewPort = function updateViewPort(x, y, width, height) {
          if (this._viewPort.width === width && this._viewPort.height === height && this._viewPort.x === x && this._viewPort.y === y) {
            return;
          }

          this._viewPort.x = x;
          this._viewPort.y = y;
          this._viewPort.width = width;
          this._viewPort.height = height;
          var reserveLine = 1;

          if (this._layerOrientation === Orientation.ISO) {
            reserveLine = 2;
          }

          var vpx = this._viewPort.x - this._offset.x + this._leftDownToCenterX;
          var vpy = this._viewPort.y - this._offset.y + this._leftDownToCenterY;
          var leftDownX = vpx - this._leftOffset;
          var leftDownY = vpy - this._downOffset;
          var rightTopX = vpx + width + this._rightOffset;
          var rightTopY = vpy + height + this._topOffset;
          var leftDown = this._cullingRect.leftDown;
          var rightTop = this._cullingRect.rightTop;
          if (leftDownX < 0) leftDownX = 0;
          if (leftDownY < 0) leftDownY = 0;

          this._positionToRowCol(leftDownX, leftDownY, _tempRowCol);

          _tempRowCol.row -= reserveLine;
          _tempRowCol.col -= reserveLine;
          _tempRowCol.row = _tempRowCol.row > 0 ? _tempRowCol.row : 0;
          _tempRowCol.col = _tempRowCol.col > 0 ? _tempRowCol.col : 0;

          if (_tempRowCol.row !== leftDown.row || _tempRowCol.col !== leftDown.col) {
            leftDown.row = _tempRowCol.row;
            leftDown.col = _tempRowCol.col;
            this._cullingDirty = true;
          }

          if (rightTopX < 0 || rightTopY < 0) {
            _tempRowCol.row = -1;
            _tempRowCol.col = -1;
          } else {
            this._positionToRowCol(rightTopX, rightTopY, _tempRowCol);

            _tempRowCol.row++;
            _tempRowCol.col++;
          }

          if (_tempRowCol.row > this._rightTop.row) _tempRowCol.row = this._rightTop.row;
          if (_tempRowCol.col > this._rightTop.col) _tempRowCol.col = this._rightTop.col;

          if (_tempRowCol.row !== rightTop.row || _tempRowCol.col !== rightTop.col) {
            rightTop.row = _tempRowCol.row;
            rightTop.col = _tempRowCol.col;
            this._cullingDirty = true;
            this.markForUpdateRenderData();
          }
        };

        _proto._positionToRowCol = function _positionToRowCol(x, y, result) {
          var maptw = this._mapTileSize.width;
          var mapth = this._mapTileSize.height;
          var maptw2 = maptw * 0.5;
          var mapth2 = mapth * 0.5;
          var row = 0;
          var col = 0;
          var diffX2 = 0;
          var diffY2 = 0;
          var axis = this._staggerAxis;

          switch (this._layerOrientation) {
            case Orientation.ORTHO:
              col = Math.floor(x / maptw);
              row = Math.floor(y / mapth);
              break;

            case Orientation.ISO:
              col = Math.floor(x / maptw2);
              row = Math.floor(y / mapth2);
              break;

            case Orientation.HEX:
              if (axis === StaggerAxis.STAGGERAXIS_Y) {
                row = Math.floor(y / (mapth - this._diffY1));
                diffX2 = row % 2 === 1 ? maptw2 * this._odd_even : 0;
                col = Math.floor((x - diffX2) / maptw);
              } else {
                col = Math.floor(x / (maptw - this._diffX1));
                diffY2 = col % 2 === 1 ? mapth2 * -this._odd_even : 0;
                row = Math.floor((y - diffY2) / mapth);
              }

              break;
          }

          result.row = row;
          result.col = col;
          return result;
        };

        _proto.updateCulling = function updateCulling() {
          if (this._enableCulling) {
            this.node.updateWorldTransform();
            Mat4.invert(_mat4_temp, this.node.getWorldMatrix());
            var camera = director.root.batcher2D.getFirstRenderCamera(this.node);

            if (camera) {
              _vec3_temp.x = 0;
              _vec3_temp.y = 0;
              _vec3_temp.z = 0;
              _vec3_temp2.x = camera.width;
              _vec3_temp2.y = camera.height;
              _vec3_temp2.z = 0;
              camera.screenToWorld(_vec3_temp, _vec3_temp);
              camera.screenToWorld(_vec3_temp2, _vec3_temp2);
              Vec3.transformMat4(_vec3_temp, _vec3_temp, _mat4_temp);
              Vec3.transformMat4(_vec3_temp2, _vec3_temp2, _mat4_temp);
              this.updateViewPort(_vec3_temp.x, _vec3_temp.y, _vec3_temp2.x - _vec3_temp.x, _vec3_temp2.y - _vec3_temp.y);
            }
          }
        };

        _proto.getLayerOrientation = function getLayerOrientation() {
          return this._layerOrientation;
        };

        _proto.getProperties = function getProperties() {
          return this._properties;
        };

        _proto._updateVertex = function _updateVertex(col, row) {
          var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
          var vertices = this.vertices;
          var layerOrientation = this._layerOrientation;
          var tiles = this.tiles;

          if (!tiles) {
            return;
          }

          var rightTop = this._rightTop;
          var maptw = this._mapTileSize.width;
          var mapth = this._mapTileSize.height;
          var maptw2 = maptw * 0.5;
          var mapth2 = mapth * 0.5;
          var rows = this._layerSize.height;
          var cols = this._layerSize.width;
          var grids = this.texGrids;
          var left = 0;
          var bottom = 0;
          var axis;
          var diffX1;
          var diffY1;
          var odd_even;
          var diffX2;
          var diffY2;

          if (layerOrientation === Orientation.HEX) {
            axis = this._staggerAxis;
            diffX1 = this._diffX1;
            diffY1 = this._diffY1;
            odd_even = this._odd_even;
          }

          var cullingCol = 0;
          var cullingRow = 0;
          var gridGID = 0;
          var topBorder = 0;
          var downBorder = 0;
          var leftBorder = 0;
          var rightBorder = 0;
          var index = row * cols + col;
          var gid = tiles[index];
          gridGID = (gid & FLIPPED_MASK) >>> 0;
          var grid = grids.get(gridGID);

          if (!grid) {
            return;
          }

          if (this._animations.get(gridGID)) {
            this._hasAniGrid = this._hasAniGrid || true;
          }

          switch (layerOrientation) {
            case Orientation.ORTHO:
              cullingCol = col;
              cullingRow = rows - row - 1;
              left = cullingCol * maptw;
              bottom = cullingRow * mapth;
              break;

            case Orientation.ISO:
              cullingCol = rows + col - row - 1;
              cullingRow = rows + cols - col - row - 2;
              left = maptw2 * cullingCol;
              bottom = mapth2 * cullingRow;
              break;

            case Orientation.HEX:
              diffX2 = axis === StaggerAxis.STAGGERAXIS_Y && row % 2 === 1 ? maptw2 * odd_even : 0;
              diffY2 = axis === StaggerAxis.STAGGERAXIS_X && col % 2 === 1 ? mapth2 * -odd_even : 0;
              left = col * (maptw - diffX1) + diffX2;
              bottom = (rows - row - 1) * (mapth - diffY1) + diffY2;
              cullingCol = col;
              cullingRow = rows - row - 1;
              break;
          }

          var rowData = vertices[cullingRow] = vertices[cullingRow] || {
            minCol: 0,
            maxCol: 0
          };
          var colData = rowData[cullingCol] = rowData[cullingCol] || {};

          if (rowData.minCol > cullingCol) {
            rowData.minCol = cullingCol;
          }

          if (rowData.maxCol < cullingCol) {
            rowData.maxCol = cullingCol;
          }

          if (rightTop.row < cullingRow) {
            rightTop.row = cullingRow;
          }

          if (rightTop.col < cullingCol) {
            rightTop.col = cullingCol;
          }

          var tileOffset = grid.tileset.tileOffset;
          left += this._offset.x + tileOffset.x + grid.offsetX;
          bottom += this._offset.y - tileOffset.y - grid.offsetY;
          topBorder = -tileOffset.y + grid.tileset._tileSize.height - mapth;
          topBorder = topBorder < 0 ? 0 : topBorder;
          downBorder = tileOffset.y < 0 ? 0 : tileOffset.y;
          leftBorder = -tileOffset.x < 0 ? 0 : -tileOffset.x;
          rightBorder = tileOffset.x + grid.tileset._tileSize.width - maptw;
          rightBorder = rightBorder < 0 ? 0 : rightBorder;

          if (this._rightOffset < leftBorder) {
            this._rightOffset = leftBorder;
          }

          if (this._leftOffset < rightBorder) {
            this._leftOffset = rightBorder;
          }

          if (this._topOffset < downBorder) {
            this._topOffset = downBorder;
          }

          if (this._downOffset < topBorder) {
            this._downOffset = topBorder;
          }

          colData.left = left;
          colData.bottom = bottom;
          colData.index = index;
          this._cullingDirty = true;
        };

        _proto._updateVertices = function _updateVertices() {
          var vertices = this.vertices;
          vertices.length = 0;
          var tiles = this.tiles;

          if (!tiles) {
            return;
          }

          var rightTop = this._rightTop;
          rightTop.row = -1;
          rightTop.col = -1;
          var rows = this._layerSize.height;
          var cols = this._layerSize.width;
          this._topOffset = 0;
          this._downOffset = 0;
          this._leftOffset = 0;
          this._rightOffset = 0;
          this._hasAniGrid = false;

          for (var row = 0; row < rows; ++row) {
            for (var col = 0; col < cols; ++col) {
              this._updateVertex(col, row);
            }
          }

          this._verticesDirty = false;
        };

        _proto.getTiledTileAt = function getTiledTileAt(x, y, forceCreate) {
          if (this.isInvalidPosition(x, y)) {
            throw new Error('TiledLayer.getTiledTileAt: invalid position');
          }

          if (!this.tiles) {
            logID(7236);
            return null;
          }

          var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          var tile = this.tiledTiles[index];

          if (!tile && forceCreate) {
            var node = new Node();
            tile = node.addComponent(TiledTile);
            tile._x = x;
            tile._y = y;
            tile._layer = this;
            tile.updateInfo();
            node.parent = this.node;
            return tile;
          }

          return tile;
        };

        _proto.setTiledTileAt = function setTiledTileAt(x, y, tiledTile) {
          if (this.isInvalidPosition(x, y)) {
            throw new Error('TiledLayer.setTiledTileAt: invalid position');
          }

          if (!this.tiles) {
            logID(7236);
            return null;
          }

          var index = Math.floor(x) + Math.floor(y) * this._layerSize.width;

          this.tiledTiles[index] = tiledTile;
          this._cullingDirty = true;

          if (tiledTile) {
            this._hasTiledNodeGrid = true;
          } else {
            this._hasTiledNodeGrid = this.tiledTiles.some(function (tiledNode) {
              return !!tiledNode;
            });
          }

          return tiledTile;
        };

        _proto.getTexture = function getTexture(index) {
          index = index || 0;

          if (this._textures && index >= 0 && this._textures.length > index) {
            return this._textures[index];
          }

          return null;
        };

        _proto.getTextures = function getTextures() {
          return this._textures;
        };

        _proto.setTexture = function setTexture(texture) {
          this.setTextures([texture]);
        };

        _proto.setTextures = function setTextures(textures) {
          this._textures = textures;
          this.markForUpdateRenderData();
        };

        _proto.getLayerSize = function getLayerSize() {
          return this._layerSize;
        };

        _proto.getMapTileSize = function getMapTileSize() {
          return this._mapTileSize;
        };

        _proto.getTileSet = function getTileSet(index) {
          index = index || 0;

          if (this._tilesets && index >= 0 && this._tilesets.length > index) {
            return this._tilesets[index];
          }

          return null;
        };

        _proto.getTileSets = function getTileSets() {
          return this._tilesets;
        };

        _proto.setTileSet = function setTileSet(tileset) {
          this.setTileSets([tileset]);
        };

        _proto.setTileSets = function setTileSets(tilesets) {
          var _this3 = this;

          this._tilesets = tilesets;
          var textures = this._textures = [];
          var texGrids = this.texGrids;
          texGrids.clear();

          for (var i = 0; i < tilesets.length; i++) {
            var tileset = tilesets[i];

            if (tileset) {
              textures[i] = tileset.sourceImage;
            }
          }

          loadAllTextures(textures, function () {
            for (var _i = 0, l = tilesets.length; _i < l; ++_i) {
              var tilesetInfo = tilesets[_i];
              if (!tilesetInfo) continue;
              fillTextureGrids(tilesetInfo, texGrids, tilesetInfo.sourceImage);
            }

            _this3._prepareToRender();
          });
        };

        _proto.init = function init(layerInfo, mapInfo, tilesets, textures, texGrids) {
          this._cullingDirty = true;
          this._layerInfo = layerInfo;
          this._mapInfo = mapInfo;
          var size = layerInfo.layerSize;
          this._layerName = layerInfo.name;
          this.tiles = layerInfo.tiles;
          this._properties = layerInfo.properties;
          this._layerSize = size;
          this._minGID = layerInfo.minGID;
          this._maxGID = layerInfo.maxGID;
          this._opacity = layerInfo.opacity;

          if (layerInfo.tintColor) {
            this._tintColor = layerInfo.tintColor;
          }

          this.renderOrder = mapInfo.renderOrder;
          this._staggerAxis = mapInfo.getStaggerAxis();
          this._staggerIndex = mapInfo.getStaggerIndex();
          this._hexSideLength = mapInfo.getHexSideLength();
          this._animations = mapInfo.getTileAnimations();
          this._tilesets = tilesets;
          this._textures = textures;
          this.texGrids = texGrids;
          this._layerOrientation = mapInfo.orientation;
          this._mapTileSize = mapInfo.getTileSize();
          var maptw = this._mapTileSize.width;
          var mapth = this._mapTileSize.height;
          var layerW = this._layerSize.width;
          var layerH = this._layerSize.height;

          if (this._layerOrientation === Orientation.HEX) {
            var width = 0;
            var height = 0;
            this._odd_even = this._staggerIndex === StaggerIndex.STAGGERINDEX_ODD ? 1 : -1;

            if (this._staggerAxis === StaggerAxis.STAGGERAXIS_X) {
              this._diffX1 = (maptw - this._hexSideLength) / 2;
              this._diffY1 = 0;
              height = mapth * (layerH + 0.5);
              width = (maptw + this._hexSideLength) * Math.floor(layerW / 2) + maptw * (layerW % 2);
            } else {
              this._diffX1 = 0;
              this._diffY1 = (mapth - this._hexSideLength) / 2;
              width = maptw * (layerW + 0.5);
              height = (mapth + this._hexSideLength) * Math.floor(layerH / 2) + mapth * (layerH % 2);
            }

            this.node._uiProps.uiTransformComp.setContentSize(width, height);
          } else if (this._layerOrientation === Orientation.ISO) {
            var wh = layerW + layerH;

            this.node._uiProps.uiTransformComp.setContentSize(maptw * 0.5 * wh, mapth * 0.5 * wh);
          } else {
            this.node._uiProps.uiTransformComp.setContentSize(layerW * maptw, layerH * mapth);
          }

          this._offset = new Vec2(layerInfo.offset.x, -layerInfo.offset.y);
          this._useAutomaticVertexZ = false;
          this._vertexZvalue = 0;

          this._syncAnchorPoint();

          this._prepareToRender();
        };

        _proto._prepareToRender = function _prepareToRender() {
          this._updateVertices();

          this._updateAllUserNode();
        };

        _proto.requestMeshRenderData = function requestMeshRenderData() {
          var _this4 = this;

          if (!this._meshRenderDataArray) {
            this._meshRenderDataArray = [];
          }

          var arr = this._meshRenderDataArray;

          while (arr.length > 0 && arr[arr.length - 1].subNodes && arr[arr.length - 1].subNodes.length === 0) {
            arr.pop();
          }

          if (arr.length > 0) {
            var last = arr[arr.length - 1];

            if (last.renderData && last.renderData.byteCount === 0) {
              return last;
            }
          }

          var renderData = new MeshRenderData();
          var comb = {
            renderData: renderData,
            texture: null
          };
          Object.defineProperty(renderData, 'material', {
            get: function get() {
              return _this4.getRenderMaterial(0);
            }
          });

          this._meshRenderDataArray.push(comb);

          return comb;
        };

        _proto.requestSubNodesData = function requestSubNodesData() {
          if (!this._meshRenderDataArray) {
            this._meshRenderDataArray = [];
          }

          var arr = this._meshRenderDataArray;

          while (arr.length > 0 && arr[arr.length - 1].renderData && arr[arr.length - 1].renderData.byteCount === 0) {
            arr.pop();
          }

          if (arr.length > 0) {
            if (arr[arr.length - 1].subNodes && arr[arr.length - 1].subNodes.length === 0) {
              return arr[arr.length - 1];
            }
          }

          var renderData = [];
          var comb = {
            subNodes: renderData
          };

          this._meshRenderDataArray.push(comb);

          return comb;
        };

        _proto.destroyRenderData = function destroyRenderData() {
          if (this._meshRenderDataArray) {
            this._meshRenderDataArray.forEach(function (rd) {
              if (rd.renderData) rd.renderData.reset();
            });

            this._meshRenderDataArray.length = 0;
          }
        };

        _proto._flushAssembler = function _flushAssembler() {
          var assembler = TiledLayer.Assembler.getAssembler(this);

          if (this._assembler !== assembler) {
            this._assembler = assembler;
          }

          if (!this._meshRenderDataArray) {
            if (this._assembler && this._assembler.createData) {
              this._assembler.createData(this);

              this.markForUpdateRenderData();

              this._updateColor();
            }
          }
        };

        _proto._render = function _render(ui) {
          if (this._meshRenderDataArray) {
            for (var i = 0; i < this._meshRenderDataArray.length; i++) {
              this._meshRenderDataArrayIdx = i;
              var m = this._meshRenderDataArray[i];

              if (m.subNodes) {
                m.subNodes.forEach(function (c) {
                  if (c) ui.walk(c.node);
                });
              } else if (m.texture) {
                ui.commitComp(this, m.texture, this._assembler, null);
              }
            }

            this.node._static = true;
          }
        };

        _createClass(TiledLayer, [{
          key: "cullingRect",
          get: function get() {
            return this._cullingRect;
          }
        }, {
          key: "rightTop",
          get: function get() {
            return this._rightTop;
          }
        }, {
          key: "layerSize",
          get: function get() {
            return this._layerSize;
          }
        }, {
          key: "meshRenderDataArray",
          get: function get() {
            return this._meshRenderDataArray;
          }
        }, {
          key: "leftDownToCenterX",
          get: function get() {
            return this._leftDownToCenterX;
          }
        }, {
          key: "leftDownToCenterY",
          get: function get() {
            return this._leftDownToCenterY;
          }
        }, {
          key: "enableCulling",
          get: function get() {
            return this._enableCulling;
          },
          set: function set(value) {
            if (this._enableCulling !== value) {
              this._enableCulling = value;
              this._cullingDirty = true;
              this.markForUpdateRenderData();
            }
          }
        }]);

        return TiledLayer;
      }(Renderable2D), _temp2)) || _class3));

      var _dec$2, _dec2$2, _dec3$1, _dec4$1, _class$2, _class2$1, _temp$2;
      var TiledObjectGroup = exports('TiledObjectGroup', (_dec$2 = ccclass('cc.TiledObjectGroup'), _dec2$2 = help('i18n:cc.TiledObjectGroup'), _dec3$1 = requireComponent(UITransform), _dec4$1 = type(CCBoolean), _dec$2(_class$2 = _dec2$2(_class$2 = _dec3$1(_class$2 = (_class2$1 = (_temp$2 = function (_Component) {
        _inheritsLoose(TiledObjectGroup, _Component);

        function TiledObjectGroup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._premultiplyAlpha = false;
          _this._groupName = void 0;
          _this._positionOffset = void 0;
          _this._mapInfo = void 0;
          _this._properties = void 0;
          _this._offset = void 0;
          _this._opacity = void 0;
          _this._tintColor = null;
          _this._animations = void 0;
          _this._hasAniObj = void 0;
          _this._texGrids = void 0;
          _this.aniObjects = void 0;
          _this._objects = [];
          return _this;
        }

        var _proto = TiledObjectGroup.prototype;

        _proto.getPositionOffset = function getPositionOffset() {
          return this._positionOffset;
        };

        _proto.getProperties = function getProperties() {
          return this._properties;
        };

        _proto.getGroupName = function getGroupName() {
          return this._groupName;
        };

        _proto.getProperty = function getProperty(propertyName) {
          return this._properties[propertyName.toString()];
        };

        _proto.getObject = function getObject(objectName) {
          for (var i = 0, len = this._objects.length; i < len; i++) {
            var obj = this._objects[i];

            if (obj && obj.name === objectName) {
              return obj;
            }
          }

          return null;
        };

        _proto.getObjects = function getObjects() {
          return this._objects;
        };

        _proto._init = function _init(groupInfo, mapInfo, texGrids) {
          var FLIPPED_MASK = TileFlag.FLIPPED_MASK;
          var FLAG_HORIZONTAL = TileFlag.HORIZONTAL;
          var FLAG_VERTICAL = TileFlag.VERTICAL;
          this._groupName = groupInfo.name;
          this._positionOffset = groupInfo.offset;
          this._mapInfo = mapInfo;
          this._properties = groupInfo.getProperties();
          this._offset = new Vec2(groupInfo.offset.x, -groupInfo.offset.y);
          this._opacity = groupInfo.opacity;

          if (groupInfo.tintColor) {
            this._tintColor = groupInfo.tintColor;
          }

          this._texGrids = texGrids;
          this._animations = mapInfo.getTileAnimations();
          this.aniObjects = [];
          this._hasAniObj = false;
          var mapSize = mapInfo.mapSize;
          var tileSize = mapInfo.tileSize;
          var width = 0;
          var height = 0;
          var colorVal = new Color();
          var iso = Orientation.ISO === mapInfo.orientation;

          if (mapInfo.orientation === Orientation.HEX) {
            if (mapInfo.getStaggerAxis() === StaggerAxis.STAGGERAXIS_X) {
              height = tileSize.height * (mapSize.height + 0.5);
              width = (tileSize.width + mapInfo.getHexSideLength()) * Math.floor(mapSize.width / 2) + tileSize.width * (mapSize.width % 2);
            } else {
              width = tileSize.width * (mapSize.width + 0.5);
              height = (tileSize.height + mapInfo.getHexSideLength()) * Math.floor(mapSize.height / 2) + tileSize.height * (mapSize.height % 2);
            }
          } else if (iso) {
            var wh = mapSize.width + mapSize.height;
            width = tileSize.width * 0.5 * wh;
            height = tileSize.height * 0.5 * wh;
          } else {
            width = mapSize.width * tileSize.width;
            height = mapSize.height * tileSize.height;
          }

          var transComp = this.node._uiProps.uiTransformComp;
          transComp.setContentSize(width, height);
          var leftTopX = width * transComp.anchorX;
          var leftTopY = height * (1 - transComp.anchorY);
          var objects = groupInfo.objects;
          var aliveNodes = {};

          for (var i = 0, l = objects.length; i < l; i++) {
            var object = objects[i];
            var objType = object.type;
            object.offset = new Vec2(object.x, object.y);
            var points = object.points || object.polylinePoints;

            if (points) {
              for (var pi = 0; pi < points.length; pi++) {
                points[pi].y *= -1;
              }
            }

            if (iso) {
              var posIdxX = object.x / tileSize.height;
              var posIdxY = object.y / tileSize.height;
              object.x = tileSize.width * 0.5 * (mapSize.height + posIdxX - posIdxY);
              object.y = tileSize.height * 0.5 * (mapSize.width + mapSize.height - posIdxX - posIdxY);
            } else {
              object.y = height - object.y;
            }

            if (objType === TMXObjectType.TEXT) {
              var textName = "text" + object.id;
              aliveNodes[textName] = true;
              var textNode = this.node.getChildByName(textName);

              if (!textNode) {
                textNode = new Node();
              }

              textNode.setRotationFromEuler(0, 0, -object.rotation);
              textNode.setPosition(object.x - leftTopX, object.y - leftTopY);
              textNode.name = textName;
              textNode.parent = this.node;
              textNode.setSiblingIndex(i);
              var label = textNode.getComponent(Label);

              if (!label) {
                label = textNode.addComponent(Label);
              }

              var textTransComp = textNode._uiProps.uiTransformComp;
              textNode.active = object.visible;
              textTransComp.anchorX = 0;
              textTransComp.anchorY = 1;

              if (this._tintColor) {
                colorVal.set(this._tintColor);
                colorVal.a *= this._opacity / 255;
                label.color.set(colorVal);
              } else {
                var c = label.color;
                c.a *= this._opacity / 255;
              }

              label.overflow = Label.Overflow.SHRINK;
              label.lineHeight = object.height;
              label.string = object.text;
              label.horizontalAlign = object.halign;
              label.verticalAlign = object.valign;
              label.fontSize = object.pixelsize;
              textTransComp.setContentSize(object.width, object.height);
            } else if (objType === TMXObjectType.IMAGE) {
              var gid = object.gid;
              var gridGID = (gid & FLIPPED_MASK) >>> 0;
              var grid = texGrids.get(gridGID);
              if (!grid) continue;
              var tileset = grid.tileset;
              var imgName = "img" + object.id;
              aliveNodes[imgName] = true;
              var imgNode = this.node.getChildByName(imgName);
              object.width = object.width || grid.width;
              object.height = object.height || grid.height;

              if (imgNode && imgNode._objFlags & CCObject.Flags.HideInHierarchy) {
                imgNode.removeFromParent();
                imgNode.hideFlags |= CCObject.Flags.DontSave;
                imgNode.destroy();
                imgNode = null;
              }

              if (!imgNode) {
                imgNode = new Node();
              }

              if (this._animations.get(gridGID)) {
                this.aniObjects.push({
                  object: object,
                  imgNode: imgNode,
                  gridGID: gridGID
                });
                this._hasAniObj = true;
              }

              var tileOffsetX = tileset.tileOffset.x;
              var tileOffsetY = tileset.tileOffset.y;
              imgNode.active = object.visible;
              imgNode.setRotationFromEuler(0, 0, -object.rotation);
              imgNode.setPosition(object.x - leftTopX, object.y - leftTopY);
              imgNode.name = imgName;
              imgNode.parent = this.node;
              imgNode.setSiblingIndex(i);
              var sprite = imgNode.getComponent(Sprite);

              if (!sprite) {
                sprite = imgNode.addComponent(Sprite);
              }

              var imgTrans = imgNode._uiProps.uiTransformComp;

              if (iso) {
                imgTrans.anchorX = 0.5 + tileOffsetX / object.width;
                imgTrans.anchorY = tileOffsetY / object.height;
              } else {
                imgTrans.anchorX = tileOffsetX / object.width;
                imgTrans.anchorY = tileOffsetY / object.height;
              }

              if (this._tintColor) {
                colorVal.set(this._tintColor);
                colorVal.a *= this._opacity / 255;
                sprite.color.set(colorVal);
              } else {
                var _c = sprite.color;
                _c.a *= this._opacity / 255;
              }

              sprite.sizeMode = Sprite.SizeMode.CUSTOM;
              sprite._srcBlendFactor = this._premultiplyAlpha ? BlendFactor.ONE : BlendFactor.SRC_ALPHA;
              sprite._dstBlendFactor = BlendFactor.ONE_MINUS_SRC_ALPHA;

              sprite._updateBlendFunc();

              var spf = grid.spriteFrame;

              if (!spf) {
                spf = new SpriteFrame();
              } else {
                spf = spf.clone();
              }

              if ((gid & FLAG_HORIZONTAL) >>> 0) {
                spf.flipUVX = !spf.flipUVX;
              }

              if ((gid & FLAG_VERTICAL) >>> 0) {
                spf.flipUVY = !spf.flipUVY;
              }

              spf.rotated = grid._rotated;
              spf.rect = grid._rect;
              sprite.spriteFrame = spf;
              imgTrans.setContentSize(object.width, object.height);
              sprite.markForUpdateRenderData();
            }
          }

          this._objects = objects;
          var children = this.node.children;
          var uselessExp = /^(?:img|text)\d+$/;

          for (var _i = 0, n = children.length; _i < n; _i++) {
            var _c2 = children[_i];
            var cName = _c2.name;
            var isUseless = uselessExp.test(cName);
            if (isUseless && !aliveNodes[cName]) _c2.destroy();
          }
        };

        _proto.update = function update(dt) {
          if (!this._hasAniObj) {
            return;
          }

          var aniObjects = this.aniObjects;
          var _texGrids = this._texGrids;
          var iso = Orientation.ISO === this._mapInfo.orientation;

          for (var i = 0, len = aniObjects.length; i < len; i++) {
            var aniObj = aniObjects[i];
            var gridGID = aniObj.gridGID;

            var grid = _texGrids.get(gridGID);

            if (!grid) {
              continue;
            }

            var tileset = grid.tileset;
            var object = aniObj.object;
            var imgNode = aniObj.imgNode;
            var tileOffsetX = tileset.tileOffset.x;
            var tileOffsetY = tileset.tileOffset.y;
            var imgTrans = imgNode._uiProps.uiTransformComp;

            if (iso) {
              imgTrans.anchorX = 0.5 + tileOffsetX / object.width;
              imgTrans.anchorY = tileOffsetY / object.height;
            } else {
              imgTrans.anchorX = tileOffsetX / object.width;
              imgTrans.anchorY = tileOffsetY / object.height;
            }

            var sp = imgNode.getComponent(Sprite);
            var spf = sp.spriteFrame;
            spf.rotated = grid._rotated;
            spf.rect = grid._rect;
            sp.spriteFrame = spf;
            sp.markForUpdateRenderData();
          }
        };

        _createClass(TiledObjectGroup, [{
          key: "premultiplyAlpha",
          get: function get() {
            return this._premultiplyAlpha;
          },
          set: function set(value) {
            this._premultiplyAlpha = value;
          }
        }, {
          key: "offset",
          get: function get() {
            return this._offset;
          }
        }]);

        return TiledObjectGroup;
      }(Component), _temp$2), (_applyDecoratedDescriptor(_class2$1.prototype, "premultiplyAlpha", [_dec4$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "premultiplyAlpha"), _class2$1.prototype)), _class2$1)) || _class$2) || _class$2) || _class$2));

      var _dec$3, _dec2$3, _dec3$2, _dec4$2, _dec5$1, _dec6$1, _dec7$1, _dec8$1, _class$3, _class2$2, _descriptor$1, _descriptor2$1, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp$3;
      var TiledMapAsset = exports('TiledMapAsset', (_dec$3 = ccclass('cc.TiledMapAsset'), _dec2$3 = type([TextAsset]), _dec3$2 = type([CCString]), _dec4$2 = type([SpriteFrame]), _dec5$1 = type([SpriteFrame]), _dec6$1 = type([CCString]), _dec7$1 = type([CCString]), _dec8$1 = type([Size]), _dec$3(_class$3 = (_class2$2 = (_temp$3 = function (_Asset) {
        _inheritsLoose(TiledMapAsset, _Asset);

        function TiledMapAsset() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Asset.call.apply(_Asset, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "tmxXmlStr", _descriptor$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tsxFiles", _descriptor2$1, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tsxFileNames", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrames", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "imageLayerSpriteFrame", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "imageLayerSpriteFrameNames", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrameNames", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "spriteFrameSizes", _descriptor8, _assertThisInitialized(_this));

          return _this;
        }

        return TiledMapAsset;
      }(Asset), _temp$3), (_descriptor$1 = _applyDecoratedDescriptor(_class2$2.prototype, "tmxXmlStr", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2$1 = _applyDecoratedDescriptor(_class2$2.prototype, "tsxFiles", [serializable, _dec2$3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2$2.prototype, "tsxFileNames", [serializable, _dec3$2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2$2.prototype, "spriteFrames", [serializable, _dec4$2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2$2.prototype, "imageLayerSpriteFrame", [serializable, _dec5$1], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2$2.prototype, "imageLayerSpriteFrameNames", [serializable, _dec6$1], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2$2.prototype, "spriteFrameNames", [serializable, _dec7$1], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2$2.prototype, "spriteFrameSizes", [serializable, _dec8$1], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2$2)) || _class$3));

      var _dec$4, _dec2$4, _dec3$3, _dec4$3, _dec5$2, _dec6$2, _class$4, _class2$3, _descriptor$2, _descriptor2$2, _descriptor3$1, _class3$1, _temp$4;
      var TiledMap = exports('TiledMap', (_dec$4 = ccclass('cc.TiledMap'), _dec2$4 = help('i18n:cc.TiledMap'), _dec3$3 = menu('TiledMap/TiledMap'), _dec4$3 = requireComponent(UITransform), _dec5$2 = type(TiledMapAsset), _dec6$2 = displayOrder(7), _dec$4(_class$4 = _dec2$4(_class$4 = _dec3$3(_class$4 = _dec4$3(_class$4 = executeInEditMode(_class$4 = (_class2$3 = (_temp$4 = _class3$1 = function (_Component) {
        _inheritsLoose(TiledMap, _Component);

        function TiledMap() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._texGrids = new Map();
          _this._textures = [];
          _this._tilesets = [];
          _this._animations = new Map();
          _this._imageLayers = [];
          _this._layers = [];
          _this._groups = [];
          _this._images = [];
          _this._properties = {};
          _this._tileProperties = new Map();
          _this._mapInfo = null;
          _this._mapSize = new Size(0, 0);
          _this._tileSize = new Size(0, 0);
          _this._preloaded = false;
          _this._mapOrientation = Orientation.ORTHO;

          _initializerDefineProperty(_this, "_tmxFile", _descriptor$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_enableCulling", _descriptor2$2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "cleanupImageCache", _descriptor3$1, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TiledMap.prototype;

        _proto.getMapSize = function getMapSize() {
          return this._mapSize;
        };

        _proto.getTileSize = function getTileSize() {
          return this._tileSize;
        };

        _proto.getMapOrientation = function getMapOrientation() {
          return this._mapOrientation;
        };

        _proto.getObjectGroups = function getObjectGroups() {
          return this._groups;
        };

        _proto.getObjectGroup = function getObjectGroup(groupName) {
          var groups = this._groups;

          for (var i = 0, l = groups.length; i < l; i++) {
            var group = groups[i];

            if (group && group.getGroupName() === groupName) {
              return group;
            }
          }

          return null;
        };

        _proto.getProperties = function getProperties() {
          return this._properties;
        };

        _proto.getLayers = function getLayers() {
          return this._layers;
        };

        _proto.getLayer = function getLayer(layerName) {
          var layers = this._layers;

          for (var i = 0, l = layers.length; i < l; i++) {
            var layer = layers[i];

            if (layer && layer.getLayerName() === layerName) {
              return layer;
            }
          }

          return null;
        };

        _proto._changeLayer = function _changeLayer(layerName, replaceLayer) {
          var layers = this._layers;

          for (var i = 0, l = layers.length; i < l; i++) {
            var layer = layers[i];

            if (layer && layer.getLayerName() === layerName) {
              layers[i] = replaceLayer;
              return;
            }
          }
        };

        _proto.getProperty = function getProperty(propertyName) {
          return this._properties[propertyName.toString()];
        };

        _proto.getPropertiesForGID = function getPropertiesForGID(gid) {
          return this._tileProperties.get(gid);
        };

        _proto.__preload = function __preload() {
          this._preloaded = true;

          if (!this._tmxFile) {
            return;
          }

          this._applyFile();
        };

        _proto.onEnable = function onEnable() {
          this.node.on(SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
        };

        _proto.onDisable = function onDisable() {
          this.node.off(SystemEventType.ANCHOR_CHANGED, this._syncAnchorPoint, this);
        };

        _proto._applyFile = function _applyFile() {
          var spriteFrames = [];
          var spriteFramesCache = {};
          var file = this._tmxFile;

          if (file) {
            var spfNames = file.spriteFrameNames;
            var spfSizes = file.spriteFrameSizes;
            var fSpriteFrames = file.spriteFrames;
            var spfTexturesMap = {};
            var spfTextureSizeMap = {};

            for (var i = 0; i < spfNames.length; ++i) {
              var texName = spfNames[i];
              spfTextureSizeMap[texName] = spfSizes[i];
              spriteFrames[i] = fSpriteFrames[i];
              var frame = spriteFrames[i];

              if (frame) {
                spriteFramesCache[frame.name] = frame;
                spfTexturesMap[texName] = frame;
              }
            }

            var imageLayerTextures = {};
            var texValues = file.imageLayerSpriteFrame;
            spfNames = file.imageLayerSpriteFrameNames;

            for (var _i = 0; _i < texValues.length; ++_i) {
              imageLayerTextures[spfNames[_i]] = texValues[_i];
            }

            var tsxFileNames = file.tsxFileNames;
            var tsxFiles = file.tsxFiles;
            var tsxContentMap = {};

            for (var _i2 = 0; _i2 < tsxFileNames.length; ++_i2) {
              if (tsxFileNames[_i2].length > 0) {
                tsxContentMap[tsxFileNames[_i2]] = tsxFiles[_i2].text;
              }
            }

            var mapInfo = new TMXMapInfo(file.tmxXmlStr, tsxContentMap, spfTexturesMap, spfTextureSizeMap, imageLayerTextures);
            var tilesets = mapInfo.getTilesets();

            if (!tilesets || tilesets.length === 0) {
              logID(7241);
            }

            this._buildWithMapInfo(mapInfo);
          } else {
            this._releaseMapInfo();
          }
        };

        _proto._releaseMapInfo = function _releaseMapInfo() {
          var layers = this._layers;

          for (var i = 0, l = layers.length; i < l; i++) {
            layers[i].node.removeFromParent();
            layers[i].node.destroy();
          }

          layers.length = 0;
          var groups = this._groups;

          for (var _i3 = 0, _l = groups.length; _i3 < _l; _i3++) {
            groups[_i3].node.removeFromParent();

            groups[_i3].node.destroy();
          }

          groups.length = 0;
          var images = this._images;

          for (var _i4 = 0, _l2 = images.length; _i4 < _l2; _i4++) {
            images[_i4].removeFromParent();

            images[_i4].destroy();
          }

          images.length = 0;
        };

        _proto._syncAnchorPoint = function _syncAnchorPoint() {
          var anchor = this.node._uiProps.uiTransformComp.anchorPoint;
          var leftTopX = this.node._uiProps.uiTransformComp.width * anchor.x;
          var leftTopY = this.node._uiProps.uiTransformComp.height * (1 - anchor.y);
          var i;
          var l;

          for (i = 0, l = this._layers.length; i < l; i++) {
            var layerInfo = this._layers[i];
            var layerNode = layerInfo.node;

            layerNode._uiProps.uiTransformComp.setAnchorPoint(anchor);
          }

          for (i = 0, l = this._groups.length; i < l; i++) {
            var groupInfo = this._groups[i];
            var groupNode = groupInfo.node._uiProps.uiTransformComp;
            groupNode.anchorX = 0.5;
            groupNode.anchorY = 0.5;
            var x = groupInfo.offset.x - leftTopX + groupNode.width * groupNode.anchorX;
            var y = groupInfo.offset.y + leftTopY - groupNode.height * groupNode.anchorY;
            groupInfo.node.setPosition(x, y);
          }

          for (i = 0, l = this._images.length; i < l; i++) {
            var image = this._images[i]._uiProps.uiTransformComp;
            image.anchorX = 0.5;
            image.anchorY = 0.5;

            var _x = this._images[i]._offset.x - leftTopX + image.width * image.anchorX;

            var _y = this._images[i]._offset.y + leftTopY - image.height * image.anchorY;

            this._images[i].setPosition(_x, _y);
          }
        };

        _proto._fillAniGrids = function _fillAniGrids(texGrids, animations) {
          for (var _iterator = _createForOfIteratorHelperLoose(animations.keys()), _step; !(_step = _iterator()).done;) {
            var i = _step.value;
            var animation = animations.get(i);
            if (!animation) continue;
            var frames = animation.frames;

            for (var j = 0; j < frames.length; j++) {
              var frame = frames[j];
              frame.grid = texGrids.get(frame.tileid);
            }
          }
        };

        _proto._buildLayerAndGroup = function _buildLayerAndGroup() {
          var tilesets = this._tilesets;
          var texGrids = this._texGrids;
          var animations = this._animations;
          texGrids.clear();

          for (var i = 0, l = tilesets.length; i < l; ++i) {
            var tilesetInfo = tilesets[i];
            if (!tilesetInfo) continue;

            if (!tilesetInfo.sourceImage) {
              console.warn("Can't find the spriteFrame of tilesets " + i);
              continue;
            }

            fillTextureGrids(tilesetInfo, texGrids, tilesetInfo.sourceImage);
          }

          this._fillAniGrids(texGrids, animations);

          var layers = this._layers;
          var groups = this._groups;
          var images = this._images;
          var oldNodeNames = {};

          for (var _i5 = 0, n = layers.length; _i5 < n; _i5++) {
            oldNodeNames[layers[_i5].node.name] = true;
          }

          for (var _i6 = 0, _n = groups.length; _i6 < _n; _i6++) {
            oldNodeNames[groups[_i6].node.name] = true;
          }

          for (var _i7 = 0, _n2 = images.length; _i7 < _n2; _i7++) {
            oldNodeNames[images[_i7].name] = true;
          }

          layers = this._layers = [];
          groups = this._groups = [];
          images = this._images = [];
          var mapInfo = this._mapInfo;
          var node = this.node;
          var layerInfos = mapInfo.getAllChildren();
          var textures = this._textures;
          var maxWidth = 0;
          var maxHeight = 0;

          if (layerInfos && layerInfos.length > 0) {
            for (var _i8 = 0, len = layerInfos.length; _i8 < len; _i8++) {
              var layerInfo = layerInfos[_i8];
              var name = layerInfo.name;
              var child = this.node.getChildByName(name);
              oldNodeNames[name] = false;

              if (!child) {
                child = new Node();
                child.name = name;
                child.layer = node.layer;
                node.addChild(child);
              }

              child.setSiblingIndex(_i8);
              child.active = layerInfo.visible;

              if (layerInfo instanceof TMXLayerInfo) {
                var layer = child.getComponent(TiledLayer);

                if (!layer) {
                  layer = child.addComponent(TiledLayer);
                }

                layer.init(layerInfo, mapInfo, tilesets, textures, texGrids);
                layer.enableCulling = this._enableCulling;
                layerInfo.ownTiles = false;
                layers.push(layer);
              } else if (layerInfo instanceof TMXObjectGroupInfo) {
                var group = child.getComponent(TiledObjectGroup);

                if (!group) {
                  group = child.addComponent(TiledObjectGroup);
                }

                group._init(layerInfo, mapInfo, texGrids);

                groups.push(group);
              } else if (layerInfo instanceof TMXImageLayerInfo) {
                var texture = layerInfo.sourceImage;
                child.layerInfo = layerInfo;
                child._offset = new Vec2(layerInfo.offset.x, -layerInfo.offset.y);
                var image = child.getComponent(Sprite);

                if (!image) {
                  image = child.addComponent(Sprite);
                }

                var color = image.color;
                color.a *= layerInfo.opacity;
                image.spriteFrame = texture;

                child._uiProps.uiTransformComp.setContentSize(texture.width, texture.height);

                images.push(child);
              }

              maxWidth = Math.max(maxWidth, child._uiProps.uiTransformComp.width);
              maxHeight = Math.max(maxHeight, child._uiProps.uiTransformComp.height);
            }
          }

          var children = node.children;

          for (var _i9 = 0, _n3 = children.length; _i9 < _n3; _i9++) {
            var c = children[_i9];

            if (oldNodeNames[c.name]) {
              c.destroy();
            }
          }

          this.node._uiProps.uiTransformComp.setContentSize(maxWidth, maxHeight);

          this._syncAnchorPoint();
        };

        _proto._buildWithMapInfo = function _buildWithMapInfo(mapInfo) {
          var _this2 = this;

          this._mapInfo = mapInfo;
          this._mapSize = mapInfo.getMapSize();
          this._tileSize = mapInfo.getTileSize();
          this._mapOrientation = mapInfo.orientation;
          this._properties = mapInfo.properties;
          this._tileProperties = mapInfo.getTileProperties();
          this._imageLayers = mapInfo.getImageLayers();
          this._animations = mapInfo.getTileAnimations();
          this._tilesets = mapInfo.getTilesets();
          var tilesets = this._tilesets;
          this._textures.length = 0;
          var totalTextures = [];

          for (var i = 0, l = tilesets.length; i < l; ++i) {
            var tilesetInfo = tilesets[i];
            if (!tilesetInfo || !tilesetInfo.sourceImage) continue;
            this._textures[i] = tilesetInfo.sourceImage;
            totalTextures.push(tilesetInfo.sourceImage);
          }

          for (var _i10 = 0; _i10 < this._imageLayers.length; _i10++) {
            var imageLayer = this._imageLayers[_i10];
            if (!imageLayer || !imageLayer.sourceImage) continue;
            totalTextures.push(imageLayer.sourceImage);
          }

          loadAllTextures(totalTextures, function () {
            _this2._buildLayerAndGroup();

            if (_this2.cleanupImageCache) {
              _this2._textures.forEach(function (tex) {
                _this2.doCleanupImageCache(tex);
              });
            }
          });
        };

        _proto.doCleanupImageCache = function doCleanupImageCache(texture) {
          if (texture._image instanceof HTMLImageElement) {
            texture._image.src = '';
            texture._image.destroy();
          } else if (sys.capabilities.imageBitmap && texture._image instanceof ImageBitmap) {
            if (texture._image.close) texture._image.close();
          }

          texture._image = null;
        };

        _proto.update = function update(dt) {
          var animations = this._animations;
          var texGrids = this._texGrids;

          for (var _iterator2 = _createForOfIteratorHelperLoose(animations.keys()), _step2; !(_step2 = _iterator2()).done;) {
            var aniGID = _step2.value;
            var animation = animations.get(aniGID);
            var frames = animation.frames;
            var frame = frames[animation.frameIdx];
            animation.dt += dt;

            if (frame.duration < animation.dt) {
              animation.dt = 0;
              animation.frameIdx++;

              if (animation.frameIdx >= frames.length) {
                animation.frameIdx = 0;
              }

              frame = frames[animation.frameIdx];
            }

            texGrids.set(aniGID, frame.grid);
          }

          for (var _iterator3 = _createForOfIteratorHelperLoose(this.getLayers()), _step3; !(_step3 = _iterator3()).done;) {
            var layer = _step3.value;

            if (layer.hasAnimation()) {
              layer.markForUpdateRenderData();
            }
          }
        };

        _createClass(TiledMap, [{
          key: "tmxAsset",
          get: function get() {
            return this._tmxFile;
          },
          set: function set(value) {
            if (this._tmxFile !== value || EDITOR) {
              this._tmxFile = value;

              if (this._preloaded || EDITOR) {
                this._applyFile();
              }
            }
          }
        }, {
          key: "enableCulling",
          get: function get() {
            return this._enableCulling;
          },
          set: function set(value) {
            this._enableCulling = value;
            var layers = this._layers;

            for (var i = 0; i < layers.length; ++i) {
              layers[i].enableCulling = value;
            }
          }
        }]);

        return TiledMap;
      }(Component), _class3$1.Orientation = Orientation, _class3$1.Property = Property, _class3$1.TileFlag = TileFlag, _class3$1.StaggerAxis = StaggerAxis, _class3$1.StaggerIndex = StaggerIndex, _class3$1.TMXObjectType = TMXObjectType, _class3$1.RenderOrder = RenderOrder, _temp$4), (_descriptor$2 = _applyDecoratedDescriptor(_class2$3.prototype, "_tmxFile", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2$3.prototype, "tmxAsset", [_dec5$2, _dec6$2], Object.getOwnPropertyDescriptor(_class2$3.prototype, "tmxAsset"), _class2$3.prototype), _descriptor2$2 = _applyDecoratedDescriptor(_class2$3.prototype, "_enableCulling", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _applyDecoratedDescriptor(_class2$3.prototype, "enableCulling", [editable], Object.getOwnPropertyDescriptor(_class2$3.prototype, "enableCulling"), _class2$3.prototype), _descriptor3$1 = _applyDecoratedDescriptor(_class2$3.prototype, "cleanupImageCache", [serializable], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2$3)) || _class$4) || _class$4) || _class$4) || _class$4) || _class$4));

      var MaxGridsLimit = Math.ceil(65535 / 6);
      var vec3_temps = [];

      for (var i = 0; i < 4; i++) {
        vec3_temps.push(new Vec3());
      }

      var _mat4_temp$1 = new Mat4();

      var _vec3u_temp = new Vec3();

      var _leftDown = {
        row: 0,
        col: 0
      };
      var _uva = {
        x: 0,
        y: 0
      };
      var _uvb = {
        x: 0,
        y: 0
      };
      var _uvc = {
        x: 0,
        y: 0
      };
      var _uvd = {
        x: 0,
        y: 0
      };

      var _renderData;

      var _fillGrids = 0;
      var _vfOffset = 0;
      var _moveX = 0;
      var _moveY = 0;
      var flipTexture;
      var simple = {
        createData: function createData(layer) {
          var renderData = layer.requestMeshRenderData();
          var maxGrids = layer.rightTop.col * layer.rightTop.row;

          if (maxGrids * 4 > 65535) {
            console.error('Vertex count exceeds 65535');
          }

          return renderData;
        },
        updateRenderData: function updateRenderData(comp, ui) {
          comp.updateCulling();
          var renderData = comp.requestMeshRenderData();
          _moveX = comp.leftDownToCenterX;
          _moveY = comp.leftDownToCenterY;
          _renderData = renderData;

          if (comp.colorChanged || comp.isCullingDirty() || comp.isUserNodeDirty() || comp.hasAnimation() || comp.hasTiledNode()) {
            comp.colorChanged = false;
            comp.destroyRenderData();
            var leftDown;
            var rightTop;

            if (comp.enableCulling) {
              var cullingRect = comp.cullingRect;
              leftDown = cullingRect.leftDown;
              rightTop = cullingRect.rightTop;
            } else {
              leftDown = _leftDown;
              rightTop = comp.rightTop;
            }

            switch (comp.renderOrder) {
              case RenderOrder.RightDown:
                traverseGrids(leftDown, rightTop, -1, 1, comp);
                break;

              case RenderOrder.LeftDown:
                traverseGrids(leftDown, rightTop, -1, -1, comp);
                break;

              case RenderOrder.RightUp:
                traverseGrids(leftDown, rightTop, 1, 1, comp);
                break;

              case RenderOrder.LeftUp:
              default:
                traverseGrids(leftDown, rightTop, 1, -1, comp);
                break;
            }

            comp.setCullingDirty(false);
            comp.setUserNodeDirty(false);
          }

          _renderData = null;
        },
        updateColor: function updateColor(tiled) {
          var color = tiled.color;
          var colorV = new Float32Array(4);
          colorV[0] = color.r / 255;
          colorV[1] = color.g / 255;
          colorV[2] = color.b / 255;
          colorV[0] = color.a / 255;
          var rs = tiled.meshRenderDataArray;

          if (rs) {
            for (var _iterator = _createForOfIteratorHelperLoose(rs), _step; !(_step = _iterator()).done;) {
              var r = _step.value;
              if (!r.renderData) continue;
              var renderData = r.renderData;
              var vs = renderData.vData;

              for (var _i = renderData.vertexStart, l = renderData.vertexCount; _i < l; _i++) {
                vs.set(colorV, _i * 9 + 5);
              }
            }
          }
        },
        fillBuffers: function fillBuffers(layer, renderer) {
          if (!layer || !layer.meshRenderDataArray) return;
          var dataArray = layer.meshRenderDataArray;
          var node = layer.node;
          var buffer = renderer.acquireBufferBatch();
          var vertexOffset = buffer.byteOffset >> 2;
          var indicesOffset = buffer.indicesOffset;
          var vertexId = buffer.vertexOffset;
          var data = dataArray[layer._meshRenderDataArrayIdx];
          var renderData = data.renderData;
          var isRecreate = buffer.request(renderData.vertexCount, renderData.indicesCount);

          if (!isRecreate) {
            buffer = renderer.currBufferBatch;
            vertexOffset = 0;
            indicesOffset = 0;
            vertexId = 0;
          }

          var vBuf = buffer.vData;
          var iBuf = buffer.iData;
          var matrix = node.worldMatrix;
          var srcVBuf = renderData.vData;
          var srcVIdx = renderData.vertexStart;
          vBuf.set(srcVBuf.slice(srcVIdx, srcVIdx + renderData.vertexCount * 9), vertexOffset);

          for (var _i2 = 0; _i2 < renderData.vertexCount; _i2++) {
            var pOffset = vertexOffset + _i2 * 9;

            _vec3u_temp.set(vBuf[pOffset], vBuf[pOffset + 1], vBuf[pOffset + 2]);

            _vec3u_temp.transformMat4(matrix);

            vBuf[pOffset] = _vec3u_temp.x;
            vBuf[pOffset + 1] = _vec3u_temp.y;
            vBuf[pOffset + 2] = _vec3u_temp.z;
          }

          var quadCount = renderData.vertexCount / 4;

          for (var _i3 = 0; _i3 < quadCount; _i3 += 1) {
            iBuf[indicesOffset] = vertexId;
            iBuf[indicesOffset + 1] = vertexId + 1;
            iBuf[indicesOffset + 2] = vertexId + 2;
            iBuf[indicesOffset + 3] = vertexId + 2;
            iBuf[indicesOffset + 4] = vertexId + 1;
            iBuf[indicesOffset + 5] = vertexId + 3;
            indicesOffset += 6;
            vertexId += 4;
          }
        }
      };

      function _flipTexture(inGrid, gid) {
        if (inGrid._rotated) {
          _uva.x = inGrid.r;
          _uva.y = inGrid.t;
          _uvb.x = inGrid.l;
          _uvb.y = inGrid.t;
          _uvc.x = inGrid.r;
          _uvc.y = inGrid.b;
          _uvd.x = inGrid.l;
          _uvd.y = inGrid.b;
        } else {
          _uva.x = inGrid.l;
          _uva.y = inGrid.t;
          _uvb.x = inGrid.l;
          _uvb.y = inGrid.b;
          _uvc.x = inGrid.r;
          _uvc.y = inGrid.t;
          _uvd.x = inGrid.r;
          _uvd.y = inGrid.b;
        }

        var tempVal;

        if ((gid & TileFlag.DIAGONAL) >>> 0) {
          tempVal = _uvb;
          _uvb = _uvc;
          _uvc = tempVal;
        }

        if ((gid & TileFlag.HORIZONTAL) >>> 0) {
          tempVal = _uva;
          _uva = _uvc;
          _uvc = tempVal;
          tempVal = _uvb;
          _uvb = _uvd;
          _uvd = tempVal;
        }

        if ((gid & TileFlag.VERTICAL) >>> 0) {
          tempVal = _uva;
          _uva = _uvb;
          _uvb = tempVal;
          tempVal = _uvc;
          _uvc = _uvd;
          _uvd = tempVal;
        }
      }

      function switchRenderData(curTexIdx, grid, comp) {
        if (!curTexIdx) curTexIdx = grid.texture;

        if (!_renderData.texture) {
          _renderData.texture = curTexIdx;
        }

        _renderData = comp.requestMeshRenderData();
        _renderData.texture = grid.texture;
      }

      function traverseGrids(leftDown, rightTop, rowMoveDir, colMoveDir, comp) {
        if (!_renderData || rightTop.row < 0 || rightTop.col < 0) return;

        if (!_renderData.renderData) {
          _renderData = comp.requestMeshRenderData();
        }

        var vertexBuf = _renderData.renderData.vData;
        _fillGrids = 0;
        _vfOffset = 0;
        var tiledTiles = comp.tiledTiles;
        var texGrids = comp.texGrids;
        var tiles = comp.tiles;
        var vertStep = 9;
        var vertStep2 = vertStep * 2;
        var vertStep3 = vertStep * 3;
        var vertices = comp.vertices;
        var rowData;
        var col;
        var cols;
        var row;
        var rows;
        var colData;
        var tileSize;
        var grid;
        var gid = 0;
        var left = 0;
        var bottom = 0;
        var right = 0;
        var top = 0;
        var tiledNode;
        var curTexIdx = null;
        var colNodesCount = 0;
        var checkColRange = true;
        var diamondTile = false;
        flipTexture =  _flipTexture;
        var color = new Float32Array(4);
        color[0] = comp.color.r / 255;
        color[1] = comp.color.g / 255;
        color[2] = comp.color.b / 255;
        color[3] = comp.color.a / 255;

        if (rowMoveDir === -1) {
          row = rightTop.row;
          rows = leftDown.row;
        } else {
          row = leftDown.row;
          rows = rightTop.row;
        }

        for (; (rows - row) * rowMoveDir >= 0; row += rowMoveDir) {
          rowData = vertices[row];
          colNodesCount = comp.getNodesCountByRow(row);
          checkColRange = rowData && colNodesCount === 0;

          if (colMoveDir === 1) {
            col = checkColRange && leftDown.col < rowData.minCol ? rowData.minCol : leftDown.col;
            cols = checkColRange && rightTop.col > rowData.maxCol ? rowData.maxCol : rightTop.col;
          } else {
            col = checkColRange && rightTop.col > rowData.maxCol ? rowData.maxCol : rightTop.col;
            cols = checkColRange && leftDown.col < rowData.minCol ? rowData.minCol : leftDown.col;
          }

          for (; (cols - col) * colMoveDir >= 0; col += colMoveDir) {
            colData = rowData && rowData[col];

            if (colNodesCount > 0) {
              var nodes = comp.requestSubNodesData();
              var celData = comp.getNodesByRowCol(row, col);

              if (celData && celData.count > 0) {
                nodes.subNodes = comp.getNodesByRowCol(row, col).list;
                curTexIdx = null;
                _renderData = comp.requestMeshRenderData();
              }
            }

            if (!colData) {
              continue;
            }

            gid = tiles[colData.index];
            grid = texGrids.get((gid & TileFlag.FLIPPED_MASK) >>> 0);
            if (!grid) continue;

            if (curTexIdx !== grid.texture) {
              switchRenderData(curTexIdx, grid, comp);
              curTexIdx = grid.texture;
            }

            tileSize = grid.tileset._tileSize;
            left = colData.left - _moveX;
            bottom = colData.bottom - _moveY;
            right = left + tileSize.width;
            top = bottom + tileSize.height;
            tiledNode = tiledTiles[colData.index];

            _renderData.renderData.reserve(4, 0);

            _vfOffset = _renderData.renderData.vertexCount * 9;
            vertexBuf = _renderData.renderData.vData;

            if (!tiledNode) {
              {
                vertexBuf[_vfOffset] = left;
                vertexBuf[_vfOffset + 1] = top;
                vertexBuf[_vfOffset + vertStep] = left;
                vertexBuf[_vfOffset + vertStep + 1] = bottom;
                vertexBuf[_vfOffset + vertStep2] = right;
                vertexBuf[_vfOffset + vertStep2 + 1] = top;
                vertexBuf[_vfOffset + vertStep3] = right;
                vertexBuf[_vfOffset + vertStep3 + 1] = bottom;
              }

              vertexBuf.set(color, _vfOffset + 5);
              vertexBuf.set(color, _vfOffset + vertStep + 5);
              vertexBuf.set(color, _vfOffset + vertStep2 + 5);
              vertexBuf.set(color, _vfOffset + vertStep3 + 5);
            } else if (tiledNode.node.active) {
              fillByTiledNode(tiledNode.node, color, vertexBuf, left, right, top, bottom, diamondTile);
            }

            flipTexture(grid, gid);
            vertexBuf[_vfOffset + 3] = _uva.x;
            vertexBuf[_vfOffset + 4] = _uva.y;
            vertexBuf[_vfOffset + vertStep + 3] = _uvb.x;
            vertexBuf[_vfOffset + vertStep + 4] = _uvb.y;
            vertexBuf[_vfOffset + vertStep2 + 3] = _uvc.x;
            vertexBuf[_vfOffset + vertStep2 + 4] = _uvc.y;
            vertexBuf[_vfOffset + vertStep3 + 3] = _uvd.x;
            vertexBuf[_vfOffset + vertStep3 + 4] = _uvd.y;
            _fillGrids++;

            _renderData.renderData.advance(4, 6);

            if (_fillGrids >= MaxGridsLimit) {
              switchRenderData(curTexIdx, grid, comp);
              curTexIdx = grid.texture;
            }
          }
        }
      }

      function fillByTiledNode(tiledNode, color, vbuf, left, right, top, bottom, diamondTile) {
        var vertStep = 9;
        var vertStep2 = vertStep * 2;
        var vertStep3 = vertStep * 3;
        tiledNode.updateWorldTransform();
        Mat4.fromRTS(_mat4_temp$1, tiledNode.getRotation(), tiledNode.getPosition(), tiledNode.getScale());
        Vec3.set(_vec3u_temp, -(left + _moveX), -(bottom + _moveY), 0);
        Mat4.transform(_mat4_temp$1, _mat4_temp$1, _vec3u_temp);
        var m = _mat4_temp$1;
        var tx = m.m12;
        var ty = m.m13;
        var a = m.m00;
        var b = m.m01;
        var c = m.m04;
        var d = m.m05;
        var justTranslate = a === 1 && b === 0 && c === 0 && d === 1;

        if (diamondTile) {
          var centerX = (left + right) / 2;
          var centerY = (top + bottom) / 2;

          if (justTranslate) {
            vbuf[_vfOffset] = centerX + tx;
            vbuf[_vfOffset + 1] = top + ty;
            vbuf[_vfOffset + vertStep] = left + tx;
            vbuf[_vfOffset + vertStep + 1] = centerY + ty;
            vbuf[_vfOffset + vertStep2] = right + tx;
            vbuf[_vfOffset + vertStep2 + 1] = centerY + ty;
            vbuf[_vfOffset + vertStep3] = centerX + tx;
            vbuf[_vfOffset + vertStep3 + 1] = bottom + ty;
          } else {
            vbuf[_vfOffset] = centerX * a + top * c + tx;
            vbuf[_vfOffset + 1] = centerX * b + top * d + ty;
            vbuf[_vfOffset + vertStep] = left * a + centerY * c + tx;
            vbuf[_vfOffset + vertStep + 1] = left * b + centerY * d + ty;
            vbuf[_vfOffset + vertStep2] = right * a + centerY * c + tx;
            vbuf[_vfOffset + vertStep2 + 1] = right * b + centerY * d + ty;
            vbuf[_vfOffset + vertStep3] = centerX * a + bottom * c + tx;
            vbuf[_vfOffset + vertStep3 + 1] = centerX * b + bottom * d + ty;
          }
        } else if (justTranslate) {
          vbuf[_vfOffset] = left + tx;
          vbuf[_vfOffset + 1] = top + ty;
          vbuf[_vfOffset + vertStep] = left + tx;
          vbuf[_vfOffset + vertStep + 1] = bottom + ty;
          vbuf[_vfOffset + vertStep2] = right + tx;
          vbuf[_vfOffset + vertStep2 + 1] = top + ty;
          vbuf[_vfOffset + vertStep3] = right + tx;
          vbuf[_vfOffset + vertStep3 + 1] = bottom + ty;
        } else {
          vbuf[_vfOffset] = left * a + top * c + tx;
          vbuf[_vfOffset + 1] = left * b + top * d + ty;
          vbuf[_vfOffset + vertStep] = left * a + bottom * c + tx;
          vbuf[_vfOffset + vertStep + 1] = left * b + bottom * d + ty;
          vbuf[_vfOffset + vertStep2] = right * a + top * c + tx;
          vbuf[_vfOffset + vertStep2 + 1] = right * b + top * d + ty;
          vbuf[_vfOffset + vertStep3] = right * a + bottom * c + tx;
          vbuf[_vfOffset + vertStep3 + 1] = right * b + bottom * d + ty;
        }

        vbuf.set(color, _vfOffset + 5);
        vbuf.set(color, _vfOffset + vertStep + 5);
        vbuf.set(color, _vfOffset + vertStep2 + 5);
        vbuf.set(color, _vfOffset + vertStep3 + 5);
      }

      var tiledLayerAssembler = exports('tiledLayerAssembler', {
        getAssembler: function getAssembler() {
          return simple;
        }
      });
      TiledLayer.Assembler = tiledLayerAssembler;

    }
  };
});
