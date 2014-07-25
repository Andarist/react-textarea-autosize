# react-textarea-autosize

Replacement for textarea component which uses jquery-autosize to grow textarea
as content grows:

    var Textarea = require('react-textarea-autosize');

    React.renderComponent(
      <div>
        <Textarea></Textarea>
      </div>,
      document.body);

This component relies on jQuery to be globally accessible via `window.jQuery`.

## Development

To release patch, minor or major version:

    % make release-patch
    % make release-minor
    % make release-major

To publish release:

    % make publish

## Todo

  - Get rid of jquery and jquery-autosize and implement needed functionality
    with React and DOM (where needed).
