import * as React from 'react';
import { createRoot } from 'react-dom/client';
import TextareaAutosize from '../src';

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

const Basic = () => {
  return (
    <div>
      <TextareaAutosize
        maxRows={3}
        style={{
          lineHeight: 1,
          fontSize: 10,
          border: 0,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

const MinMaxRows = () => {
  return (
    <div>
      <h2>{'Component with maxRows and minRows'}</h2>
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
  );
};

const MinMaxRowsBorderBox = () => {
  return (
    <div>
      <h2>{'Component with maxRows and minRows (box-sizing: border-box)'}</h2>
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
        style={{ boxSizing: 'border-box' }}
        minRows={3}
        maxRows={6}
        defaultValue="Just a single line..."
      />
    </div>
  );
};

const MaxRows = () => {
  return (
    <div>
      <h2>{'Component with maxRows'}</h2>
      <pre>
        {`
  <TextareaAutosize
    maxRows={5}
    defaultValue="Just a single line..."
    />
`}
      </pre>
      <TextareaAutosize maxRows={5} defaultValue="Just a single line..." />
    </div>
  );
};

const SetRows = () => {
  return (
    <div>
      <h2>{'Component with rows set'}</h2>
      <pre>
        {`
  <TextareaAutosize
    rows={4}
    defaultValue="Just a single line..."
    />
`}
      </pre>
      <TextareaAutosize rows={4} defaultValue="Just a single line..." />
    </div>
  );
};

const WithPlaceholder = () => {
  return (
    <div>
      <h2>{'Component with placeholder'}</h2>
      <pre>
        {`
  <TextareaAutosize
    placeholder="The quick brown fox jumps over the lazy dog..."
    />
`}
      </pre>
      <TextareaAutosize placeholder="The quick brown fox jumps over the lazy dog..." />
    </div>
  );
};

const WithIgnoredPlaceholder = () => {
  return (
    <div>
      <h2>{'Component with ignored placeholder'}</h2>
      <pre>
        {`
  <TextareaAutosize
    placeholder="The quick brown fox jumps over the lazy dog..."
    ignorePlaceholder
    />
`}
      </pre>
      <TextareaAutosize
        placeholder="The quick brown fox jumps over the lazy dog..."
        ignorePlaceholder
      />
    </div>
  );
};

const ControlledMode = () => {
  const [value, setValue] = React.useState(new Array(15).join('\nLine.'));
  return (
    <div>
      <h2>{'Controlled mode'}</h2>
      <pre>
        {`
  <TextareaAutosize
    cacheMeasurements
    value={value}
    onChange={ev => setValue(ev.target.value)}
    />
`}
      </pre>
      <TextareaAutosize
        cacheMeasurements
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <button onClick={() => setValue('This value was set programatically')}>
        {'Change value programatically'}
      </button>
    </div>
  );
};

const UncontrolledMode = () => {
  return (
    <div>
      <h2>{'Uncontrolled mode'}</h2>
      <pre>
        {`
  <TextareaAutosize
    defaultValue={new Array(15).join('\nLine.')}
    />
`}
      </pre>
      <TextareaAutosize defaultValue={new Array(15).join('\nLine.')} />
    </div>
  );
};

const OnHeightChangeCallback = () => {
  return (
    <div>
      <h2>{'Receive message on height change.'}</h2>
      <pre>
        {`
  <TextareaAutosize
    cacheMeasurements
    onHeightChange={(height) => console.log(height)}
    />
`}
      </pre>
      <TextareaAutosize
        cacheMeasurements
        onHeightChange={(height) => {
          // eslint-disable-next-line no-console
          console.log(height);
        }}
      />
    </div>
  );
};

const MultipleTextareas = () => {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <h2>{'Multiple textareas updated at the same time.'}</h2>
      <div>{'This one controls the rest.'}</div>
      <TextareaAutosize
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
      <div>{'Those get controlled by the one above.'}</div>
      {range(15).map((i) => (
        <TextareaAutosize key={i} value={value} />
      ))}
    </div>
  );
};

const WithCustomFont = () => {
  return (
    <div>
      <h2>{'Adapts to custom fonts.'}</h2>
      <div>{'Resizes once the font is loaded.'}</div>
      <TextareaAutosize
        style={{
          fontSize: 20,
          fontFamily: "'Work Sans', sans-serif",
        }}
        defaultValue={'The quick brown fox jumps over the lazy dog'}
        onHeightChange={(rows) => {
          console.log('onChange', rows);
        }}
      />
    </div>
  );
};

const WithFormReset = () => {
  const ref = React.useRef<HTMLFormElement>(null);
  return (
    <div>
      <h2>{'Resettable form.'}</h2>
      <div>{'Resizes once the form gets reset.'}</div>
      <form ref={ref}>
        <TextareaAutosize />
        <input type="reset" />
      </form>
    </div>
  );
};

const WithManualFormReset = () => {
  const ref = React.useRef<HTMLFormElement>(null);
  return (
    <div>
      <h2>{'Resettable form via manual reset call.'}</h2>
      <div>{'Resizes once the form gets reset.'}</div>
      <form ref={ref}>
        <TextareaAutosize />
        <button type="button" onClick={() => ref.current?.reset()}>
          {'Reset'}
        </button>
      </form>
    </div>
  );
};

const Demo = () => {
  return (
    <div>
      <Basic />
      <MinMaxRows />
      <MinMaxRowsBorderBox />
      <MaxRows />
      <SetRows />
      <WithPlaceholder />
      <WithIgnoredPlaceholder />
      <ControlledMode />
      <UncontrolledMode />
      <OnHeightChangeCallback />
      <MultipleTextareas />
      <WithCustomFont />
      <WithFormReset />
      <WithManualFormReset />
    </div>
  );
};

createRoot(document.getElementById('main')!).render(<Demo />);
