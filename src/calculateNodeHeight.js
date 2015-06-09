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
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-transform',
  'width',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

let computedStyleCache = {};
let hiddenTextarea;

export default function calculateNodeHeight(uiTextNode,
    useCache = false,
    minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  let {sizingStyle, heightAdjustment} = calculateNodeStyling(uiTextNode, useCache);

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute('style', sizingStyle + ';' + HIDDEN_TEXTAREA_STYLE);

  hiddenTextarea.value = uiTextNode.value;
  let height = hiddenTextarea.scrollHeight + heightAdjustment;
  let minHeight = -Infinity;
  let maxHeight = Infinity;

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = 'x';
    let singleRowHeight = hiddenTextarea.scrollHeight + heightAdjustment;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      height = Math.min(maxHeight, height);
    }
  }
  return {height, minHeight, maxHeight};
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

  // scrollHeight = content + padding; depending on what box-sizing is
  // set to, we'll need an adjustment when we set the new height
  let heightAdjustment = 0;

  let boxSizing = (
    compStyle.getPropertyValue('box-sizing') ||
    compStyle.getPropertyValue('-moz-box-sizing') ||
    compStyle.getPropertyValue('-webkit-box-sizing')
  );
  // border-box: add border, since height = content + padding + border
  if (boxSizing === 'border-box') {
    heightAdjustment = (
      parseFloat(compStyle.getPropertyValue('border-bottom-width')) +
      parseFloat(compStyle.getPropertyValue('border-top-width'))
    );
  } else if (boxSizing === 'content-box') { // remove padding, since height = content
    heightAdjustment = -(
      parseFloat(compStyle.getPropertyValue('padding-bottom')) +
      parseFloat(compStyle.getPropertyValue('padding-top'))
    );
  }

  let nodeInfo = {
    sizingStyle: SIZING_STYLE
      .map(name => `${name}:${compStyle.getPropertyValue(name)}`)
      .join(';'),
    heightAdjustment
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }
  return nodeInfo;
}
