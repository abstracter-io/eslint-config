const path = require("path");
const fs = require("fs/promises");
const { DIST_ROOT_PATH, PROJECT_ROOT_PATH } = require("./constants");

const clean = () => {
  return fs.rm(DIST_ROOT_PATH, { recursive: true, force: true }).then(() => {
    return console.log(`Deleted ${DIST_ROOT_PATH}`);
  });
};

const copySrc = () => {
  const copy = (src, dest) => {
    return fs.mkdir(dest, { recursive: true })
      .then(() => {
        return fs.readdir(src, { withFileTypes: true });
      })
      .then((entries) => {
        const promises = [];

        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);

          if (entry.isDirectory()) {
            promises.push(copy(srcPath, destPath));
          }
          //
          else {
            promises.push(fs.copyFile(srcPath, destPath));
          }
        }

        return Promise.all(promises);
      });
  };

  return copy(`${PROJECT_ROOT_PATH}/src`, `${DIST_ROOT_PATH}`);
};

const copyFiles = () => {
  return Promise.all([
    fs.copyFile(`${PROJECT_ROOT_PATH}/package.json`, `${DIST_ROOT_PATH}/package.json`),
    fs.copyFile(`${PROJECT_ROOT_PATH}/README.md`, `${DIST_ROOT_PATH}/README.md`),
  ]);
};

const writeNpmConfig = () => {
  const path = `${DIST_ROOT_PATH}/.npmrc`;
  // eslint-disable-next-line no-template-curly-in-string
  const content = "//registry.npmjs.org/:_authToken=${NPM_TOKEN}";

  return fs.writeFile(path, content).then(() => {
    return console.log(`Wrote ${path}`);
  });
};

clean()
  .then(copySrc)
  .then(copyFiles)
  .then(writeNpmConfig)
  .catch((e) => {
    return console.error(e);
  });
