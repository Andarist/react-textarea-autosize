import * as React from 'react';
import calculateNodeHeight from './calculateNodeHeight';
import getSizingData, { SizingData } from './getSizingData';
import { useComposedRef, useWindowResizeListener } from './hooks';
import { noop } from './utils';

type Style = NonNullable<JSX.IntrinsicElements['textarea']['style']> & {
  height?: number;
};

type Props = JSX.IntrinsicElements['textarea'] & {
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number) => void;
  cacheMeasurements?: boolean;
  style?: Style;
};

const TextareaAutosize: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  Props
> = (
  {
    cacheMeasurements,
    maxRows,
    minRows,
    onChange = noop,
    onHeightChange = noop,
    style: { maxHeight: _maxHeight, minHeight: _minHeight, ...style } = {},
    ...props
  },
  userRef: React.Ref<HTMLTextAreaElement>,
) => {
  const isControlled = props.value !== undefined;
  const libRef = React.useRef<HTMLTextAreaElement | null>(null);
  const ref = useComposedRef(libRef, userRef);
  const heightRef = React.useRef(0);
  const measurementsCacheRef = React.useRef<SizingData>();

  const resizeTextarea = () => {
    const node = libRef.current!;
    const nodeSizingData =
      cacheMeasurements && measurementsCacheRef.current
        ? measurementsCacheRef.current
        : getSizingData(node);

    if (!nodeSizingData) {
      return;
    }

    const height = calculateNodeHeight(
      nodeSizingData,
      node.value || node.placeholder || 'x',
      minRows,
      maxRows,
    );

    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.height = `${height}px`;
      onHeightChange(height);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };

  if (typeof document !== 'undefined') {
    React.useLayoutEffect(resizeTextarea);
  }
  useWindowResizeListener(resizeTextarea);

  return (
    <textarea {...props} onChange={handleChange} ref={ref} style={style} />
  );
};

export default /* #__PURE__ */ React.forwardRef(TextareaAutosize);
