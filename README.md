# react-textarea-autosize

Drop-in replacement for the textarea component which automatically resizes textarea as content changes.
A native React version of the popular [jQuery
Autosize](http://www.jacklmoore.com/autosize/)!

This module supports IE9 and above.

```javascript
import Textarea from 'react-textarea-autosize';

// If you use CommonJS syntax:
//
// var Textarea = require('react-textarea-autosize').default;

React.renderComponent(
  <div>
    <Textarea></Textarea>
  </div>,
  document.getElementById('element'));
```

## Install

`npm install react-textarea-autosize`

## Demo

https://andreypopp.github.io/react-textarea-autosize/

## Development

To release patch, minor or major version:

    % npm run release:patch
    % npm run release:minor
    % npm run release:major

This will run eslint, compile sources from `src/` to `lib/`, `es/` and `dist/`, bump a
version in `package.json` and then create a new git commit with tag. If tests or
linter fails — commit won't be created. If tasks succeed it publishes to npm and pushes a tag to github.
