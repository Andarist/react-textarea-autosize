const {
  getReleaseLine,
  getDependencyReleaseLine,
} = require('@changesets/cli/changelog');

const changelogFunctions = {
  async getReleaseLine(changeset, type) {
    return (await getReleaseLine(changeset, type)).replace(
      /^-\s+[a-z\d]+:\s+/gm,
      '- ',
    );
  },
  getDependencyReleaseLine,
};

module.exports = {
  ...changelogFunctions,
  default: changelogFunctions,
};
