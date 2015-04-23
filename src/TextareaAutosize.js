/**
 * <TextareaAutosize />
 */

import React from 'react';
import emptyFunction from 'react/lib/emptyFunction';
import autobind from 'autobind-decorator';  //eslint-disable-line no-unused-vars
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
     * Try to cache DOM measurements performed by component so that we don't
     * touch DOM when it's not needed.
     *
     * This optimization doesn't work if we dynamically style <textarea />
     * component.
     */
    useCacheForDOMMeasurements: React.PropTypes.bool
  }

  static defaultProps = {
    onChange: emptyFunction,
    useCacheForDOMMeasurements: false
  }

  constructor(props) {
    super(props);
    this.state = {height: null};
  }

  render() {
    let {valueLink, onChange, ...props} = this.props;
    if (typeof valueLink === 'object') {
      props.value = this.props.valueLink.value;
    }
    props.style = {
      ...props.style,
      overflow: 'hidden',
      height: this.state.height
    };
    return <textarea {...props} onChange={this._onChange} />;
  }

  componentDidMount() {
    // Timeout seems to be required for all media queries to be applied
    // because if the textarea has a class then it's width all kinds of wrong
    // so we have to do this in the next animation frame
    // rAF works faster than setTimeout in modern browsers.
    onNextFrame(this._resizeComponent);
  }

  componentWillReceiveProps() {
    // Re-render with the new content then recalculate the height as required.
    onNextFrame(this._resizeComponent);
  }

  @autobind
  _onChange(e) {
    this._resizeComponent();
    let {valueLink, onChange} = this.props;
    if (valueLink) {
      valueLink.requestChange(e.target.value);
    } else {
      onChange(e);
    }
  }

  @autobind
  _resizeComponent() {
    let {useCacheForDOMMeasurements} = this.props;
    let height = calculateNodeHeight(
      React.findDOMNode(this),
      undefined,
      useCacheForDOMMeasurements);
    this.setState({height});
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

let onNextFrame = window.requestAnimationFrame;

if (onNextFrame === undefined) {
  onNextFrame = function onNextFrame(cb) {
    window.setTimeout(cb, 1);
  };
}
