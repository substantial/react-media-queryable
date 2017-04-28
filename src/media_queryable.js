import PropTypes from "prop-types";
import React from "react";
import MediaListener from "./media_listener";

export default class extends React.Component {
  static displayName = "MediaQueryable";

  static propTypes = {
    className: PropTypes.string,
    defaultMediaQuery: PropTypes.string.isRequired,
    mediaQueries: PropTypes.object.isRequired,
    style: PropTypes.object
  };

  state = {
    mediaQuery: undefined
  };

  mediaListener = null;

  componentDidMount() {
    this.mediaListener = new MediaListener(
      this.props.mediaQueries,
      this._onMediaQueryChange
    );
  }

  componentWillUnmount() {
    if (this.mediaListener) {
      this.mediaListener.stopListening();
    }
  }

  render() {
    var mediaQuery = this._currentMediaQuery();
    if (!mediaQuery) {
      return null;
    }

    var renderedChildren = React.Children.map(
      this.props.children,
      function(child) {
        if (child !== null) {
          return React.cloneElement(child, {
            mediaQuery: this._currentMediaQuery()
          });
        }
      },
      this
    );
    return React.DOM.div(
      assign(
        {},
        {
          children: renderedChildren,
          className: this.props.className,
          style: this.props.style
        }
      )
    );
  }

  _currentMediaQuery = () => {
    return this.state.mediaQuery || this.props.defaultMediaQuery || null;
  };

  _onMediaQueryChange = name => {
    this.setState({
      mediaQuery: name
    });
  };
}
