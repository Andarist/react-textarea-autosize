import { SizingData } from './getSizingData';
import forceHiddenStyles from './forceHiddenStyles';

let hiddenTextarea: HTMLTextAreaElement | null = null;

const getHeight = (node: HTMLElement, sizingData: SizingData): number => {
  const height = node.scrollHeight;

  if (sizingData.sizingStyle.boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    return height + sizingData.borderSize;
  }

  // remove padding, since height = content
  return height - sizingData.paddingSize;
};

export default function calculateNodeHeight(
  sizingData: SizingData,
  value: string,
  minRows = 1,
  maxRows = Infinity,
): number {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    forceHiddenStyles(hiddenTextarea);
  }

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  const { paddingSize, borderSize, sizingStyle } = sizingData;
  const { boxSizing } = sizingStyle;

  Object.keys(sizingStyle).forEach(_key => {
    const key = _key as keyof typeof sizingStyle;
    hiddenTextarea!.style[key] = sizingStyle[key] as any;
  });

  forceHiddenStyles(hiddenTextarea);

  hiddenTextarea.value = value;
  let height = getHeight(hiddenTextarea, sizingData);

  // measure height of a textarea with a single row
  hiddenTextarea.value = 'x';
  const rowHeight = hiddenTextarea.scrollHeight - paddingSize;

  let minHeight = rowHeight * minRows;
  if (boxSizing === 'border-box') {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);

  let maxHeight = rowHeight * maxRows;
  if (boxSizing === 'border-box') {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);

  return height;
}
