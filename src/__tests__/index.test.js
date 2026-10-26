/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '@testing-library/react';
import TextareaAutosize from '../index';

describe('<TextareaAutosize />', () => {
  beforeAll(() => {
    // Unfortunately, JSDom does not implement document.fonts yet
    // so we're mocking it
    Object.defineProperty(document, 'fonts', {
      value: { addEventListener() {}, removeEventListener() {} },
    });
  });
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
});

it('restores the measured height after a style height update', () => {
  const scrollHeight = jest
    .spyOn(HTMLElement.prototype, 'scrollHeight', 'get')
    .mockReturnValue(20);
  const onHeightChange = jest.fn();
  const style = { boxSizing: 'content-box', padding: 0, border: 0, height: 55 };
  try {
    const { container, rerender } = render(
      <TextareaAutosize style={style} onHeightChange={onHeightChange} />,
    );
    const textarea = container.querySelector('textarea');
    expect(textarea.style.height).toBe('20px');
    const setProperty = jest.spyOn(textarea.style, 'setProperty');
    rerender(
      <TextareaAutosize style={style} onHeightChange={onHeightChange} />,
    );
    expect(setProperty).not.toHaveBeenCalled();
    rerender(
      <TextareaAutosize
        style={{ ...style, height: 100 }}
        onHeightChange={onHeightChange}
      />,
    );
    expect(textarea.style.height).toBe('20px');
    expect(onHeightChange).toHaveBeenCalledTimes(1);
  } finally {
    scrollHeight.mockRestore();
  }
});
