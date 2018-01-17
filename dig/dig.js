const version = require('../server').version;
const Router = require('koa-router');
const digRouter = new Router();
const digAPI = version + '/dig';

digRouter.get(digAPI, context => {
    let posts = [];
    for (let i = 0; i < 10; i++) {
        let hasImage = false;
        let hasVideo = false;
        switch (i % 3) {
            case 1:
                hasImage = true;
                break;
            case 2:
                hasVideo = true;
                break;
        }
        posts.push({
            postId: Date.now().toString() + `-${i}`,
            content: `test Post, id ${Date.now().toString()}-${i}, test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i},test Post, id ${Date.now().toString()}-${i}`,
            creationTime: (new Date(Date.now() + i * 50)).toISOString(),
            author_icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            author_userId: Date.now().toString() + `-${i}`,
            author_name: `robot-${i}`,
            author_nickname: `机器人-${i}`,
            likeCount: 0,
            repostCount: 0,
            imageList: hasImage ? [`http://image.xiaomantou.net/resource/image/${i % 20}.jpg`, `http://image.xiaomantou.net/resource/image/${(i + 1) % 20}.jpg`] : null,
            video: hasVideo ? "http://image.xiaomantou.net/test.mp4" : null
        });
    }
    context.body = JSON.stringify({
        errCode: 0,
        postList: posts
    });
});

module.exports = digRouter;