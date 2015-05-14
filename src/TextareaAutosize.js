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
    this._onChange = this._onChange.bind(this);
    this._resizeComponent = this._resizeComponent.bind(this);
  }

  render() {
    let {valueLink, onChange, ...props} = this.props;
    if (typeof valueLink === 'object') {
      props.value = this.props.valueLink.value;
    }
    props.style = {
      overflow: 'hidden',
      ...props.style,
      height: this.state.height
    };
    return <textarea {...props} onChange={this._onChange} />;
  }

  componentDidMount() {
    this._resizeComponent();
  }

  componentWillReceiveProps() {
    // Re-render with the new content then recalculate the height as required.
    onNextFrame(this._resizeComponent);
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
    let height = calculateNodeHeight(
      React.findDOMNode(this),
      useCacheForDOMMeasurements,
      this.props.rows);
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
