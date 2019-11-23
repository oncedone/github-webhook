const Koa = require("koa");
const Router = require("koa-router");
const handlerMiddleare = require("./middlewares/handler");

const app = new Koa();
const router = new Router();

app.use(handlerMiddleare);

router.get('/', (ctx) => {
  ctx.body = '123';
});

router.post('/aaaa', (ctx) => {
  ctx.body = 'aaaa';
});

router.post("/", function(ctx, next) {
  ctx.handler(ctx.req, ctx.res, function(err) {
    ctx.res.statusCode = 404;
    ctx.res.end("no such location");
  });
});

app.use(router.routes());

app.listen(2000, function(err) {
  console.log("start at port 2000");
});
