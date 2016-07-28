var React = require('react');
var MediaListener = require('./media_listener');
var assign = require('object-assign');

module.exports = React.createClass({
  displayName: 'MediaQueryable',
  mediaListener: null,
  propTypes: {
    className: React.PropTypes.string,
    defaultMediaQuery: React.PropTypes.string.isRequired,
    mediaQueries: React.PropTypes.object.isRequired,
    style: React.PropTyps.object
  },

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
      if (child !== null) {
        return React.cloneElement(child, { mediaQuery: this._currentMediaQuery() } );
      }
    }, this);
    return React.DOM.div(assign({}, {children: renderedChildren, className: this.props.className, style: this.props.style}));
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
