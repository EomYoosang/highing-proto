import Router from "@koa/router";
import user from "./user";

const router = new Router({
    prefix: "/api/highing",
});

router.use("/user", user.routes());

export default router;