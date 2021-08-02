System.register("q-bundled:///fs/cocos/core/asset-manager/parser.js", ["../platform/sys.js", "../utils/index.js", "./cache.js", "./deserialize.js", "./helper.js", "./plist-parser.js", "./shared.js", "../assets/asset-enum.js"], function (_export, _context) {
  "use strict";

  var sys, js, Cache, deserialize, isScene, plistParser, files, parsed, PixelFormat, PVR_HEADER_LENGTH, PVR_MAGIC, PVR_HEADER_MAGIC, PVR_HEADER_FORMAT, PVR_HEADER_HEIGHT, PVR_HEADER_WIDTH, PVR_HEADER_MIPMAPCOUNT, PVR_HEADER_METADATA, ETC_PKM_HEADER_SIZE, ETC_PKM_FORMAT_OFFSET, ETC_PKM_ENCODED_WIDTH_OFFSET, ETC_PKM_ENCODED_HEIGHT_OFFSET, ETC_PKM_WIDTH_OFFSET, ETC_PKM_HEIGHT_OFFSET, ETC1_RGB_NO_MIPMAPS, ETC2_RGB_NO_MIPMAPS, ETC2_RGBA_NO_MIPMAPS, ASTC_MAGIC, ASTC_HEADER_LENGTH, ASTC_HEADER_MAGIC, ASTC_HEADER_BLOCKDIM, ASTC_HEADER_SIZE_X_BEGIN, ASTC_HEADER_SIZE_Y_BEGIN, ASTC_HEADER_SIZE_Z_BEGIN, Parser;

  function getASTCFormat(xdim, ydim) {
    if (xdim === 4) {
      return PixelFormat.RGBA_ASTC_4x4;
    }

    if (xdim === 5) {
      if (ydim === 4) {
        return PixelFormat.RGBA_ASTC_5x4;
      }

      return PixelFormat.RGBA_ASTC_5x5;
    }

    if (xdim === 6) {
      if (ydim === 5) {
        return PixelFormat.RGBA_ASTC_6x5;
      }

      return PixelFormat.RGBA_ASTC_6x6;
    }

    if (xdim === 8) {
      if (ydim === 5) {
        return PixelFormat.RGBA_ASTC_8x5;
      }

      if (ydim === 6) {
        return PixelFormat.RGBA_ASTC_8x6;
      }

      return PixelFormat.RGBA_ASTC_8x8;
    }

    if (xdim === 10) {
      if (ydim === 5) {
        return PixelFormat.RGBA_ASTC_10x5;
      }

      if (ydim === 6) {
        return PixelFormat.RGBA_ASTC_10x6;
      }

      if (ydim === 8) {
        return PixelFormat.RGBA_ASTC_10x8;
      }

      return PixelFormat.RGBA_ASTC_10x10;
    }

    if (ydim === 10) {
      return PixelFormat.RGBA_ASTC_12x10;
    }

    return PixelFormat.RGBA_ASTC_12x12;
  }

  function readBEUint16(header, offset) {
    return header[offset] << 8 | header[offset + 1];
  }

  return {
    setters: [function (_platformSysJs) {
      sys = _platformSysJs.sys;
    }, function (_utilsIndexJs) {
      js = _utilsIndexJs.js;
    }, function (_cacheJs) {
      Cache = _cacheJs.default;
    }, function (_deserializeJs) {
      deserialize = _deserializeJs.default;
    }, function (_helperJs) {
      isScene = _helperJs.isScene;
    }, function (_plistParserJs) {
      plistParser = _plistParserJs.default;
    }, function (_sharedJs) {
      files = _sharedJs.files;
      parsed = _sharedJs.parsed;
    }, function (_assetsAssetEnumJs) {
      PixelFormat = _assetsAssetEnumJs.PixelFormat;
    }],
    execute: function () {
      /*
       Copyright (c) 2019-2020 Xiamen Yaji Software Co., Ltd.
      
       https://www.cocos.com/
      
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated engine source code (the "Software"), a limited,
        worldwide, royalty-free, non-assignable, revocable and non-exclusive license
       to use Cocos Creator solely to develop games on your target platforms. You shall
        not use Cocos Creator software for developing other software or tools that's
        used for developing games. You are not granted to publish, distribute,
        sublicense, and/or sell copies of Cocos Creator.
      
       The software or tools in this License Agreement are licensed, not sold.
       Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.
      
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
       THE SOFTWARE.
       */

      /**
       * @packageDocumentation
       * @module asset-manager
       */
      // PVR constants //
      // https://github.com/toji/texture-tester/blob/master/js/webgl-texture-util.js#L424
      PVR_HEADER_LENGTH = 13; // The header length in 32 bit ints.

      PVR_MAGIC = 0x03525650; // 0x50565203;
      // Offsets into the header array.

      PVR_HEADER_MAGIC = 0;
      PVR_HEADER_FORMAT = 2;
      PVR_HEADER_HEIGHT = 6;
      PVR_HEADER_WIDTH = 7;
      PVR_HEADER_MIPMAPCOUNT = 11;
      PVR_HEADER_METADATA = 12; // ETC constants //

      ETC_PKM_HEADER_SIZE = 16;
      ETC_PKM_FORMAT_OFFSET = 6;
      ETC_PKM_ENCODED_WIDTH_OFFSET = 8;
      ETC_PKM_ENCODED_HEIGHT_OFFSET = 10;
      ETC_PKM_WIDTH_OFFSET = 12;
      ETC_PKM_HEIGHT_OFFSET = 14;
      ETC1_RGB_NO_MIPMAPS = 0;
      ETC2_RGB_NO_MIPMAPS = 1;
      ETC2_RGBA_NO_MIPMAPS = 3; //= ==============//
      // ASTC constants //
      //= ==============//
      // struct astc_header
      // {
      //  uint8_t magic[4];
      //  uint8_t blockdim_x;
      //  uint8_t blockdim_y;
      //  uint8_t blockdim_z;
      //  uint8_t xsize[3]; // x-size = xsize[0] + xsize[1] + xsize[2]
      //  uint8_t ysize[3]; // x-size, y-size and z-size are given in texels;
      //  uint8_t zsize[3]; // block count is inferred
      // };

      ASTC_MAGIC = 0x5CA1AB13;
      ASTC_HEADER_LENGTH = 16; // The header length

      ASTC_HEADER_MAGIC = 4;
      ASTC_HEADER_BLOCKDIM = 3;
      ASTC_HEADER_SIZE_X_BEGIN = 7;
      ASTC_HEADER_SIZE_Y_BEGIN = 10;
      ASTC_HEADER_SIZE_Z_BEGIN = 13;

      /**
       * @en
       * Parse the downloaded file, it's a singleton, all member can be accessed with `cc.assetManager.parser`
       *
       * @zh
       * 解析已下载的文件，parser 是一个单例, 所有成员能通过 `cc.assetManaager.parser` 访问
       *
       */
      _export("Parser", Parser = /*#__PURE__*/function () {
        function Parser() {
          this._parsing = new Cache();
          this._parsers = {
            '.png': this.parseImage,
            '.jpg': this.parseImage,
            '.bmp': this.parseImage,
            '.jpeg': this.parseImage,
            '.gif': this.parseImage,
            '.ico': this.parseImage,
            '.tiff': this.parseImage,
            '.webp': this.parseImage,
            '.image': this.parseImage,
            '.pvr': this.parsePVRTex,
            '.pkm': this.parsePKMTex,
            '.astc': this.parseASTCTex,
            // Audio
            '.mp3': this.parseAudio,
            '.ogg': this.parseAudio,
            '.wav': this.parseAudio,
            '.m4a': this.parseAudio,
            // plist
            '.plist': this.parsePlist,
            "import": this.parseImport
          };
        }

        var _proto = Parser.prototype;

        _proto.parseImage = function parseImage(file, options, onComplete) {
          if (file instanceof HTMLImageElement) {
            onComplete(null, file);
            return;
          }

          createImageBitmap(file, {
            premultiplyAlpha: 'none'
          }).then(function (result) {
            onComplete(null, result);
          }, function (err) {
            onComplete(err, null);
          });
        };

        _proto.parseAudio = function parseAudio(file, options, onComplete) {
          if (file instanceof ArrayBuffer) {
            sys.__audioSupport.context.decodeAudioData(file, function (buffer) {
              onComplete(null, buffer);
            }, function (e) {
              onComplete(new Error("Error with decoding audio data" + e.err), null);
            });
          } else {
            onComplete(null, file);
          }
        };

        _proto.parsePVRTex = function parsePVRTex(file, options, onComplete) {
          var err = null;
          var out = null;

          try {
            var buffer = file instanceof ArrayBuffer ? file : file.buffer; // Get a view of the arrayBuffer that represents the DDS header.

            var header = new Int32Array(buffer, 0, PVR_HEADER_LENGTH); // Do some sanity checks to make sure this is a valid DDS file.

            if (header[PVR_HEADER_MAGIC] === PVR_MAGIC) {
              // Gather other basic metrics and a view of the raw the DXT data.
              var width = header[PVR_HEADER_WIDTH];
              var height = header[PVR_HEADER_HEIGHT];
              var dataOffset = header[PVR_HEADER_METADATA] + 52; // todo: use new Uint8Array(buffer, dataOffset) instead
              // buffer = buffer.slice(dataOffset, buffer.byteLength);

              var pvrtcData = new Uint8Array(buffer, dataOffset);
              out = {
                _data: pvrtcData,
                _compressed: true,
                width: width,
                height: height,
                format: 0
              };
            } else if (header[11] === 0x21525650) {
              var headerLength = header[0];
              var _height = header[1];
              var _width = header[2]; // todo: use new Uint8Array(buffer, headerLength) instead
              // buffer = buffer.slice(headerLength, buffer.byteLength);

              var _pvrtcData = new Uint8Array(buffer, headerLength);

              out = {
                _data: _pvrtcData,
                _compressed: true,
                width: _width,
                height: _height,
                format: 0
              };
            } else {
              throw new Error('Invalid magic number in PVR header');
            }
          } catch (e) {
            err = e;
          }

          onComplete(err, out);
        };

        _proto.parsePKMTex = function parsePKMTex(file, options, onComplete) {
          var err = null;
          var out = null;

          try {
            var buffer = file instanceof ArrayBuffer ? file : file.buffer;
            var header = new Uint8Array(buffer);
            var format = readBEUint16(header, ETC_PKM_FORMAT_OFFSET);

            if (format !== ETC1_RGB_NO_MIPMAPS && format !== ETC2_RGB_NO_MIPMAPS && format !== ETC2_RGBA_NO_MIPMAPS) {
              throw new Error('Invalid magic number in ETC header');
            }

            var width = readBEUint16(header, ETC_PKM_WIDTH_OFFSET);
            var height = readBEUint16(header, ETC_PKM_HEIGHT_OFFSET);
            var encodedWidth = readBEUint16(header, ETC_PKM_ENCODED_WIDTH_OFFSET);
            var encodedHeight = readBEUint16(header, ETC_PKM_ENCODED_HEIGHT_OFFSET);
            var etcData = new Uint8Array(buffer, ETC_PKM_HEADER_SIZE);
            out = {
              _data: etcData,
              _compressed: true,
              width: width,
              height: height,
              format: 0
            };
          } catch (e) {
            err = e;
          }

          onComplete(err, out);
        };

        _proto.parseASTCTex = function parseASTCTex(file, options, onComplete) {
          var err = null;
          var out = null;

          try {
            var buffer = file instanceof ArrayBuffer ? file : file.buffer;
            var header = new Uint8Array(buffer);
            var magicval = header[0] + (header[1] << 8) + (header[2] << 16) + (header[3] << 24);

            if (magicval !== ASTC_MAGIC) {
              throw new Error('Invalid magic number in ASTC header');
            }

            var xdim = header[ASTC_HEADER_MAGIC];
            var ydim = header[ASTC_HEADER_MAGIC + 1];
            var zdim = header[ASTC_HEADER_MAGIC + 2];

            if ((xdim < 3 || xdim > 6 || ydim < 3 || ydim > 6 || zdim < 3 || zdim > 6) && (xdim < 4 || xdim === 7 || xdim === 9 || xdim === 11 || xdim > 12 || ydim < 4 || ydim === 7 || ydim === 9 || ydim === 11 || ydim > 12 || zdim !== 1)) {
              throw new Error('Invalid block number in ASTC header');
            }

            var format = getASTCFormat(xdim, ydim);
            var xsize = header[ASTC_HEADER_SIZE_X_BEGIN] + (header[ASTC_HEADER_SIZE_X_BEGIN + 1] << 8) + (header[ASTC_HEADER_SIZE_X_BEGIN + 2] << 16);
            var ysize = header[ASTC_HEADER_SIZE_Y_BEGIN] + (header[ASTC_HEADER_SIZE_Y_BEGIN + 1] << 8) + (header[ASTC_HEADER_SIZE_Y_BEGIN + 2] << 16);
            var zsize = header[ASTC_HEADER_SIZE_Z_BEGIN] + (header[ASTC_HEADER_SIZE_Z_BEGIN + 1] << 8) + (header[ASTC_HEADER_SIZE_Z_BEGIN + 2] << 16); // buffer = buffer.slice(ASTC_HEADER_LENGTH, buffer.byteLength);

            var astcData = new Uint8Array(buffer, ASTC_HEADER_LENGTH);
            out = {
              _data: astcData,
              _compressed: true,
              width: xsize,
              height: ysize,
              format: format
            };
          } catch (e) {
            err = e;
          }

          onComplete(err, out);
        };

        _proto.parsePlist = function parsePlist(file, options, onComplete) {
          var err = null;
          var result = plistParser.parse(file);

          if (!result) {
            err = new Error('parse failed');
          }

          onComplete(err, result);
        };

        _proto.parseImport = function parseImport(file, options, onComplete) {
          if (!file) {
            onComplete(new Error("The json file of asset " + options.__uuid__ + " is empty or missing"));
            return;
          }

          var result = null;
          var err = null;

          try {
            result = deserialize(file, options);
          } catch (e) {
            err = e;
          }

          onComplete(err, result);
        };

        _proto.init = function init() {
          this._parsing.clear();
        }
        /**
         * @en
         * Register custom handler if you want to change default behavior or extend parser to parse other format file
         *
         * @zh
         * 当你想修改默认行为或者拓展 parser 来解析其他格式文件时可以注册自定义的handler
         *
         * @param type - Extension likes '.jpg' or map likes {'.jpg': jpgHandler, '.png': pngHandler}
         * @param handler - The corresponding handler
         * @param handler.file - File
         * @param handler.options - Some optional paramter
         * @param handler.onComplete - callback when finishing parsing
         *
         * @example
         * parser.register('.tga', (file, options, onComplete) => onComplete(null, null));
         * parser.register({'.tga': (file, options, onComplete) => onComplete(null, null), '.ext': (file, options, onComplete) => onComplete(null, null)});
         *
         */
        ;

        _proto.register = function register(type, handler) {
          if (typeof type === 'object') {
            js.mixin(this._parsers, type);
          } else {
            this._parsers[type] = handler;
          }
        }
        /**
         * @en
         * Use corresponding handler to parse file
         *
         * @zh
         * 使用对应的handler来解析文件
         *
         * @param id - The id of file
         * @param file - File
         * @param type - The corresponding type of file, likes '.jpg'.
         * @param options - Some optional paramters will be transferred to the corresponding handler.
         * @param onComplete - callback when finishing downloading
         * @param onComplete.err - The occurred error, null indicetes success
         * @param onComplete.contetnt - The parsed file
         *
         * @example
         * downloader.download('test.jpg', 'test.jpg', '.jpg', {}, (err, file) => {
         *      parser.parse('test.jpg', file, '.jpg', null, (err, img) => console.log(err));
         * });
         *
         */
        ;

        _proto.parse = function parse(id, file, type, options, onComplete) {
          var _this = this;

          var parsedAsset = parsed.get(id);

          if (parsedAsset) {
            onComplete(null, parsedAsset);
            return;
          }

          var parsing = this._parsing.get(id);

          if (parsing) {
            parsing.push(onComplete);
            return;
          }

          var parseHandler = this._parsers[type];

          if (!parseHandler) {
            onComplete(null, file);
            return;
          }

          this._parsing.add(id, [onComplete]);

          parseHandler(file, options, function (err, data) {
            if (err) {
              files.remove(id);
            } else if (!isScene(data)) {
              parsed.add(id, data);
            }

            var callbacks = _this._parsing.remove(id);

            for (var i = 0, l = callbacks.length; i < l; i++) {
              callbacks[i](err, data);
            }
          });
        };

        return Parser;
      }());

      _export("default", new Parser());
    }
  };
});