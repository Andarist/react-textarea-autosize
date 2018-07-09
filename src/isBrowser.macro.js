const { createMacro, MacroError } = require('babel-plugin-macros');
const { addDefault } = require('@babel/helper-module-imports');

module.exports = createMacro(({ references, babel: { template } }) => {
  const usedReferences = Object.keys(references);

  if (usedReferences.length > 1 || usedReferences[0] !== 'default') {
    throw new MacroError(
      `${__filename} must be used as default import, instead you have used it as: ${usedReferences.join(
        ', ',
      )}.`,
    );
  }

  const { name: insertedName } = addDefault(
    references.default[0],
    './isBrowser',
    { nameHint: 'isBrowser' },
  );

  const enhancedIsBrowser = template(`process.env.BROWSER || ${insertedName}`, {
    placeholderPattern: false,
  });

  references.default.forEach(isBrowser => {
    isBrowser.replaceWith(enhancedIsBrowser().expression);
  });
});
