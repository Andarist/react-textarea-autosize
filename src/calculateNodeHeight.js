/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */

const HIDDEN_TEXTAREA_STYLE = `
  height:0;
  visibility:hidden;
  overflow:hidden;
  position:absolute;
  z-index:-1000;
  top:0;
  right:0
`;

const SIZING_STYLE = [
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'width',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

let computedStyleCache = {};
let hiddenTextarea;

export default function calculateNodeHeight(uiTextNode, useCache = false, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  let {sizingStyle, sumVerticalPaddings} = calculateNodeStyling(uiTextNode, useCache);

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);

  hiddenTextarea.value = uiTextNode.value;
  let height = hiddenTextarea.scrollHeight - sumVerticalPaddings;

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = 'x';
    let singleRowHeight = hiddenTextarea.scrollHeight - sumVerticalPaddings;
    if (minRows !== null) {
      let minHeight = singleRowHeight * minRows;
      return {
        height: Math.max(minHeight, height),
        minHeight,
        maxHeight: Infinity
      };
    }
    if (maxRows !== null) {
      let maxHeight = singleRowHeight * maxRows;
      return {
        height: Math.min(maxHeight, height),
        minHeight: -Infinity,
        maxHeight
      };
    }
  }
  return {
    height,
    minHeight: -Infinity,
    maxHeight: Infinity
  };
}

function calculateNodeStyling(node, useCache = false) {
  let nodeRef = (
    node.getAttribute('id') ||
    node.getAttribute('data-reactid') ||
    node.getAttribute('name')
  );

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  let compStyle = window.getComputedStyle(node);

  let sumPaddings = 0;

  // If the textarea is set to border-box, it's not necessary to
  // subtract the padding.
  if (
    compStyle.getPropertyValue('box-sizing') !== 'border-box' &&
    compStyle.getPropertyValue('-moz-box-sizing') !== 'border-box' &&
    compStyle.getPropertyValue('-webkit-box-sizing') !== 'border-box'
  ) {
    sumPaddings = (
      parseFloat(compStyle.getPropertyValue('padding-bottom')) +
      parseFloat(compStyle.getPropertyValue('padding-top'))
    );
  }

  let nodeInfo = {
    sizingStyle: SIZING_STYLE
      .map(name => `${name}:${compStyle.getPropertyValue(name)}`)
      .join(';'),
    sumVerticalPaddings: sumPaddings
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
