var React = require('react');
require('jquery-autosize');

module.exports = React.createClass({

  componentDidMount: function() {
    window.jQuery(this.getDOMNode()).autosize();
  },

  componentWillUnmount: function() {
    window.jQuery(this.getDOMNode()).trigger('autosize.destroy');
  },

  render: function() {
    return this.transferPropsTo(React.DOM.textarea({autosize: true}, this.props.children));
  }

});
