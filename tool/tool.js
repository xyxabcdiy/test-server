const version = require('../server').version;
const Router = require('koa-router');
const toolRouter = new Router();
const toolAPI = version + '/tool';

let date = Date.now();
let id = 0;

toolRouter.get(toolAPI, context => {
    let tools = [];
    for (let i = 0; i < 20; i++) {
        date = date - i * 100;
        id += 1;
        let tool = {};
        let toolId = `tool-${id}`;
        tool = {
            id: toolId,
            name: toolId,
            userCount: 0,
            image: "http://image.xiaomantou.net/11.jpg",
            icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`
        };

        tools.push(tool)
    }
    context.body = JSON.stringify({
        errCode: 0,
        toolList: tools
    })
});

module.exports = toolRouter;