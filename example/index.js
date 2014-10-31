var React = require('react');
var TextareaAutosize = require('../');

React.render(
  React.createElement(
    TextareaAutosize,
    {defaultValue: (new Array(15)).join('\nLine.')}),
  document.getElementById('main'));
