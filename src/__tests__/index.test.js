/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';
import { render } from '@testing-library/react';
import TextareaAutosize from '../index';
import getSizingData from '../getSizingData';
import calculateNodeHeight from '../calculateNodeHeight';

jest.mock('../getSizingData');
jest.mock('../calculateNodeHeight');

describe('<TextareaAutosize />', () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete global.ResizeObserver;
  });
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

  it('recalculates measurements when the textarea width changes', () => {
    let observerCallback;
    const observe = jest.fn();
    const disconnect = jest.fn();
    global.ResizeObserver = jest.fn((callback) => {
      observerCallback = callback;
      return { observe, disconnect };
    });
    getSizingData.mockReturnValue({
      sizingStyle: {},
      paddingSize: 0,
      borderSize: 0,
    });
    calculateNodeHeight.mockReturnValue([100, 20]);

    const { container, unmount } = render(
      <TextareaAutosize cacheMeasurements />,
    );
    const textarea = container.querySelector('textarea');

    expect(global.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(textarea);
    expect(getSizingData).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveStyle({ height: '100px' });

    calculateNodeHeight.mockReturnValue([200, 20]);
    observerCallback([{ contentRect: { width: 50 } }]);

    expect(getSizingData).toHaveBeenCalledTimes(2);
    expect(textarea).toHaveStyle({ height: '200px' });

    observerCallback([{ contentRect: { width: 50 } }]);
    expect(getSizingData).toHaveBeenCalledTimes(2);

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it('invalidates cached measurements on window resize', () => {
    getSizingData.mockReturnValue({
      sizingStyle: {},
      paddingSize: 0,
      borderSize: 0,
    });
    calculateNodeHeight.mockReturnValue([100, 20]);

    const { container } = render(<TextareaAutosize cacheMeasurements />);
    const textarea = container.querySelector('textarea');

    expect(getSizingData).toHaveBeenCalledTimes(1);
    expect(textarea).toHaveStyle({ height: '100px' });

    calculateNodeHeight.mockReturnValue([200, 20]);
    window.dispatchEvent(new Event('resize'));

    expect(getSizingData).toHaveBeenCalledTimes(2);
    expect(textarea).toHaveStyle({ height: '200px' });
  });
});
