System.register(['./shadows-72f55b4d.js', './index-2cafa4d0.js', './base.js', './renderable-component-2f25ce12.js', './screen-fa5a676a.js', './texture-buffer-pool-4f4e9cc6.js', './transform-utils-23cf3073.js', './json-asset-bf8c3142.js', './camera-component-51a857d1.js', './_commonjsHelpers-19d0a8b5.js', './ammo-instantiated-d59f43d3.js'], function (exports) {
    'use strict';
    var legacyCC;
    return {
        setters: [function (module) {
            legacyCC = module.l;
        }, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function () {}, function (module) {
            exports('default', module.w);
        }],
        execute: function () {

            function atob(input) {
              var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
              var output = '';
              var chr1 = 0;
              var chr2 = 0;
              var chr3 = 0;
              var enc1 = 0;
              var enc2 = 0;
              var enc3 = 0;
              var enc4 = 0;
              var i = 0;
              input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

              do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output += String.fromCharCode(chr1);

                if (enc3 !== 64) {
                  output += String.fromCharCode(chr2);
                }

                if (enc4 !== 64) {
                  output += String.fromCharCode(chr3);
                }
              } while (i < input.length);

              return output;
            }

            legacyCC._global.atob = atob;

        }
    };
});
