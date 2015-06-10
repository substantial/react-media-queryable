var React = require('react');

module.exports = React.createClass({
  displayName: 'MediaQueryable',

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
