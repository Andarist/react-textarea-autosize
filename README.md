# react-textarea-autosize

Drop-in replacement for the textarea component which automatically resizes textarea as content changes.
A native React version of the popular [jQuery
Autosize](http://www.jacklmoore.com/autosize/)!

This module supports IE9 and above. PR welcome to add IE8 support.

```javascript
require('babel/polyfill'); // polyfill is required

var Textarea = require('react-textarea-autosize');

React.renderComponent(
  <div>
    <Textarea></Textarea>
  </div>,
  document.getElementById('element'));
```

## Install

`npm install react-textarea-autosize`

## Demo

http://andreypopp.github.io/react-textarea-autosize/

## Development

To release patch, minor or major version:

    % make release-patch
    % make release-minor
    % make release-major

To publish release:

    % make publish
