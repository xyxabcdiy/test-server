const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const version = '/v1';
const port = 7777;
const JWTHeader = 'DDE-Authorization';

exports.version = version;

const app = new Koa();
const router = new Router();
const postRouter = require('./post/post');
const digRouter = require('./dig/dig');
const userRouter = require('./user/user');
const voteRouter = require('./vote/vote');
const topicRouter = require('./topic/topic');
const searchRouter = require('./search/search');
const toolRouter = require('./tool/tool');

const loginAPI = version + '/login';

router.post(loginAPI, (context, next) => {
    console.log(`request body: ${JSON.stringify(context.request.body)}`);
    context.set(JWTHeader, 'test-token');
    context.body = JSON.stringify({
        errCode: 0,
        userId: 'test'
    });
    next();
});

app.use(koaBody({
    jsonLimit: '1kb'
}));

app.use((context, next) => {
    console.log(`${context.request.method}: ${context.path}`);
    next();
});

app.use((context, next) => {
    console.log('set public header');
    context.set('Content-Type', 'application/json');
    next();
});

app.use((context, next) => {
    console.log(`get query string: ${JSON.stringify(context.query)}`);
    next();
});

app.use((context, next) => {
    console.log(`get JWT Token: ${context.get(JWTHeader)}`);
    next();
});

app
    .use(router.routes())
    .use(postRouter.routes())
    .use(digRouter.routes())
    .use(userRouter.routes())
    .use(voteRouter.routes())
    .use(topicRouter.routes())
    .use(searchRouter.routes())
    .use(toolRouter.routes());

app.listen(port, () => {
    console.log(`server listening on ${port}`)
});