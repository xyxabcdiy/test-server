const version = require('../server').version;
const Router = require('koa-router');
const topicRouter = new Router();
const topicAPI = version + '/topic';

topicRouter.get(topicAPI, context => {
    let topics = [
        {
            name: "AppleEvent",
            count: 23898
        },
        {
            name: "HandHand",
            count: 4897
        },
        {
            name: "Shanghai",
            count: 23898
        },
        {
            name: "StupidQuestionsForJesus",
            count: 8954589
        },
        {
            name: "Kairi",
            count: 2748
        }
    ];
    context.body = JSON.stringify({
        errCode: 0,
        topicList: topics
    })
});

module.exports = topicRouter;