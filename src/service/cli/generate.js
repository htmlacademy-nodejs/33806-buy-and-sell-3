'use strict';

const chalk = require(`chalk`);
const {ExitCode} = require(`../constants`);
const {generateOffers, makeMockData} = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

module.exports = {
  name: `--generate`,
  async run(userIndex) {
    const [count] = userIndex;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.fail);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    await makeMockData(FILE_NAME, content);
    process.exit(ExitCode.success);
  }
};
