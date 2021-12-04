const path = require("path");

const PROJECT_ROOT_PATH = path.resolve(__dirname, "../");

const DIST_ROOT_PATH = path.resolve(PROJECT_ROOT_PATH, "dist");

module.exports = {
  PROJECT_ROOT_PATH,
  DIST_ROOT_PATH,
};
