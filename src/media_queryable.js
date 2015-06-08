(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['React'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('React'));
  } else {
    root.mediaQueryable = factory(root.React);
  }
}(this, function (React) {
  return function(Component, mediaQueries) {
    var MediaQueryableComponent = React.createClass({
      getInitialState: function() {
        return {
          mediaQuery: undefined
        };
      },

      componentDidMount: function() {
        for (name in mediaQueries) {
          this._setupMediaQuery(name);
        }
      },

      render: function() {
        if (this.state.mediaQuery == undefined) {
          return null;
        }

        return <Component {...this.props} {...this.state} />;
      },

      _setupMediaQuery: function(name) {
        var mql = window.matchMedia(mediaQueries[name]);
        mql.addListener((function(e) {
          this._handleMediaQueryChange(e.matches, name);
        }).bind(this));

        this._handleMediaQueryChange(mql.matches, name);
      },

      _handleMediaQueryChange: function(matches, name) {
        if (matches) {
          this.setState({mediaQuery: name});
        }
      }
    });

    return MediaQueryableComponent;
  };
}));
