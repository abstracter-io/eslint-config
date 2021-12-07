const { DIST_ROOT_PATH, PROJECT_ROOT_PATH } = require("./constants");
const { GithubNpmPackageStrategy } = require("@abstracter/atomic-release/strategies");
const { gitSemanticRelease } = require("@abstracter/atomic-release/adapters/git-semantic-release");

const github = {
  owner: "abstracter-io",
  repo: "eslint-config",
  host: "https://github.com",
};

const betaBranchName = "beta";
const stableBranchName = "main";

const createRelease = () => {
  return gitSemanticRelease({
    stableBranchName,

    workingDirectory: PROJECT_ROOT_PATH,

    preReleaseBranches: {
      beta: betaBranchName,
    },

    conventionalChangelogWriterContext: {
      host: github.host,
      owner: github.owner,
      repository: github.repo,
      repoUrl: `${github.host}/${github.owner}/${github.repo}`,
    },
  });
};

const runStrategy = (release) => {
  const strategy = new GithubNpmPackageStrategy({
    release,

    remote: "origin",

    isReleaseBranch(branchName) {
      return branchName === stableBranchName || branchName === betaBranchName;
    },

    changelogFilePath: `${PROJECT_ROOT_PATH}/CHANGELOG.md`,

    gitActor: process.env.RELEASE_ACTOR,

    packageRoot: DIST_ROOT_PATH,

    workingDirectory: PROJECT_ROOT_PATH,

    regenerateChangeLog: true,

    github: {
      repo: github.repo,
      owner: github.owner,
      personalAccessToken: process.env.GITHUB_PAT_TOKEN,
    },

    branchConfig: {
      [stableBranchName]: {
        isStableGithubRelease: true,
        npmRegistryDistTag: "latest",
      },

      beta: {
        npmRegistryDistTag: betaBranchName,
      },
    },
  });

  return strategy.run();
};

createRelease().then(runStrategy).catch((e) => {
  console.error(e);
});
