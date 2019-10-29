import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '@testing-library/react';
import TextareaAutosize from '../index';

describe('<TextareaAutosize />', () => {
  it('renders default component', () => {
    const { asFragment } = render(<TextareaAutosize />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with height props passed in', () => {
    const props = {
      style: {
        height: 55,
        maxHeight: 266,
      },
    };
    const { asFragment } = render(<TextareaAutosize {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
