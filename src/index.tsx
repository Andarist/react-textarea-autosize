import * as React from 'react';
import { isDevelopment } from '#is-development';
import { isBrowser } from '#is-browser';
import calculateNodeHeight from './calculateNodeHeight';
import getSizingData, { SizingData } from './getSizingData';
import {
  useComposedRef,
  useWindowResizeListener,
  useFontsLoadedListener,
  useFormResetListener,
  useForceRerender,
} from './hooks';
import { noop } from './utils';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type Style = Omit<
  NonNullable<TextareaProps['style']>,
  'maxHeight' | 'minHeight'
> & {
  height?: number;
};

export type TextareaHeightChangeMeta = {
  rowHeight: number;
};
export interface TextareaAutosizeProps extends Omit<TextareaProps, 'style'> {
  maxRows?: number;
  minRows?: number;
  onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void;
  cacheMeasurements?: boolean;
  style?: Style;
}

const TextareaAutosize: React.ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaAutosizeProps
> = (
  {
    cacheMeasurements,
    maxRows,
    minRows,
    onChange = noop,
    onHeightChange = noop,
    ...props
  },
  userRef: React.Ref<HTMLTextAreaElement>,
) => {
  if (isDevelopment && props.style) {
    if ('maxHeight' in props.style) {
      throw new Error(
        'Using `style.maxHeight` for <TextareaAutosize/> is not supported. Please use `maxRows`.',
      );
    }
    if ('minHeight' in props.style) {
      throw new Error(
        'Using `style.minHeight` for <TextareaAutosize/> is not supported. Please use `minRows`.',
      );
    }
  }
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

    measurementsCacheRef.current = nodeSizingData;

    const [height, rowHeight] = calculateNodeHeight(
      nodeSizingData,
      node.value || node.placeholder || 'x',
      minRows,
      maxRows,
    );

    if (heightRef.current !== height) {
      heightRef.current = height;
      node.style.setProperty('height', `${height}px`, 'important');
      onHeightChange(height, { rowHeight });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      resizeTextarea();
    }
    onChange(event);
  };

  if (isBrowser) {
    const forceRerender = useForceRerender();
    React.useLayoutEffect(resizeTextarea);
    useFormResetListener(libRef, () => {
      if (!isControlled) {
        // force rerender is used here because form reset doesn't trigger React's onChange:
        // https://github.com/facebook/react/issues/19078
        //
        // the problem with a reset listener is that it's called before the value gets actually changed
        // the event itself can, after all, be even .preventDefault()ed
        // so given it's not possible to know if the reset will actually happen, we "schedule" a rerender so our resizing layout effect can take care of it
        //
        // this doesn't work with <input type="reset" /> though
        // updates scheduled by reset handlers called called by those happen synchronously~
        // React is eager to rerender this before the reset action actually takes place
        //
        // it might be a good idea to use a native change listener on the textarea itself to workaround this
        forceRerender();
      }
    });
    useWindowResizeListener(resizeTextarea);
    useFontsLoadedListener(resizeTextarea);
    return <textarea {...props} onChange={handleChange} ref={ref} />;
  }

  return <textarea {...props} onChange={onChange} ref={ref} />;
};

export default /* #__PURE__ */ React.forwardRef(TextareaAutosize);
