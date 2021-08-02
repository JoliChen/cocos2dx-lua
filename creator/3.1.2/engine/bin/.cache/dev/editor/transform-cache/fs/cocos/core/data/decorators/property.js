"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = property;

var _internal253Aconstants = require("../../../../../virtual/internal%253Aconstants.js");

var _utils = require("./utils.js");

var _debug = require("../../platform/debug.js");

var _js = require("../../utils/js.js");

var _preprocessClass = require("../utils/preprocess-class.js");

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

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
 * @module decorator
 */
function property(target, propertyKey, descriptor) {
  let options = null;

  function normalized(target, propertyKey, descriptor) {
    const cache = (0, _utils.getClassCache)(target.constructor);

    if (cache) {
      const ccclassProto = (0, _utils.getSubDict)(cache, 'proto');
      const properties = (0, _utils.getSubDict)(ccclassProto, 'properties');
      genProperty(target.constructor, properties, propertyKey, options, descriptor, cache);
    }
  }

  if (target === undefined) {
    // @property() => LegacyPropertyDecorator
    return property({
      type: undefined
    });
  } else if (typeof propertyKey === 'undefined') {
    // @property(options) => LegacyPropertyDescriptor
    // @property(type) => LegacyPropertyDescriptor
    options = target;
    return normalized;
  } else {
    // @property
    normalized(target, propertyKey, descriptor);
  }
}

function getDefaultFromInitializer(initializer) {
  let value;

  try {
    value = initializer();
  } catch (e) {
    // just lazy initialize by CCClass
    return initializer;
  }

  if (typeof value !== 'object' || value === null) {
    // string boolean number function undefined null
    return value;
  } else {
    // The default attribute will not be used in ES6 constructor actually,
    // so we don't need to simplify into `{}` or `[]` or vec2 completely.
    return initializer;
  }
}

function extractActualDefaultValues(ctor) {
  let dummyObj;

  try {
    dummyObj = new ctor();
  } catch (e) {
    if (_internal253Aconstants.DEV) {
      (0, _debug.warnID)(3652, _js.js.getClassName(ctor), e);
    }

    return {};
  }

  return dummyObj;
}

function genProperty(ctor, properties, propertyKey, options, descriptor, cache) {
  let fullOptions;
  const isGetset = descriptor && (descriptor.get || descriptor.set);

  if (options) {
    fullOptions = (0, _preprocessClass.getFullFormOfProperty)(options, isGetset);
  }

  const existsPropertyRecord = properties[propertyKey];

  const propertyRecord = _js.js.mixin(existsPropertyRecord || {}, fullOptions || options || {});

  if (isGetset) {
    // typescript or babel
    if (_internal253Aconstants.DEV && options && ((fullOptions || options).get || (fullOptions || options).set)) {
      const errorProps = (0, _utils.getSubDict)(cache, 'errorProps');

      if (!errorProps[propertyKey]) {
        errorProps[propertyKey] = true;
        (0, _debug.warnID)(3655, propertyKey, _js.js.getClassName(ctor), propertyKey, propertyKey);
      }
    }

    if (descriptor.get) {
      propertyRecord.get = descriptor.get;
    }

    if (descriptor.set) {
      propertyRecord.set = descriptor.set;
    }
  } else {
    // Target property is non-accessor
    if (_internal253Aconstants.DEV && (propertyRecord.get || propertyRecord.set)) {
      // Specify "accessor options" for non-accessor property is forbidden.
      (0, _debug.errorID)(3655, propertyKey, _js.js.getClassName(ctor), propertyKey, propertyKey);
      return;
    }

    if (descriptor) {
      // In case of Babel, if an initializer is given for class field.
      // That initializer is passed to `descriptor.initializer`.
      // babel
      if (descriptor.initializer) {
        propertyRecord.default = getDefaultFromInitializer(descriptor.initializer);
      }
    } else {
      // In case of TypeScript, we can not directly capture the initializer.
      // We have to be hacking to extract the value.
      const actualDefaultValues = cache.default || (cache.default = extractActualDefaultValues(ctor));

      if (actualDefaultValues.hasOwnProperty(propertyKey)) {
        propertyRecord.default = actualDefaultValues[propertyKey];
      }
    }

    if (_internal253Aconstants.EDITOR && !window.Build || _internal253Aconstants.TEST) {
      if (!fullOptions && options && options.hasOwnProperty('default')) {
        (0, _debug.warnID)(3653, propertyKey, _js.js.getClassName(ctor));
      }
    }
  }

  properties[propertyKey] = propertyRecord;
}