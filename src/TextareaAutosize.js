/**
 * <TextareaAutosize />
 */

import React from 'react';
import calculateNodeHeight from './calculateNodeHeight';

const emptyFunction = function() {};

export default class TextareaAutosize extends React.Component {

  static propTypes = {
    /**
     * Current textarea value.
     */
    value: React.PropTypes.string.isRequired,

    /**
     * Callback on value change.
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * Callback on height changes.
     */
    onHeightChange: React.PropTypes.func,

    /**
     * Try to cache DOM measurements performed by component so that we don't
     * touch DOM when it's not needed.
     *
     * This optimization doesn't work if we dynamically style <textarea />
     * component.
     */
    useCacheForDOMMeasurements: React.PropTypes.bool,

    /**
     * Minimal numbder of rows to show.
     */
    rows: React.PropTypes.number,

    /**
     * Alias for `rows`.
     */
    minRows: React.PropTypes.number,

    /**
     * Maximum number of rows to show.
     */
    maxRows: React.PropTypes.number
  }

  static defaultProps = {
    onHeightChange: emptyFunction,
    useCacheForDOMMeasurements: false
  }

  constructor(props) {
    super(props);
    this.state = {
      height: null,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    this._rootDOMNode = null;
    this._resizeComponent = this._resizeComponent.bind(this);
    this._onRootDOMNode = this._onRootDOMNode.bind(this);
  }

  render() {
    let {style, onChange, ...props} = this.props;
    let {height, maxHeight} = this.state;
    style = {
      ...style,
      height,
    };
    maxHeight = Math.max(
      style.maxHeight ? style.maxHeight : Infinity,
      maxHeight);
    if (maxHeight < height) {
      style.overflow = 'hidden';
    }
    return (
      <textarea
        {...props}
        style={style}
        onChange={onChange}
        ref={this._onRootDOMNode}
        />
    );
  }

  componentDidMount() {
    this._resizeComponent();
    window.addEventListener('resize', this._resizeComponent);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._resizeComponent(nextProps.value || nextProps.placeholder || '');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeComponent);
  }

  _onRootDOMNode(node) {
    this._rootDOMNode = node;
  }

  _resizeComponent(value = this.props.value || this.props.placeholder || '') {
    let {rows, minRows, maxRows, useCacheForDOMMeasurements} = this.props;
    this.setState(calculateNodeHeight(
      this._rootDOMNode,
      value,
      useCacheForDOMMeasurements,
      rows || minRows,
      maxRows));
  }

  /**
   * Read the current value of <textarea /> from DOM.
   */
  get value(): string {
    return this._rootDOMNode.value;
  }

  /**
   * Set the current value of <textarea /> DOM node.
   */
  set value(val) {
    this._rootDOMNode.value = val;
  }

  /**
   * Read the current selectionStart of <textarea /> from DOM.
   */
  get selectionStart(): number {
    return this._rootDOMNode.selectionStart;
  }

  /**
   * Set the current selectionStart of <textarea /> DOM node.
   */
  set selectionStart(selectionStart: number) {
    this._rootDOMNode.selectionStart = selectionStart;
  }

  /**
   * Read the current selectionEnd of <textarea /> from DOM.
   */
  get selectionEnd(): number {
    return this._rootDOMNode.selectionEnd;
  }

  /**
   * Set the current selectionEnd of <textarea /> DOM node.
   */
  set selectionEnd(selectionEnd: number) {
    this._rootDOMNode.selectionEnd = selectionEnd;
  }

  /**
   * Put focus on a <textarea /> DOM element.
   */
  focus() {
    this._rootDOMNode.focus();
  }

  /**
   * Shifts focus away from a <textarea /> DOM element.
   */
  blur() {
    this._rootDOMNode.blur();
  }

}
