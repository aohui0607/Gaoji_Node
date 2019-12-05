
const koa = require('koa');

const static = require('koa-static');

const path = require('path');

const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

const query = require('./db/index.js')

let app = new koa();

app.use(static(path.join(__dirname, 'public')))

app.use(bodyParser())

app.use(router.routes())

app.use(router.allowedMethods())

//获取数据
router.get('/api/list', async (ctx) => {
    let { pageNum, limit } = ctx.query
    try {
        let start = (pageNum - 1) * limit
        let sum = await query('select count(*) from login')

        let list = await query(`select * from login limit ${start},${limit}`);
        ctx.body = {
            code: 1,
            data: list,
            sum: sum[0]['count(*)']
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }

})

//添加数据
router.post('/api/add', async (ctx) => {
    console.log(ctx.request.body)
    let { user, pwd } = ctx.request.body;
    if (user && pwd) {
        let username = await query('select * from login where user=?', [user]);
        if (username.length) {
            ctx.body = {
                code: 2,
                msg: "此用户已存在"
            }
        } else {
            try {
                await query('insert into login (user,pwd) values (?,?)', [user, pwd])
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        }

    } else {
        ctx.body = {
            code: 2,
            msg: "缺失参数"
        }
    }
})

//删除
router.get('/api/del', async (ctx) => {
    let { id } = ctx.query
    if (id) {
        await query('delete from login where id=?', [id])
        ctx.body = {
            code: 0,
            msg: "删除成功"
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "缺失参数"
        }
    }
})

//修改
router.post('/api/update', async (ctx) => {
    console.log(ctx.request.body)
    let { user, pwd, id } = ctx.request.body
    if (user && pwd && id) {
        try {
            await query('update login set user=?,pwd=? where id=?', [user, pwd, id])
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e
            }
        }
    } else {
        ctx.body = {
            code: 2,
            msg: "缺失参数"
        }
    }
})

//模糊搜索
router.get('/api/like', async (ctx) => {
    let { key } = ctx.query;
    try {
       let list1=  await query(`select * from login where user like '%${key}%'`)
        ctx.body = {
            code: 0,
            msg: list1
        }
    } catch (e) {
        ctx.body = {
            code: 1,
            msg: e
        }
    }
})


app.listen(3000, () => {
    console.log('服务开启成功')
})