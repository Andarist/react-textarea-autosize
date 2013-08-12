var React = require('react-tools/build/modules/react');
require('jquery-autosize');

module.exports = React.createClass({

  componentDidMount: function() {
    if (this.props.autosize) {
      window.jQuery(this.getDOMNode()).autosize();
    }
  },

  componentWillUnmount: function() {
    window.jQuery(this.getDOMNode()).trigger('autosize.destory');
  },

  render: function() {
    return this.transferPropsTo(React.DOM.textarea(null, this.props.children));
  }

});
