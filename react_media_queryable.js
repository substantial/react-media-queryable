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
	    return React.DOM.div({children: renderedChildren});
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(3);

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
/***/ function(module, exports, __webpack_require__) {

	var window = window || {
	  matchMedia: function() {
	    return {
	      addListener: function() {},
	      removeListener: function() {}
	    };
	  }
	};
	module.exports = window;


/***/ }
/******/ ])
});
;