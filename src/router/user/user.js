import Boom from "@hapi/boom";
import * as CommonMd from "../middlewares";
import db from "../../../models";
import crypto from "crypto";
import config from "../../../config/config";

export const getDataFromBodyMd = async (ctx, next) => {
  const { id, password, name, sex, birth, phone } = ctx.request.body;
  ctx.state.reqBody = {
    id,
    password,
    name,
  };
  await next();
};

export const validateDataMd = async (ctx, next) => {
  const { id, password, name } = ctx.state.reqBody;

  if (!id || !password || !name) {
    throw Boom.badRequest("field is not fulfiled");
  }

  await next();
};

export const isDuplicatedMd = async (ctx, next) => {
  const { id, phone } = ctx.state.reqBody;

  const usersById = await db["User"].findOne({
    where: { userId: id },
  });
  if (usersById) {
    throw Boom.badRequest("duplicated info");
  }
  await next();
};

export const saveUserMd = async (ctx, next) => {
  const { id, password, name } = ctx.state.reqBody;
  const hashed = await crypto
    .createHmac("sha256", config.secret_key)
    .update(password)
    .digest("base64");
  const user = {
    userId: id,
    password: hashed,
    name,
  };

  await db['User'].create(user);

  ctx.state.body = { success: true };

  await next();
};
export const comparePasswordMd = async (ctx, next) => {
  const { id, password } = ctx.state.reqBody;
  const user = await db["User"].findOne({
    where: { userId: id },
  });
  if (user === null) {
    throw Boom.badRequest("invalid id");
  }
  const hashed = await crypto
    .createHmac("sha256", config.secret_key)
    .update(password)
    .digest("base64");
  if (hashed !== user.dataValues.password) {
    throw Boom.badRequest("wrong password");
  }

  const payload = {
    // eslint-disable-next-line no-underscore-dangle
    id: user.id,
    name: user.name,
  };
  ctx.state.payload = {
    payload,
    exp: "14d",
  };
  await next();
};
export const create = [
  getDataFromBodyMd,
  //   validateDataMd,
  isDuplicatedMd,
  saveUserMd,
  CommonMd.responseMd,
];

export const login = [
  getDataFromBodyMd,
  comparePasswordMd,
  CommonMd.generateJwtMd,
  CommonMd.responseMd,
];
