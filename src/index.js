/**
 * <TextareaAutosize />
 */

import React from 'react';
import PropTypes from 'prop-types';
import calculateNodeHeight, { purgeCache } from './calculateNodeHeight';
import uid from './uid';

const noop = () => {};

const [ onNextFrame, clearNextFrameAction ] = window.requestAnimationFrame
  ? [ window.requestAnimationFrame, window.cancelAnimationFrame ]
  : [ setTimeout, clearTimeout ];

export default class TextareaAutosize extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    useCacheForDOMMeasurements: PropTypes.bool,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
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
      height: (props.style && props.style.height) || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };

    this._uid = uid();
    this._controlled = typeof props.value === 'string';
  }

  render() {
    let {
      minRows: _minRows,
      maxRows: _maxRows,
      onHeightChange: _onHeightChange,
      useCacheForDOMMeasurements: _useCacheForDOMMeasurements,
      inputRef: _inputRef,
      ...props,
    } = this.props;

    props.style = {
      ...props.style,
      height: this.state.height,
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
    this._clearNextFrame();
    this._onNextFrameActionId = onNextFrame(this._resizeComponent);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height, this);
    }
  }

  componentWillUnmount() {
    this._clearNextFrame();
    window.removeEventListener('resize', this._resizeComponent);
    purgeCache(this._uid);
  }

  _clearNextFrame() {
    clearNextFrameAction(this._onNextFrameActionId);
  }

  _onRootDOMNode = node => {
    this._rootDOMNode = node;

    if (this.props.inputRef) {
      this.props.inputRef(node);
    }
  }

  _onChange = event => {
    if (!this._controlled) {
      this._resizeComponent();
    }
    this.props.onChange(event);
  }

  _resizeComponent = () => {
    if (typeof this._rootDOMNode === 'undefined') {
      return;
    }

    const { height, minHeight, maxHeight } = calculateNodeHeight(
      this._rootDOMNode,
      this._uid,
      this.props.useCacheForDOMMeasurements,
      this.props.minRows,
      this.props.maxRows
    );

    if (
      this.state.height !== height ||
      this.state.minHeight !== minHeight ||
      this.state.maxHeight !== maxHeight
    ) {
      this.setState({height, minHeight, maxHeight});
    }
  }
}
