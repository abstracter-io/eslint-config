const micromatch = require('micromatch');

// https://github.com/okonet/lint-staged
module.exports = (allStagedFiles) => {
  const commands = [];
  const lintables = micromatch(allStagedFiles, ['**/*.js', '**/*.mjs'], {});
  const testables = micromatch(allStagedFiles, ['src/**'], {});

  if (lintables.length) {
    commands.push(`npm run lint -- ${lintables.join(' ')}`);
  }

  if (testables.length) {
    commands.push('npm test');
  }

  return commands;
};
