var React = require('react');
var objectAssign = require('object-assign');

module.exports = React.createClass({
  displayName: 'TextAreaAutoSize',

  getInitialState: function() {
    if (this.props.onChange) {
      return {
        "_onChange": this.props.onChange
      };
    }
  },

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
    if (this.state._onChange) {
      this.state._onChange(e);
    }

    this.recalculateSize();
  },

  render: function() {
    var props = {
      onChange: this.onChange,
      style: objectAssign({}, this.props.style, {overflow: 'hidden'})
    };

    props = objectAssign(this.props, props);

    return React.DOM.textarea(props, this.props.children);
  }
});
