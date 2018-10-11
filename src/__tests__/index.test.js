import React from 'react';
import { shallow } from 'enzyme';
import TextareaAutosize from '../index';

describe('<TextareaAutosize />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders default component', () => {
      const wrapper = shallow(<TextareaAutosize />);

      expect(wrapper.find('textarea').length).toBe(1);
      expect(wrapper.state('height')).toBe(0);
      expect(wrapper.state('minHeight')).toBe(-Infinity);
      expect(wrapper.state('maxHeight')).toBe(Infinity);
    });

    it('renders with height props passed in', () => {
      const props = {
        style: {
          height: 55,
          maxHeight: 266,
        },
      };
      const wrapper = shallow(<TextareaAutosize {...props} />);

      expect(wrapper.find('textarea').prop('style')).toEqual(props.style);
      expect(wrapper.state('height')).toBe(props.style.height);
    });

    it('renders with overflow hidden if maxHeight is less than height', () => {
      const props = {
        style: {
          height: 200,
          maxHeight: 100,
        },
      };
      const wrapper = shallow(<TextareaAutosize {...props} />);

      wrapper.setState({ maxHeight: 100 });
      expect(wrapper.find('textarea').prop('style')).toEqual({
        overflow: 'hidden',
        ...props.style,
      });
      expect(wrapper.state('height')).toBe(props.style.height);
    });
  });

  describe('componentDidUpdate', () => {
    it('fires _resizeComponent only when props change', () => {
      const props = { foo: 'bar' };
      const wrapper = shallow(<TextareaAutosize {...props} />);
      wrapper.instance()._resizeComponent = jest.fn();

      // any updates to the props, even if it is the same props, will result in update
      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(0);
      wrapper.setProps(props);
      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(1);
      wrapper.setProps({ completely: 'different' });
      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(2);
    });

    it('fires onHeightChange when state height changes', () => {
      const props = { onHeightChange: jest.fn() };
      const wrapper = shallow(<TextareaAutosize {...props} />);

      expect(props.onHeightChange.mock.calls.length).toBe(0);
      wrapper.setState({ height: 0 }); // default height is 0
      expect(props.onHeightChange.mock.calls.length).toBe(0);
      wrapper.setState({ height: 99 });
      expect(props.onHeightChange.mock.calls.length).toBe(1);
    });
  });

  describe('_onChange', () => {
    it('fires onChange and _resizeComponent on uncontrolled component', () => {
      const props = { onChange: jest.fn() };
      const event = { foo: 'bar' };
      const wrapper = shallow(<TextareaAutosize {...props} />);
      wrapper.instance()._resizeComponent = jest.fn();

      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(0);
      expect(props.onChange.mock.calls.length).toBe(0);
      wrapper.instance()._onChange(event);
      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls[0][0]).toBe(event);
    });

    it('fires only onChange on controlled component', () => {
      const props = { onChange: jest.fn(), value: 'test' };
      const event = { foo: 'bar' };
      const wrapper = shallow(<TextareaAutosize {...props} />);
      wrapper.instance()._resizeComponent = jest.fn();

      expect(props.onChange.mock.calls.length).toBe(0);
      wrapper.instance()._onChange(event);
      expect(wrapper.instance()._resizeComponent.mock.calls.length).toBe(0);
      expect(props.onChange.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls[0][0]).toBe(event);
    });
  });
});
