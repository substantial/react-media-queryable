function MediaListener(mediaQueries, changeHandler) {
  this.mediaQueries = mediaQueries;
  this.changeHandler = changeHandler;

  var mediaQuery;
  for (mediaQuery in this.mediaQueries) {
    this._setupMediaQuery(mediaQuery);
  }
}

MediaListener.prototype._setupMediaQuery = function(name) {
  var mql = window.matchMedia(this.mediaQueries[name]);
  mql.addListener(function(e) {
    return this._handleMediaQueryChange(e.matches, name);
  }.bind(this));
  return this._handleMediaQueryChange(mql.matches, name);
};

MediaListener.prototype._handleMediaQueryChange = function(matches, name) {
  if (matches) {
    return this.changeHandler(name);
  }
};

module.exports = MediaListener;
