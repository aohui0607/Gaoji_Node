#! /usr/bin/env node

let argv = process.argv.slice(2);

let app = require("../server/app")

let port = 8080;

let static = require('koa-static');

let { version } = require('../package.json');

if (argv[0] === "-v") {
    console.log(version)
} else {
    port = argv[1] ? argv[1] : port
    app.listen(port, () => {
        console.log('服务开启成功')
    })
}