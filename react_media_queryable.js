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

	  getInitialState: function() {
	    return {
	      mediaQuery: undefined
	    };
	  },

	  componentDidMount: function() {
	    this.mediaListener = new MediaListener(this.props.mediaQueries, this._onMediaQueryChange);
	  },

	  componentWillUnmount: function() {
	    this.mediaListener.stopListening();
	  },

	  render: function() {
	    var mediaQuery = this._currentMediaQuery();
	    if (!mediaQuery) {
	      return null;
	    }

	    var renderedChildren = React.Children.map(this.props.children, function(child) {
	      return React.cloneElement(child, { mediaQuery: this._currentMediaQuery() } );
	    }, this);
	    return React.DOM.div(assign({}, this.props, {children: renderedChildren}));
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
	    this.mqls[name].removeListener(this._handleMediaQueryChange);
	  }
	};

	MediaListener.prototype._buildMediaQueryLists = function(mediaQueries) {
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
	  var mql = window.matchMedia(mediaQuery);
	  mql.addListener(function(e) {
	    return this._handleMediaQueryChange(e.matches, name);
	  }.bind(this));

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

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;

/***/ }
/******/ ])
});
;