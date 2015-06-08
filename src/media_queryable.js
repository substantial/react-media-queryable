(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['React'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('React'));
  } else {
    root.MediaQueryable = factory(root.React);
  }
}(this, function (React) {
  var MediaQueryableMixin = function(mediaQueries) {
    return {
      getInitialState: function() {
        return {
          mediaQuery: undefined
        };
      },

      componentDidMount: function() {
        return new MediaListener(mediaQueries, this._onMediaQueryChange);
      },

      _onMediaQueryChange: function(name) {
        return this.setState({
          mediaQuery: name
        });
      }
    };
  };

  return MediaQueryableMixin;
}));
