import React from 'react';
import { render } from 'react-testing-library';
import TextareaAutosize from '../index';
import 'jest-dom/extend-expect';

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
