/**
 * <TextareaAutosize />
 */

import React from 'react';
import PropTypes from 'prop-types';
import calculateNodeHeight from './calculateNodeHeight';

const noop = () => {};

export default class TextareaAutosize extends React.Component {

  static propTypes = {
    /**
     * Current textarea value.
     */
    value: PropTypes.string,

    /**
     * Callback on value change.
     */
    onChange: PropTypes.func,

    /**
     * Callback on height changes.
     */
    onHeightChange: PropTypes.func,

    /**
     * Try to cache DOM measurements performed by component so that we don't
     * touch DOM when it's not needed.
     *
     * This optimization doesn't work if we dynamically style <textarea />
     * component.
     */
    useCacheForDOMMeasurements: PropTypes.bool,

    /**
     * Minimal numbder of rows to show.
     */
    rows: PropTypes.number,

    /**
     * Alias for `rows`.
     */
    minRows: PropTypes.number,

    /**
     * Maximum number of rows to show.
     */
    maxRows: PropTypes.number,

    /**
     * Allows an owner to retrieve the DOM node.
     */
    inputRef: PropTypes.func
  }

  static defaultProps = {
    onChange: noop,
    onHeightChange: noop,
    useCacheForDOMMeasurements: false
  }

  constructor(props) {
    super(props);
    this.state = {
      height: null,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
  }

  render() {
    let {
      valueLink,
      minRows: _minRows,
      maxRows: _maxRows,
      onHeightChange: _onHeightChange,
      useCacheForDOMMeasurements: _useCacheForDOMMeasurements,
      inputRef: _inputRef,
      ...props,
    } = this.props;

    if (typeof valueLink === 'object') {
      props.value = valueLink.value;
    }

    props.style = {
      ...props.style,
      height: this.state.height || 0,
    };

    let maxHeight = Math.max(
      props.style.maxHeight || Infinity,
      this.state.maxHeight
    );

    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }

    return (
      <textarea
        {...props}
        onChange={this._onChange}
        ref={this._onRootDOMNode}
      />
    );
  }

  componentDidMount() {
    this._resizeComponent();
    window.addEventListener('resize', this._resizeComponent);
  }

  componentWillReceiveProps() {
    // Re-render with the new content then recalculate the height as required.
    this._clearNextFrame();
    this._onNextFrameActionId = onNextFrame(this._resizeComponent);
  }

  componentDidUpdate(prevProps, prevState) {
    // Invoke callback when old height does not equal to new one.
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  }

  componentWillUnmount() {
    // Remove any scheduled events to prevent manipulating the node after it's
    // been unmounted.
    this._clearNextFrame();
    window.removeEventListener('resize', this._resizeComponent);
  }

  _clearNextFrame() {
    if (this._onNextFrameActionId) {
      clearNextFrameAction(this._onNextFrameActionId);
    }
  }

  _onRootDOMNode = node => {
    this._rootDOMNode = node;
    if (this.props.inputRef) this.props.inputRef(node);
  }

  _onChange = event => {
    let {valueLink, onChange} = this.props;
    if (valueLink) {
      valueLink.requestChange(event.target.value);
    } else {
      onChange(event);
    }
  }

  _resizeComponent = () => {
    let {height, minHeight, maxHeight} = calculateNodeHeight(
      this._rootDOMNode,
      this.props.useCacheForDOMMeasurements,
      this.props.rows || this.props.minRows,
      this.props.maxRows);
    if (
      this.state.height !== height ||
      this.state.minHeight !== minHeight ||
      this.state.maxHeight !== maxHeight
    ) {
      this.setState({height, minHeight, maxHeight});
    }
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

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}
