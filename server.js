var Koa = require("koa");
var bodyparser = require("koa-bodyparser");
var api = require('./routes/api')
const mongoose = require('mongoose');
var app = new Koa();

app.use(bodyparser())

mongoose.connect('mongodb://nodetraining:o3u1TM1c7hE6TKaL6GWeD0HivwyuINzg8mkJfwXp7lB0DkybDo6dUSJAv6Dk7Qs1YTdXrb28DmBwTsuvQiDIMg%3D%3D@nodetraining.documents.azure.com:10255/?ssl=true');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected')
});

//Time taken
app.use(async (ctx, next) => {
  var start = new Date();

  await next();

  var end = new Date();
  var duration = end - start;
  console.log("Time taken: " + duration + "ms");
});

// The /api route
app.use(api.routes())
app.use(api.allowedMethods())

//Catch all 404
app.use(ctx => {
  ctx.status = 404;
  ctx.body = "This was not found";
});

app.listen(3000);
