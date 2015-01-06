var React = require('react');
var objectAssign = require('object-assign');

var TextareaAutosize = React.createClass({
  displayName: 'TextareaAutosize',

  render: function() {
    this.renderProps = _.assign({}, this.props, {
      onChange: this.onChange,
      style: _.assign({}, this.props.style, {overflow: 'hidden'})
    });

    return React.DOM.textarea(this.renderProps, this.props.children);
  },

  componentDidMount: function() {
    this.getDiffSize();
    this.recalculateSize();
  },

  componentWillReceiveProps: function(nextProps) {
    this.renderProps = _.assign({}, nextProps, this.renderProps);
    this.dirty = !!this.renderProps.style;
  },

  componentDidUpdate: function() {
    if (this.dirty) {
      this.getDiffSize();
      this.recalculateSize();
      this.dirty = false;
    }
  },

  onChange: function(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.recalculateSize();
  },

  getDiffSize: function() {
    if (window.getComputedStyle) {
      var styles = window.getComputedStyle(this.getDOMNode());

      // If the textarea is set to border-box, it's not necessary to
      // subtract the padding.
      if (styles.getPropertyValue('box-sizing') === "border-box" ||
          styles.getPropertyValue('-moz-box-sizing') === "border-box" ||
          styles.getPropertyValue('-webkit-box-sizing') === "border-box") {
        this.diff = 0;
      } else {
        this.diff = (
            parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
            parseInt(styles.getPropertyValue('padding-top') || 0, 10)
            );
      }
    } else {
      this.diff = 0;
    }
  },

  recalculateSize: function() {
    if (!this.isMounted()) {
      return;
    }

    var node = this.getDOMNode();
    node.style.height = 'auto';
    node.style.height = (node.scrollHeight - this.diff) + 'px';
  }
});

module.exports = TextareaAutosize;
