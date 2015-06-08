(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['React', 'MediaListener'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('React'), require('MediaListener'));
  } else {
    root.MediaQueryable = factory(root.React, root.MediaListener);
  }
}(this, function (React, MediaListener) {
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
