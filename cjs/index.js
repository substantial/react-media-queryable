'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PropTypes = _interopDefault(require('prop-types'));
var React = _interopDefault(require('react'));

function MediaListener(mediaQueries, changeHandler) {
  this.changeHandler = changeHandler;
  this.mqls = this._buildMediaQueryLists(mediaQueries);
}

MediaListener.prototype.stopListening = function () {
  var name;
  for (name in this.mqls) {
    var mql = this.mqls[name];
    mql.removeListener && mql.removeListener(mql._fn);
  }
};

MediaListener.prototype._buildMediaQueryLists = function (mediaQueries) {
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

MediaListener.prototype._setupListeners = function (name, mediaQuery) {
  if (!window.matchMedia) return;

  var mql = window.matchMedia(mediaQuery);
  mql._fn = function (e) {
    return this._handleMediaQueryChange(e.matches, name);
  }.bind(this);
  mql.addListener(mql._fn);

  return mql;
};

MediaListener.prototype._handleMediaQueryChange = function (matches, name) {
  if (matches) {
    return this.changeHandler(name);
  }
};

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mediaQuery: undefined
    }, _this.mediaListener = null, _this._currentMediaQuery = function () {
      return _this.state.mediaQuery || _this.props.defaultMediaQuery || null;
    }, _this._onMediaQueryChange = function (name) {
      _this.setState({
        mediaQuery: name
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mediaListener = new MediaListener(this.props.mediaQueries, this._onMediaQueryChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.mediaListener) {
        this.mediaListener.stopListening();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var mediaQuery = this._currentMediaQuery();
      if (!mediaQuery) {
        return null;
      }

      var renderedChildren = React.Children.map(this.props.children, function (child) {
        if (child !== null) {
          return React.cloneElement(child, {
            mediaQuery: this._currentMediaQuery()
          });
        }
      }, this);
      return React.DOM.div({
        children: renderedChildren,
        className: this.props.className,
        style: this.props.style
      });
    }
  }]);

  return _class;
}(React.Component);

_class.displayName = "MediaQueryable";
_class.propTypes = {
  className: PropTypes.string,
  defaultMediaQuery: PropTypes.string.isRequired,
  mediaQueries: PropTypes.object.isRequired,
  style: PropTypes.object
};

module.exports = _class;
