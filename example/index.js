
import React from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from '../src/TextareaAutosize';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    let value = (new Array(15)).join('\nLine.');
    this.state = {value};
    this.changeValueProgramatically = this.changeValueProgramatically.bind(this);
  }

  render() {
    return (
      <div>
        <div>
          <TextareaAutosize
            maxRows={3}
            style={{lineHeight: 1, fontSize: 10, border: 0, boxSizing: 'border-box'}}
            />
        </div>
        <div>
          <h2>Component with maxRows and minRows</h2>
          <pre>
{`
  <TextareaAutosize
    minRows={3}
    maxRows={6}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with maxRows and minRows (box-sizing: border-box)</h2>
          <pre>
{`
  <TextareaAutosize
    style={{boxSizing: 'border-box'}}
    minRows={3}
    maxRows={6}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            style={{boxSizing: 'border-box'}}
            minRows={3}
            maxRows={6}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with maxRows</h2>
          <pre>
{`
  <TextareaAutosize
    maxRows={5}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            maxRows={5}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with maxHeight</h2>
          <pre>
{`
  <TextareaAutosize
    style={{maxHeight: 300}}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            style={{maxHeight: 300}}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Component with rows set</h2>
          <pre>
{`
  <TextareaAutosize
    rows={4}
    defaultValue="Just a single line..."
    />
`}
          </pre>
          <TextareaAutosize
            rows={4}
            defaultValue="Just a single line..."
            />
        </div>
        <div>
          <h2>Controlled mode</h2>
          <pre>
{`
  <TextareaAutosize
    useCacheForDOMMeasurements
    value={this.state.value}
    onChange={e => this.setState({value: e.target.value})}
    />
`}
          </pre>
          <TextareaAutosize
            useCacheForDOMMeasurements
            value={this.state.value}
            onChange={e => this.setState({value: e.target.value})}
            />
          <button onClick={this.changeValueProgramatically}>
            Change value programatically
          </button>
        </div>
        <div>
          <h2>Uncontrolled mode</h2>
          <pre>
{`
  <TextareaAutosize
    defaultValue={this.state.value}
    />
`}
          </pre>
          <TextareaAutosize
            defaultValue={this.state.value}
            />
        </div>
        <div>
          <h2>Receive message on height change.</h2>
          <pre>
{`
  <TextareaAutosize
    useCacheForDOMMeasurements
    onHeightChange={(height, instance) => console.log(height, instance.rowCount)}
    />
`}
          </pre>
          <TextareaAutosize
            useCacheForDOMMeasurements
            onHeightChange={(height, instance) => console.log(height, instance.rowCount)}
            />
        </div>
      </div>
    );
  }

  changeValueProgramatically() {
    var value = 'This value was set programatically';
    this.setState({value});
  }
}

ReactDOM.render(
  <Demo />,
  document.getElementById('main')
);
