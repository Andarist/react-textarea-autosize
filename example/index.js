'use strict';

var React = require('react');
var TextareaAutosize = require('../src/TextareaAutosize');

var Demo = React.createClass({

  render() {
    return (
      <div>
        <div>
          <h2>Controlled mode</h2>
          <TextareaAutosize
            useCacheForDOMMeasurements
            value={this.state.value}
            onChange={this.onChange}
            />
          <button onClick={this.changeValueProgramatically}>
            Change value programatically
          </button>
        </div>
        <div>
          <h2>Uncontrolled mode</h2>
          <TextareaAutosize
            defaultValue={this.state.value}
            />
        </div>
      </div>
    );
  },

  getInitialState() {
    var value = (new Array(15)).join('\nLine.');
    return {value};
  },

  onChange(e) {
    var {value} = e.target;
    this.setState({value});
  },

  changeValueProgramatically() {
    var value = 'This value was set programatically';
    this.setState({value});
  }
});

React.render(<Demo />, document.getElementById('main'));
