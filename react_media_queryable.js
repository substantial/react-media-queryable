(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["MediaQueryable"] = factory(require("react"));
	else
		root["MediaQueryable"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var MediaListener = __webpack_require__(2);
	var assign = __webpack_require__(3);

	module.exports = React.createClass({
	  displayName: 'MediaQueryable',
	  mediaListener: null,
	  propTypes: {
	    className: React.PropTypes.string,
	    defaultMediaQuery: React.PropTypes.string.isRequired,
	    mediaQueries: React.PropTypes.object.isRequired,
	    style: React.PropTypes.object,
	  },

	  getInitialState: function() {
	    return {
	      mediaQuery: undefined
	    };
	  },

	  componentDidMount: function() {
	    this.mediaListener = new MediaListener(this.props.mediaQueries, this._onMediaQueryChange);
	  },

	  componentWillUnmount: function() {
	    if (this.mediaListener) {
	      this.mediaListener.stopListening();
	    }
	  },

	  render: function() {
	    var mediaQuery = this._currentMediaQuery();
	    if (!mediaQuery) {
	      return null;
	    }

	    var renderedChildren = React.Children.map(this.props.children, function(child) {
	      if (child !== null) {
	        return React.cloneElement(child, { mediaQuery: this._currentMediaQuery() } );
	      }
	    }, this);
	    return React.DOM.div(assign({}, {children: renderedChildren, className: this.props.className, style: this.props.style}));
	  },

	  _currentMediaQuery: function() {
	    return this.state.mediaQuery || this.props.defaultMediaQuery || null;
	  },

	  _onMediaQueryChange: function(name) {
	    this.setState({
	      mediaQuery: name
	    });
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function MediaListener(mediaQueries, changeHandler) {
	  this.changeHandler = changeHandler;
	  this.mqls = this._buildMediaQueryLists(mediaQueries);
	}

	MediaListener.prototype.stopListening = function() {
	  var name;
	  for (name in this.mqls) {
	    var mql = this.mqls[name];
	    mql.removeListener &&
	      mql.removeListener(mql._fn);
	  }
	};

	MediaListener.prototype._buildMediaQueryLists = function(mediaQueries) {
	  if (!window.matchMedia) return {};

	  var mqls = {};
	  var name;
	  for (name in mediaQueries) {
	    var mql = this._setupListeners(name, mediaQueries[name]);
	    mqls[name] = mql;

	    this._handleMediaQueryChange(mql.matches, name);
	  }
	  return mqls;
	};

	MediaListener.prototype._setupListeners = function(name, mediaQuery) {
	  if (!window.matchMedia) return;

	  var mql = window.matchMedia(mediaQuery);
	  mql._fn = function (e) {
	      return this._handleMediaQueryChange(e.matches, name);
	  }.bind(this);
	  mql.addListener(mql._fn);

	  return mql;
	};

	MediaListener.prototype._handleMediaQueryChange = function(matches, name) {
	  if (matches) {
	    return this.changeHandler(name);
	  }
	};

	module.exports = MediaListener;


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ }
/******/ ])
});
;