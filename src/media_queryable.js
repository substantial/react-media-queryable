var React = require('react');
var MediaListener = require('./media_listener');
var assign = require('react/lib/Object.assign');

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
    if (this.mediaListener) {
      this.mediaListener.stopListening();
    }
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
