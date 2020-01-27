'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;
const MOCK_FILENAME = `mocks.json`;
const USER_ARGV_INDEX = 2;

const ExitCode = {
  success: 0,
  fail: 1
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const ResponseMessage = {
  NOT_FOUND: `File not found`,
  SERVER_ERROR: `Internal Server Error`,
};

const NodeExceptions = {
  ENOENT: `ENOENT`,
};

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 0,
  max: 16,
};

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  MOCK_FILENAME,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  ResponseMessage,
  NodeExceptions,
  OfferType,
  SumRestrict,
  PictureRestrict
};
