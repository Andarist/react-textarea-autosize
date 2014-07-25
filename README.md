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
