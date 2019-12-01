#! /usr/bin/env node

//引入http
const http = require('http')

//创建服务器
const server = http.createServer()

//截取argv命令行
const argv = process.argv.slice(2)

//环境变量 process.env.PORT || 8080  设置环境变量端口号为 ：8080
let post = process.env.PORT || 8080

//获取版本号
const { version } = require('./package.json') || '2.0.0'

if(argv[0]==='-v'){
    console.log(`版本号为${version}`)
    
}else{
    if(argv[0]==='-p' && argv[1]){
        console.log(argv)
        post = argv[1]
    }
    server.listen(post,()=>{
        console.log(`服务开启成功，端口号为：${post}`)
    })
}
