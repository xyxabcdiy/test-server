const version = require('../server').version;
const Router = require('koa-router');
const postRouter = new Router();
const postAPI = version + '/post';
const postListAPI = postAPI + '/list';
const reportAPI = postAPI + '/report';
const repostAPI = postAPI + '/repost';
const likeAPI = postAPI + '/like';
const mentionAPI = postAPI + '/mention';
const tagAPI = postAPI + '/tag';
const todayAPI = postAPI + '/today';
const imageListAPI = postAPI + '/imageList';

let date = Date.now();
let id = 0;

postRouter.get(postAPI, context => {
    context.body = JSON.stringify({
        errCode: 0,
        post: {
            postId: context.query.id,
            content: `test Post, id ${context.query.id}, test Post, id ${context.query.id}, test Post, id ${context.query.id}, http://www.baidu.com`,
            creationTime: (new Date()).toISOString(),
            author_icon: '',
            author_userId: Date.now().toString(),
            author_name: "机器人username",
            author_nickname: "机器人",
            likeCount: 0,
            repostCount: 0,
            location: null,
            imageList: ["https://github.com/kiritmodi2702/GIF-Swift/blob/master/GIF-Swift/play.gif?raw=true"]
        }
    });
});

postRouter.get(postListAPI, context => {
    const count = context.query.count || 0;
    let posts = createPostList(count, context);
    context.body = JSON.stringify({
        errCode: 0,
        postList: posts
    });
});

postRouter.post(reportAPI, context => {
    console.log(`request body: ${JSON.stringify(context.request.body)}`);
    context.body = JSON.stringify({
        errCode: 0
    })
});

postRouter.post(repostAPI, context => {
    console.log(`request body: ${JSON.stringify(context.request.body)}`);
    context.body = JSON.stringify({
        errCode: 0,
        postId: Date.now().toString()
    })
});

postRouter.get(likeAPI, context => {
    const count = context.query.count || 0;
    let posts = createPostList(count, context);
    let likePosts = posts.map(post => {
        post.flag_like = true;
        return post;
    });
    context.body = JSON.stringify({
        errCode: 0,
        likeList: likePosts
    });
});

postRouter.post(likeAPI, context => {
    context.body = JSON.stringify({
        errCode: 0
    });
});

postRouter.delete(likeAPI, context => {
    context.body = JSON.stringify({
        errCode: 0
    });
});

postRouter.get(mentionAPI, context => {
    const count = context.query.count || 0;
    let mentionPosts = createPostList(count, context);
    context.body = JSON.stringify({
        errCode: 0,
        mentionList: mentionPosts
    });
});

postRouter.get(tagAPI, context => {
    context.body = JSON.stringify({
        errCode: 0,
        tagList: [
            "你的趋势",
            "今日瞬间",
            "美食",
            "体育",
            "旅游",
            "教育",
            "科学"
        ]
    })
});

postRouter.get(todayAPI, context => {
    context.body = JSON.stringify({
        errCode: 0,
        tagList: [
            "你的趋势",
            "今日瞬间",
            "美食",
            "体育",
            "旅游",
            "教育",
            "科学"
        ],
        topicList: [
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
        ],
        postList: createPostList(5, context)
    })
});

postRouter.get(imageListAPI, context => {
    let posts = [];
    let count = context.query.count;
    for (let i = 0; i < count; i++) {
        date = date - i * 100;
        id += 1;
        let post = {};
        let userId = context.query.author || ('user-' + id.toString());
        let username = context.query.author ? 'author' : `robot-${id}`;
        let nickname = context.query.author ? '作者' : `机器人-${id}`;
        let postId = `post-${id}`;
        post = {
            postId: postId,
            content: `test Post@username, id ${postId},test Post, id ${postId},test Post, 中文测试，文章效果显示，中文测试, id ${postId}, http://www.baidu.com`,
            creationTime: (new Date(date)).toISOString(),
            author_icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            author_userId: userId,
            author_name: username,
            author_nickname: nickname,
            likeCount: 0,
            repostCount: 0,
            imageList: [`http://image.xiaomantou.net/resource/image/${i % 20}.jpg`, `http://image.xiaomantou.net/resource/image/${(i + 1) % 20}.jpg`],
            video: null,
            location: null
        };
        posts.push(post);
    }

    context.body = JSON.stringify({
        errCode: 0,
        postList: posts
    })
});


function createPostList(count, context) {
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
            //location = [102.234, 37.239];
        }
        post = {
            postId: postId,
            content: `test Post@username, id ${postId},test Post, id ${postId},test Post, 中文测试，文章效果显示，中文测试, id ${postId}, http://www.baidu.com`,
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

    return posts
}

module.exports = postRouter;