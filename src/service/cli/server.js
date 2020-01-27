'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, MOCK_FILENAME, HttpCode, ResponseMessage, NodeExceptions} = require(`../constants`);

const sendResponse = (res, statusCode, content) => {
  const template = `
    <!doctype html>
      <html lang="ru">
      <head>
        <title>Posts</title>
      </head>
      <body>${content}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(MOCK_FILENAME, `utf-8`);
        const mocks = JSON.parse(fileContent);
        const content = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${content}</ul>`);
      } catch (err) {
        if (err.code === NodeExceptions.ENOENT) {
          sendResponse(res, HttpCode.NOT_FOUND, ResponseMessage.NOT_FOUND);
          return;
        }

        sendResponse(res, HttpCode.INTERNAL_SERVER_ERROR, ResponseMessage.SERVER_ERROR);
        console.log(chalk.red(`Server Error: `, err));
      }

      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, ResponseMessage.NOT_FOUND);
      break;
  }
};

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return console.error(chalk.red(`Ошибка при создании сервера`, err));
        }

        return console.info(chalk.green(`Ожидаю соединений на http://localhost:${port}`));
      });
  }
};
