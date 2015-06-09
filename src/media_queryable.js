var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      mediaQuery: undefined
    };
  },

  childContextTypes: {
    mediaQuery: React.PropTypes.string
  },

  getChildContext: function() {
    return {
      mediaQuery: this.state.mediaQuery
    }
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

    console.log("rendering media queryable");
    return React.DOM.div({children: this.props.children});
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
