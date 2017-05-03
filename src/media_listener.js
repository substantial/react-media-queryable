function MediaListener(mediaQueries, changeHandler) {
  this.changeHandler = changeHandler;
  this.mqls = this._buildMediaQueryLists(mediaQueries);
}

MediaListener.prototype.stopListening = function() {
  var name;
  for (name in this.mqls) {
    var mql = this.mqls[name];
    mql.removeListener && mql.removeListener(mql._fn);
  }
};

MediaListener.prototype._buildMediaQueryLists = function(mediaQueries) {
  if (!window.matchMedia) return {};

  var mqls = {};
  var name;
  for (name in mediaQueries) {
    var mql = this._setupListeners(name, mediaQueries[name]);
    mqls[name] = mql;

    this._handleMediaQueryChange(mql.matches, name);
  }
  return mqls;
};

MediaListener.prototype._setupListeners = function(name, mediaQuery) {
  if (!window.matchMedia) return;

  var mql = window.matchMedia(mediaQuery);
  mql._fn = function(e) {
    return this._handleMediaQueryChange(e.matches, name);
  }.bind(this);
  mql.addListener(mql._fn);

  return mql;
};

MediaListener.prototype._handleMediaQueryChange = function(matches, name) {
  if (matches) {
    return this.changeHandler(name);
  }
};

export default MediaListener;
