const Koa = require('koa');

const app = new Koa()

function delay() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('111')
            console.log('111')
        }, 1000)
    })
}

app.use(async (ctx, next) => {
    let startTime = new Date().getTime()
    console.log("第一层开始")
    await next()
    let endTime = new Date().getTime()
    let timer = endTime - startTime
    console.log("第一层结束")
    console.log(timer)
})

app.use(async (ctx, next) => {
    console.log("第二层开始")
    await next()
    console.log("第二层结束")
})

app.use(async (ctx, next) => {
    console.log("第三层开始")
    await delay()
    console.log("第三层结束")
})

module.exports=app