const version = require('../server').version;
const Router = require('koa-router');
const searchRouter = new Router();
const searchAPI = version + '/search';
const searchPredictAPI = searchAPI + '/predict';
const searchPostAPI = searchAPI + '/post';
const searchUserAPI = searchAPI + '/user';

let date = Date.now();
let id = 0;

searchRouter.get(searchPredictAPI, context => {
    let textList = [
        "Cristiano",
        "Bale",
        "Ozil",
        "Moderic",
        "Macelro"
    ];
    let users = [];
    for (let i = 0; i < 10; i++) {
        let userId = Date.now().toString() + `-${i}`;
        let username = `robot-${i}`;
        let nickname = `机器人-${i}`;
        users.push({
            icon: '',
            userId: userId,
            name: username,
            nickname: nickname
        });
    }
    context.body = JSON.stringify({
        errCode: 0,
        textList: textList,
        userList: users
    });
});

searchRouter.get(searchUserAPI, context => {
    let users = [];
    for (let i = 0; i < 10; i++) {
        let userId = Date.now().toString() + `-${i}`;
        let username = `robot-${i}`;
        let nickname = `机器人-${i}`;
        users.push({
            icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            userId: userId,
            name: username,
            nickname: nickname
        });
    }
    context.body = JSON.stringify({
        errCode: 0,
        userList: users
    });
});

searchRouter.get(searchPostAPI, context => {
    let count = context.query.count || 0;
    let posts = [];
    for (let i = 0; i < count; i++) {
        date = date - i * 100;
        id += 1;
        let post = {};
        let location = null;
        let userId = context.query.author || ('user-' + id.toString());
        let username = context.query.author ? 'author' : `robot-${id}`;
        let nickname = context.query.author ? '作者' : `机器人-${id}`;
        let postId = `post-${id}`;
        let hasImage = false;
        let hasVideo = false;
        switch (i % 4) {
            case 1:
                hasImage = true;
                break;
            case 2:
                hasVideo = true;
                break;
            case 3:
                userId = 'test';
                username = 'test';
                nickname = '测试用户';
                break;
            default:
                location = [102.234, 37.239];
        }
        post = {
            postId: postId,
            content: `test Post, id ${postId},test Post, id ${postId},test Post, 中文测试，文章效果显示，中文测试, id ${postId}, http://www.baidu.com`,
            creationTime: (new Date(date)).toISOString(),
            author_icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            author_userId: userId,
            author_name: username,
            author_nickname: nickname,
            likeCount: 0,
            repostCount: 0,
            imageList: hasImage ? [`http://image.xiaomantou.net/resource/image/${i % 20}.jpg`, `http://image.xiaomantou.net/resource/image/${(i + 1) % 20}.jpg`] : null,
            video: hasVideo ? "http://image.xiaomantou.net/test.mp4" : null,
            location: location
        };
        switch (i % 3) {
            case 2:
                let refPostId = `${postId}-${postId}`;
                let refAuthorId = `${userId}-${userId}`;
                post = Object.assign({
                    ref_postId: `${refPostId}`,
                    ref_content: `test Post, id ${refPostId}, test Post, id ${refPostId}`,
                    ref_imageList: hasImage ? post.imageList : null,
                    ref_video: hasVideo ? post.video : null,
                    ref_author_userId: refAuthorId,
                    ref_author_name: `robot-${id}${id}`,
                    ref_author_nickname: `机器人-${id}${id}`
                }, post);
                post.imageList = null;
                post.video = null;
        }

        posts.push(post)
    }
    context.body = JSON.stringify({
        errCode: 0,
        postList: posts
    });
});

module.exports = searchRouter;