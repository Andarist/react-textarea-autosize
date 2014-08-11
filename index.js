var React = require('react');

module.exports = React.createClass({
  displayName: 'TextAreaAutoSize',

  componentDidMount: function() {
    this.getDiffSize();
    this.recalculateSize();
  },

  componentWillReceiveProps: function(nextProps) {
    this.dirty = !!nextProps.style;
  },

  componentDidUpdate: function() {
    if (this.dirty) {
      this.getDiffSize();
      this.dirty = false;
    }
  },

  getDiffSize: function() {
    var styles = window.getComputedStyle(this.getDOMNode());
    this.diff  = (
      parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
      parseInt(styles.getPropertyValue('padding-top') || 0, 10)
    );
  },

  recalculateSize: function() {
    if (!this.isMounted()) {
      return;
    }

    var node = this.getDOMNode();
    node.style.height = 'auto';
    node.style.height = (node.scrollHeight - this.diff) + 'px';
  },

  onChange: function(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }

    this.recalculateSize();
  },

  render: function() {
    return this.transferPropsTo(
      React.DOM.textarea({
        onChange: this.onChange
      }, this.props.children)
    );
  }
});
