function MediaListener(mediaQueries, changeHandler) {
  this.changeHandler = changeHandler;
  this.mqls = this._buildMediaQueryLists(mediaQueries);
}

MediaListener.prototype.stopListening = function() {
  var name;
  for (name in this.mqls) {
    this.mqls[name].removeListener(this._handleMediaQueryChange);
  }
};

MediaListener.prototype._buildMediaQueryLists = function(mediaQueries) {
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
  var mql = window.matchMedia(mediaQuery);
  mql.addListener(function(e) {
    return this._handleMediaQueryChange(e.matches, name);
  }.bind(this));

  return mql;
};

MediaListener.prototype._handleMediaQueryChange = function(matches, name) {
  if (matches) {
    return this.changeHandler(name);
  }
};

module.exports = MediaListener;
