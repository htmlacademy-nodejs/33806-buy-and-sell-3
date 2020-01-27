'use strict';

const chalk = require(`chalk`);
const {ExitCode, MOCK_FILENAME} = require(`../constants`);
const {generateOffers, makeMockData} = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

module.exports = {
  name: `--generate`,
  async run(userIndex) {
    const [count] = userIndex;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.fail);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = await generateOffers(countOffer);
    const content = JSON.stringify(offers);

    await makeMockData(MOCK_FILENAME, content);
    process.exit(ExitCode.success);
  }
};
