const version = require('../server').version;
const Router = require('koa-router');
const userRouter = new Router();
const userAPI = version + '/user';
const followerAPI = userAPI + '/follower/list';
const followingAPI = userAPI + '/following/list';
const followAPI = userAPI + '/follow';
const searchAPI = userAPI + '/search';
const reportAPI = userAPI + '/report';

userRouter.get(userAPI, context => {
    context.body = JSON.stringify({
        errCode: 0,
        user: {
            userId: context.query.id,
            icon: `http://www.xiaomantou.com/resource/avatar/${6}`,
            name: "robot",
            nickname: "机器人",
            followingCount: 109,
            followerCount: 129,
            gender: 0,
            brief: "机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人"
        }
    });
});

userRouter.get(followingAPI, context => {
    let users = [];
    const count = context.query.count || 0;
    for (let i = 0; i < count; i++) {
        let userId = Date.now().toString() + `-${i}`;
        let username = `robot-${i}`;
        let nickname = `机器人-${i}`;
        users.push({
            icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            userId: userId,
            name: username,
            nickname: nickname,
            flag_follow: true,
            brief: "机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人"
        });
    }
    context.body = JSON.stringify({
        errCode: 0,
        userList: users
    });
});

userRouter.get(followerAPI, context => {
    let users = [];
    const count = context.query.count || 0;
    for (let i = 0; i < count; i++) {
        let userId = Date.now().toString() + `-${i}`;
        let username = `robot-${i}`;
        let nickname = `机器人-${i}`;
        users.push({
            icon: `http://image.xiaomantou.net/resource/avatar/${i % 8}.jpg`,
            userId: userId,
            name: username,
            nickname: nickname,
            brief: "机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人机器人"
        });
    }
    context.body = JSON.stringify({
        errCode: 0,
        userList: users
    });
});

userRouter.post(followAPI, context => {
    context.body = {
        errCode: 0
    }
});

userRouter.delete(followAPI, context => {
    context.body = {
        errCode: 0
    }
});

userRouter.get(searchAPI, context => {
    let users = [];
    const count = context.query.count || 0;
    for (let i = 0; i < count; i++) {
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
        userList: users
    });
});

userRouter.post(reportAPI, context => {
    console.log(`request body: ${JSON.stringify(context.request.body)}`);
    context.body = JSON.stringify({
        errCode: 0
    });
});

module.exports = userRouter;