import Boom from "@hapi/boom";
import * as CommonMd from "../middlewares";

const create = [
  getDataFromBodyMd,
  validateDataMd,
  isDuplicatedMd,
  saveUserMd,
  CommonMd.responseMd,
];
