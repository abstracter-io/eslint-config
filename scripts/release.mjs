import { SDK } from '@abstracter/atomic-release';

const strategy = await SDK.githubNpmPackageStrategy();

strategy.run();
