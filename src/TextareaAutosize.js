/**
 * <TextareaAutosize />
 */

import React from 'react';
import emptyFunction from 'react/lib/emptyFunction';
import calculateNodeHeight from './calculateNodeHeight';

export default class TextareaAutosize extends React.Component {

  static propTypes = {
    /**
     * Current textarea value.
     */
    value: React.PropTypes.string,

    /**
     * Callback on value change.
     */
    onChange: React.PropTypes.func,

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
    onChange: emptyFunction,
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
    this._onChange = this._onChange.bind(this);
    this._resizeComponent = this._resizeComponent.bind(this);
  }

  render() {
    let {valueLink, onChange, ...props} = this.props;
    props = {...props};
    if (typeof valueLink === 'object') {
      props.value = this.props.valueLink.value;
    }
    props.style = {
      ...props.style,
      height: this.state.height
    };
    let maxHeight = Math.max(
      props.style.maxHeight ? props.style.maxHeight : Infinity,
      this.state.maxHeight);
    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }
    return <textarea {...props} onChange={this._onChange} />;
  }

  componentDidMount() {
    this._resizeComponent();
  }

  componentWillReceiveProps() {
    // Re-render with the new content then recalculate the height as required.
    this.clearNextFrame();
    this.onNextFrameActionId = onNextFrame(this._resizeComponent);
  }

  componentDidUpdate(prevProps, prevState) {
    // Invoke callback when old height does not equal to new one.
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  }

  componentWillUnmount() {
    //remove any scheduled events to prevent manipulating the node after it's
    //been unmounted
    this.clearNextFrame();
  }

  clearNextFrame() {
    if (this.onNextFrameActionId) {
      clearNextFrameAction(this.onNextFrameActionId);
    }
  }

  _onChange(e) {
    this._resizeComponent();
    let {valueLink, onChange} = this.props;
    if (valueLink) {
      valueLink.requestChange(e.target.value);
    } else {
      onChange(e);
    }
  }

  _resizeComponent() {
    let {useCacheForDOMMeasurements} = this.props;
    this.setState(calculateNodeHeight(
      React.findDOMNode(this),
      useCacheForDOMMeasurements,
      this.props.rows || this.props.minRows,
      this.props.maxRows));
  }

  /**
   * Read the current value of <textarea /> from DOM.
   */
  get value(): string {
    return React.findDOMNode(this).value;
  }

  /**
   * Put focus on a <textarea /> DOM element.
   */
  focus() {
    React.findDOMNode(this).focus();
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
