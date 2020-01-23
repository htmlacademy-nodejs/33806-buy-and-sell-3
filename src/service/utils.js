'use strict';

const fs = require(`fs`);
const util = require(`util`);
const chalk = require(`chalk`);
const writeFile = util.promisify(fs.writeFile);
const {TITLES, CATEGORIES, SENTENCES, OfferType, SumRestrict, PictureRestrict} = require(`./mockData`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomPosition = Math.floor(Math.random() * index);
    [array[index], array[randomPosition]] = [array[randomPosition], array[index]];
  }

  return array;
};

const getPictureFilename = (number) => `item${number < 10 ? `0${number}` : number}.jpg`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFilename(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

const makeMockData = async (filename, data) => {
  try {
    await writeFile(filename, data);
    console.log(chalk.green(`The file has been saved!`));
  } catch (error) {
    console.error(chalk.red(`Can't write data to file`));
  }
};

module.exports = {getRandomInt, shuffle, getPictureFilename, generateOffers, makeMockData};
