react-media-queryable
=====================

Trigger state updates when a media query matches the current state of the browser.

Background
----------

[Adaptive Design](https://developer.mozilla.org/en-US/Apps/Design/UI_layout_basics/Responsive_design_versus_adaptive_design)
is characterized as rendering only the content that a user's browser is equipped to handle. This is often used in scenarios where you want the markup for a component to differ based on screen size: showing a table of data, for example, on a desktop-class screen while showing the data as a list on a mobile-class screen.

Typically, Adaptive Design is a server-side methodology, where the server parses the User Agent string and delivers the best experience based on the data found there. Server-side User Agent sniffing, however, can be complex, hard to maintain, and often wrong. Single page apps written in JavaScript generate the HTML on the client side and can't take advantage of any server-side Adaptive Design implementation.

react-media-queryable is a React component that allows child components to know the rendering capabilities of the browser (via [media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries)) and decide how to render themselves based on those capabilities.

Usage
-----

Use it like any other React component, passing it a set of named media queries as `props`:

```js
var MediaQueryable = require('react-media-queryable'); // also available via amd define or window global
var mediaQueries = {
  small: "(max-width: 800px)",
  large: "(min-width: 801px)"
};

<MediaQueryable mediaQueries={mediaQueries} defaultMediaQuery="small">
  <MyComponent />
</MediaQueryable>
```

You must also specify a `defaultMediaQuery` prop, which will get used when no
other media queries match. If a browser does not support matchMedia, the
children will will always receive the default. This is also useful if you're
rendering your component server side.

`MyComponent` will now get a `mediaQuery` prop that will be set to the currently matched media query name and can render itself using that information:

```js
var MyComponent = React.createClass({
  render: function() {
    if (this.props.mediaQuery === 'large') {
      return <p>Desktop Experience!</p>;
    } else {
      return <p>Mobile Experience!</p>;
    }
  }
});
```

Whenever a new media query is matched (i.e. screen rotation or browser window resize), the `mediaQuery` prop will update, forcing a re-render of the child component. The media query object that you pass into the `MediaQueryable` component can contain any browser-supported media query definitions.

Compatibility
-------------

This library makes use of the [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API that's available in IE 10+. If you want to use it in older browsers, you can use the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/).

License
-------
Copyright (c) 2015 Substantial

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
