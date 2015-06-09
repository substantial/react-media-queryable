(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('react'));
  } else {
    root.MediaQueryable = factory(root.React);
  }
}(this, function (React) {
  return React.createClass({
    getInitialState: function() {
      return {
        mediaQuery: undefined
      };
    },

    componentDidMount: function() {
      for (name in this.props.mediaQueries) {
        this._setupMediaQuery(name);
      }
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

    _setupMediaQuery: function(name) {
      var mql = window.matchMedia(this.props.mediaQueries[name]);
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
}));
