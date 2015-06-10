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

	  getInitialState: function() {
	    return {
	      mediaQuery: undefined
	    };
	  },

	  componentDidMount: function() {
	    new MediaListener(this.props.mediaQueries, this._onMediaQueryChange);
	  },

	  render: function() {
	    if (this.state.mediaQuery == undefined) {
	      return null;
	    }

	    var renderedChildren = React.Children.map(this.props.children, function(child) {
	      return React.cloneElement(child, { mediaQuery: this.state.mediaQuery } );
	    }.bind(this));
	    return React.DOM.div({children: renderedChildren});
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

	function MediaListener(mediaQueries, changeHandler) {
	  this.mediaQueries = mediaQueries;
	  this.changeHandler = changeHandler;

	  var mediaQuery;
	  for (mediaQuery in this.mediaQueries) {
	    this._setupMediaQuery(mediaQuery);
	  }
	}

	MediaListener.prototype._setupMediaQuery = function(name) {
	  var mql = window.matchMedia(this.mediaQueries[name]);
	  mql.addListener(function(e) {
	    return this._handleMediaQueryChange(e.matches, name);
	  }.bind(this));
	  return this._handleMediaQueryChange(mql.matches, name);
	};

	MediaListener.prototype._handleMediaQueryChange = function(matches, name) {
	  if (matches) {
	    return this.changeHandler(name);
	  }
	};

	module.exports = MediaListener;


/***/ }
/******/ ])
});
;