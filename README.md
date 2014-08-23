# react-textarea-autosize

Replacement for textarea component which automatically grows textarea as content grows:

    var Textarea = require('react-textarea-autosize');

    React.renderComponent(
      <div>
        <Textarea></Textarea>
      </div>,
      document.body);
      
## Demo
http://andreypopp.github.io/react-textarea-autosize/

## Development

To release patch, minor or major version:

    % make release-patch
    % make release-minor
    % make release-major

To publish release:

    % make publish
