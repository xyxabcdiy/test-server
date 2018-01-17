const version = require('../server').version;
const Router = require('koa-router');
const voteRouter = new Router();
const voteAPI = version + '/vote';
const voteListAPI = voteAPI + '/list';

voteRouter.get(voteAPI, context => {
    context.body = JSON.stringify({
        errCode: 0,
        vote: {
            voteId: Date.now().toString(),
            content: "test id " + Date.now().toString(),
            image: "http://image.xiaomantou.net/11.jpg"
        }
    })
});

voteRouter.put(voteAPI, context => {
    context.body = JSON.stringify({
        errCode: 0
    })
});

voteRouter.get(voteListAPI, context => {
    let voteList = [];
    const count = context.query.count || 0;
    for (let i = 0; i < count; i++) {
        let id = Date.now().toString() + `-${i}`;
        voteList.push({
            voteId: Date.now().toString(),
            content: "test id -" + id,
            image: "http://image.xiaomantou.net/11.jpg"
        })
    }
    context.body = JSON.stringify({
        errCode: 0,
        voteList: voteList
    })
});

module.exports = voteRouter;