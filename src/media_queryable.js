var React = require('react');

var MediaQueryable = function(mediaQueries) {
  var MediaQueryableComponent = React.createClass({
    displayName: "MediaQueryable",

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
      for (name in mediaQueries) {
        this._setupMediaQuery(name);
      }
    },

    render: function() {
      if (this.state.mediaQuery == undefined) {
        return null;
      }

      console.log("rendering media queryable");
      return <div>
        { this.props.children }
      </div>;
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

module.exports = MediaQueryable;
