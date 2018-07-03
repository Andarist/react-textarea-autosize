/**
 * <TextareaAutosize />
 */

import React from 'react';
import PropTypes from 'prop-types';
import calculateNodeHeight, { purgeCache } from './calculateNodeHeight';

const noop = () => {};

// IE11 has a problem with eval source maps, can be reproduced with:
// eval('"use strict"; var onNextFrame = window.cancelAnimationFrame; onNextFrame(4);')
// so we bind window as context in dev modes
const [onNextFrame, clearNextFrameAction] =
  process.env.BROWSER && window.requestAnimationFrame
    ? process.env.NODE_ENV !== 'development'
      ? [window.requestAnimationFrame, window.cancelAnimationFrame]
      : [
        window.requestAnimationFrame.bind(window),
        window.cancelAnimationFrame.bind(window),
      ]
    : [setTimeout, clearTimeout];

let uid = 0;

export default class TextareaAutosize extends React.Component {
  static propTypes = {
    inputRef: PropTypes.func,
    maxRows: PropTypes.number,
    minRows: PropTypes.number,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    useCacheForDOMMeasurements: PropTypes.bool,
    value: PropTypes.string,
  };

  static defaultProps = {
    inputRef: noop,
    onChange: noop,
    onHeightChange: noop,
    useCacheForDOMMeasurements: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: (props.style && props.style.height) || 0,
      minHeight: -Infinity,
      maxHeight: Infinity,
    };

    this._uid = uid++;
    this._controlled = props.value !== undefined;
    this._resizeLock = false;
  }

  render() {
    const {
      inputRef: _inputRef,
      maxRows: _maxRows,
      minRows: _minRows,
      onHeightChange: _onHeightChange,
      useCacheForDOMMeasurements: _useCacheForDOMMeasurements,
      ...props
    } = this.props;

    props.style = {
      ...props.style,
      height: this.state.height,
    };

    const maxHeight = Math.max(
      props.style.maxHeight || Infinity,
      this.state.maxHeight,
    );

    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }

    return <textarea {...props} onChange={this._onChange} ref={this._onRef} />;
  }

  componentDidMount() {
    this._resizeComponent();
    // Working around Firefox bug which runs resize listeners even when other JS is running at the same moment
    // causing competing rerenders (due to setState in the listener) in React.
    // More can be found here - facebook/react#6324
    this._resizeListener = () => {
      if (this._resizeLock) {
        return;
      }
      this._resizeLock = true;
      this._resizeComponent(() => {
        this._resizeLock = false;
      });
    };
    window.addEventListener('resize', this._resizeListener);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      clearNextFrameAction(this._rafId);
      this._rafId = onNextFrame(this._resizeComponent);
    }

    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height, this);
    }
  }

  componentWillUnmount() {
    clearNextFrameAction(this._rafId);
    window.removeEventListener('resize', this._resizeListener);
    purgeCache(this._uid);
  }

  _onRef = node => {
    this._ref = node;
    this.props.inputRef(node);
  };

  _onChange = event => {
    if (!this._controlled) {
      this._resizeComponent();
    }
    this.props.onChange(event);
  };

  _resizeComponent = (callback = noop) => {
    if (!process.env.BROWSER) {
      callback();
      return;
    }

    const nodeHeight = calculateNodeHeight(
      this._ref,
      this._uid,
      this.props.useCacheForDOMMeasurements,
      this.props.minRows,
      this.props.maxRows,
    );

    if (nodeHeight === null) {
      callback();
      return;
    }

    const {
      height,
      minHeight,
      maxHeight,
      rowCount,
      valueRowCount,
    } = nodeHeight;

    this.rowCount = rowCount;
    this.valueRowCount = valueRowCount;

    if (
      this.state.height !== height ||
      this.state.minHeight !== minHeight ||
      this.state.maxHeight !== maxHeight
    ) {
      this.setState({ height, minHeight, maxHeight }, callback);
      return;
    }

    callback();
  };
}
