var React = require('react');
var TextareaAutosize = require('../');

React.renderComponent(
  new TextareaAutosize({defaultValue: (new Array(15)).join('\nLine.')}),
  document.getElementById('main'));
