import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '@testing-library/react';
import TextareaAutosize from '../index';

describe('<TextareaAutosize />', () => {
  it('renders ok', () => {
    const { asFragment } = render(<TextareaAutosize />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with initial height passed in style prop', () => {
    const props = {
      style: {
        height: 55,
      },
    };
    const { asFragment } = render(<TextareaAutosize {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with a div passsed for tagName', () => {
    const props = { tagName: 'div', contentEditable: true };
    const { asFragment } = render(<TextareaAutosize {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
