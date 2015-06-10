var React = require('react');
var MediaListener = require('./media_listener');

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
