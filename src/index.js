import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa-cors";
import { createServer } from "http";
import mongoose from "mongoose";
import router from "./router";
import { errorHandleMd } from "./middlewares";
import db from "../models";

const app = new Koa();
const server = createServer(app.callback());
// const db = async () => {
//   let mongoUri = "";
//   if (process.env.NODE_ENV === "production") {
//     mongoUri = process.env.MONGO_URI_PROD;
//   } else {
//     mongoUri = process.env.MONGO_URI_DEV;
//   }
//   const res = await mongoose.connect(mongoUri, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   });

//   if (res) {
//     /* eslint-disable no-alert, no-console */
//     console.log("Successfully connected to mongodb");
//   } else {
//     console.log("Mongodb Connection fault");
//   }
// };

const main = async () => {
  try {
    app.use(cors());
    app.use(bodyParser());
    app.use(errorHandleMd);
    app.use(router.routes()).use(router.allowedMethods());
    // app.use(serve(path.join(__dirname, "../upload")));
    server.listen(3000);
    /* eslint-disable no-alert, no-console */
    console.log("WR server started [port:3000]");
  } catch (e) {
    console.log(e);
  }
};

main();