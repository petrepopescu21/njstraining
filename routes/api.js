var Router = require("koa-router");
var User = require("../models/User");

var api = new Router({
  prefix: "/api"
});

api.get("/user/:id", async (ctx, next) => {
  try {
    var user = await User.find({
      _id: ctx.params.id
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    next();
  }
});

api.get("/user", async ctx => {
  var users = await User.find();
  ctx.body = users;
});

api.post("/user", async ctx => {
  var newUser = ctx.request.body;
  var insertedUser = await User.create(newUser);
  ctx.body = insertedUser;
});

api.delete("/user/:id", async ctx => {
  ctx.body = await User.deleteOne({ _id: ctx.params.id });
});

module.exports = api;
