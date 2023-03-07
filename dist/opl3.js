(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OPL3 = factory());
})(this, (function () { 'use strict';

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function () {
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	function _regeneratorRuntime() {
	  _regeneratorRuntime = function () {
	    return exports;
	  };
	  var exports = {},
	    Op = Object.prototype,
	    hasOwn = Op.hasOwnProperty,
	    defineProperty = Object.defineProperty || function (obj, key, desc) {
	      obj[key] = desc.value;
	    },
	    $Symbol = "function" == typeof Symbol ? Symbol : {},
	    iteratorSymbol = $Symbol.iterator || "@@iterator",
	    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
	    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  function define(obj, key, value) {
	    return Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: !0,
	      configurable: !0,
	      writable: !0
	    }), obj[key];
	  }
	  try {
	    define({}, "");
	  } catch (err) {
	    define = function (obj, key, value) {
	      return obj[key] = value;
	    };
	  }
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
	      generator = Object.create(protoGenerator.prototype),
	      context = new Context(tryLocsList || []);
	    return defineProperty(generator, "_invoke", {
	      value: makeInvokeMethod(innerFn, self, context)
	    }), generator;
	  }
	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }
	  exports.wrap = wrap;
	  var ContinueSentinel = {};
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });
	  var getProto = Object.getPrototypeOf,
	    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      define(prototype, method, function (arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }
	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if ("throw" !== record.type) {
	        var result = record.arg,
	          value = result.value;
	        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
	          invoke("next", value, resolve, reject);
	        }, function (err) {
	          invoke("throw", err, resolve, reject);
	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
	          result.value = unwrapped, resolve(result);
	        }, function (error) {
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	      reject(record.arg);
	    }
	    var previousPromise;
	    defineProperty(this, "_invoke", {
	      value: function (method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new PromiseImpl(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }
	        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      }
	    });
	  }
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = "suspendedStart";
	    return function (method, arg) {
	      if ("executing" === state) throw new Error("Generator is already running");
	      if ("completed" === state) {
	        if ("throw" === method) throw arg;
	        return doneResult();
	      }
	      for (context.method = method, context.arg = arg;;) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }
	        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
	          if ("suspendedStart" === state) throw state = "completed", context.arg;
	          context.dispatchException(context.arg);
	        } else "return" === context.method && context.abrupt("return", context.arg);
	        state = "executing";
	        var record = tryCatch(innerFn, self, context);
	        if ("normal" === record.type) {
	          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
	          return {
	            value: record.arg,
	            done: context.done
	          };
	        }
	        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
	      }
	    };
	  }
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (undefined === method) {
	      if (context.delegate = null, "throw" === context.method) {
	        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
	        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
	      }
	      return ContinueSentinel;
	    }
	    var record = tryCatch(method, delegate.iterator, context.arg);
	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
	    var info = record.arg;
	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
	  }
	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };
	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
	  }
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal", delete record.arg, entry.completion = record;
	  }
	  function Context(tryLocsList) {
	    this.tryEntries = [{
	      tryLoc: "root"
	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
	  }
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) return iteratorMethod.call(iterable);
	      if ("function" == typeof iterable.next) return iterable;
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	          next = function next() {
	            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
	            return next.value = undefined, next.done = !0, next;
	          };
	        return next.next = next;
	      }
	    }
	    return {
	      next: doneResult
	    };
	  }
	  function doneResult() {
	    return {
	      value: undefined,
	      done: !0
	    };
	  }
	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
	    value: GeneratorFunctionPrototype,
	    configurable: !0
	  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
	    value: GeneratorFunction,
	    configurable: !0
	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
	    var ctor = "function" == typeof genFun && genFun.constructor;
	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
	  }, exports.mark = function (genFun) {
	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
	  }, exports.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    void 0 === PromiseImpl && (PromiseImpl = Promise);
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
	    return this;
	  }), define(Gp, "toString", function () {
	    return "[object Generator]";
	  }), exports.keys = function (val) {
	    var object = Object(val),
	      keys = [];
	    for (var key in object) keys.push(key);
	    return keys.reverse(), function next() {
	      for (; keys.length;) {
	        var key = keys.pop();
	        if (key in object) return next.value = key, next.done = !1, next;
	      }
	      return next.done = !0, next;
	    };
	  }, exports.values = values, Context.prototype = {
	    constructor: Context,
	    reset: function (skipTempReset) {
	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
	    },
	    stop: function () {
	      this.done = !0;
	      var rootRecord = this.tryEntries[0].completion;
	      if ("throw" === rootRecord.type) throw rootRecord.arg;
	      return this.rval;
	    },
	    dispatchException: function (exception) {
	      if (this.done) throw exception;
	      var context = this;
	      function handle(loc, caught) {
	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
	      }
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i],
	          record = entry.completion;
	        if ("root" === entry.tryLoc) return handle("end");
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc"),
	            hasFinally = hasOwn.call(entry, "finallyLoc");
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
	          } else {
	            if (!hasFinally) throw new Error("try statement without catch or finally");
	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
	          }
	        }
	      }
	    },
	    abrupt: function (type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
	      var record = finallyEntry ? finallyEntry.completion : {};
	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
	    },
	    complete: function (record, afterLoc) {
	      if ("throw" === record.type) throw record.arg;
	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
	    },
	    finish: function (finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
	      }
	    },
	    catch: function (tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if ("throw" === record.type) {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function (iterable, resultName, nextLoc) {
	      return this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
	    }
	  }, exports;
	}
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}
	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }
	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}
	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	      args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);
	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }
	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }
	      _next(undefined);
	    });
	  };
	}
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}
	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }
	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  Object.defineProperty(subClass, "prototype", {
	    writable: false
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}
	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}
	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}
	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;
	  try {
	    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	  return self;
	}
	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }
	  return _assertThisInitialized(self);
	}
	function _createSuper(Derived) {
	  var hasNativeReflectConstruct = _isNativeReflectConstruct();
	  return function _createSuperInternal() {
	    var Super = _getPrototypeOf(Derived),
	      result;
	    if (hasNativeReflectConstruct) {
	      var NewTarget = _getPrototypeOf(this).constructor;
	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }
	    return _possibleConstructorReturn(this, result);
	  };
	}
	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }
	  return object;
	}
	function _get() {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get.bind();
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);
	      if (desc.get) {
	        return desc.get.call(arguments.length < 3 ? target : receiver);
	      }
	      return desc.value;
	    };
	  }
	  return _get.apply(this, arguments);
	}
	function _classPrivateFieldGet(receiver, privateMap) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
	  return _classApplyDescriptorGet(receiver, descriptor);
	}
	function _classPrivateFieldSet(receiver, privateMap, value) {
	  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
	  _classApplyDescriptorSet(receiver, descriptor, value);
	  return value;
	}
	function _classExtractFieldDescriptor(receiver, privateMap, action) {
	  if (!privateMap.has(receiver)) {
	    throw new TypeError("attempted to " + action + " private field on non-instance");
	  }
	  return privateMap.get(receiver);
	}
	function _classApplyDescriptorGet(receiver, descriptor) {
	  if (descriptor.get) {
	    return descriptor.get.call(receiver);
	  }
	  return descriptor.value;
	}
	function _classApplyDescriptorSet(receiver, descriptor, value) {
	  if (descriptor.set) {
	    descriptor.set.call(receiver, value);
	  } else {
	    if (!descriptor.writable) {
	      throw new TypeError("attempted to set read only private field");
	    }
	    descriptor.value = value;
	  }
	}
	function _checkPrivateRedeclaration(obj, privateCollection) {
	  if (privateCollection.has(obj)) {
	    throw new TypeError("Cannot initialize the same private elements twice on an object");
	  }
	}
	function _classPrivateFieldInitSpec(obj, privateMap, value) {
	  _checkPrivateRedeclaration(obj, privateMap);
	  privateMap.set(obj, value);
	}

	var OPL3$1 = /*#__PURE__*/function () {
	  function OPL3() {
	    _classCallCheck(this, OPL3);
	    this.nts = 0;
	    this.dam = 0;
	    this.dvb = 0;
	    this.ryt = 0;
	    this.bd = 0;
	    this.sd = 0;
	    this.tom = 0;
	    this.tc = 0;
	    this.hh = 0;
	    this._new = 0;
	    this.connectionsel = 0;
	    this.vibratoIndex = 0;
	    this.tremoloIndex = 0;
	    this.registers = new Int32Array(0x200);
	    this.channels = [new Array(9), new Array(9)];
	    this.initOperators();
	    this.initChannels2op();
	    this.initChannels4op();
	    this.initRhythmChannels();
	    this.initChannels();
	    this.output = new Int16Array(2);
	    this.outputBuffer = new Float64Array(4);
	    this.outputChannelNumber = 2;
	  }

	  // output: Int16Array | Float32Array
	  _createClass(OPL3, [{
	    key: "read",
	    value: function read(output, seek, len) {
	      var offset = seek || 0;
	      output = output || this.output;
	      var output_length = len || output.length;
	      var converterScale = output instanceof Float32Array ? 32768 : 1;
	      do {
	        var channelOutput, outputChannelNumber;
	        for (outputChannelNumber = 0; outputChannelNumber < 4; outputChannelNumber++) {
	          this.outputBuffer[outputChannelNumber] = 0;
	        }

	        // If _new = 0, use OPL2 mode with 9 channels. If _new = 1, use OPL3 18 channels;
	        for (var array = 0; array < this._new + 1; array++) {
	          for (var channelNumber = 0; channelNumber < 9; channelNumber++) {
	            // Reads output from each OPL3 channel, and accumulates it in the output buffer:
	            channelOutput = this.channels[array][channelNumber].getChannelOutput();
	            for (outputChannelNumber = 0; outputChannelNumber < 4; outputChannelNumber++) {
	              this.outputBuffer[outputChannelNumber] += channelOutput[outputChannelNumber];
	            }
	          }
	        }

	        // Normalizes the output buffer after all channels have been added,
	        // with a maximum of 18 channels,
	        // and multiplies it to get the 16 bit signed output.
	        for (outputChannelNumber = 0; outputChannelNumber < this.outputChannelNumber; outputChannelNumber++) {
	          output[offset + outputChannelNumber] = this.outputBuffer[outputChannelNumber] / 18 * 0x7FFF / converterScale;
	        }

	        // Advances the OPL3-wide vibrato index, which is used by
	        // PhaseGenerator.getPhase() in each Operator.
	        this.vibratoIndex++;
	        if (this.vibratoIndex >= OPL3Data.vibratoTable[this.dvb].length) this.vibratoIndex = 0;
	        // Advances the OPL3-wide tremolo index, which is used by
	        // EnvelopeGenerator.getEnvelope() in each Operator.
	        this.tremoloIndex++;
	        if (this.tremoloIndex >= OPL3Data.tremoloTable[this.dam].length) this.tremoloIndex = 0;
	        offset += this.outputChannelNumber;
	      } while (offset < output_length);
	      return output;
	    }
	  }, {
	    key: "write",
	    value: function write(array, address, data) {
	      // The OPL3 has two registers arrays, each with adresses ranging
	      // from 0x00 to 0xF5.
	      // This emulator uses one array, with the two original register arrays
	      // starting at 0x00 and at 0x100.
	      var registerAddress = array << 8 | address;
	      // If the address is out of the OPL3 memory map, returns.
	      if (registerAddress < 0 || registerAddress >= 0x200) return;
	      this.registers[registerAddress] = data;
	      switch (address & 0xe0) {
	        // The first 3 bits masking gives the type of the register by using its base address:
	        // 0x00, 0x20, 0x40, 0x60, 0x80, 0xA0, 0xC0, 0xE0
	        // When it is needed, we further separate the register type inside each base address,
	        // which is the case of 0x00 and 0xA0.

	        // Through out this emulator we will use the same name convention to
	        // reference a byte with several bit registers.
	        // The name of each bit register will be followed by the number of bits
	        // it occupies inside the byte.
	        // Numbers without accompanying names are unused bits.
	        case 0x00:
	          // Unique registers for the entire OPL3:
	          if (array == 1) {
	            if (address == 0x04) this.update_2_CONNECTIONSEL6();else if (address == 0x05) {
	              //console.log(array, address, data);
	              this.update_7_NEW1();
	            }
	          } else if (address == 0x08) this.update_1_NTS1_6();
	          break;
	        case 0xA0:
	          // 0xBD is a control register for the entire OPL3:
	          if (address == 0xBD) {
	            if (array == 0) this.update_DAM1_DVB1_RYT1_BD1_SD1_TOM1_TC1_HH1();
	            break;
	          }
	          // Registers for each channel are in A0-A8, B0-B8, C0-C8, in both register arrays.
	          // 0xB0...0xB8 keeps kon,block,fnum(h) for each channel.
	          if ((address & 0xF0) == 0xB0 && address <= 0xB8) {
	            // If the address is in the second register array, adds 9 to the channel number.
	            // The channel number is given by the last four bits, like in A0,...,A8.
	            this.channels[array][address & 0x0F].update_2_KON1_BLOCK3_FNUMH2();
	            break;
	          }
	          // 0xA0...0xA8 keeps fnum(l) for each channel.
	          if ((address & 0xF0) == 0xA0 && address <= 0xA8) this.channels[array][address & 0x0F].update_FNUML8();
	          break;
	        // 0xC0...0xC8 keeps cha,chb,chc,chd,fb,cnt for each channel:
	        case 0xC0:
	          if (address <= 0xC8) this.channels[array][address & 0x0F].update_CHD1_CHC1_CHB1_CHA1_FB3_CNT1();
	          break;
	        // Registers for each of the 36 Operators:
	        default:
	          var operatorOffset = address & 0x1F;
	          if (!this.operators[array][operatorOffset]) break;
	          switch (address & 0xE0) {
	            // 0x20...0x35 keeps am,vib,egt,ksr,mult for each operator:
	            case 0x20:
	              this.operators[array][operatorOffset].update_AM1_VIB1_EGT1_KSR1_MULT4();
	              break;
	            // 0x40...0x55 keeps ksl,tl for each operator:
	            case 0x40:
	              this.operators[array][operatorOffset].update_KSL2_TL6();
	              break;
	            // 0x60...0x75 keeps ar,dr for each operator:
	            case 0x60:
	              this.operators[array][operatorOffset].update_AR4_DR4();
	              break;
	            // 0x80...0x95 keeps sl,rr for each operator:
	            case 0x80:
	              this.operators[array][operatorOffset].update_SL4_RR4();
	              break;
	            // 0xE0...0xF5 keeps ws for each operator:
	            case 0xE0:
	              this.operators[array][operatorOffset].update_5_WS3();
	          }
	      }
	    }
	  }, {
	    key: "initOperators",
	    value: function initOperators() {
	      // The YMF262 has 36 operators:
	      this.operators = [[], []];
	      for (var array = 0; array < 2; array++) {
	        for (var group = 0; group <= 0x10; group += 8) {
	          for (var offset = 0; offset < 6; offset++) {
	            var baseAddress = array << 8 | group + offset;
	            this.operators[array][group + offset] = new Operator(baseAddress, this);
	          }
	        }
	      }

	      // Create specific operators to switch when in rhythm mode:
	      this.highHatOperator = new HighHatOperator(this);
	      this.snareDrumOperator = new SnareDrumOperator(this);
	      this.tomTomOperator = new TomTomOperator(this);
	      this.topCymbalOperator = new TopCymbalOperator(this);

	      // Save operators when they are in non-rhythm mode:
	      // Channel 7:
	      this.highHatOperatorInNonRhythmMode = this.operators[0][0x11];
	      this.snareDrumOperatorInNonRhythmMode = this.operators[0][0x14];
	      // Channel 8:
	      this.tomTomOperatorInNonRhythmMode = this.operators[0][0x12];
	      this.topCymbalOperatorInNonRhythmMode = this.operators[0][0x15];
	    }
	  }, {
	    key: "initChannels2op",
	    value: function initChannels2op() {
	      // The YMF262 has 18 2-op channels.
	      // Each 2-op channel can be at a serial or parallel operator configuration:
	      this.channels2op = [[], []];
	      for (var array = 0; array < 2; array++) {
	        for (var channelNumber = 0; channelNumber < 3; channelNumber++) {
	          var baseAddress = array << 8 | channelNumber;
	          // Channels 1, 2, 3 -> Operator offsets 0x0,0x3; 0x1,0x4; 0x2,0x5
	          this.channels2op[array][channelNumber] = new Channel2op(baseAddress, this.operators[array][channelNumber], this.operators[array][channelNumber + 0x3], this);
	          // Channels 4, 5, 6 -> Operator offsets 0x8,0xB; 0x9,0xC; 0xA,0xD
	          this.channels2op[array][channelNumber + 3] = new Channel2op(baseAddress + 3, this.operators[array][channelNumber + 0x8], this.operators[array][channelNumber + 0xb], this);
	          // Channels 7, 8, 9 -> Operators 0x10,0x13; 0x11,0x14; 0x12,0x15
	          this.channels2op[array][channelNumber + 6] = new Channel2op(baseAddress + 6, this.operators[array][channelNumber + 0x10], this.operators[array][channelNumber + 0x13], this);
	        }
	      }
	    }
	  }, {
	    key: "initChannels4op",
	    value: function initChannels4op() {
	      // The YMF262 has 3 4-op channels in each array:
	      this.channels4op = [[], []];
	      for (var array = 0; array < 2; array++) {
	        for (var channelNumber = 0; channelNumber < 3; channelNumber++) {
	          var baseAddress = array << 8 | channelNumber;
	          // Channels 1, 2, 3 -> Operators 0x0,0x3,0x8,0xB; 0x1,0x4,0x9,0xC; 0x2,0x5,0xA,0xD;
	          this.channels4op[array][channelNumber] = new Channel4op(baseAddress, this.operators[array][channelNumber], this.operators[array][channelNumber + 0x3], this.operators[array][channelNumber + 0x8], this.operators[array][channelNumber + 0xb], this);
	        }
	      }
	    }
	  }, {
	    key: "initRhythmChannels",
	    value: function initRhythmChannels() {
	      this.bassDrumChannel = new BassDrumChannel(this);
	      this.highHatSnareDrumChannel = new HighHatSnareDrumChannel(this);
	      this.tomTomTopCymbalChannel = new TomTomTopCymbalChannel(this);
	    }
	  }, {
	    key: "initChannels",
	    value: function initChannels() {
	      // Channel is an abstract class that can be a 2-op, 4-op, rhythm or disabled channel,
	      // depending on the OPL3 configuration at the time.
	      // channels[] inits as a 2-op serial channel array:
	      for (var array = 0; array < 2; array++) {
	        for (var i = 0; i < 9; i++) {
	          this.channels[array][i] = this.channels2op[array][i];
	        }
	      }

	      // Unique instance to fill future gaps in the Channel array,
	      // when there will be switches between 2op and 4op mode.
	      this.disabledChannel = new DisabledChannel(this);
	    }
	  }, {
	    key: "update_1_NTS1_6",
	    value: function update_1_NTS1_6() {
	      var _1_nts1_6 = this.registers[OPL3Data._1_NTS1_6_Offset];
	      // Note Selection. This register is used in Channel.updateOperators() implementations,
	      // to calculate the channel´s Key Scale Number.
	      // The value of the actual envelope rate follows the value of
	      // OPL3.nts,Operator.keyScaleNumber and Operator.ksr
	      this.nts = (_1_nts1_6 & 0x40) >> 6;
	    }
	  }, {
	    key: "update_DAM1_DVB1_RYT1_BD1_SD1_TOM1_TC1_HH1",
	    value: function update_DAM1_DVB1_RYT1_BD1_SD1_TOM1_TC1_HH1() {
	      var dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 = this.registers[OPL3Data.DAM1_DVB1_RYT1_BD1_SD1_TOM1_TC1_HH1_Offset];
	      // Depth of amplitude. This register is used in EnvelopeGenerator.getEnvelope();
	      this.dam = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x80) >> 7;

	      // Depth of vibrato. This register is used in PhaseGenerator.getPhase();
	      this.dvb = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x40) >> 6;
	      var new_ryt = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x20) >> 5;
	      if (new_ryt != this.ryt) {
	        this.ryt = new_ryt;
	        this.setRhythmMode();
	      }
	      var new_bd = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x10) >> 4;
	      if (new_bd != this.bd) {
	        this.bd = new_bd;
	        if (this.bd == 1) {
	          this.bassDrumChannel.op1.keyOn();
	          this.bassDrumChannel.op2.keyOn();
	        }
	      }
	      var new_sd = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x08) >> 3;
	      if (new_sd != this.sd) {
	        this.sd = new_sd;
	        if (this.sd == 1) this.snareDrumOperator.keyOn();
	      }
	      var new_tom = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x04) >> 2;
	      if (new_tom != this.tom) {
	        this.tom = new_tom;
	        if (this.tom == 1) this.tomTomOperator.keyOn();
	      }
	      var new_tc = (dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x02) >> 1;
	      if (new_tc != this.tc) {
	        this.tc = new_tc;
	        if (this.tc == 1) this.topCymbalOperator.keyOn();
	      }
	      var new_hh = dam1_dvb1_ryt1_bd1_sd1_tom1_tc1_hh1 & 0x01;
	      if (new_hh != this.hh) {
	        this.hh = new_hh;
	        if (this.hh == 1) this.highHatOperator.keyOn();
	      }
	    }
	  }, {
	    key: "update_7_NEW1",
	    value: function update_7_NEW1() {
	      var _7_new1 = this.registers[OPL3Data._7_NEW1_Offset];
	      // OPL2/OPL3 mode selection. This register is used in
	      // OPL3.read(), OPL3.write() and Operator.getOperatorOutput();
	      this._new = _7_new1 & 0x01;
	      if (this._new == 1) this.setEnabledChannels();
	      this.set4opConnections();
	    }
	  }, {
	    key: "setEnabledChannels",
	    value: function setEnabledChannels() {
	      for (var array = 0; array < 2; array++) {
	        for (var i = 0; i < 9; i++) {
	          var baseAddress = this.channels[array][i].channelBaseAddress;
	          this.registers[baseAddress + ChannelData.CHD1_CHC1_CHB1_CHA1_FB3_CNT1_Offset] |= 0xf0;
	          this.channels[array][i].update_CHD1_CHC1_CHB1_CHA1_FB3_CNT1();
	        }
	      }
	    }
	  }, {
	    key: "update_2_CONNECTIONSEL6",
	    value: function update_2_CONNECTIONSEL6() {
	      // This method is called only if _new is set.
	      var _2_connectionsel6 = this.registers[OPL3Data._2_CONNECTIONSEL6_Offset];
	      // 2-op/4-op channel selection. This register is used here to configure the OPL3.channels[] array.
	      this.connectionsel = _2_connectionsel6 & 0x3f;
	      this.set4opConnections();
	    }
	  }, {
	    key: "set4opConnections",
	    value: function set4opConnections() {
	      // bits 0, 1, 2 sets respectively 2-op channels (1,4), (2,5), (3,6) to 4-op operation.
	      // bits 3, 4, 5 sets respectively 2-op channels (10,13), (11,14), (12,15) to 4-op operation.
	      for (var array = 0; array < 2; ++array) {
	        for (var i = 0; i < 3; ++i) {
	          if (this._new == 1) {
	            var shift = array * 3 + i;
	            var connectionBit = this.connectionsel >> shift & 0x01;
	            if (connectionBit == 1) {
	              this.channels[array][i] = this.channels4op[array][i];
	              this.channels[array][i + 3] = this.disabledChannel;
	              this.channels[array][i].updateChannel();
	              continue;
	            }
	          }
	          this.channels[array][i] = this.channels2op[array][i];
	          this.channels[array][i + 3] = this.channels2op[array][i + 3];
	          this.channels[array][i].updateChannel();
	          this.channels[array][i + 3].updateChannel();
	        }
	      }
	    }
	  }, {
	    key: "setRhythmMode",
	    value: function setRhythmMode() {
	      var i;
	      if (this.ryt == 1) {
	        this.channels[0][6] = this.bassDrumChannel;
	        this.channels[0][7] = this.highHatSnareDrumChannel;
	        this.channels[0][8] = this.tomTomTopCymbalChannel;
	        this.operators[0][0x11] = this.highHatOperator;
	        this.operators[0][0x14] = this.snareDrumOperator;
	        this.operators[0][0x12] = this.tomTomOperator;
	        this.operators[0][0x15] = this.topCymbalOperator;
	      } else {
	        for (i = 6; i <= 8; i++) {
	          this.channels[0][i] = this.channels2op[0][i];
	        }
	        this.operators[0][0x11] = this.highHatOperatorInNonRhythmMode;
	        this.operators[0][0x14] = this.snareDrumOperatorInNonRhythmMode;
	        this.operators[0][0x12] = this.tomTomOperatorInNonRhythmMode;
	        this.operators[0][0x15] = this.topCymbalOperatorInNonRhythmMode;
	      }
	      for (i = 6; i <= 8; i++) {
	        this.channels[0][i].updateChannel();
	      }
	    }
	  }]);
	  return OPL3;
	}();
	var opl3 = OPL3$1;
	var Channel = /*#__PURE__*/function () {
	  function Channel(baseAddress, opl) {
	    _classCallCheck(this, Channel);
	    this.opl = opl;
	    this.channelBaseAddress = baseAddress;
	    this.fnuml = 0;
	    this.fnumh = 0;
	    this.kon = 0;
	    this.block = 0;
	    this.cha = 0;
	    this.chb = 0;
	    this.chc = 0;
	    this.chd = 0;
	    this.fb = 0;
	    this.cnt = 0;
	    this.feedback = [0, 0];
	    this.toPhase = 4;
	    this.output = new Float64Array(4);
	  }
	  _createClass(Channel, [{
	    key: "update_2_KON1_BLOCK3_FNUMH2",
	    value: function update_2_KON1_BLOCK3_FNUMH2() {
	      var _2_kon1_block3_fnumh2 = this.opl.registers[this.channelBaseAddress + ChannelData._2_KON1_BLOCK3_FNUMH2_Offset];

	      // Frequency Number (hi-register) and Block. These two registers, together with fnuml,
	      // sets the Channel´s base frequency;
	      this.block = (_2_kon1_block3_fnumh2 & 0x1c) >> 2;
	      this.fnumh = _2_kon1_block3_fnumh2 & 0x03;
	      this.updateOperators();

	      // Key On. If changed, calls Channel.keyOn() / keyOff().
	      var newKon = (_2_kon1_block3_fnumh2 & 0x20) >> 5;
	      if (newKon != this.kon) {
	        if (newKon == 1) this.keyOn();else this.keyOff();
	        this.kon = newKon;
	      }
	    }
	  }, {
	    key: "update_FNUML8",
	    value: function update_FNUML8() {
	      var fnuml8 = this.opl.registers[this.channelBaseAddress + ChannelData.FNUML8_Offset];
	      // Frequency Number, low register.
	      this.fnuml = fnuml8 & 0xff;
	      this.updateOperators();
	    }
	  }, {
	    key: "update_CHD1_CHC1_CHB1_CHA1_FB3_CNT1",
	    value: function update_CHD1_CHC1_CHB1_CHA1_FB3_CNT1() {
	      var chd1_chc1_chb1_cha1_fb3_cnt1 = this.opl.registers[this.channelBaseAddress + ChannelData.CHD1_CHC1_CHB1_CHA1_FB3_CNT1_Offset];
	      this.chd = (chd1_chc1_chb1_cha1_fb3_cnt1 & 0x80) >> 7;
	      this.chc = (chd1_chc1_chb1_cha1_fb3_cnt1 & 0x40) >> 6;
	      this.chb = (chd1_chc1_chb1_cha1_fb3_cnt1 & 0x20) >> 5;
	      this.cha = (chd1_chc1_chb1_cha1_fb3_cnt1 & 0x10) >> 4;
	      this.fb = (chd1_chc1_chb1_cha1_fb3_cnt1 & 0x0e) >> 1;
	      this.cnt = chd1_chc1_chb1_cha1_fb3_cnt1 & 0x01;
	      this.updateOperators();
	    }
	  }, {
	    key: "updateChannel",
	    value: function updateChannel() {
	      this.update_2_KON1_BLOCK3_FNUMH2();
	      this.update_FNUML8();
	      this.update_CHD1_CHC1_CHB1_CHA1_FB3_CNT1();
	    }
	  }, {
	    key: "getInFourChannels",
	    value: function getInFourChannels(channelOutput) {
	      if (this.opl._new == 0) {
	        this.output[0] = this.output[1] = this.output[2] = this.output[3] = channelOutput;
	      } else {
	        this.output[0] = this.cha == 1 ? channelOutput : 0;
	        this.output[1] = this.chb == 1 ? channelOutput : 0;
	        this.output[2] = this.chc == 1 ? channelOutput : 0;
	        this.output[3] = this.chd == 1 ? channelOutput : 0;
	      }
	      return this.output;
	    }
	  }]);
	  return Channel;
	}();
	var Channel2op = /*#__PURE__*/function (_Channel) {
	  _inherits(Channel2op, _Channel);
	  var _super = _createSuper(Channel2op);
	  function Channel2op(baseAddress, o1, o2, opl) {
	    var _this;
	    _classCallCheck(this, Channel2op);
	    _this = _super.call(this, baseAddress, opl);
	    _this.op1 = o1;
	    _this.op2 = o2;
	    return _this;
	  }
	  _createClass(Channel2op, [{
	    key: "getChannelOutput",
	    value: function getChannelOutput() {
	      var channelOutput = 0,
	        op1Output = 0,
	        op2Output = 0;
	      // The feedback uses the last two outputs from
	      // the first operator, instead of just the last one.
	      var feedbackOutput = (this.feedback[0] + this.feedback[1]) / 2;
	      if (this.cnt == 0) {
	        // CNT = 0, the operators are in series, with the first in feedback.
	        if (this.op2.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	        op1Output = this.op1.getOperatorOutput(feedbackOutput);
	        channelOutput = this.op2.getOperatorOutput(op1Output * this.toPhase);
	      } else {
	        // CNT = 1, the operators are in parallel, with the first in feedback.
	        if (this.op1.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF && this.op2.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	        op1Output = this.op1.getOperatorOutput(feedbackOutput);
	        op2Output = this.op2.getOperatorOutput(Operator.noModulator);
	        channelOutput = (op1Output + op2Output) / 2;
	      }
	      this.feedback[0] = this.feedback[1];
	      this.feedback[1] = op1Output * ChannelData.feedback[this.fb] % 1;
	      return this.getInFourChannels(channelOutput);
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {
	      this.op1.keyOn();
	      this.op2.keyOn();
	      this.feedback[0] = this.feedback[1] = 0;
	    }
	  }, {
	    key: "keyOff",
	    value: function keyOff() {
	      this.op1.keyOff();
	      this.op2.keyOff();
	    }
	  }, {
	    key: "updateOperators",
	    value: function updateOperators() {
	      // Key Scale Number, used in EnvelopeGenerator.setActualRates().
	      var keyScaleNumber = this.block * 2 + (this.fnumh >> this.opl.nts & 0x01);
	      var f_number = this.fnumh << 8 | this.fnuml;
	      this.op1.updateOperator(keyScaleNumber, f_number, this.block);
	      this.op2.updateOperator(keyScaleNumber, f_number, this.block);
	    }
	  }]);
	  return Channel2op;
	}(Channel);
	var Channel4op = /*#__PURE__*/function (_Channel2) {
	  _inherits(Channel4op, _Channel2);
	  var _super2 = _createSuper(Channel4op);
	  function Channel4op(baseAddress, o1, o2, o3, o4, opl) {
	    var _this2;
	    _classCallCheck(this, Channel4op);
	    _this2 = _super2.call(this, baseAddress, opl);
	    _this2.op1 = o1;
	    _this2.op2 = o2;
	    _this2.op3 = o3;
	    _this2.op4 = o4;
	    return _this2;
	  }
	  _createClass(Channel4op, [{
	    key: "getChannelOutput",
	    value: function getChannelOutput() {
	      var channelOutput = 0,
	        op1Output = 0,
	        op2Output = 0,
	        op3Output = 0,
	        op4Output = 0;
	      var secondChannelBaseAddress = this.channelBaseAddress + 3;
	      var secondCnt = this.opl.registers[secondChannelBaseAddress + ChannelData.CHD1_CHC1_CHB1_CHA1_FB3_CNT1_Offset] & 1;
	      var cnt4op = this.cnt << 1 | secondCnt;
	      var feedbackOutput = (this.feedback[0] + this.feedback[1]) / 2;
	      switch (cnt4op) {
	        case 0:
	          if (this.op4.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	          op1Output = this.op1.getOperatorOutput(feedbackOutput);
	          op2Output = this.op2.getOperatorOutput(op1Output * this.toPhase);
	          op3Output = this.op3.getOperatorOutput(op2Output * this.toPhase);
	          channelOutput = this.op4.getOperatorOutput(op3Output * this.toPhase);
	          break;
	        case 1:
	          if (this.op2.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF && this.op4.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	          op1Output = this.op1.getOperatorOutput(feedbackOutput);
	          op2Output = this.op2.getOperatorOutput(op1Output * this.toPhase);
	          op3Output = this.op3.getOperatorOutput(Operator.noModulator);
	          op4Output = this.op4.getOperatorOutput(op3Output * this.toPhase);
	          channelOutput = (op2Output + op4Output) / 2;
	          break;
	        case 2:
	          if (this.op1.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF && this.op4.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	          op1Output = this.op1.getOperatorOutput(feedbackOutput);
	          op2Output = this.op2.getOperatorOutput(Operator.noModulator);
	          op3Output = this.op3.getOperatorOutput(op2Output * this.toPhase);
	          op4Output = this.op4.getOperatorOutput(op3Output * this.toPhase);
	          channelOutput = (op1Output + op4Output) / 2;
	          break;
	        case 3:
	          if (this.op1.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF && this.op3.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF && this.op4.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return this.getInFourChannels(0);
	          op1Output = this.op1.getOperatorOutput(feedbackOutput);
	          op2Output = this.op2.getOperatorOutput(Operator.noModulator);
	          op3Output = this.op3.getOperatorOutput(op2Output * this.toPhase);
	          op4Output = this.op4.getOperatorOutput(Operator.noModulator);
	          channelOutput = (op1Output + op3Output + op4Output) / 3;
	          break;
	      }
	      this.feedback[0] = this.feedback[1];
	      this.feedback[1] = op1Output * ChannelData.feedback[this.fb] % 1;
	      return this.getInFourChannels(channelOutput);
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {
	      this.op1.keyOn();
	      this.op2.keyOn();
	      this.op3.keyOn();
	      this.op4.keyOn();
	      this.feedback[0] = this.feedback[1] = 0;
	    }
	  }, {
	    key: "keyOff",
	    value: function keyOff() {
	      this.op1.keyOff();
	      this.op2.keyOff();
	      this.op3.keyOff();
	      this.op4.keyOff();
	    }
	  }, {
	    key: "updateOperators",
	    value: function updateOperators() {
	      // Key Scale Number, used in EnvelopeGenerator.setActualRates().
	      var keyScaleNumber = this.block * 2 + (this.fnumh >> this.opl.nts & 0x01);
	      var f_number = this.fnumh << 8 | this.fnuml;
	      this.op1.updateOperator(keyScaleNumber, f_number, this.block);
	      this.op2.updateOperator(keyScaleNumber, f_number, this.block);
	      this.op3.updateOperator(keyScaleNumber, f_number, this.block);
	      this.op4.updateOperator(keyScaleNumber, f_number, this.block);
	    }
	  }]);
	  return Channel4op;
	}(Channel);
	var DisabledChannel = /*#__PURE__*/function (_Channel3) {
	  _inherits(DisabledChannel, _Channel3);
	  var _super3 = _createSuper(DisabledChannel);
	  function DisabledChannel(opl) {
	    var _this3;
	    _classCallCheck(this, DisabledChannel);
	    _this3 = _super3.call(this, 0, opl);
	    _this3.opl = opl;
	    return _this3;
	  }
	  _createClass(DisabledChannel, [{
	    key: "getChannelOutput",
	    value: function getChannelOutput() {
	      return this.getInFourChannels(0);
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {}
	  }, {
	    key: "keyOff",
	    value: function keyOff() {}
	  }, {
	    key: "updateOperators",
	    value: function updateOperators() {}
	  }]);
	  return DisabledChannel;
	}(Channel);
	var Operator = /*#__PURE__*/function () {
	  function Operator(baseAddress, opl) {
	    _classCallCheck(this, Operator);
	    this.opl = opl;
	    this.operatorBaseAddress = baseAddress;
	    this.phaseGenerator = new PhaseGenerator(opl);
	    this.envelopeGenerator = new EnvelopeGenerator(opl);
	    this.envelope = 0;
	    this.am = 0;
	    this.vib = 0;
	    this.ksr = 0;
	    this.egt = 0;
	    this.mult = 0;
	    this.ksl = 0;
	    this.tl = 0;
	    this.ar = 0;
	    this.dr = 0;
	    this.sl = 0;
	    this.rr = 0;
	    this.ws = 0;
	    this.keyScaleNumber = 0;
	    this.f_number = 0;
	    this.block = 0;
	  }
	  _createClass(Operator, [{
	    key: "update_AM1_VIB1_EGT1_KSR1_MULT4",
	    value: function update_AM1_VIB1_EGT1_KSR1_MULT4() {
	      var am1_vib1_egt1_ksr1_mult4 = this.opl.registers[this.operatorBaseAddress + OperatorData.AM1_VIB1_EGT1_KSR1_MULT4_Offset];

	      // Amplitude Modulation. This register is used int EnvelopeGenerator.getEnvelope();
	      this.am = (am1_vib1_egt1_ksr1_mult4 & 0x80) >> 7;
	      // Vibrato. This register is used in PhaseGenerator.getPhase();
	      this.vib = (am1_vib1_egt1_ksr1_mult4 & 0x40) >> 6;
	      // Envelope Generator Type. This register is used in EnvelopeGenerator.getEnvelope();
	      this.egt = (am1_vib1_egt1_ksr1_mult4 & 0x20) >> 5;
	      // Key Scale Rate. Sets the actual envelope rate together with rate and keyScaleNumber.
	      // This register os used in EnvelopeGenerator.setActualAttackRate().
	      this.ksr = (am1_vib1_egt1_ksr1_mult4 & 0x10) >> 4;
	      // Multiple. Multiplies the Channel.baseFrequency to get the Operator.operatorFrequency.
	      // This register is used in PhaseGenerator.setFrequency().
	      this.mult = am1_vib1_egt1_ksr1_mult4 & 0x0f;
	      this.phaseGenerator.setFrequency(this.f_number, this.block, this.mult);
	      this.envelopeGenerator.setActualAttackRate(this.ar, this.ksr, this.keyScaleNumber);
	      this.envelopeGenerator.setActualDecayRate(this.dr, this.ksr, this.keyScaleNumber);
	      this.envelopeGenerator.setActualReleaseRate(this.rr, this.ksr, this.keyScaleNumber);
	    }
	  }, {
	    key: "update_KSL2_TL6",
	    value: function update_KSL2_TL6() {
	      var ksl2_tl6 = this.opl.registers[this.operatorBaseAddress + OperatorData.KSL2_TL6_Offset];

	      // Key Scale Level. Sets the attenuation in accordance with the octave.
	      this.ksl = (ksl2_tl6 & 0xc0) >> 6;
	      // Total Level. Sets the overall damping for the envelope.
	      this.tl = ksl2_tl6 & 0x3f;
	      this.envelopeGenerator.setAtennuation(this.f_number, this.block, this.ksl);
	      this.envelopeGenerator.setTotalLevel(this.tl);
	    }
	  }, {
	    key: "update_AR4_DR4",
	    value: function update_AR4_DR4() {
	      var ar4_dr4 = this.opl.registers[this.operatorBaseAddress + OperatorData.AR4_DR4_Offset];

	      // Attack Rate.
	      this.ar = (ar4_dr4 & 0xf0) >> 4;
	      // Decay Rate.
	      this.dr = ar4_dr4 & 0x0f;
	      this.envelopeGenerator.setActualAttackRate(this.ar, this.ksr, this.keyScaleNumber);
	      this.envelopeGenerator.setActualDecayRate(this.dr, this.ksr, this.keyScaleNumber);
	    }
	  }, {
	    key: "update_SL4_RR4",
	    value: function update_SL4_RR4() {
	      var sl4_rr4 = this.opl.registers[this.operatorBaseAddress + OperatorData.SL4_RR4_Offset];

	      // Sustain Level.
	      this.sl = (sl4_rr4 & 0xf0) >> 4;
	      // Release Rate.
	      this.rr = sl4_rr4 & 0x0f;
	      this.envelopeGenerator.setActualSustainLevel(this.sl);
	      this.envelopeGenerator.setActualReleaseRate(this.rr, this.ksr, this.keyScaleNumber);
	    }
	  }, {
	    key: "update_5_WS3",
	    value: function update_5_WS3() {
	      var _5_ws3 = this.opl.registers[this.operatorBaseAddress + OperatorData._5_WS3_Offset];
	      this.ws = _5_ws3 & 0x07;
	    }
	  }, {
	    key: "getOperatorOutput",
	    value: function getOperatorOutput(modulator) {
	      if (this.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return 0;
	      var envelopeInDB = this.envelopeGenerator.getEnvelope(this.egt, this.am);
	      this.envelope = Math.pow(10, envelopeInDB / 10);

	      // If it is in OPL2 mode, use first four waveforms only:
	      this.ws = this.ws & (this.opl._new << 2) + 3;
	      var waveform = OperatorData.waveforms[this.ws];
	      this.phase = this.phaseGenerator.getPhase(this.vib);
	      return this.getOutput(modulator, this.phase, waveform);
	    }
	  }, {
	    key: "getOutput",
	    value: function getOutput(modulator, outputPhase, waveform) {
	      outputPhase = (outputPhase + modulator) % 1;
	      if (outputPhase < 0) {
	        outputPhase++;
	        // If the double could not afford to be less than 1:
	        outputPhase %= 1;
	      }
	      var sampleIndex = outputPhase * OperatorData.waveLength | 0;
	      return waveform[sampleIndex] * this.envelope;
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {
	      if (this.ar > 0) {
	        this.envelopeGenerator.keyOn();
	        this.phaseGenerator.keyOn();
	      } else this.envelopeGenerator.stage = EnvelopeGenerator.Stage.OFF;
	    }
	  }, {
	    key: "keyOff",
	    value: function keyOff() {
	      this.envelopeGenerator.keyOff();
	    }
	  }, {
	    key: "updateOperator",
	    value: function updateOperator(ksn, f_num, blk) {
	      this.keyScaleNumber = ksn;
	      this.f_number = f_num;
	      this.block = blk;
	      this.update_AM1_VIB1_EGT1_KSR1_MULT4();
	      this.update_KSL2_TL6();
	      this.update_AR4_DR4();
	      this.update_SL4_RR4();
	      this.update_5_WS3();
	    }
	  }]);
	  return Operator;
	}();
	_defineProperty(Operator, "noModulator", 0);
	var EnvelopeGenerator = /*#__PURE__*/function () {
	  function EnvelopeGenerator(opl) {
	    _classCallCheck(this, EnvelopeGenerator);
	    this.opl = opl;
	    this.stage = EnvelopeGenerator.Stage.OFF;
	    this.actualAttackRate = 0;
	    this.actualDecayRate = 0;
	    this.actualReleaseRate = 0;
	    this.xAttackIncrement = 0;
	    this.xMinimumInAttack = 0;
	    this.dBdecayIncrement = 0;
	    this.dBreleaseIncrement = 0;
	    this.attenuation = 0;
	    this.totalLevel = 0;
	    this.sustainLevel = 0;
	    this.x = this.dBtoX(-96);
	    this.resolutionMaximum = this.dBtoX(-0.1875);
	    this.percentage10 = this.percentageToX(0.1);
	    this.percentage90 = this.percentageToX(0.9);
	    this.envelope = -96;
	  }
	  _createClass(EnvelopeGenerator, [{
	    key: "setActualSustainLevel",
	    value: function setActualSustainLevel(sl) {
	      // If all SL bits are 1, sustain level is set to -93 dB:
	      if (sl == 0x0f) {
	        this.sustainLevel = -93;
	        return;
	      }
	      // The datasheet states that the SL formula is
	      // sustainLevel = -24*d7 -12*d6 -6*d5 -3*d4,
	      // translated as:
	      this.sustainLevel = -3 * sl;
	    }
	  }, {
	    key: "setTotalLevel",
	    value: function setTotalLevel(tl) {
	      // The datasheet states that the TL formula is
	      // TL = -(24*d5 + 12*d4 + 6*d3 + 3*d2 + 1.5*d1 + 0.75*d0),
	      // translated as:
	      this.totalLevel = tl * -0.75;
	    }
	  }, {
	    key: "setAtennuation",
	    value: function setAtennuation(f_number, block, ksl) {
	      var hi4bits = f_number >> 6 & 0x0f;
	      switch (ksl) {
	        case 0:
	          this.attenuation = 0;
	          break;
	        case 1:
	          // ~3 dB/Octave
	          this.attenuation = OperatorData.ksl3dBtable[hi4bits][block];
	          break;
	        case 2:
	          // ~1.5 dB/Octave
	          this.attenuation = OperatorData.ksl3dBtable[hi4bits][block] / 2;
	          break;
	        case 3:
	          // ~6 dB/Octave
	          this.attenuation = OperatorData.ksl3dBtable[hi4bits][block] * 2;
	      }
	    }
	  }, {
	    key: "setActualAttackRate",
	    value: function setActualAttackRate(attackRate, ksr, keyScaleNumber) {
	      // According to the YMF278B manual's OPL3 section, the attack curve is exponential,
	      // with a dynamic range from -96 dB to 0 dB and a resolution of 0.1875 dB
	      // per level.
	      //
	      // This method sets an attack increment and attack minimum value
	      // that creates a exponential dB curve with 'period0to100' seconds in length
	      // and 'period10to90' seconds between 10% and 90% of the curve total level.
	      this.actualAttackRate = this.calculateActualRate(attackRate, ksr, keyScaleNumber) | 0;
	      var period0to100inSeconds = EnvelopeGeneratorData.attackTimeValuesTable[this.actualAttackRate][0] / 1000;
	      var period0to100inSamples = period0to100inSeconds * OPL3Data.sampleRate | 0;
	      var period10to90inSeconds = EnvelopeGeneratorData.attackTimeValuesTable[this.actualAttackRate][1] / 1000;
	      var period10to90inSamples = period10to90inSeconds * OPL3Data.sampleRate | 0;
	      // The x increment is dictated by the period between 10% and 90%:
	      this.xAttackIncrement = OPL3Data.calculateIncrement(this.percentage10, this.percentage90, period10to90inSeconds);
	      // Discover how many samples are still from the top.
	      // It cannot reach 0 dB, since x is a logarithmic parameter and would be
	      // negative infinity. So we will use -0.1875 dB as the resolution
	      // maximum.
	      //
	      // percentageToX(0.9) + samplesToTheTop*xAttackIncrement = dBToX(-0.1875); ->
	      // samplesToTheTop = (dBtoX(-0.1875) - percentageToX(0.9)) / xAttackIncrement); ->
	      // period10to100InSamples = period10to90InSamples + samplesToTheTop; ->
	      var period10to100inSamples = period10to90inSamples + (this.resolutionMaximum - this.percentage90) / this.xAttackIncrement | 0;
	      // Discover the minimum x that, through the attackIncrement value, keeps
	      // the 10%-90% period, and reaches 0 dB at the total period:
	      this.xMinimumInAttack = this.percentage10 - (period0to100inSamples - period10to100inSamples) * this.xAttackIncrement;
	    }
	  }, {
	    key: "setActualDecayRate",
	    value: function setActualDecayRate(decayRate, ksr, keyScaleNumber) {
	      this.actualDecayRate = this.calculateActualRate(decayRate, ksr, keyScaleNumber) | 0;
	      var period10to90inSeconds = EnvelopeGeneratorData.decayAndReleaseTimeValuesTable[this.actualDecayRate][1] / 1000;
	      // Differently from the attack curve, the decay/release curve is linear.
	      // The dB increment is dictated by the period between 10% and 90%:
	      this.dBdecayIncrement = OPL3Data.calculateIncrement(this.percentageToDB(0.1), this.percentageToDB(0.9), period10to90inSeconds);
	    }
	  }, {
	    key: "setActualReleaseRate",
	    value: function setActualReleaseRate(releaseRate, ksr, keyScaleNumber) {
	      this.actualReleaseRate = this.calculateActualRate(releaseRate, ksr, keyScaleNumber) | 0;
	      var period10to90inSeconds = EnvelopeGeneratorData.decayAndReleaseTimeValuesTable[this.actualReleaseRate][1] / 1000;
	      this.dBreleaseIncrement = OPL3Data.calculateIncrement(this.percentageToDB(0.1), this.percentageToDB(0.9), period10to90inSeconds);
	    }
	  }, {
	    key: "calculateActualRate",
	    value: function calculateActualRate(rate, ksr, keyScaleNumber) {
	      var rof = EnvelopeGeneratorData.rateOffset[ksr][keyScaleNumber];
	      var actualRate = rate * 4 + rof;
	      // If, as an example at the maximum, rate is 15 and the rate offset is 15,
	      // the value would
	      // be 75, but the maximum allowed is 63:
	      if (actualRate > 63) actualRate = 63;
	      return actualRate;
	    }
	  }, {
	    key: "getEnvelope",
	    value: function getEnvelope(egt, am) {
	      // The datasheets attenuation values
	      // must be halved to match the real OPL3 output.
	      var envelopeSustainLevel = this.sustainLevel / 2;
	      var envelopeTremolo = OPL3Data.tremoloTable[this.opl.dam][this.opl.tremoloIndex] / 2;
	      var envelopeAttenuation = this.attenuation / 2;
	      var envelopeTotalLevel = this.totalLevel / 2;
	      var envelopeMinimum = -96;
	      var envelopeResolution = 0.1875;
	      var outputEnvelope;
	      //
	      // Envelope Generation
	      //
	      switch (this.stage) {
	        case EnvelopeGenerator.Stage.ATTACK:
	          // Since the attack is exponential, it will never reach 0 dB, so
	          // we´ll work with the next to maximum in the envelope resolution.
	          if (this.envelope < -envelopeResolution && this.xAttackIncrement != -Infinity) {
	            // The attack is exponential.
	            this.envelope = -Math.pow(2, this.x);
	            this.x += this.xAttackIncrement;
	            break;
	          } else {
	            // It is needed here to explicitly set envelope = 0, since
	            // only the attack can have a period of
	            // 0 seconds and produce an infinity envelope increment.
	            this.envelope = 0;
	            this.stage = EnvelopeGenerator.Stage.DECAY;
	          }
	        case EnvelopeGenerator.Stage.DECAY:
	          // The decay and release are linear.
	          if (this.envelope > envelopeSustainLevel) {
	            this.envelope -= this.dBdecayIncrement;
	            break;
	          } else this.stage = EnvelopeGenerator.Stage.SUSTAIN;
	        case EnvelopeGenerator.Stage.SUSTAIN:
	          // The Sustain stage is mantained all the time of the Key ON,
	          // even if we are in non-sustaining mode.
	          // This is necessary because, if the key is still pressed, we can
	          // change back and forth the state of EGT, and it will release and
	          // hold again accordingly.
	          if (egt == 1) break;else {
	            if (this.envelope > envelopeMinimum) this.envelope -= this.dBreleaseIncrement;else this.stage = EnvelopeGenerator.Stage.OFF;
	          }
	          break;
	        case EnvelopeGenerator.Stage.RELEASE:
	          // If we have Key OFF, only here we are in the Release stage.
	          // Now, we can turn EGT back and forth and it will have no effect,i.e.,
	          // it will release inexorably to the Off stage.
	          if (this.envelope > envelopeMinimum) this.envelope -= this.dBreleaseIncrement;else this.stage = EnvelopeGenerator.Stage.OFF;
	      }

	      // Ongoing original envelope
	      outputEnvelope = this.envelope;

	      //Tremolo
	      if (am == 1) outputEnvelope += envelopeTremolo;

	      //Attenuation
	      outputEnvelope += envelopeAttenuation;

	      //Total Level
	      outputEnvelope += envelopeTotalLevel;
	      return outputEnvelope;
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {
	      // If we are taking it in the middle of a previous envelope,
	      // start to rise from the current level:
	      // envelope = - (2 ^ x); ->
	      // 2 ^ x = -envelope ->
	      // x = log2(-envelope); ->
	      var xCurrent = Math.log2(-this.envelope);
	      this.x = xCurrent < this.xMinimumInAttack ? xCurrent : this.xMinimumInAttack;
	      this.stage = EnvelopeGenerator.Stage.ATTACK;
	    }
	  }, {
	    key: "keyOff",
	    value: function keyOff() {
	      if (this.stage != EnvelopeGenerator.Stage.OFF) this.stage = EnvelopeGenerator.Stage.RELEASE;
	    }
	  }, {
	    key: "dBtoX",
	    value: function dBtoX(dB) {
	      return Math.log2(-dB);
	    }
	  }, {
	    key: "percentageToDB",
	    value: function percentageToDB(percentage) {
	      return Math.log10(percentage) * 10;
	    }
	  }, {
	    key: "percentageToX",
	    value: function percentageToX(percentage) {
	      return this.dBtoX(this.percentageToDB(percentage));
	    }
	  }]);
	  return EnvelopeGenerator;
	}();
	_defineProperty(EnvelopeGenerator, "Stage", {
	  ATTACK: 'ATTACK',
	  DECAY: 'DECAY',
	  SUSTAIN: 'SUSTAIN',
	  RELEASE: 'RELEASE',
	  OFF: 'OFF'
	});
	var PhaseGenerator = /*#__PURE__*/function () {
	  function PhaseGenerator(opl) {
	    _classCallCheck(this, PhaseGenerator);
	    this.opl = opl;
	    this.phase = 0;
	    this.phaseIncrement = 0;
	  }
	  _createClass(PhaseGenerator, [{
	    key: "setFrequency",
	    value: function setFrequency(f_number, block, mult) {
	      // This frequency formula is derived from the following equation:
	      // f_number = baseFrequency * pow(2,19) / sampleRate / pow(2,block-1);
	      var baseFrequency = f_number * Math.pow(2, block - 1) * OPL3Data.sampleRate / Math.pow(2, 19);
	      var operatorFrequency = baseFrequency * OperatorData.multTable[mult];

	      // phase goes from 0 to 1 at
	      // period = (1/frequency) seconds ->
	      // Samples in each period is (1/frequency)*sampleRate =
	      // = sampleRate/frequency ->
	      // So the increment in each sample, to go from 0 to 1, is:
	      // increment = (1-0) / samples in the period ->
	      // increment = 1 / (OPL3Data.sampleRate/operatorFrequency) ->
	      this.phaseIncrement = operatorFrequency / OPL3Data.sampleRate;
	    }
	  }, {
	    key: "getPhase",
	    value: function getPhase(vib) {
	      if (vib == 1) {
	        // phaseIncrement = (operatorFrequency * vibrato) / sampleRate
	        this.phase += this.phaseIncrement * OPL3Data.vibratoTable[this.opl.dvb][this.opl.vibratoIndex];
	      } else {
	        // phaseIncrement = operatorFrequency / sampleRate
	        this.phase += this.phaseIncrement;
	      }
	      this.phase %= 1;
	      return this.phase;
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {
	      this.phase = 0;
	    }
	  }]);
	  return PhaseGenerator;
	}();
	var RhythmChannel = /*#__PURE__*/function (_Channel2op) {
	  _inherits(RhythmChannel, _Channel2op);
	  var _super4 = _createSuper(RhythmChannel);
	  function RhythmChannel(baseAddress, o1, o2, opl) {
	    _classCallCheck(this, RhythmChannel);
	    return _super4.call(this, baseAddress, o1, o2, opl);
	  }
	  _createClass(RhythmChannel, [{
	    key: "getChannelOutput",
	    value: function getChannelOutput() {
	      var channelOutput = 0,
	        op1Output = 0,
	        op2Output = 0;

	      // Note that, different from the common channel,
	      // we do not check to see if the Operator's envelopes are Off.
	      // Instead, we always do the calculations,
	      // to update the publicly available phase.
	      op1Output = this.op1.getOperatorOutput(Operator.noModulator);
	      op2Output = this.op2.getOperatorOutput(Operator.noModulator);
	      channelOutput = (op1Output + op2Output) / 2;
	      return this.getInFourChannels(channelOutput);
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {}
	  }, {
	    key: "keyOff",
	    value: function keyOff() {}
	  }]);
	  return RhythmChannel;
	}(Channel2op);
	var HighHatSnareDrumChannel = /*#__PURE__*/function (_RhythmChannel) {
	  _inherits(HighHatSnareDrumChannel, _RhythmChannel);
	  var _super5 = _createSuper(HighHatSnareDrumChannel);
	  function HighHatSnareDrumChannel(opl) {
	    _classCallCheck(this, HighHatSnareDrumChannel);
	    return _super5.call(this, 7, opl.highHatOperator, opl.snareDrumOperator, opl);
	  }
	  return _createClass(HighHatSnareDrumChannel);
	}(RhythmChannel);
	var TomTomTopCymbalChannel = /*#__PURE__*/function (_RhythmChannel2) {
	  _inherits(TomTomTopCymbalChannel, _RhythmChannel2);
	  var _super6 = _createSuper(TomTomTopCymbalChannel);
	  function TomTomTopCymbalChannel(opl) {
	    _classCallCheck(this, TomTomTopCymbalChannel);
	    return _super6.call(this, 8, opl.tomTomOperator, opl.topCymbalOperator, opl);
	  }
	  return _createClass(TomTomTopCymbalChannel);
	}(RhythmChannel);
	var TopCymbalOperator = /*#__PURE__*/function (_Operator) {
	  _inherits(TopCymbalOperator, _Operator);
	  var _super7 = _createSuper(TopCymbalOperator);
	  function TopCymbalOperator(baseAddress, opl) {
	    _classCallCheck(this, TopCymbalOperator);
	    if (arguments.length == 1) {
	      opl = baseAddress;
	      baseAddress = 0x15;
	    }
	    return _super7.call(this, baseAddress, opl);
	  }
	  _createClass(TopCymbalOperator, [{
	    key: "getOperatorOutput",
	    value: function getOperatorOutput(modulator, externalPhase) {
	      // The Top Cymbal operator uses his own phase together with the High Hat phase.
	      if (typeof externalPhase == 'undefined') externalPhase = this.opl.highHatOperator.phase * OperatorData.multTable[this.opl.highHatOperator.mult];
	      var envelopeInDB = this.envelopeGenerator.getEnvelope(this.egt, this.am);
	      this.envelope = Math.pow(10, envelopeInDB / 10);
	      this.phase = this.phaseGenerator.getPhase(this.vib);
	      var waveIndex = this.ws & (this.opl._new << 2) + 3 | 0;
	      var waveform = OperatorData.waveforms[waveIndex];

	      // Empirically tested multiplied phase for the Top Cymbal:
	      var carrierPhase = 8 * this.phase % 1;
	      var modulatorPhase = externalPhase;
	      var modulatorOutput = this.getOutput(Operator.noModulator, modulatorPhase, waveform);
	      var carrierOutput = this.getOutput(modulatorOutput, carrierPhase, waveform);
	      var cycles = 4;
	      if (carrierPhase * cycles % cycles > 0.1) carrierOutput = 0;
	      return carrierOutput * 2;
	    }
	  }]);
	  return TopCymbalOperator;
	}(Operator);
	var HighHatOperator = /*#__PURE__*/function (_TopCymbalOperator) {
	  _inherits(HighHatOperator, _TopCymbalOperator);
	  var _super8 = _createSuper(HighHatOperator);
	  function HighHatOperator(opl) {
	    _classCallCheck(this, HighHatOperator);
	    return _super8.call(this, 0x11, opl);
	  }
	  _createClass(HighHatOperator, [{
	    key: "getOperatorOutput",
	    value: function getOperatorOutput(modulator) {
	      var topCymbalOperatorPhase = this.opl.topCymbalOperator.phase * OperatorData.multTable[this.opl.topCymbalOperator.mult];
	      // The sound output from the High Hat resembles the one from
	      // Top Cymbal, so we use the parent method and modifies his output
	      // accordingly afterwards.
	      var operatorOutput = _get(_getPrototypeOf(HighHatOperator.prototype), "getOperatorOutput", this).call(this, modulator, topCymbalOperatorPhase);
	      if (operatorOutput == 0) operatorOutput = Math.random() * this.envelope;
	      return operatorOutput;
	    }
	  }]);
	  return HighHatOperator;
	}(TopCymbalOperator);
	var SnareDrumOperator = /*#__PURE__*/function (_Operator2) {
	  _inherits(SnareDrumOperator, _Operator2);
	  var _super9 = _createSuper(SnareDrumOperator);
	  function SnareDrumOperator(opl) {
	    _classCallCheck(this, SnareDrumOperator);
	    return _super9.call(this, 0x14, opl);
	  }
	  _createClass(SnareDrumOperator, [{
	    key: "getOperatorOutput",
	    value: function getOperatorOutput(modulator) {
	      if (this.envelopeGenerator.stage == EnvelopeGenerator.Stage.OFF) return 0;
	      var envelopeInDB = this.envelopeGenerator.getEnvelope(this.egt, this.am);
	      this.envelope = Math.pow(10, envelopeInDB / 10);

	      // If it is in OPL2 mode, use first four waveforms only:
	      var waveIndex = this.ws & (this.opl._new << 2) + 3 | 0;
	      var waveform = OperatorData.waveforms[waveIndex];
	      this.phase = this.opl.highHatOperator.phase * 2;
	      var operatorOutput = this.getOutput(modulator, this.phase, waveform);
	      var noise = Math.random() * this.envelope;
	      if (operatorOutput / this.envelope != 1 && operatorOutput / this.envelope != -1) {
	        if (operatorOutput > 0) operatorOutput = noise;else if (operatorOutput < 0) operatorOutput = -noise;else operatorOutput = 0;
	      }
	      return operatorOutput * 2;
	    }
	  }]);
	  return SnareDrumOperator;
	}(Operator);
	var TomTomOperator = /*#__PURE__*/function (_Operator3) {
	  _inherits(TomTomOperator, _Operator3);
	  var _super10 = _createSuper(TomTomOperator);
	  function TomTomOperator(opl) {
	    _classCallCheck(this, TomTomOperator);
	    return _super10.call(this, 0x12, opl);
	  }
	  return _createClass(TomTomOperator);
	}(Operator);
	var BassDrumChannel = /*#__PURE__*/function (_Channel2op2) {
	  _inherits(BassDrumChannel, _Channel2op2);
	  var _super11 = _createSuper(BassDrumChannel);
	  function BassDrumChannel(opl) {
	    _classCallCheck(this, BassDrumChannel);
	    return _super11.call(this, 6, new Operator(0x10, opl), new Operator(0x13, opl), opl);
	  }
	  _createClass(BassDrumChannel, [{
	    key: "getChannelOutput",
	    value: function getChannelOutput() {
	      // Bass Drum ignores first operator, when it is in series.
	      if (this.cnt == 1) this.op1.ar = 0;
	      return _get(_getPrototypeOf(BassDrumChannel.prototype), "getChannelOutput", this).call(this);
	    }
	  }, {
	    key: "keyOn",
	    value: function keyOn() {}
	  }, {
	    key: "keyOff",
	    value: function keyOff() {}
	  }]);
	  return BassDrumChannel;
	}(Channel2op);
	var OPL3Data = {
	  // OPL3-wide registers offsets:
	  _1_NTS1_6_Offset: 0x08,
	  DAM1_DVB1_RYT1_BD1_SD1_TOM1_TC1_HH1_Offset: 0xbd,
	  _7_NEW1_Offset: 0x105,
	  _2_CONNECTIONSEL6_Offset: 0x104,
	  sampleRate: 48000,
	  // The first array is used when DVB=0 and the second array is used when DVB=1.
	  vibratoTable: [new Float64Array(8192), new Float64Array(8192)],
	  // First array used when AM = 0 and second array used when AM = 1.
	  tremoloTable: [new Float64Array(13432), new Float64Array(13432)],
	  loadVibratoTable: function loadVibratoTable(vibratoTable) {
	    // According to the YMF262 datasheet, the OPL3 vibrato repetition rate is 6.1 Hz.
	    // According to the YMF278B manual, it is 6.0 Hz.
	    // The information that the vibrato table has 8 levels standing 1024 samples each
	    // was taken from the emulator by Jarek Burczynski and Tatsuyuki Satoh,
	    // with a frequency of 6,06689453125 Hz, what  makes sense with the difference
	    // in the information on the datasheets.

	    var semitone = Math.pow(2, 1 / 12);
	    var cent = Math.pow(semitone, 1 / 100);

	    // When dvb=0, the depth is 7 cents, when it is 1, the depth is 14 cents.
	    var DVB0 = Math.pow(cent, 7);
	    var DVB1 = Math.pow(cent, 14);
	    var i;
	    for (i = 0; i < 1024; i++) {
	      vibratoTable[0][i] = vibratoTable[1][i] = 1;
	    }
	    for (; i < 2048; i++) {
	      vibratoTable[0][i] = Math.sqrt(DVB0);
	      vibratoTable[1][i] = Math.sqrt(DVB1);
	    }
	    for (; i < 3072; i++) {
	      vibratoTable[0][i] = DVB0;
	      vibratoTable[1][i] = DVB1;
	    }
	    for (; i < 4096; i++) {
	      vibratoTable[0][i] = Math.sqrt(DVB0);
	      vibratoTable[1][i] = Math.sqrt(DVB1);
	    }
	    for (; i < 5120; i++) {
	      vibratoTable[0][i] = vibratoTable[1][i] = 1;
	    }
	    for (; i < 6144; i++) {
	      vibratoTable[0][i] = 1 / Math.sqrt(DVB0);
	      vibratoTable[1][i] = 1 / Math.sqrt(DVB1);
	    }
	    for (; i < 7168; i++) {
	      vibratoTable[0][i] = 1 / DVB0;
	      vibratoTable[1][i] = 1 / DVB1;
	    }
	    for (; i < 8192; i++) {
	      vibratoTable[0][i] = 1 / Math.sqrt(DVB0);
	      vibratoTable[1][i] = 1 / Math.sqrt(DVB1);
	    }
	  },
	  loadTremoloTable: function loadTremoloTable(tremoloTable) {
	    // The OPL3 tremolo repetition rate is 3.7 Hz.
	    var tremoloFrequency = 3.7;

	    // The tremolo depth is -1 dB when DAM = 0, and -4.8 dB when DAM = 1.
	    var tremoloDepth = [-1, -4.8];

	    //  According to the YMF278B manual's OPL3 section graph,
	    //              the tremolo waveform is not
	    //   \      /   a sine wave, but a single triangle waveform.
	    //    \    /    Thus, the period to achieve the tremolo depth is T/2, and
	    //     \  /     the increment in each T/2 section uses a frequency of 2*f.
	    //      \/      Tremolo varies from 0 dB to depth, to 0 dB again, at frequency*2:
	    var tremoloIncrement = [OPL3Data.calculateIncrement(tremoloDepth[0], 0, 1 / (2 * tremoloFrequency)), OPL3Data.calculateIncrement(tremoloDepth[1], 0, 1 / (2 * tremoloFrequency))];
	    var tremoloTableLength = OPL3Data.sampleRate / tremoloFrequency | 0;

	    // This is undocumented. The tremolo starts at the maximum attenuation,
	    // instead of at 0 dB:
	    tremoloTable[0][0] = tremoloDepth[0];
	    tremoloTable[1][0] = tremoloDepth[1];
	    var counter = 0;
	    // The first half of the triangle waveform:
	    while (tremoloTable[0][counter] < 0) {
	      counter++;
	      tremoloTable[0][counter] = tremoloTable[0][counter - 1] + tremoloIncrement[0];
	      tremoloTable[1][counter] = tremoloTable[1][counter - 1] + tremoloIncrement[1];
	    }

	    // The second half of the triangle waveform:
	    while (tremoloTable[0][counter] > tremoloDepth[0] && counter < tremoloTableLength - 1) {
	      counter++;
	      tremoloTable[0][counter] = tremoloTable[0][counter - 1] - tremoloIncrement[0];
	      tremoloTable[1][counter] = tremoloTable[1][counter - 1] - tremoloIncrement[1];
	    }
	  },
	  calculateIncrement: function calculateIncrement(begin, end, period) {
	    return (end - begin) / OPL3Data.sampleRate * (1 / period);
	  }
	};
	OPL3Data.loadVibratoTable(OPL3Data.vibratoTable);
	OPL3Data.loadTremoloTable(OPL3Data.tremoloTable);
	var ChannelData = {
	  _2_KON1_BLOCK3_FNUMH2_Offset: 0xb0,
	  FNUML8_Offset: 0xa0,
	  CHD1_CHC1_CHB1_CHA1_FB3_CNT1_Offset: 0xc0,
	  // Feedback rate in fractions of 2*Pi, normalized to (0,1):
	  // 0, Pi/16, Pi/8, Pi/4, Pi/2, Pi, 2*Pi, 4*Pi turns to be:
	  feedback: [0, 1 / 32, 1 / 16, 1 / 8, 1 / 4, 1 / 2, 1, 2]
	};
	var OperatorData = {
	  AM1_VIB1_EGT1_KSR1_MULT4_Offset: 0x20,
	  KSL2_TL6_Offset: 0x40,
	  AR4_DR4_Offset: 0x60,
	  SL4_RR4_Offset: 0x80,
	  _5_WS3_Offset: 0xe0,
	  NO_MODULATION: 'NO_MODULATION',
	  CARRIER: 'CARRIER',
	  FEEDBACK: 'FEEDBACK',
	  waveLength: 1024,
	  multTable: [0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 12, 12, 15, 15],
	  ksl3dBtable: [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, -3, -6, -9], [0, 0, 0, 0, -3, -6, -9, -12], [0, 0, 0, -1.875, -4.875, -7.875, -10.875, -13.875], [0, 0, 0, -3, -6, -9, -12, -15], [0, 0, -1.125, -4.125, -7.125, -10.125, -13.125, -16.125], [0, 0, -1.875, -4.875, -7.875, -10.875, -13.875, -16.875], [0, 0, -2.625, -5.625, -8.625, -11.625, -14.625, -17.625], [0, 0, -3, -6, -9, -12, -15, -18], [0, -0.750, -3.750, -6.750, -9.750, -12.750, -15.750, -18.750], [0, -1.125, -4.125, -7.125, -10.125, -13.125, -16.125, -19.125], [0, -1.500, -4.500, -7.500, -10.500, -13.500, -16.500, -19.500], [0, -1.875, -4.875, -7.875, -10.875, -13.875, -16.875, -19.875], [0, -2.250, -5.250, -8.250, -11.250, -14.250, -17.250, -20.250], [0, -2.625, -5.625, -8.625, -11.625, -14.625, -17.625, -20.625], [0, -3, -6, -9, -12, -15, -18, -21]],
	  waveforms: [new Float64Array(1024), new Float64Array(1024), new Float64Array(1024), new Float64Array(1024), new Float64Array(1024), new Float64Array(1024), new Float64Array(1024), new Float64Array(1024)],
	  loadWaveforms: function loadWaveforms(waveforms) {
	    var i, theta, x;
	    // 1st waveform: sinusoid.
	    for (i = 0, theta = 0; i < 1024; i++, theta += 2 * Math.PI / 1024) {
	      waveforms[0][i] = Math.sin(theta);
	    }
	    var sineTable = waveforms[0];
	    // 2nd: first half of a sinusoid.
	    for (i = 0; i < 512; i++) {
	      waveforms[1][i] = sineTable[i];
	      waveforms[1][512 + i] = 0;
	    }

	    // 3rd: double positive sinusoid.
	    for (i = 0; i < 512; i++) {
	      waveforms[2][i] = waveforms[2][512 + i] = sineTable[i];
	    }

	    // 4th: first and third quarter of double positive sinusoid.
	    for (i = 0; i < 256; i++) {
	      waveforms[3][i] = waveforms[3][512 + i] = sineTable[i];
	      waveforms[3][256 + i] = waveforms[3][768 + i] = 0;
	    }

	    // 5th: first half with double frequency sinusoid.
	    for (i = 0; i < 512; i++) {
	      waveforms[4][i] = sineTable[i * 2];
	      waveforms[4][512 + i] = 0;
	    }

	    // 6th: first half with double frequency positive sinusoid.
	    for (i = 0; i < 256; i++) {
	      waveforms[5][i] = waveforms[5][256 + i] = sineTable[i * 2];
	      waveforms[5][512 + i] = waveforms[5][768 + i] = 0;
	    }

	    // 7th: square wave
	    for (i = 0; i < 512; i++) {
	      waveforms[6][i] = 1;
	      waveforms[6][512 + i] = -1;
	    }

	    // 8th: exponential
	    for (i = 0, x = 0; i < 512; i++, x += 16 / 256) {
	      waveforms[7][i] = Math.pow(2, -x);
	      waveforms[7][1023 - i] = -Math.pow(2, -(x + 1 / 16));
	    }
	  }
	};
	OperatorData.loadWaveforms(OperatorData.waveforms);
	var EnvelopeGeneratorData = {
	  // This table is indexed by the value of Operator.ksr
	  // and the value of ChannelRegister.keyScaleNumber.
	  rateOffset: [[0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
	  // These attack periods in miliseconds were taken from the YMF278B manual.
	  // The attack actual rates range from 0 to 63, with different data for
	  // 0%-100% and for 10%-90%:
	  attackTimeValuesTable: [[Infinity, Infinity], [Infinity, Infinity], [Infinity, Infinity], [Infinity, Infinity], [2826.24, 1482.75], [2252.80, 1155.07], [1884.16, 991.23], [1597.44, 868.35], [1413.12, 741.38], [1126.40, 577.54], [942.08, 495.62], [798.72, 434.18], [706.56, 370.69], [563.20, 288.77], [471.04, 247.81], [399.36, 217.09], [353.28, 185.34], [281.60, 144.38], [235.52, 123.90], [199.68, 108.54], [176.76, 92.67], [140.80, 72.19], [117.76, 61.95], [99.84, 54.27], [88.32, 46.34], [70.40, 36.10], [58.88, 30.98], [49.92, 27.14], [44.16, 23.17], [35.20, 18.05], [29.44, 15.49], [24.96, 13.57], [22.08, 11.58], [17.60, 9.02], [14.72, 7.74], [12.48, 6.78], [11.04, 5.79], [8.80, 4.51], [7.36, 3.87], [6.24, 3.39], [5.52, 2.90], [4.40, 2.26], [3.68, 1.94], [3.12, 1.70], [2.76, 1.45], [2.20, 1.13], [1.84, 0.97], [1.56, 0.85], [1.40, 0.73], [1.12, 0.61], [0.92, 0.49], [0.80, 0.43], [0.70, 0.37], [0.56, 0.31], [0.46, 0.26], [0.42, 0.22], [0.38, 0.19], [0.30, 0.14], [0.24, 0.11], [0.20, 0.11], [0.00, 0.00], [0.00, 0.00], [0.00, 0.00], [0.00, 0.00]],
	  // These decay and release periods in miliseconds were taken from the YMF278B manual.
	  // The rate index range from 0 to 63, with different data for
	  // 0%-100% and for 10%-90%:
	  decayAndReleaseTimeValuesTable: [[Infinity, Infinity], [Infinity, Infinity], [Infinity, Infinity], [Infinity, Infinity], [39280.64, 8212.48], [31416.32, 6574.08], [26173.44, 5509.12], [22446.08, 4730.88], [19640.32, 4106.24], [15708.16, 3287.04], [13086.72, 2754.56], [11223.04, 2365.44], [9820.16, 2053.12], [7854.08, 1643.52], [6543.36, 1377.28], [5611.52, 1182.72], [4910.08, 1026.56], [3927.04, 821.76], [3271.68, 688.64], [2805.76, 591.36], [2455.04, 513.28], [1936.52, 410.88], [1635.84, 344.34], [1402.88, 295.68], [1227.52, 256.64], [981.76, 205.44], [817.92, 172.16], [701.44, 147.84], [613.76, 128.32], [490.88, 102.72], [488.96, 86.08], [350.72, 73.92], [306.88, 64.16], [245.44, 51.36], [204.48, 43.04], [175.36, 36.96], [153.44, 32.08], [122.72, 25.68], [102.24, 21.52], [87.68, 18.48], [76.72, 16.04], [61.36, 12.84], [51.12, 10.76], [43.84, 9.24], [38.36, 8.02], [30.68, 6.42], [25.56, 5.38], [21.92, 4.62], [19.20, 4.02], [15.36, 3.22], [12.80, 2.68], [10.96, 2.32], [9.60, 2.02], [7.68, 1.62], [6.40, 1.35], [5.48, 1.15], [4.80, 1.01], [3.84, 0.81], [3.20, 0.69], [2.74, 0.58], [2.40, 0.51], [2.40, 0.51], [2.40, 0.51], [2.40, 0.51]]
	};

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var defineProperty = Object.defineProperty;
	var gOPD = Object.getOwnPropertyDescriptor;
	var isArray$2 = function isArray(arr) {
	  if (typeof Array.isArray === 'function') {
	    return Array.isArray(arr);
	  }
	  return toStr.call(arr) === '[object Array]';
	};
	var isPlainObject = function isPlainObject(obj) {
	  if (!obj || toStr.call(obj) !== '[object Object]') {
	    return false;
	  }
	  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	  // Not own constructor property must be Object
	  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
	    return false;
	  }

	  // Own properties are enumerated firstly, so to speed up,
	  // if last one is own, then all properties are own.
	  var key;
	  for (key in obj) {/**/}
	  return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
	var setProperty = function setProperty(target, options) {
	  if (defineProperty && options.name === '__proto__') {
	    defineProperty(target, options.name, {
	      enumerable: true,
	      configurable: true,
	      value: options.newValue,
	      writable: true
	    });
	  } else {
	    target[options.name] = options.newValue;
	  }
	};

	// Return undefined instead of __proto__ if '__proto__' is not an own property
	var getProperty = function getProperty(obj, name) {
	  if (name === '__proto__') {
	    if (!hasOwn.call(obj, name)) {
	      return void 0;
	    } else if (gOPD) {
	      // In early versions of node, obj['__proto__'] is buggy when obj has
	      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
	      return gOPD(obj, name).value;
	    }
	  }
	  return obj[name];
	};
	var extend$2 = function extend() {
	  var options, name, src, copy, copyIsArray, clone;
	  var target = arguments[0];
	  var i = 1;
	  var length = arguments.length;
	  var deep = false;

	  // Handle a deep copy situation
	  if (typeof target === 'boolean') {
	    deep = target;
	    target = arguments[1] || {};
	    // skip the boolean and the target
	    i = 2;
	  }
	  if (target == null || _typeof(target) !== 'object' && typeof target !== 'function') {
	    target = {};
	  }
	  for (; i < length; ++i) {
	    options = arguments[i];
	    // Only deal with non-null/undefined values
	    if (options != null) {
	      // Extend the base object
	      for (name in options) {
	        src = getProperty(target, name);
	        copy = getProperty(options, name);

	        // Prevent never-ending loop
	        if (target !== copy) {
	          // Recurse if we're merging plain objects or arrays
	          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray$2(copy)))) {
	            if (copyIsArray) {
	              copyIsArray = false;
	              clone = src && isArray$2(src) ? src : [];
	            } else {
	              clone = src && isPlainObject(src) ? src : {};
	            }

	            // Never move original objects, clone them
	            setProperty(target, {
	              name: name,
	              newValue: extend(deep, clone, copy)
	            });

	            // Don't bring in undefined values
	          } else if (typeof copy !== 'undefined') {
	            setProperty(target, {
	              name: name,
	              newValue: copy
	            });
	          }
	        }
	      }
	    }
	  }

	  // Return the modified object
	  return target;
	};

	var extend$1 = extend$2;
	function LAA$1(opl, options) {
	  options = options || {};
	  this.opl = opl;
	  this.channels = [];
	  this.tracks = [];
	  this.adlib_data = new Int32Array(256);
	  var Midi = options.Midi;
	  if (typeof Midi != 'undefined') {
	    this.Midi = Midi;
	    this.midiFile = new Midi.File();
	    this.midiTrack = new Midi.Track();
	    this.midiFile.addTrack(this.midiTrack);
	  }
	  for (var i = 0; i < 16; i++) {
	    this.channels.push(new MidiChannel());
	    this.tracks.push(new MidiTrack());
	    if (typeof Midi != 'undefined') {
	      this.channels[i].midiTrack = this.midiTrack;
	    }
	  }
	  this.myinsbank = new Array(128);
	  this.smyinsbank = new Array(128);
	  for (var i = 0; i < 128; i++) {
	    this.myinsbank[i] = new Int32Array(16);
	    this.smyinsbank[i] = new Int32Array(16);
	  }
	  this.chp = new Array(18);
	  for (var i = 0; i < 18; i++) {
	    this.chp[i] = new Int32Array(3);
	  }
	}
	var laa = LAA$1;
	extend$1(LAA$1.prototype, {
	  ADL: [0x41, 0x44, 0x4c],
	  LUCAS_STYLE: 1,
	  CMF_STYLE: 2,
	  MIDI_STYLE: 4,
	  SIERRA_STYLE: 8,
	  ADLIB_MELODIC: 0,
	  ADLIB_RYTHM: 1,
	  FILE_LUCAS: 'LucasArts AdLib MIDI',
	  adlib_opadd: [0x00, 0x01, 0x02, 0x08, 0x09, 0x0A, 0x10, 0x11, 0x12],
	  ops: [0x20, 0x20, 0x40, 0x40, 0x60, 0x60, 0x80, 0x80, 0xe0, 0xe0, 0xc0],
	  map_chan: [0x14, 0x12, 0x15, 0x11],
	  fnums: [0x16b, 0x181, 0x198, 0x1b0, 0x1ca, 0x1e5, 0x202, 0x220, 0x241, 0x263, 0x287, 0x2ae],
	  percussion_map: [6, 7, 8, 8, 7],
	  load: function load(buffer) {
	    if (!(buffer instanceof Uint8Array)) buffer = new Uint8Array(buffer);
	    this.position = 0;
	    if (buffer[0] == this.ADL[0] && buffer[1] == this.ADL[1] && buffer[2] == this.ADL[2]) {
	      this.type = this.FILE_LUCAS;
	      this.subsongs = 1;
	    }
	    this.data = buffer;
	    this.rewind(0);
	  },
	  update: function update() {
	    var note, vel, ctrl, nv, x, l;
	    var i = 0,
	      j,
	      c;
	    var on, onl, numchan;
	    var ret;
	    if (this.doing == 1) {
	      for (var curtrack = 0; curtrack < 16; curtrack++) {
	        if (this.tracks[curtrack].on != 0) {
	          this.position = this.tracks[curtrack].pos;
	          if (this.type != this.FILE_SIERRA && this.type != this.FILE_ADVSIERRA) this.tracks[curtrack].iwait += this.getval();else this.tracks[curtrack].iwait += this.getnext(1);
	          this.tracks[curtrack].pos = this.position;
	        }
	      }
	      this.doing = 0;
	    }
	    this.iwait = 0;
	    ret = 1;
	    while (this.iwait == 0 && ret == 1) {
	      for (var curtrack = 0; curtrack < 16; curtrack++) {
	        if (this.tracks[curtrack].on != 0 && this.tracks[curtrack].iwait == 0 && this.tracks[curtrack].pos < this.tracks[curtrack].tend) {
	          this.position = this.tracks[curtrack].pos;
	          var v = this.getnext(1);
	          if (v < 0x80) {
	            v = this.tracks[curtrack].pv;
	            this.position--;
	          }
	          this.tracks[curtrack].pv = v;
	          var c = v & 0x0f;
	          switch (v & 0xf0) {
	            case 0x80:
	              //note off
	              var note = this.getnext(1);
	              var vel = this.getnext(1);
	              for (var i = 0; i < 9; i++) {
	                if (this.chp[i][0] == c && this.chp[i][1] == note) {
	                  this.midi_fm_endnote(i);
	                  this.chp[i][0] = -1;
	                }
	              }
	              break;
	            case 0x90:
	              //note on
	              var note = this.getnext(1);
	              var vel = this.getnext(1);
	              var numchan = this.adlib_mode == this.ADLIB_RYTHM ? 6 : 9;
	              if (this.channels[c].on != 0) {
	                for (var i = 0; i < 18; i++) {
	                  this.chp[i][2]++;
	                }
	                if (c < 11 || this.adlib_mode == this.ADLIB_MELODIC) {
	                  var j = 0;
	                  var on = -1;
	                  var onl = 0;
	                  for (var i = 0; i < numchan; i++) {
	                    if (this.chp[i][0] == -1 && this.chp[i][2] > onl) {
	                      onl = this.chp[i][2];
	                      on = i;
	                      j = 1;
	                    }
	                  }
	                  if (on == -1) {
	                    onl = 0;
	                    for (var i = 0; i < numchan; i++) {
	                      if (this.chp[i][2] > onl) {
	                        onl = this.chp[i][2];
	                        on = i;
	                      }
	                    }
	                  }
	                  if (j == 0) this.midi_fm_endnote(on);
	                } else on = this.percussion_map[c - 11];
	                if (vel != 0 && this.channels[c].inum >= 0 && this.channels[c].inum < 128) {
	                  if (this.adlib_mode == this.ADLIB_MELODIC || c < 12) this.midi_fm_instrument(on, this.channels[c].ins);else this.midi_fm_percussion(c, this.channels[c].ins);
	                  var nv;
	                  if ((this.adlib_style & this.MIDI_STYLE) != 0) {
	                    nv = this.channels[c].vol * vel / 128 | 0;
	                    if ((this.adlib_style & this.LUCAS_STYLE) != 0) nv *= 2;
	                    if (nv > 127) nv = 127;
	                    nv = this.midi_fm_vol_table[nv];
	                    if ((this.adlib_style & this.LUCAS_STYLE) != 0) nv = Math.sqrt(nv) * 11 | 0;
	                  } else nv = vel;
	                  this.midi_fm_playnote(on, note + this.channels[c].nshift, nv * 2);
	                  this.chp[on][0] = c;
	                  this.chp[on][1] = note;
	                  this.chp[on][2] = 0;
	                  if (this.midiFile) {
	                    this.midiTrack.note(c, note, 32);
	                  }
	                  if (this.adlib_mode == this.ADLIB_RYTHM && c >= 11) {
	                    this.midi_write_adlib(0xbd, this.adlib_data[0xbd] & ~(0x10 >> c - 11));
	                    this.midi_write_adlib(0xbd, this.adlib_data[0xbd] | 0x10 >> c - 11);
	                  }
	                } else {
	                  if (vel == 0) {
	                    //same code as end note
	                    for (var i = 0; i < 9; i++) {
	                      if (this.chp[i][0] == c && this.chp[i][1] == note) {
	                        this.midi_fm_endnote(i);
	                        this.midiTrack.noteOff(c, note);
	                        this.chp[i][0] = -1;
	                      }
	                    }
	                  } else {
	                    this.chp[on][0] = -1;
	                    this.chp[on][2] = 0;
	                  }
	                }
	              } else console.error('channel off', c, this.position);
	              break;
	            case 0xa0:
	              //key after touch
	              var note = this.getnext(1);
	              var vel = this.getnext(1);
	              break;
	            case 0xb0:
	              //control change .. pitch bend?
	              var ctrl = this.getnext(1);
	              var vel = this.getnext(1);
	              switch (ctrl) {
	                case 0x07:
	                  this.channels[c].vol = vel;
	                  break;
	                case 0x67:
	                  if ((this.adlib_style & this.CMF_STYLE) != 0) {
	                    this.adlib_mode = vel;
	                    if (this.adlib_mode == this.ADLIB_RYTHM) this.midi_write_adlib(0xbd, this.adlib_data[0xbd] | 1 << 5);else this.midi_write_adlib(0xbd, this.adlib_data[0xbd] & ~(1 << 5));
	                  }
	                  break;
	              }
	              break;
	            case 0xc0:
	              //patch change
	              var x = this.getnext(1);
	              this.channels[c].inum = x;
	              if (this.midiFile) this.channels[c].midiTrack.instrument(c, x);
	              for (var j = 0; j < 11; j++) {
	                this.channels[c].ins[j] = this.myinsbank[this.channels[c].inum][j];
	              }
	              break;
	            case 0xd0:
	              //chanel touch
	              var x = this.getnext(1);
	              break;
	            case 0xe0:
	              //pitch wheel
	              this.getnext(1);
	              this.getnext(1);
	              break;
	            case 0xf0:
	              // ???
	              switch (v) {
	                case 0xf0:
	                case 0xf7:
	                  //sysex
	                  var l = this.getval();
	                  var t = 0;
	                  if (this.datalook(this.position + l) == 0xf7) t = 1;
	                  if (this.datalook(this.position) == 0x7d && this.datalook(this.position + 1) == 0x10 && this.datalook(this.position + 2) < 16) {
	                    this.adlib_style = this.LUCAS_STYLE | this.MIDI_STYLE;
	                    this.getnext(1);
	                    this.getnext(1);
	                    c = this.getnext(1);
	                    this.getnext(1);
	                    this.channels[c].ins[0] = (this.getnext(1) << 4) + this.getnext(1);
	                    this.channels[c].ins[2] = 0xff - ((this.getnext(1) << 4) + this.getnext(1) & 0x3f);
	                    this.channels[c].ins[4] = 0xff - ((this.getnext(1) << 4) + this.getnext(1));
	                    this.channels[c].ins[6] = 0xff - ((this.getnext(1) << 4) + this.getnext(1));
	                    this.channels[c].ins[8] = (this.getnext(1) << 4) + this.getnext(1);
	                    this.channels[c].ins[1] = (this.getnext(1) << 4) + this.getnext(1);
	                    this.channels[c].ins[3] = 0xff - ((this.getnext(1) << 4) + this.getnext(1) & 0x3f);
	                    this.channels[c].ins[5] = 0xff - ((this.getnext(1) << 4) + this.getnext(1));
	                    this.channels[c].ins[7] = 0xff - ((this.getnext(1) << 4) + this.getnext(1));
	                    this.channels[c].ins[9] = (this.getnext(1) << 4) + this.getnext(1);
	                    i = (this.getnext(1) << 4) + this.getnext(1);
	                    this.channels[c].ins[10] = i;
	                    i = 11;
	                    this.getnext(l - 26);
	                  } else {
	                    for (var j = 0; j < l; j++) {
	                      this.getnext(1);
	                    }
	                  }
	                  if (t == 1) this.getnext(1);
	                  break;
	                case 0xf1:
	                  break;
	                case 0xf2:
	                  this.getnext(2);
	                  break;
	                case 0xf3:
	                  this.getnext(1);
	                  break;
	                case 0xf4:
	                  break;
	                case 0xf5:
	                  break;
	                case 0xf6: //something
	                case 0xf8:
	                case 0xfa:
	                case 0xfb:
	                case 0xfc:
	                  //this ends the track for sierra.
	                  if (this.type == this.FILE_SIERRA || this.type == this.FILE_ADVSIERRA) {
	                    this.tracks[curtrack].tend = this.position;
	                  }
	                  break;
	                case 0xfe:
	                  break;
	                case 0xfd:
	                  break;
	                case 0xff:
	                  var v = this.getnext(1);
	                  var l = this.getval();
	                  if (v == 0x51) {
	                    this.msqtr = this.getnext(l); //set tempo
	                  } else {
	                    for (var i = 0; i < l; i++) {
	                      this.getnext(1);
	                    }
	                  }
	                  break;
	              }
	              break;
	            default:
	              console.error('!', v);
	            // if we get down here, a error occurred
	          }

	          if (this.position < this.tracks[curtrack].tend) {
	            this.tracks[curtrack].iwait = this.type != this.FILE_SIERRA && this.type != this.FILE_ADVSIERRA ? this.getval() : this.getnext(1);
	          } else this.tracks[curtrack].iwait = 0;
	          this.tracks[curtrack].pos = this.position;
	        }
	      }
	      ret = 0; //end of song.
	      this.iwait = 0;
	      for (var curtrack = 0; curtrack < 16; curtrack++) {
	        if (this.tracks[curtrack].on == 1 && this.tracks[curtrack].pos < this.tracks[curtrack].tend) {
	          ret = 1; //not yet..
	          break;
	        }
	      }
	      if (ret == 1) {
	        this.iwait = 0xffffff; // bigger than any wait can be!
	        for (var curtrack = 0; curtrack < 16; curtrack++) {
	          if (this.tracks[curtrack].on == 1 && this.tracks[curtrack].pos < this.tracks[curtrack].tend && this.tracks[curtrack].iwait < this.iwait) this.iwait = this.tracks[curtrack].iwait;
	        }
	      }
	    }
	    if (this.iwait != 0 && ret == 1) {
	      for (var curtrack = 0; curtrack < 16; curtrack++) {
	        if (this.tracks[curtrack].on != 0) this.tracks[curtrack].iwait -= this.iwait;
	      }
	      this.fwait = this.iwait / this.deltas * (this.msqtr / 1000000);
	    } else this.fwait = 1 / 50; // 1/50th of a second

	    return ret != 0;
	  },
	  rewind: function rewind(subsong) {
	    this.position = 0;
	    this.tins = 0;
	    this.adlib_style = this.MIDI_STYLE | this.CMF_STYLE;
	    this.adlib_mode = this.ADLIB_MELODIC;
	    for (var i = 0; i < 128; i++) {
	      for (var j = 0; j < 14; j++) {
	        this.myinsbank[i][j] = this.midi_fm_instruments[i][j];
	      }
	      this.myinsbank[i][14] = 0;
	      this.myinsbank[i][15] = 0;
	    }
	    for (var i = 0; i < 16; i++) {
	      this.channels[i].inum = 0;
	      for (var j = 0; j < 11; j++) {
	        this.channels[i].ins[j] = this.myinsbank[this.channels[i].inum][j];
	      }
	      this.channels[i].vol = 127;
	      this.channels[i].nshift = -25;
	      this.channels[i].on = 1;
	    }
	    for (var i = 0; i < 9; i++) {
	      this.chp[i][0] = -1;
	      this.chp[i][2] = 0;
	    }
	    this.deltas = 250; // just a number,  not a standard
	    this.msqtr = 500000;
	    this.fwait = 1 / 123; // gotta be a small thing.. sorta like nothing
	    this.iwait = 0;
	    this.subsongs = 1;
	    for (var i = 0; i < 16; i++) {
	      this.tracks[i].tend = 0;
	      this.tracks[i].spos = 0;
	      this.tracks[i].pos = 0;
	      this.tracks[i].iwait = 0;
	      this.tracks[i].on = 0;
	      this.tracks[i].pv = 0;
	    }
	    this.curtrack = 0;
	    this.position = 0;
	    this.getnext(1);
	    switch (this.type) {
	      case this.FILE_LUCAS:
	        this.getnext(24); //skip junk and get to the midi.
	        this.adlib_style = this.LUCAS_STYLE | this.MIDI_STYLE;
	      //note: no break, we go right into midi headers...
	      case this.FILE_MIDI:
	        if (this.type != this.FILE_LUCAS) this.tins = 128;
	        this.getnext(11); //skip header
	        this.deltas = this.getnext(2);
	        this.getnext(4);
	        var track = this.tracks[0];
	        track.on = 1;
	        track.tend = this.getnext(4);
	        track.spos = this.position;
	        break;
	    }
	    for (var i = 0; i < 16; i++) {
	      if (this.tracks[i].on != 0) {
	        this.tracks[i].pos = this.tracks[i].spos;
	        this.tracks[i].pv = 0;
	        this.tracks[i].iwait = 0;
	      }
	    }
	    this.doing = 1;
	    this.midi_fm_reset();
	  },
	  refresh: function refresh() {
	    return Math.min(this.fwait, 100);
	  },
	  datalook: function datalook(pos) {
	    return this.position < 0 || this.position >= this.data.length ? 0 : this.data[pos];
	  },
	  getnexti: function getnexti(num) {
	    var v = 0;
	    for (var i = 0; i < num; i++) {
	      v += this.datalook(this.position) << 8 * i;
	      this.position++;
	    }
	    return v;
	  },
	  getnext: function getnext(num) {
	    var v = 0;
	    for (var i = 0; i < num; i++) {
	      v <<= 8;
	      v += this.datalook(this.position);
	      this.position++;
	    }
	    return v;
	  },
	  getval: function getval() {
	    var b = this.getnext(1);
	    var v = b & 0x7f;
	    while ((b & 0x80) != 0) {
	      b = this.getnext(1);
	      v = (v << 7) + (b & 0x7f);
	    }
	    return v;
	  },
	  midi_write_adlib: function midi_write_adlib(r, v) {
	    this.opl.write(0, r, v);
	    this.adlib_data[r] = v;
	  },
	  midi_fm_instrument: function midi_fm_instrument(voice, inst) {
	    this.midi_write_adlib(0x20 + this.adlib_opadd[voice], inst[0]);
	    this.midi_write_adlib(0x23 + this.adlib_opadd[voice], inst[1]);
	    if ((this.adlib_style & this.LUCAS_STYLE) != 0) {
	      this.midi_write_adlib(0x43 + this.adlib_opadd[voice], 0x3f);
	      if ((inst[10] & 1) == 0) this.midi_write_adlib(0x40 + this.adlib_opadd[voice], inst[2]);else this.midi_write_adlib(0x40 + this.adlib_opadd[voice], 0x3f);
	    }
	    this.midi_write_adlib(0x60 + this.adlib_opadd[voice], inst[4]);
	    this.midi_write_adlib(0x63 + this.adlib_opadd[voice], inst[5]);
	    this.midi_write_adlib(0x80 + this.adlib_opadd[voice], inst[6]);
	    this.midi_write_adlib(0x83 + this.adlib_opadd[voice], inst[7]);
	    this.midi_write_adlib(0xe0 + this.adlib_opadd[voice], inst[8]);
	    this.midi_write_adlib(0xe3 + this.adlib_opadd[voice], inst[9]);
	  },
	  midi_fm_percussion: function midi_fm_percussion(ch, inst) {
	    var opadd = this.map_chan[ch - 12];
	    this.midi_write_adlib(0x20 + opadd, inst[0]);
	    this.midi_write_adlib(0x40 + opadd, inst[2]);
	    this.midi_write_adlib(0x60 + opadd, inst[4]);
	    this.midi_write_adlib(0x80 + opadd, inst[6]);
	    this.midi_write_adlib(0xe0 + opadd, inst[8]);
	  },
	  midi_fm_volume: function midi_fm_volume(voice, volume) {
	    var vol = volume >> 2;
	    if ((this.adlib_data[0xc0 + voice] & 1) == 1) this.midi_write_adlib(0x40 + this.adlib_opadd[voice], 63 - vol | this.adlib_data[0x40 + this.adlib_opadd[voice]] & 0xc0);
	    this.midi_write_adlib(0x43 + this.adlib_opadd[voice], 63 - vol | this.adlib_data[0x43 + this.adlib_opadd[voice]] & 0xc0);
	  },
	  midi_fm_playnote: function midi_fm_playnote(voice, note, volume) {
	    if (note < 0) note = 12 - note % 12;
	    var freq = this.fnums[note % 12];
	    var oct = note / 12 | 0;
	    this.midi_fm_volume(voice, volume);
	    this.midi_write_adlib(0xa0 + voice, freq & 0xff);
	    var c = ((freq & 0x300) >> 8) + (oct << 2) + (this.adlib_mode == this.ADLIB_MELODIC || voice < 6 ? 1 << 5 : 0);
	    this.midi_write_adlib(0xb0 + voice, c);
	  },
	  midi_fm_endnote: function midi_fm_endnote(voice) {
	    this.midi_write_adlib(0xb0 + voice, this.adlib_data[0xb0 + voice] & 255 - 32);
	  },
	  midi_fm_reset: function midi_fm_reset() {
	    for (var i = 0; i < 256; i++) {
	      this.midi_write_adlib(i, 0);
	    }
	    for (var i = 0xc0; i <= 0xc8; i++) {
	      this.midi_write_adlib(i, 0xf0);
	    }
	    this.midi_write_adlib(0x01, 0x20);
	    this.midi_write_adlib(0xbd, 0xc0);
	  },
	  midi_fm_instruments: [[0x21, 0x21, 0x8f, 0x0c, 0xf2, 0xf2, 0x45, 0x76, 0x00, 0x00, 0x08, 0, 0, 0], /* Acoustic Grand */
	  [0x31, 0x21, 0x4b, 0x09, 0xf2, 0xf2, 0x54, 0x56, 0x00, 0x00, 0x08, 0, 0, 0], /* Bright Acoustic */
	  [0x31, 0x21, 0x49, 0x09, 0xf2, 0xf2, 0x55, 0x76, 0x00, 0x00, 0x08, 0, 0, 0], /* Electric Grand */
	  [0xb1, 0x61, 0x0e, 0x09, 0xf2, 0xf3, 0x3b, 0x0b, 0x00, 0x00, 0x06, 0, 0, 0], /* Honky-Tonk */
	  [0x01, 0x21, 0x57, 0x09, 0xf1, 0xf1, 0x38, 0x28, 0x00, 0x00, 0x00, 0, 0, 0], /* Electric Piano 1 */
	  [0x01, 0x21, 0x93, 0x09, 0xf1, 0xf1, 0x38, 0x28, 0x00, 0x00, 0x00, 0, 0, 0], /* Electric Piano 2 */
	  [0x21, 0x36, 0x80, 0x17, 0xa2, 0xf1, 0x01, 0xd5, 0x00, 0x00, 0x08, 0, 0, 0], /* Harpsichord */
	  [0x01, 0x01, 0x92, 0x09, 0xc2, 0xc2, 0xa8, 0x58, 0x00, 0x00, 0x0a, 0, 0, 0], /* Clav */
	  [0x0c, 0x81, 0x5c, 0x09, 0xf6, 0xf3, 0x54, 0xb5, 0x00, 0x00, 0x00, 0, 0, 0], /* Celesta */
	  [0x07, 0x11, 0x97, 0x89, 0xf6, 0xf5, 0x32, 0x11, 0x00, 0x00, 0x02, 0, 0, 0], /* Glockenspiel */
	  [0x17, 0x01, 0x21, 0x09, 0x56, 0xf6, 0x04, 0x04, 0x00, 0x00, 0x02, 0, 0, 0], /* Music Box */
	  [0x18, 0x81, 0x62, 0x09, 0xf3, 0xf2, 0xe6, 0xf6, 0x00, 0x00, 0x00, 0, 0, 0], /* Vibraphone */
	  [0x18, 0x21, 0x23, 0x09, 0xf7, 0xe5, 0x55, 0xd8, 0x00, 0x00, 0x00, 0, 0, 0], /* Marimba */
	  [0x15, 0x01, 0x91, 0x09, 0xf6, 0xf6, 0xa6, 0xe6, 0x00, 0x00, 0x04, 0, 0, 0], /* Xylophone */
	  [0x45, 0x81, 0x59, 0x89, 0xd3, 0xa3, 0x82, 0xe3, 0x00, 0x00, 0x0c, 0, 0, 0], /* Tubular Bells */
	  [0x03, 0x81, 0x49, 0x89, 0x74, 0xb3, 0x55, 0x05, 0x01, 0x00, 0x04, 0, 0, 0], /* Dulcimer */
	  [0x71, 0x31, 0x92, 0x09, 0xf6, 0xf1, 0x14, 0x07, 0x00, 0x00, 0x02, 0, 0, 0], /* Drawbar Organ */
	  [0x72, 0x30, 0x14, 0x09, 0xc7, 0xc7, 0x58, 0x08, 0x00, 0x00, 0x02, 0, 0, 0], /* Percussive Organ */
	  [0x70, 0xb1, 0x44, 0x09, 0xaa, 0x8a, 0x18, 0x08, 0x00, 0x00, 0x04, 0, 0, 0], /* Rock Organ */
	  [0x23, 0xb1, 0x93, 0x09, 0x97, 0x55, 0x23, 0x14, 0x01, 0x00, 0x04, 0, 0, 0], /* Church Organ */
	  [0x61, 0xb1, 0x13, 0x89, 0x97, 0x55, 0x04, 0x04, 0x01, 0x00, 0x00, 0, 0, 0], /* Reed Organ */
	  [0x24, 0xb1, 0x48, 0x09, 0x98, 0x46, 0x2a, 0x1a, 0x01, 0x00, 0x0c, 0, 0, 0], /* Accoridan */
	  [0x61, 0x21, 0x13, 0x09, 0x91, 0x61, 0x06, 0x07, 0x01, 0x00, 0x0a, 0, 0, 0], /* Harmonica */
	  [0x21, 0xa1, 0x13, 0x92, 0x71, 0x61, 0x06, 0x07, 0x00, 0x00, 0x06, 0, 0, 0], /* Tango Accordian */
	  [0x02, 0x41, 0x9c, 0x89, 0xf3, 0xf3, 0x94, 0xc8, 0x01, 0x00, 0x0c, 0, 0, 0], /* Acoustic Guitar(nylon) */
	  [0x03, 0x11, 0x54, 0x09, 0xf3, 0xf1, 0x9a, 0xe7, 0x01, 0x00, 0x0c, 0, 0, 0], /* Acoustic Guitar(steel) */
	  [0x23, 0x21, 0x5f, 0x09, 0xf1, 0xf2, 0x3a, 0xf8, 0x00, 0x00, 0x00, 0, 0, 0], /* Electric Guitar(jazz) */
	  [0x03, 0x21, 0x87, 0x89, 0xf6, 0xf3, 0x22, 0xf8, 0x01, 0x00, 0x06, 0, 0, 0], /* Electric Guitar(clean) */
	  [0x03, 0x21, 0x47, 0x09, 0xf9, 0xf6, 0x54, 0x3a, 0x00, 0x00, 0x00, 0, 0, 0], /* Electric Guitar(muted) */
	  [0x23, 0x21, 0x4a, 0x0e, 0x91, 0x84, 0x41, 0x19, 0x01, 0x00, 0x08, 0, 0, 0], /* Overdriven Guitar */
	  [0x23, 0x21, 0x4a, 0x09, 0x95, 0x94, 0x19, 0x19, 0x01, 0x00, 0x08, 0, 0, 0], /* Distortion Guitar */
	  [0x09, 0x84, 0xa1, 0x89, 0x20, 0xd1, 0x4f, 0xf8, 0x00, 0x00, 0x08, 0, 0, 0], /* Guitar Harmonics */
	  [0x21, 0xa2, 0x1e, 0x09, 0x94, 0xc3, 0x06, 0xa6, 0x00, 0x00, 0x02, 0, 0, 0], /* Acoustic Bass */
	  [0x31, 0x31, 0x12, 0x09, 0xf1, 0xf1, 0x28, 0x18, 0x00, 0x00, 0x0a, 0, 0, 0], /* Electric Bass(finger) */
	  [0x31, 0x31, 0x8d, 0x09, 0xf1, 0xf1, 0xe8, 0x78, 0x00, 0x00, 0x0a, 0, 0, 0], /* Electric Bass(pick) */
	  [0x31, 0x32, 0x5b, 0x09, 0x51, 0x71, 0x28, 0x48, 0x00, 0x00, 0x0c, 0, 0, 0], /* Fretless Bass */
	  [0x01, 0x21, 0x8b, 0x49, 0xa1, 0xf2, 0x9a, 0xdf, 0x00, 0x00, 0x08, 0, 0, 0], /* Slap Bass 1 */
	  [0x21, 0x21, 0x8b, 0x11, 0xa2, 0xa1, 0x16, 0xdf, 0x00, 0x00, 0x08, 0, 0, 0], /* Slap Bass 2 */
	  [0x31, 0x31, 0x8b, 0x09, 0xf4, 0xf1, 0xe8, 0x78, 0x00, 0x00, 0x0a, 0, 0, 0], /* Synth Bass 1 */
	  [0x31, 0x31, 0x12, 0x09, 0xf1, 0xf1, 0x28, 0x18, 0x00, 0x00, 0x0a, 0, 0, 0], /* Synth Bass 2 */
	  [0x31, 0x21, 0x15, 0x09, 0xdd, 0x56, 0x13, 0x26, 0x01, 0x00, 0x08, 0, 0, 0], /* Violin */
	  [0x31, 0x21, 0x16, 0x09, 0xdd, 0x66, 0x13, 0x06, 0x01, 0x00, 0x08, 0, 0, 0], /* Viola */
	  [0x71, 0x31, 0x49, 0x09, 0xd1, 0x61, 0x1c, 0x0c, 0x01, 0x00, 0x08, 0, 0, 0], /* Cello */
	  [0x21, 0x23, 0x4d, 0x89, 0x71, 0x72, 0x12, 0x06, 0x01, 0x00, 0x02, 0, 0, 0], /* Contrabass */
	  [0xf1, 0xe1, 0x40, 0x09, 0xf1, 0x6f, 0x21, 0x16, 0x01, 0x00, 0x02, 0, 0, 0], /* Tremolo Strings */
	  [0x02, 0x01, 0x1a, 0x89, 0xf5, 0x85, 0x75, 0x35, 0x01, 0x00, 0x00, 0, 0, 0], /* Pizzicato Strings */
	  [0x02, 0x01, 0x1d, 0x89, 0xf5, 0xf3, 0x75, 0xf4, 0x01, 0x00, 0x00, 0, 0, 0], /* Orchestral Strings */
	  [0x10, 0x11, 0x41, 0x09, 0xf5, 0xf2, 0x05, 0xc3, 0x01, 0x00, 0x02, 0, 0, 0], /* Timpani */
	  [0x21, 0xa2, 0x9b, 0x0a, 0xb1, 0x72, 0x25, 0x08, 0x01, 0x00, 0x0e, 0, 0, 0], /* String Ensemble 1 */
	  [0xa1, 0x21, 0x98, 0x09, 0x7f, 0x3f, 0x03, 0x07, 0x01, 0x01, 0x00, 0, 0, 0], /* String Ensemble 2 */
	  [0xa1, 0x61, 0x93, 0x09, 0xc1, 0x4f, 0x12, 0x05, 0x00, 0x00, 0x0a, 0, 0, 0], /* SynthStrings 1 */
	  [0x21, 0x61, 0x18, 0x09, 0xc1, 0x4f, 0x22, 0x05, 0x00, 0x00, 0x0c, 0, 0, 0], /* SynthStrings 2 */
	  [0x31, 0x72, 0x5b, 0x8c, 0xf4, 0x8a, 0x15, 0x05, 0x00, 0x00, 0x00, 0, 0, 0], /* Choir Aahs */
	  [0xa1, 0x61, 0x90, 0x09, 0x74, 0x71, 0x39, 0x67, 0x00, 0x00, 0x00, 0, 0, 0], /* Voice Oohs */
	  [0x71, 0x72, 0x57, 0x09, 0x54, 0x7a, 0x05, 0x05, 0x00, 0x00, 0x0c, 0, 0, 0], /* Synth Voice */
	  [0x90, 0x41, 0x00, 0x09, 0x54, 0xa5, 0x63, 0x45, 0x00, 0x00, 0x08, 0, 0, 0], /* Orchestra Hit */
	  [0x21, 0x21, 0x92, 0x0a, 0x85, 0x8f, 0x17, 0x09, 0x00, 0x00, 0x0c, 0, 0, 0], /* Trumpet */
	  [0x21, 0x21, 0x94, 0x0e, 0x75, 0x8f, 0x17, 0x09, 0x00, 0x00, 0x0c, 0, 0, 0], /* Trombone */
	  [0x21, 0x61, 0x94, 0x09, 0x76, 0x82, 0x15, 0x37, 0x00, 0x00, 0x0c, 0, 0, 0], /* Tuba */
	  [0x31, 0x21, 0x43, 0x09, 0x9e, 0x62, 0x17, 0x2c, 0x01, 0x01, 0x02, 0, 0, 0], /* Muted Trumpet */
	  [0x21, 0x21, 0x9b, 0x09, 0x61, 0x7f, 0x6a, 0x0a, 0x00, 0x00, 0x02, 0, 0, 0], /* French Horn */
	  [0x61, 0x22, 0x8a, 0x0f, 0x75, 0x74, 0x1f, 0x0f, 0x00, 0x00, 0x08, 0, 0, 0], /* Brass Section */
	  [0xa1, 0x21, 0x86, 0x8c, 0x72, 0x71, 0x55, 0x18, 0x01, 0x00, 0x00, 0, 0, 0], /* SynthBrass 1 */
	  [0x21, 0x21, 0x4d, 0x09, 0x54, 0xa6, 0x3c, 0x1c, 0x00, 0x00, 0x08, 0, 0, 0], /* SynthBrass 2 */
	  [0x31, 0x61, 0x8f, 0x09, 0x93, 0x72, 0x02, 0x0b, 0x01, 0x00, 0x08, 0, 0, 0], /* Soprano Sax */
	  [0x31, 0x61, 0x8e, 0x09, 0x93, 0x72, 0x03, 0x09, 0x01, 0x00, 0x08, 0, 0, 0], /* Alto Sax */
	  [0x31, 0x61, 0x91, 0x09, 0x93, 0x82, 0x03, 0x09, 0x01, 0x00, 0x0a, 0, 0, 0], /* Tenor Sax */
	  [0x31, 0x61, 0x8e, 0x09, 0x93, 0x72, 0x0f, 0x0f, 0x01, 0x00, 0x0a, 0, 0, 0], /* Baritone Sax */
	  [0x21, 0x21, 0x4b, 0x09, 0xaa, 0x8f, 0x16, 0x0a, 0x01, 0x00, 0x08, 0, 0, 0], /* Oboe */
	  [0x31, 0x21, 0x90, 0x09, 0x7e, 0x8b, 0x17, 0x0c, 0x01, 0x01, 0x06, 0, 0, 0], /* English Horn */
	  [0x31, 0x32, 0x81, 0x09, 0x75, 0x61, 0x19, 0x19, 0x01, 0x00, 0x00, 0, 0, 0], /* Bassoon */
	  [0x32, 0x21, 0x90, 0x09, 0x9b, 0x72, 0x21, 0x17, 0x00, 0x00, 0x04, 0, 0, 0], /* Clarinet */
	  [0xe1, 0xe1, 0x1f, 0x09, 0x85, 0x65, 0x5f, 0x1a, 0x00, 0x00, 0x00, 0, 0, 0], /* Piccolo */
	  [0xe1, 0xe1, 0x46, 0x09, 0x88, 0x65, 0x5f, 0x1a, 0x00, 0x00, 0x00, 0, 0, 0], /* Flute */
	  [0xa1, 0x21, 0x9c, 0x09, 0x75, 0x75, 0x1f, 0x0a, 0x00, 0x00, 0x02, 0, 0, 0], /* Recorder */
	  [0x31, 0x21, 0x8b, 0x09, 0x84, 0x65, 0x58, 0x1a, 0x00, 0x00, 0x00, 0, 0, 0], /* Pan Flute */
	  [0xe1, 0xa1, 0x4c, 0x09, 0x66, 0x65, 0x56, 0x26, 0x00, 0x00, 0x00, 0, 0, 0], /* Blown Bottle */
	  [0x62, 0xa1, 0xcb, 0x09, 0x76, 0x55, 0x46, 0x36, 0x00, 0x00, 0x00, 0, 0, 0], /* Skakuhachi */
	  [0x62, 0xa1, 0xa2, 0x09, 0x57, 0x56, 0x07, 0x07, 0x00, 0x00, 0x0b, 0, 0, 0], /* Whistle */
	  [0x62, 0xa1, 0x9c, 0x09, 0x77, 0x76, 0x07, 0x07, 0x00, 0x00, 0x0b, 0, 0, 0], /* Ocarina */
	  [0x22, 0x21, 0x59, 0x09, 0xff, 0xff, 0x03, 0x0f, 0x02, 0x00, 0x00, 0, 0, 0], /* Lead 1 (square) */
	  [0x21, 0x21, 0x0e, 0x09, 0xff, 0xff, 0x0f, 0x0f, 0x01, 0x01, 0x00, 0, 0, 0], /* Lead 2 (sawtooth) */
	  [0x22, 0x21, 0x46, 0x89, 0x86, 0x64, 0x55, 0x18, 0x00, 0x00, 0x00, 0, 0, 0], /* Lead 3 (calliope) */
	  [0x21, 0xa1, 0x45, 0x09, 0x66, 0x96, 0x12, 0x0a, 0x00, 0x00, 0x00, 0, 0, 0], /* Lead 4 (chiff) */
	  [0x21, 0x22, 0x8b, 0x09, 0x92, 0x91, 0x2a, 0x2a, 0x01, 0x00, 0x00, 0, 0, 0], /* Lead 5 (charang) */
	  [0xa2, 0x61, 0x9e, 0x49, 0xdf, 0x6f, 0x05, 0x07, 0x00, 0x00, 0x02, 0, 0, 0], /* Lead 6 (voice) */
	  [0x20, 0x60, 0x1a, 0x09, 0xef, 0x8f, 0x01, 0x06, 0x00, 0x02, 0x00, 0, 0, 0], /* Lead 7 (fifths) */
	  [0x21, 0x21, 0x8f, 0x86, 0xf1, 0xf4, 0x29, 0x09, 0x00, 0x00, 0x0a, 0, 0, 0], /* Lead 8 (bass+lead) */
	  [0x77, 0xa1, 0xa5, 0x09, 0x53, 0xa0, 0x94, 0x05, 0x00, 0x00, 0x02, 0, 0, 0], /* Pad 1 (new age) */
	  [0x61, 0xb1, 0x1f, 0x89, 0xa8, 0x25, 0x11, 0x03, 0x00, 0x00, 0x0a, 0, 0, 0], /* Pad 2 (warm) */
	  [0x61, 0x61, 0x17, 0x09, 0x91, 0x55, 0x34, 0x16, 0x00, 0x00, 0x0c, 0, 0, 0], /* Pad 3 (polysynth) */
	  [0x71, 0x72, 0x5d, 0x09, 0x54, 0x6a, 0x01, 0x03, 0x00, 0x00, 0x00, 0, 0, 0], /* Pad 4 (choir) */
	  [0x21, 0xa2, 0x97, 0x09, 0x21, 0x42, 0x43, 0x35, 0x00, 0x00, 0x08, 0, 0, 0], /* Pad 5 (bowed) */
	  [0xa1, 0x21, 0x1c, 0x09, 0xa1, 0x31, 0x77, 0x47, 0x01, 0x01, 0x00, 0, 0, 0], /* Pad 6 (metallic) */
	  [0x21, 0x61, 0x89, 0x0c, 0x11, 0x42, 0x33, 0x25, 0x00, 0x00, 0x0a, 0, 0, 0], /* Pad 7 (halo) */
	  [0xa1, 0x21, 0x15, 0x09, 0x11, 0xcf, 0x47, 0x07, 0x01, 0x00, 0x00, 0, 0, 0], /* Pad 8 (sweep) */
	  [0x3a, 0x51, 0xce, 0x09, 0xf8, 0x86, 0xf6, 0x02, 0x00, 0x00, 0x02, 0, 0, 0], /* FX 1 (rain) */
	  [0x21, 0x21, 0x15, 0x09, 0x21, 0x41, 0x23, 0x13, 0x01, 0x00, 0x00, 0, 0, 0], /* FX 2 (soundtrack) */
	  [0x06, 0x01, 0x5b, 0x09, 0x74, 0xa5, 0x95, 0x72, 0x00, 0x00, 0x00, 0, 0, 0], /* FX 3 (crystal) */
	  [0x22, 0x61, 0x92, 0x8c, 0xb1, 0xf2, 0x81, 0x26, 0x00, 0x00, 0x0c, 0, 0, 0], /* FX 4 (atmosphere) */
	  [0x41, 0x42, 0x4d, 0x09, 0xf1, 0xf2, 0x51, 0xf5, 0x01, 0x00, 0x00, 0, 0, 0], /* FX 5 (brightness) */
	  [0x61, 0xa3, 0x94, 0x89, 0x11, 0x11, 0x51, 0x13, 0x01, 0x00, 0x06, 0, 0, 0], /* FX 6 (goblins) */
	  [0x61, 0xa1, 0x8c, 0x89, 0x11, 0x1d, 0x31, 0x03, 0x00, 0x00, 0x06, 0, 0, 0], /* FX 7 (echoes) */
	  [0xa4, 0x61, 0x4c, 0x09, 0xf3, 0x81, 0x73, 0x23, 0x01, 0x00, 0x04, 0, 0, 0], /* FX 8 (sci-fi) */
	  [0x02, 0x07, 0x85, 0x0c, 0xd2, 0xf2, 0x53, 0xf6, 0x00, 0x01, 0x00, 0, 0, 0], /* Sitar */
	  [0x11, 0x13, 0x0c, 0x89, 0xa3, 0xa2, 0x11, 0xe5, 0x01, 0x00, 0x00, 0, 0, 0], /* Banjo */
	  [0x11, 0x11, 0x06, 0x09, 0xf6, 0xf2, 0x41, 0xe6, 0x01, 0x02, 0x04, 0, 0, 0], /* Shamisen */
	  [0x93, 0x91, 0x91, 0x09, 0xd4, 0xeb, 0x32, 0x11, 0x00, 0x01, 0x08, 0, 0, 0], /* Koto */
	  [0x04, 0x01, 0x4f, 0x09, 0xfa, 0xc2, 0x56, 0x05, 0x00, 0x00, 0x0c, 0, 0, 0], /* Kalimba */
	  [0x21, 0x22, 0x49, 0x09, 0x7c, 0x6f, 0x20, 0x0c, 0x00, 0x01, 0x06, 0, 0, 0], /* Bagpipe */
	  [0x31, 0x21, 0x85, 0x09, 0xdd, 0x56, 0x33, 0x16, 0x01, 0x00, 0x0a, 0, 0, 0], /* Fiddle */
	  [0x20, 0x21, 0x04, 0x8a, 0xda, 0x8f, 0x05, 0x0b, 0x02, 0x00, 0x06, 0, 0, 0], /* Shanai */
	  [0x05, 0x03, 0x6a, 0x89, 0xf1, 0xc3, 0xe5, 0xe5, 0x00, 0x00, 0x06, 0, 0, 0], /* Tinkle Bell */
	  [0x07, 0x02, 0x15, 0x09, 0xec, 0xf8, 0x26, 0x16, 0x00, 0x00, 0x0a, 0, 0, 0], /* Agogo */
	  [0x05, 0x01, 0x9d, 0x09, 0x67, 0xdf, 0x35, 0x05, 0x00, 0x00, 0x08, 0, 0, 0], /* Steel Drums */
	  [0x18, 0x12, 0x96, 0x09, 0xfa, 0xf8, 0x28, 0xe5, 0x00, 0x00, 0x0a, 0, 0, 0], /* Woodblock */
	  [0x10, 0x00, 0x86, 0x0c, 0xa8, 0xfa, 0x07, 0x03, 0x00, 0x00, 0x06, 0, 0, 0], /* Taiko Drum */
	  [0x11, 0x10, 0x41, 0x0c, 0xf8, 0xf3, 0x47, 0x03, 0x02, 0x00, 0x04, 0, 0, 0], /* Melodic Tom */
	  [0x01, 0x10, 0x8e, 0x09, 0xf1, 0xf3, 0x06, 0x02, 0x02, 0x00, 0x0e, 0, 0, 0], /* Synth Drum */
	  [0x0e, 0xc0, 0x00, 0x09, 0x1f, 0x1f, 0x00, 0xff, 0x00, 0x03, 0x0e, 0, 0, 0], /* Reverse Cymbal */
	  [0x06, 0x03, 0x80, 0x91, 0xf8, 0x56, 0x24, 0x84, 0x00, 0x02, 0x0e, 0, 0, 0], /* Guitar Fret Noise */
	  [0x0e, 0xd0, 0x00, 0x0e, 0xf8, 0x34, 0x00, 0x04, 0x00, 0x03, 0x0e, 0, 0, 0], /* Breath Noise */
	  [0x0e, 0xc0, 0x00, 0x09, 0xf6, 0x1f, 0x00, 0x02, 0x00, 0x03, 0x0e, 0, 0, 0], /* Seashore */
	  [0xd5, 0xda, 0x95, 0x49, 0x37, 0x56, 0xa3, 0x37, 0x00, 0x00, 0x00, 0, 0, 0], /* Bird Tweet */
	  [0x35, 0x14, 0x5c, 0x11, 0xb2, 0xf4, 0x61, 0x15, 0x02, 0x00, 0x0a, 0, 0, 0], /* Telephone ring */
	  [0x0e, 0xd0, 0x00, 0x09, 0xf6, 0x4f, 0x00, 0xf5, 0x00, 0x03, 0x0e, 0, 0, 0], /* Helicopter */
	  [0x26, 0xe4, 0x00, 0x09, 0xff, 0x12, 0x01, 0x16, 0x00, 0x01, 0x0e, 0, 0, 0], /* Applause */
	  [0x00, 0x00, 0x00, 0x09, 0xf3, 0xf6, 0xf0, 0xc9, 0x00, 0x02, 0x0e, 0, 0, 0] /* Gunshot */],

	  midi_fm_vol_table: [0, 11, 16, 19, 22, 25, 27, 29, 32, 33, 35, 37, 39, 40, 42, 43, 45, 46, 48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 64, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 75, 76, 77, 78, 79, 80, 80, 81, 82, 83, 83, 84, 85, 86, 86, 87, 88, 89, 89, 90, 91, 91, 92, 93, 93, 94, 95, 96, 96, 97, 97, 98, 99, 99, 100, 101, 101, 102, 103, 103, 104, 104, 105, 106, 106, 107, 107, 108, 109, 109, 110, 110, 111, 112, 112, 113, 113, 114, 114, 115, 115, 116, 117, 117, 118, 118, 119, 119, 120, 120, 121, 121, 122, 122, 123, 123, 124, 124, 125, 125, 126, 126, 127]
	});
	function MidiChannel() {
	  this.ins = new Int32Array(11);
	}
	function MidiTrack() {}

	var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init() {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }
	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}
	function toByteArray(b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4');
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;
	  var L = 0;
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = tmp >> 16 & 0xFF;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }
	  if (placeHolders === 2) {
	    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
	    arr[L++] = tmp >> 8 & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }
	  return arr;
	}
	function tripletToBase64(num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
	}
	function encodeChunk(uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('');
	}
	function fromByteArray(uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[tmp << 4 & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    output += lookup[tmp >> 10];
	    output += lookup[tmp >> 4 & 0x3F];
	    output += lookup[tmp << 2 & 0x3F];
	    output += '=';
	  }
	  parts.push(output);
	  return parts.join('');
	}

	function read(buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? nBytes - 1 : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];
	  i += d;
	  e = s & (1 << -nBits) - 1;
	  s >>= -nBits;
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : (s ? -1 : 1) * Infinity;
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	}
	function write(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
	  var i = isLE ? 0 : nBytes - 1;
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
	  value = Math.abs(value);
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	  e = e << mLen | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;
	var isArray$1 = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined ? global$1.TYPED_ARRAY_SUPPORT : true;

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	kMaxLength();

	function kMaxLength() {
	  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
	}
	function createBuffer(that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length');
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length);
	    }
	    that.length = length;
	  }
	  return that;
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer(arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length);
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error('If encoding is specified then the first argument must be a string');
	    }
	    return allocUnsafe(this, arg);
	  }
	  return from(this, arg, encodingOrOffset, length);
	}
	Buffer.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype;
	  return arr;
	};
	function from(that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number');
	  }
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length);
	  }
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset);
	  }
	  return fromObject(that, value);
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length);
	};
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype;
	  Buffer.__proto__ = Uint8Array;
	  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) ;
	}
	function assertSize(size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number');
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative');
	  }
	}
	function alloc(that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size);
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
	  }
	  return createBuffer(that, size);
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding);
	};
	function allocUnsafe(that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that;
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size);
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size);
	};
	function fromString(that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding');
	  }
	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);
	  var actual = that.write(string, encoding);
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }
	  return that;
	}
	function fromArrayLike(that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that;
	}
	function fromArrayBuffer(that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds');
	  }
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds');
	  }
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that;
	}
	function fromObject(that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);
	    if (that.length === 0) {
	      return that;
	    }
	    obj.copy(that, 0, 0, len);
	    return that;
	  }
	  if (obj) {
	    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0);
	      }
	      return fromArrayLike(that, obj);
	    }
	    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
	      return fromArrayLike(that, obj.data);
	    }
	  }
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
	}
	function checked(length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
	  }
	  return length | 0;
	}
	Buffer.isBuffer = isBuffer;
	function internalIsBuffer(b) {
	  return !!(b != null && b._isBuffer);
	}
	Buffer.compare = function compare(a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers');
	  }
	  if (a === b) return 0;
	  var x = a.length;
	  var y = b.length;
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }
	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};
	Buffer.isEncoding = function isEncoding(encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true;
	    default:
	      return false;
	  }
	};
	Buffer.concat = function concat(list, length) {
	  if (!isArray$1(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers');
	  }
	  if (list.length === 0) {
	    return Buffer.alloc(0);
	  }
	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }
	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers');
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer;
	};
	function byteLength(string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length;
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength;
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }
	  var len = string.length;
	  if (len === 0) return 0;

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len;
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length;
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;
	      case 'hex':
	        return len >>> 1;
	      case 'base64':
	        return base64ToBytes(string).length;
	      default:
	        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;
	function slowToString(encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return '';
	  }
	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }
	  if (end <= 0) {
	    return '';
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;
	  if (end <= start) {
	    return '';
	  }
	  if (!encoding) encoding = 'utf8';
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end);
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end);
	      case 'ascii':
	        return asciiSlice(this, start, end);
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end);
	      case 'base64':
	        return base64Slice(this, start, end);
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end);
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true;
	function swap(b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}
	Buffer.prototype.swap16 = function swap16() {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits');
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this;
	};
	Buffer.prototype.swap32 = function swap32() {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits');
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this;
	};
	Buffer.prototype.swap64 = function swap64() {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits');
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this;
	};
	Buffer.prototype.toString = function toString() {
	  var length = this.length | 0;
	  if (length === 0) return '';
	  if (arguments.length === 0) return utf8Slice(this, 0, length);
	  return slowToString.apply(this, arguments);
	};
	Buffer.prototype.equals = function equals(b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer');
	  if (this === b) return true;
	  return Buffer.compare(this, b) === 0;
	};
	Buffer.prototype.inspect = function inspect() {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>';
	};
	Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer');
	  }
	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index');
	  }
	  if (thisStart >= thisEnd && start >= end) {
	    return 0;
	  }
	  if (thisStart >= thisEnd) {
	    return -1;
	  }
	  if (start >= end) {
	    return 1;
	  }
	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;
	  if (this === target) return 0;
	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);
	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break;
	    }
	  }
	  if (x < y) return -1;
	  if (y < x) return 1;
	  return 0;
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1;

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : buffer.length - 1;
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1;else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;else return -1;
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1;
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
	      }
	    }
	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
	  }
	  throw new TypeError('val must be string, number or Buffer');
	}
	function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1;
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }
	  function read(buf, i) {
	    if (indexSize === 1) {
	      return buf[i];
	    } else {
	      return buf.readUInt16BE(i * indexSize);
	    }
	  }
	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break;
	        }
	      }
	      if (found) return i;
	    }
	  }
	  return -1;
	}
	Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1;
	};
	Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
	};
	Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
	};
	function hexWrite(buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');
	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i;
	    buf[offset + i] = parsed;
	  }
	  return i;
	}
	function utf8Write(buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
	}
	function asciiWrite(buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length);
	}
	function latin1Write(buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length);
	}
	function base64Write(buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length);
	}
	function ucs2Write(buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
	}
	Buffer.prototype.write = function write(string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	    // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	    // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
	  }
	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;
	  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds');
	  }
	  if (!encoding) encoding = 'utf8';
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length);
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length);
	      case 'ascii':
	        return asciiWrite(this, string, offset, length);
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length);
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length);
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length);
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};
	Buffer.prototype.toJSON = function toJSON() {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  };
	};
	function base64Slice(buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf);
	  } else {
	    return fromByteArray(buf.slice(start, end));
	  }
	}
	function utf8Slice(buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];
	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break;
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break;
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }
	    res.push(codePoint);
	    i += bytesPerSequence;
	  }
	  return decodeCodePointsArray(res);
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;
	function decodeCodePointsArray(codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
	  }
	  return res;
	}
	function asciiSlice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret;
	}
	function latin1Slice(buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret;
	}
	function hexSlice(buf, start, end) {
	  var len = buf.length;
	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;
	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out;
	}
	function utf16leSlice(buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res;
	}
	Buffer.prototype.slice = function slice(start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;
	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }
	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }
	  if (end < start) end = start;
	  var newBuf;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }
	  return newBuf;
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset(offset, ext, length) {
	  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
	}
	Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  return val;
	};
	Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }
	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }
	  return val;
	};
	Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset];
	};
	Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | this[offset + 1] << 8;
	};
	Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] << 8 | this[offset + 1];
	};
	Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
	};
	Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
	};
	Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
	  return val;
	};
	Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);
	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);
	  return val;
	};
	Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return this[offset];
	  return (0xff - this[offset] + 1) * -1;
	};
	Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | this[offset + 1] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};
	Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | this[offset] << 8;
	  return val & 0x8000 ? val | 0xFFFF0000 : val;
	};
	Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
	};
	Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
	};
	Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4);
	};
	Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4);
	};
	Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8);
	};
	Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8);
	};
	function checkInt(buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	}
	Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }
	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }
	  return offset + byteLength;
	};
	Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }
	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = value / mul & 0xFF;
	  }
	  return offset + byteLength;
	};
	Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = value & 0xff;
	  return offset + 1;
	};
	function objectWriteUInt16(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
	  }
	}
	Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};
	Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};
	function objectWriteUInt32(buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
	  }
	}
	Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = value >>> 24;
	    this[offset + 2] = value >>> 16;
	    this[offset + 1] = value >>> 8;
	    this[offset] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};
	Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};
	Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);
	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }
	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }
	  return offset + byteLength;
	};
	Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);
	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }
	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
	  }
	  return offset + byteLength;
	};
	Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = value & 0xff;
	  return offset + 1;
	};
	Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2;
	};
	Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 8;
	    this[offset + 1] = value & 0xff;
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2;
	};
	Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value & 0xff;
	    this[offset + 1] = value >>> 8;
	    this[offset + 2] = value >>> 16;
	    this[offset + 3] = value >>> 24;
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4;
	};
	Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value >>> 24;
	    this[offset + 1] = value >>> 16;
	    this[offset + 2] = value >>> 8;
	    this[offset + 3] = value & 0xff;
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4;
	};
	function checkIEEE754(buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range');
	  if (offset < 0) throw new RangeError('Index out of range');
	}
	function writeFloat(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4;
	}
	Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert);
	};
	Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert);
	};
	function writeDouble(buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8;
	}
	Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert);
	};
	Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert);
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy(target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0;
	  if (target.length === 0 || this.length === 0) return 0;

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds');
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
	  if (end < 0) throw new RangeError('sourceEnd out of bounds');

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }
	  var len = end - start;
	  var i;
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
	  }
	  return len;
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill(val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string');
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding);
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index');
	  }
	  if (end <= start) {
	    return this;
	  }
	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;
	  if (!val) val = 0;
	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }
	  return this;
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
	function base64clean(str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return '';
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str;
	}
	function stringtrim(str) {
	  if (str.trim) return str.trim();
	  return str.replace(/^\s+|\s+$/g, '');
	}
	function toHex(n) {
	  if (n < 16) return '0' + n.toString(16);
	  return n.toString(16);
	}
	function utf8ToBytes(string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue;
	        }

	        // valid lead
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue;
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }
	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break;
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break;
	      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break;
	      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break;
	      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
	    } else {
	      throw new Error('Invalid code point');
	    }
	  }
	  return bytes;
	}
	function asciiToBytes(str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray;
	}
	function utf16leToBytes(str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break;
	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }
	  return byteArray;
	}
	function base64ToBytes(str) {
	  return toByteArray(base64clean(str));
	}
	function blitBuffer(src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if (i + offset >= dst.length || i >= src.length) break;
	    dst[i + offset] = src[i];
	  }
	  return i;
	}
	function isnan(val) {
	  return val !== val; // eslint-disable-line no-self-compare
	}

	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
	}
	function isFastBuffer(obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer(obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0));
	}

	var DRO$1 = /*#__PURE__*/function () {
	  function DRO(opl) {
	    _classCallCheck(this, DRO);
	    this.opl = opl;
	    this.hardwareType = ['OPL2', 'Dual OPL2', 'OPL3'];
	  }
	  _createClass(DRO, [{
	    key: "load",
	    value: function load(buffer) {
	      var header = new Buffer.from(buffer.buffer).slice(0, 8).toString();
	      if (header != 'DBRAWOPL') throw new Error('Buffer is not a "DOSBox Raw OPL" file');
	      var buffer = this.data = new DataView(buffer.buffer);
	      this.version = 'v' + buffer.getUint16(8, true) + '.' + buffer.getUint16(10, true);
	      this.size = buffer.getUint32(12, true);
	      this.length = buffer.getUint32(16, true);
	      this.hardware = this.hardwareType[buffer.getUint8(20)];
	      this.dataFormat = buffer.getUint8(21);
	      this.compression = buffer.getUint8(22);
	      this.shortDelay = buffer.getUint8(23);
	      this.longDelay = buffer.getUint8(24);
	      this.codemapSize = buffer.getUint8(25);
	      this.position = 26;
	      this.codemap = [];
	      for (var i = 0; i < this.codemapSize; i++) {
	        this.codemap[i] = buffer.getUint8(this.position++);
	      }
	      this.start = this.position;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.delay = 0;
	      while (!this.delay && this.position < this.data.byteLength) {
	        var index = this.data.getUint8(this.position);
	        var reg = this.codemap[index];
	        if (index & 0x80) {
	          reg = 0x100 + this.codemap[index & 0x7f];
	        }
	        if (this.position + 1 >= this.data.byteLength) {
	          return false;
	        }
	        var value = this.data.getUint8(this.position + 1);
	        this.position += 2;
	        if (index == this.shortDelay) {
	          this.delay = value + 1;
	          return true;
	        } else if (index == this.longDelay) {
	          this.delay = value + 1 << 8;
	          return true;
	        } else if (typeof reg == 'number') {
	          this.midi_write_adlib(reg, value);
	        } else throw Error('Unknown index: ' + index);
	      }
	      return false;
	    }
	  }, {
	    key: "rewind",
	    value: function rewind() {
	      this.position = this.start;
	    }
	  }, {
	    key: "refresh",
	    value: function refresh() {
	      return this.delay / 8 * 1 / 120;
	    }
	  }, {
	    key: "midi_write_adlib",
	    value: function midi_write_adlib(r, v) {
	      var a = 0;
	      if (r >= 0x100) {
	        a = 1;
	        r -= 0x100;
	      }
	      this.opl.write(a, r, v);
	    }
	  }]);
	  return DRO;
	}();
	var dro = DRO$1;

	var extend = extend$2;
	function IMF$1(opl) {
	  this.opl = opl;
	}
	var imf = IMF$1;
	extend(IMF$1.prototype, {
	  load: function load(buffer) {
	    this.data = new DataView(buffer.buffer);
	    this.size = this.data.getUint16(0, true);
	    if (!this.size) {
	      this.type = 0;
	      this.position = 0;
	      this.size = this.data.byteLength;
	    } else {
	      this.type = 1;
	      this.position = 2;
	    }
	  },
	  update: function update() {
	    this.delay = 0;
	    while (!this.delay && this.position < this.size) {
	      try {
	        var reg = this.data.getUint8(this.position++);
	        var value = this.data.getUint8(this.position++);
	        this.delay = this.data.getUint16(this.position, true);
	        this.position += 2;
	        this.midi_write_adlib(reg, value);
	        if (this.delay) return true;
	      } catch (err) {
	        break;
	      }
	    }
	    return false;
	  },
	  rewind: function rewind() {
	    this.position = 0;
	  },
	  refresh: function refresh() {
	    return this.delay / 700;
	  },
	  midi_write_adlib: function midi_write_adlib(r, v) {
	    var a = 0;
	    if (r >= 0x100) {
	      a = 1;
	      r -= 0x100;
	    }
	    this.opl.write(a, r, v);
	  }
	});

	var RAW$1 = /*#__PURE__*/function () {
	  function RAW(opl) {
	    _classCallCheck(this, RAW);
	    this.opl = opl;
	  }
	  _createClass(RAW, [{
	    key: "load",
	    value: function load(buffer) {
	      var header = new Buffer.from(buffer.buffer).slice(0, 8).toString();
	      if (header != 'RAWADATA') throw new Error('Buffer is not a "Rdos Raw OPL Capture" file');
	      this.data = new DataView(buffer.buffer);
	      this.clock = this.data.getUint16(8, true);
	      this.rewind();
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.delay = 0;
	      while (!this.songend && !this.delay && this.position < this.data.byteLength) {
	        var value = this.data.getUint8(this.position++);
	        var reg = this.data.getUint8(this.position++);
	        switch (reg) {
	          case 0xff:
	            if (value == 0xff) this.songend = true;
	            break;
	          case 0x00:
	            this.delay = value || 0xff;
	            break;
	          case 0x02:
	            switch (value) {
	              case 0x00:
	                this.clock = this.data.getUint16(this.position, true);
	                this.position += 2;
	                break;
	              case 0x01:
	                this.bank = 0;
	                break;
	              case 0x02:
	                this.bank = 1;
	                break;
	            }
	            break;
	          default:
	            this.midi_write_adlib(reg, value);
	        }
	      }
	      return !this.songend && this.delay;
	    }
	  }, {
	    key: "rewind",
	    value: function rewind() {
	      this.songend = false;
	      this.delay = 0;
	      this.position = 10;
	      this.bank = 0;
	      this.opl.write(0x01, 0x20);
	    }
	  }, {
	    key: "refresh",
	    value: function refresh() {
	      return this.delay / (1193180 / (this.clock || 0xffff));
	    }
	  }, {
	    key: "midi_write_adlib",
	    value: function midi_write_adlib(r, v) {
	      this.opl.write(this.bank, r, v);
	    }
	  }]);
	  return RAW;
	}();
	var raw = RAW$1;

	var _rad = /*#__PURE__*/new WeakMap();
	var RAD$1 = /*#__PURE__*/function () {
	  function RAD(opl) {
	    _classCallCheck(this, RAD);
	    _classPrivateFieldInitSpec(this, _rad, {
	      writable: true,
	      value: {
	        speed: 6,
	        speedCnt: 6,
	        //pOrderList: null,
	        //orderSize: 0,
	        order: [],
	        orderPos: 0,
	        //pPatternList: null,
	        //pPatterns: [],
	        //pPatternPos: null,
	        patterns: new Array(32),
	        patternPos: 0,
	        currentLine: 0,
	        instruments: new Array(32),
	        //pInstr: [], // 31
	        Old43: [],
	        // 9
	        OldA0B0: [],
	        // 9
	        ToneSlideSpeed: [],
	        // 9
	        ToneSlideFreq: [],
	        // 9
	        ToneSlide: [],
	        // 9
	        PortSlide: [],
	        // 9
	        VolSlide: [] // 9
	      }
	    });
	    _defineProperty(this, "rad_NoteFreq", [0x16b, 0x181, 0x198, 0x1b0, 0x1ca, 0x1e5, 0x202, 0x220, 0x241, 0x263, 0x287, 0x2ae]);
	    _defineProperty(this, "rad_ChannelOffs", [0x20, 0x21, 0x22, 0x28, 0x29, 0x2a, 0x30, 0x31, 0x32]);
	    this.opl = opl;
	  }
	  _createClass(RAD, [{
	    key: "load",
	    value: function load(buffer) {
	      var header = new Buffer.from(buffer.buffer).slice(0, 16).toString();
	      if (header != 'RAD by REALiTY!!') throw new Error('Buffer is not a "RAD by REALiTY!!" file');
	      var ptune = this.data = new DataView(buffer.buffer);
	      var version = ptune.getUint8(16);
	      if (version != 0x10) throw new Error('Unsupported RAD version: 0x' + version.toString(16));
	      var off = 17;
	      var speed = ptune.getUint8(off);
	      _classPrivateFieldGet(this, _rad).speed = speed & 0x3f;
	      console.log('Speed: ', _classPrivateFieldGet(this, _rad).speed);
	      this.rad_set_timer(speed & 0x60 ? 18 : 50);
	      console.log('Timer: ', speed & 0x60 ? 18 : 50);
	      if (speed & 0x80) {
	        off++; // Skip description
	        while (ptune.getUint8(off)) {
	          off++;
	        }
	      }
	      off++;

	      // read initial instruments
	      while (ptune.getUint8(off)) {
	        var i = ptune.getUint8(off);
	        _classPrivateFieldGet(this, _rad).instruments[i] = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 12)));
	        off += 12;
	      }
	      off++;
	      var orderSize = ptune.getUint8(off);
	      _classPrivateFieldGet(this, _rad).order = Array.from(new Uint8Array(ptune.buffer.slice(off + 1, off + 1 + orderSize)));
	      console.log('Order size: ', orderSize);
	      console.log(_classPrivateFieldGet(this, _rad).order);
	      off += orderSize + 1;
	      var patternList = new Uint16Array(ptune.buffer.slice(off, off + 32 * 2));
	      console.log(patternList);
	      for (var p = 0; p < 32; p++) {
	        if (!patternList[p]) {
	          _classPrivateFieldGet(this, _rad).patterns[p] = [];
	          continue;
	        }
	        var o = off = patternList[p]; // off
	        var line;
	        do {
	          line = ptune.getUint8(o);
	          o++;
	          var ch;
	          do {
	            ch = ptune.getUint8(o);
	            o++;
	            ptune.getUint8(o);
	            o++;
	            var eff = ptune.getUint8(o);
	            o++;
	            if (eff & 0x0f) o++;
	          } while (!(ch & 0x80));
	        } while (!(line & 0x80));
	        _classPrivateFieldGet(this, _rad).patterns[p] = Array.from(new Uint8Array(ptune.buffer.slice(off, o)));
	      }
	      console.log(_classPrivateFieldGet(this, _rad).patterns);
	    }
	  }, {
	    key: "update",
	    value: function update() {}
	  }, {
	    key: "rewind",
	    value: function rewind() {}
	  }, {
	    key: "refresh",
	    value: function refresh() {}

	    // private methods
	  }, {
	    key: "rad_set_timer",
	    value: function rad_set_timer(timer) {}
	  }]);
	  return RAD;
	}();
	var rad = RAD$1;

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);
	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.usingDomains = false;
	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	EventEmitter.init = function () {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active ) ;
	  }
	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }
	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}
	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn) handler.call(self);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self);
	    }
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn) handler.call(self, arg1);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1);
	    }
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn) handler.call(self, arg1, arg2);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1, arg2);
	    }
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn) handler.call(self, arg1, arg2, arg3);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) {
	      listeners[i].call(self, arg1, arg2, arg3);
	    }
	  }
	}
	function emitMany(handler, isFn, self, args) {
	  if (isFn) handler.apply(self, args);else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i) {
	      listeners[i].apply(self, args);
	    }
	  }
	}
	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = type === 'error';
	  events = this._events;
	  if (events) doError = doError && events.error == null;else if (!doError) return false;
	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er) er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }
	  handler = events[type];
	  if (!handler) return false;
	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++) {
	        args[i - 1] = arguments[i];
	      }
	      emitMany(handler, isFn, this, args);
	  }
	  return true;
	};
	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type, listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }
	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }
	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	EventEmitter.prototype.prependListener = function prependListener(type, listener) {
	  return _addListener(this, type, listener, true);
	};
	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}
	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};
	EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  this.prependListener(type, _onceWrap(this, type, listener));
	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function removeListener(type, listener) {
	  var list, events, position, i, originalListener;
	  if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
	  events = this._events;
	  if (!events) return this;
	  list = events[type];
	  if (!list) return this;
	  if (list === listener || list.listener && list.listener === listener) {
	    if (--this._eventsCount === 0) this._events = new EventHandlers();else {
	      delete events[type];
	      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
	    }
	  } else if (typeof list !== 'function') {
	    position = -1;
	    for (i = list.length; i-- > 0;) {
	      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
	        originalListener = list[i].listener;
	        position = i;
	        break;
	      }
	    }
	    if (position < 0) return this;
	    if (list.length === 1) {
	      list[0] = undefined;
	      if (--this._eventsCount === 0) {
	        this._events = new EventHandlers();
	        return this;
	      } else {
	        delete events[type];
	      }
	    } else {
	      spliceOne(list, position);
	    }
	    if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
	  }
	  return this;
	};
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
	  var listeners, events;
	  events = this._events;
	  if (!events) return this;

	  // not listening for removeListener, no need to emit
	  if (!events.removeListener) {
	    if (arguments.length === 0) {
	      this._events = new EventHandlers();
	      this._eventsCount = 0;
	    } else if (events[type]) {
	      if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
	    }
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    var keys = Object.keys(events);
	    for (var i = 0, key; i < keys.length; ++i) {
	      key = keys[i];
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	    return this;
	  }
	  listeners = events[type];
	  if (typeof listeners === 'function') {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    do {
	      this.removeListener(type, listeners[listeners.length - 1]);
	    } while (listeners[0]);
	  }
	  return this;
	};
	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;
	  if (!events) ret = [];else {
	    evlistener = events[type];
	    if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
	  }
	  return ret;
	};
	EventEmitter.listenerCount = function (emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount$1.call(emitter, type);
	  }
	};
	EventEmitter.prototype.listenerCount = listenerCount$1;
	function listenerCount$1(type) {
	  var events = this._events;
	  if (events) {
	    var evlistener = events[type];
	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }
	  return 0;
	}
	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }
	  list.pop();
	}
	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--) {
	    copy[i] = arr[i];
	  }
	  return copy;
	}
	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	  throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	  throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	  cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	  cachedClearTimeout = clearTimeout;
	}
	function runTimeout(fun) {
	  if (cachedSetTimeout === setTimeout) {
	    //normal enviroments in sane situations
	    return setTimeout(fun, 0);
	  }
	  // if setTimeout wasn't available but was latter defined
	  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	    cachedSetTimeout = setTimeout;
	    return setTimeout(fun, 0);
	  }
	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedSetTimeout(fun, 0);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	      return cachedSetTimeout.call(null, fun, 0);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	      return cachedSetTimeout.call(this, fun, 0);
	    }
	  }
	}
	function runClearTimeout(marker) {
	  if (cachedClearTimeout === clearTimeout) {
	    //normal enviroments in sane situations
	    return clearTimeout(marker);
	  }
	  // if clearTimeout wasn't available but was latter defined
	  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	    cachedClearTimeout = clearTimeout;
	    return clearTimeout(marker);
	  }
	  try {
	    // when when somebody has screwed with setTimeout but no I.E. maddness
	    return cachedClearTimeout(marker);
	  } catch (e) {
	    try {
	      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	      return cachedClearTimeout.call(null, marker);
	    } catch (e) {
	      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	      return cachedClearTimeout.call(this, marker);
	    }
	  }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	function cleanUpNextTick() {
	  if (!draining || !currentQueue) {
	    return;
	  }
	  draining = false;
	  if (currentQueue.length) {
	    queue = currentQueue.concat(queue);
	  } else {
	    queueIndex = -1;
	  }
	  if (queue.length) {
	    drainQueue();
	  }
	}
	function drainQueue() {
	  if (draining) {
	    return;
	  }
	  var timeout = runTimeout(cleanUpNextTick);
	  draining = true;
	  var len = queue.length;
	  while (len) {
	    currentQueue = queue;
	    queue = [];
	    while (++queueIndex < len) {
	      if (currentQueue) {
	        currentQueue[queueIndex].run();
	      }
	    }
	    queueIndex = -1;
	    len = queue.length;
	  }
	  currentQueue = null;
	  draining = false;
	  runClearTimeout(timeout);
	}
	function nextTick(fun) {
	  var args = new Array(arguments.length - 1);
	  if (arguments.length > 1) {
	    for (var i = 1; i < arguments.length; i++) {
	      args[i - 1] = arguments[i];
	    }
	  }
	  queue.push(new Item(fun, args));
	  if (queue.length === 1 && !draining) {
	    runTimeout(drainQueue);
	  }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	  this.fun = fun;
	  this.array = array;
	}
	Item.prototype.run = function () {
	  this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};
	function noop() {}
	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;
	function binding(name) {
	  throw new Error('process.binding is not supported');
	}
	function cwd() {
	  return '/';
	}
	function chdir(dir) {
	  throw new Error('process.chdir is not supported');
	}
	function umask() {
	  return 0;
	}

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
	  return new Date().getTime();
	};

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp) {
	  var clocktime = performanceNow.call(performance) * 1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds < 0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds, nanoseconds];
	}
	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}
	var process = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var inherits;
	if (typeof Object.create === 'function') {
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function TempCtor() {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	var inherits$1 = inherits;

	var formatRegExp = /%[sdj%]/g;
	function format(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }
	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function (x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s':
	        return String(args[i++]);
	      case '%d':
	        return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	}

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global$1.process)) {
	    return function () {
	      return deprecate(fn, msg).apply(this, arguments);
	    };
	  }
	  if (process.noDeprecation === true) {
	    return fn;
	  }
	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }
	  return deprecated;
	}
	var debugs = {};
	var debugEnviron;
	function debuglog(set) {
	  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;
	      debugs[set] = function () {
	        var msg = format.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function () {};
	    }
	  }
	  return debugs[set];
	}

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold': [1, 22],
	  'italic': [3, 23],
	  'underline': [4, 24],
	  'inverse': [7, 27],
	  'white': [37, 39],
	  'grey': [90, 39],
	  'black': [30, 39],
	  'blue': [34, 39],
	  'cyan': [36, 39],
	  'green': [32, 39],
	  'magenta': [35, 39],
	  'red': [31, 39],
	  'yellow': [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};
	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];
	  if (style) {
	    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}
	function stylizeNoColor(str, styleType) {
	  return str;
	}
	function arrayToHash(array) {
	  var hash = {};
	  array.forEach(function (val, idx) {
	    hash[val] = true;
	  });
	  return hash;
	}
	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect && value && isFunction(value.inspect) &&
	  // Filter out the util module, it's inspect function is special
	  value.inspect !== inspect &&
	  // Also filter out any prototype objects using the circular check.
	  !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);
	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }
	  var base = '',
	    array = false,
	    braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }
	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }
	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }
	  ctx.seen.push(value);
	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function (key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }
	  ctx.seen.pop();
	  return reduceToSingleString(output, base, braces);
	}
	function formatPrimitive(ctx, value) {
	  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value)) return ctx.stylize('' + value, 'number');
	  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value)) return ctx.stylize('null', 'null');
	}
	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}
	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function (key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
	    }
	  });
	  return output;
	}
	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || {
	    value: value[key]
	  };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function (line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function (line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }
	  return name + ': ' + str;
	}
	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function (prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);
	  if (length > 60) {
	    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
	  }
	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}

	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	function isNull(arg) {
	  return arg === null;
	}
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	function isString(arg) {
	  return typeof arg === 'string';
	}
	function isUndefined(arg) {
	  return arg === void 0;
	}
	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	function isObject(arg) {
	  return _typeof(arg) === 'object' && arg !== null;
	}
	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	function isError(e) {
	  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}
	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;
	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	}
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}
	BufferList.prototype.push = function (v) {
	  var entry = {
	    data: v,
	    next: null
	  };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};
	BufferList.prototype.unshift = function (v) {
	  var entry = {
	    data: v,
	    next: this.head
	  };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};
	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};
	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};
	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }
	  return ret;
	};
	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return Buffer.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = Buffer.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

	// Copyright Joyent, Inc. and other Node contributors.
	var isBufferEncoding = Buffer.isEncoding || function (encoding) {
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	    case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};
	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	function StringDecoder(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	}

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function (buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;
	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);
	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }
	  charStr += buffer.toString(this.encoding, 0, end);
	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function (buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = buffer.length >= 3 ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};
	StringDecoder.prototype.end = function (buffer) {
	  var res = '';
	  if (buffer && buffer.length) res = this.write(buffer);
	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }
	  return res;
	};
	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}
	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}
	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

	Readable.ReadableState = ReadableState;
	var debug = debuglog('stream');
	inherits$1(Readable, EventEmitter);
	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	function listenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	}
	function ReadableState(options, stream) {
	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {
	  if (!(this instanceof Readable)) return new Readable(options);
	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;
	  if (options && typeof options.read === 'function') this._read = options.read;
	  EventEmitter.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = Buffer.from(chunk, encoding);
	      encoding = '';
	    }
	  }
	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};
	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};
	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }
	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	          if (state.needReadable) emitReadable(stream);
	        }
	      }
	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }
	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }
	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }
	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;
	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }
	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }
	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};
	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}
	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}
	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    nextTick(maybeReadMore_, stream, state);
	  }
	}
	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};
	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;
	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = !pipeOpts || pipeOpts.end !== false;
	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }
	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);
	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);
	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }
	  return dest;
	};
	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && src.listeners('data').length) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}
	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }
	    return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;
	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this);
	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = EventEmitter.prototype.on.call(this, ev, fn);
	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        nextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this);
	      }
	    }
	  }
	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;
	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};
	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    nextTick(resume_, stream, state);
	  }
	}
	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }
	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}
	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};
	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;
	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }
	    self.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };
	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }
	  return ret;
	}

	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}

	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}
	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
	  if (!state.endEmitted) {
	    state.ended = true;
	    nextTick(endReadableNT, state, stream);
	  }
	}
	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}
	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}
	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	// A bit simpler than readable streams.
	Writable.WritableState = WritableState;
	inherits$1(Writable, EventEmitter);
	function nop() {}
	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}
	function WritableState(options, stream) {
	  Object.defineProperty(this, 'buffer', {
	    get: deprecate(function () {
	      return this.getBuffer();
	    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	  });
	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;
	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~~this.highWaterMark;
	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}
	WritableState.prototype.getBuffer = function writableStateGetBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	function Writable(options) {
	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);
	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;
	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }
	  EventEmitter.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};
	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  nextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    nextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}
	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;
	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }
	  return ret;
	};
	Writable.prototype.cork = function () {
	  var state = this._writableState;
	  state.corked++;
	};
	Writable.prototype.uncork = function () {
	  var state = this._writableState;
	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};
	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};
	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);
	  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;
	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }
	  return ret;
	}
	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}
	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) nextTick(cb, er);else cb(er);
	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}
	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}
	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);
	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }
	    if (sync) {
	      /*<replacement>*/
	      nextTick(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}
	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;
	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }
	    if (entry === null) state.lastBufferedRequest = null;
	  }
	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}
	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};
	Writable.prototype._writev = null;
	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }
	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};
	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}
	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}
	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}
	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;
	  this.next = null;
	  this.entry = null;
	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}

	inherits$1(Duplex, Readable);
	var keys = Object.keys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  if (options && options.readable === false) this.readable = false;
	  if (options && options.writable === false) this.writable = false;
	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  nextTick(onEndNT, this);
	}
	function onEndNT(self) {
	  self.end();
	}

	// a transform stream is a readable/writable stream where you do
	inherits$1(Transform, Duplex);
	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };
	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}
	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;
	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));
	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data !== null && data !== undefined) stream.push(data);
	  cb(er);
	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	  Duplex.call(this, options);
	  this._transformState = new TransformState(this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;
	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }
	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}
	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('Not implemented');
	};
	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;
	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};
	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;
	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');
	  if (ts.transforming) throw new Error('Calling transform done when still transforming');
	  return stream.push(null);
	}

	inherits$1(PassThrough, Transform);
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}
	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

	inherits$1(Stream, EventEmitter);
	Stream.Readable = Readable;
	Stream.Writable = Writable;
	Stream.Duplex = Duplex;
	Stream.Transform = Transform;
	Stream.PassThrough = PassThrough;

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;

	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EventEmitter.call(this);
	}
	Stream.prototype.pipe = function (dest, options) {
	  var source = this;
	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }
	  source.on('data', ondata);
	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }
	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }
	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	    dest.end();
	  }
	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;
	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EventEmitter.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);
	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);
	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);
	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);
	    dest.removeListener('close', cleanup);
	  }
	  source.on('end', cleanup);
	  source.on('close', cleanup);
	  dest.on('close', cleanup);
	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

	var processor = "class WorkletProcessor extends AudioWorkletProcessor {\r\n    constructor() {\r\n        super();\r\n        this.port.onmessage = (e) => {\r\n            switch (e.data.cmd) {\r\n                case \"OPL3\": {\r\n                    // self is needed for browserify'd module\r\n                    // rollup's umd doesn't need it\r\n                    const opl3module = new Function(\"self\", e.data.value);\r\n                    opl3module(globalThis);\r\n                    console.log(globalThis)\r\n\r\n                    this.player = new OPL3.WorkletPlayer(this.port.postMessage, e.data.options || {});\r\n                    console.log(this.player)\r\n\r\n                    break;\r\n                }\r\n                case \"load\": {\r\n                    this.player.load(e.data.value);\r\n                    break;\r\n                }\r\n                case \"play\": {\r\n                    break;\r\n                }\r\n                case \"stop\": {\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    process(inputs, outputs, parameters) {\r\n        // Float32Array(128)\r\n        this.player.update(outputs[0]);\r\n        this.port.postMessage({ cmd: \"currentTime\", value: { currentFrame, currentTime } })\r\n\r\n        return true;\r\n    }\r\n}\r\n\r\nregisterProcessor(\"opl3-generator\", WorkletProcessor);\r\n";

	var currentScriptSrc = null;
	try {
	  currentScriptSrc = document.currentScript.src;
	} catch (err) {}
	var _options$1 = /*#__PURE__*/new WeakMap();
	var Player = /*#__PURE__*/function (_Readable) {
	  _inherits(Player, _Readable);
	  var _super = _createSuper(Player);
	  // source of opl3.js

	  function Player(options) {
	    var _this;
	    _classCallCheck(this, Player);
	    _this = _super.call(this);
	    _classPrivateFieldInitSpec(_assertThisInitialized(_this), _options$1, {
	      writable: true,
	      value: {}
	    });
	    _defineProperty(_assertThisInitialized(_this), "opl3module", null);
	    _defineProperty(_assertThisInitialized(_this), "audioContext", null);
	    _defineProperty(_assertThisInitialized(_this), "worklet", null);
	    _classPrivateFieldSet(_assertThisInitialized(_this), _options$1, options || {});
	    _this.init();
	    return _this;
	  }
	  _createClass(Player, [{
	    key: "init",
	    value: function () {
	      var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
	        return _regeneratorRuntime().wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return fetch(currentScriptSrc).then(function (script) {
	                  return script.text();
	                });
	              case 2:
	                this.opl3module = _context.sent;
	              case 3:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));
	      function init() {
	        return _init.apply(this, arguments);
	      }
	      return init;
	    }()
	  }, {
	    key: "initContext",
	    value: function () {
	      var _initContext = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
	        var _this2 = this;
	        var blob, objectURL, gainNode;
	        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                blob = new Blob([processor], {
	                  type: 'application/javascript'
	                });
	                objectURL = URL.createObjectURL(blob);
	                this.audioContext = new AudioContext({
	                  sampleRate: _classPrivateFieldGet(this, _options$1).sampleRate || 48000 // 8..9kHz
	                });
	                _context2.next = 5;
	                return this.audioContext.audioWorklet.addModule(objectURL);
	              case 5:
	                this.worklet = new AudioWorkletNode(this.audioContext, "opl3-generator", {
	                  numberOfOutputs: 1,
	                  outputChannelCount: [2]
	                });
	                gainNode = this.audioContext.createGain();
	                gainNode.gain.value = 4;
	                gainNode.connect(this.audioContext.destination);

	                // Pass the whole OPL3 module into the worklet
	                this.worklet.port.postMessage({
	                  cmd: 'OPL3',
	                  value: this.opl3module,
	                  options: _classPrivateFieldGet(this, _options$1)
	                });
	                this.worklet.port.onmessage = function (e) {
	                  return _this2.emit(e.data.cmd, e.data.value);
	                };
	                this.worklet.connect(gainNode);
	              case 12:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));
	      function initContext() {
	        return _initContext.apply(this, arguments);
	      }
	      return initContext;
	    }()
	  }, {
	    key: "play",
	    value: function play(buffer) {
	      this.load(buffer);
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      var _this$audioContext;
	      (_this$audioContext = this.audioContext) === null || _this$audioContext === void 0 ? void 0 : _this$audioContext.suspend();
	    }
	  }, {
	    key: "resume",
	    value: function resume() {
	      var _this$audioContext2;
	      (_this$audioContext2 = this.audioContext) === null || _this$audioContext2 === void 0 ? void 0 : _this$audioContext2.resume();
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      var _this$audioContext3;
	      (_this$audioContext3 = this.audioContext) === null || _this$audioContext3 === void 0 ? void 0 : _this$audioContext3.close();
	      this.audioContext = null;
	      this.worklet = null;
	    }
	  }, {
	    key: "load",
	    value: function () {
	      var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(buffer) {
	        var _this$worklet;
	        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                if (!(!this.audioContext || !this.worklet)) {
	                  _context3.next = 3;
	                  break;
	                }
	                _context3.next = 3;
	                return this.initContext();
	              case 3:
	                (_this$worklet = this.worklet) === null || _this$worklet === void 0 ? void 0 : _this$worklet.port.postMessage({
	                  cmd: 'load',
	                  value: buffer
	                });
	              case 4:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));
	      function load(_x) {
	        return _load.apply(this, arguments);
	      }
	      return load;
	    }()
	  }]);
	  return Player;
	}(Readable);

	var mainPlayer = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: Player
	});

	var require$$6 = /*@__PURE__*/getAugmentedNamespace(mainPlayer);

	// To be executed inside AudioWorklet in AudioWorkletGlobalScope

	var OPL3 = opl3;
	var DRO = dro;
	var IMF = imf;
	var LAA = laa;
	var RAW = raw;
	var RAD = rad;
	var _options = /*#__PURE__*/new WeakMap();
	var _samplesBuffer = /*#__PURE__*/new WeakMap();
	var _chunkSize = /*#__PURE__*/new WeakMap();
	var _postMessage = /*#__PURE__*/new WeakMap();
	var WorkletPlayer = /*#__PURE__*/function () {
	  // 48000 for audio worklet

	  function WorkletPlayer(postMessage, options) {
	    _classCallCheck(this, WorkletPlayer);
	    _classPrivateFieldInitSpec(this, _options, {
	      writable: true,
	      value: {}
	    });
	    _defineProperty(this, "format_player", null);
	    _classPrivateFieldInitSpec(this, _samplesBuffer, {
	      writable: true,
	      value: null
	    });
	    _defineProperty(this, "sampleRate", null);
	    _classPrivateFieldInitSpec(this, _chunkSize, {
	      writable: true,
	      value: 0
	    });
	    _classPrivateFieldInitSpec(this, _postMessage, {
	      writable: true,
	      value: null
	    });
	    _classPrivateFieldSet(this, _postMessage, postMessage);
	    _classPrivateFieldSet(this, _options, options || {});
	    _classPrivateFieldGet(this, _options).bufferSize = 128; // length of output in processor    
	  }
	  _createClass(WorkletPlayer, [{
	    key: "detectFormat",
	    value: function detectFormat(buffer /*: ArrayBuffer | Buffer*/) {
	      var header = function header(offset, length) {
	        return String.fromCharCode.apply(null, new Uint8Array(buffer.slice(offset, length)));
	      };

	      // TODO: move testing signatures into driver file
	      if (header(0, 3) == 'ADL') return LAA;
	      if (header(0, 8) == 'RAWADATA') return RAW;
	      if (header(0, 8) == 'DBRAWOPL') return DRO;
	      //if (header(0, 4) == 'MUS\x1a') return MUS;
	      if (header(0, 16) == 'RAD by REALiTY!!') return RAD;
	      // IMF has no ID :(

	      return IMF;
	    }
	  }, {
	    key: "play",
	    value: function play() {}
	  }, {
	    key: "pause",
	    value: function pause() {}
	  }, {
	    key: "load",
	    value: function load(buffer) {
	      if (buffer instanceof ArrayBuffer) buffer = new Buffer.from(buffer);
	      var format = this.detectFormat(buffer);
	      if (!format) throw 'File format not detected';
	      this.format_player = new format(new OPL3(), _classPrivateFieldGet(this, _options));
	      this.format_player.load(buffer);
	      _classPrivateFieldSet(this, _samplesBuffer, new Float32Array(_classPrivateFieldGet(this, _options).bufferSize * 2));
	      this.sampleRate = _classPrivateFieldGet(this, _options).sampleRate || 48000;
	      _classPrivateFieldSet(this, _chunkSize, 0);
	    }
	  }, {
	    key: "update",
	    value: function update(outputs) {
	      if (!this.format_player || !outputs) return;
	      var seek = 0;
	      _classPrivateFieldGet(this, _samplesBuffer).fill(0.0);
	      if (_classPrivateFieldGet(this, _chunkSize) === 0) {
	        this.format_player.update();
	        _classPrivateFieldSet(this, _chunkSize, 2 * (this.sampleRate * this.format_player.refresh() | 0));
	      }
	      if (_classPrivateFieldGet(this, _chunkSize) < _classPrivateFieldGet(this, _options).bufferSize * 2) {
	        this.format_player.opl.read(_classPrivateFieldGet(this, _samplesBuffer), seek, _classPrivateFieldGet(this, _chunkSize));
	        seek += _classPrivateFieldGet(this, _chunkSize);
	        this.format_player.update();
	        _classPrivateFieldSet(this, _chunkSize, 2 * (this.sampleRate * this.format_player.refresh() | 0));
	      }
	      if (_classPrivateFieldGet(this, _chunkSize) > 0) {
	        var samplesSize = Math.min(_classPrivateFieldGet(this, _options).bufferSize * 2 - seek, _classPrivateFieldGet(this, _chunkSize));
	        _classPrivateFieldSet(this, _chunkSize, _classPrivateFieldGet(this, _chunkSize) - samplesSize);
	        this.format_player.opl.read(_classPrivateFieldGet(this, _samplesBuffer), seek);

	        // convert interleaved channels into separate ones
	        for (var i = 0; i < _classPrivateFieldGet(this, _samplesBuffer).length; i += 2) {
	          outputs[0][i >> 1] = _classPrivateFieldGet(this, _samplesBuffer)[i];
	          outputs[1][i >> 1] = _classPrivateFieldGet(this, _samplesBuffer)[i + 1];
	        }
	      }
	    }
	  }]);
	  return WorkletPlayer;
	}();
	var workletPlayer = WorkletPlayer;

	var lib = {
	  OPL3: opl3,
	  format: {
	    LAA: laa,
	    //MUS: require('./format/mus'),
	    DRO: dro,
	    IMF: imf,
	    RAW: raw,
	    RAD: rad
	  },
	  //Player: require('./lib/player'),
	  Player: require$$6,
	  WorkletPlayer: workletPlayer
	};

	return lib;

}));
