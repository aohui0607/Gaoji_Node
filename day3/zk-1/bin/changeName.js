#! /usr/bin/env node

const fs = require('fs')

const path = require('path')

let filePath = path.join(process.cwd(),process.argv[2].slice(1));

let list = fs.readdirSync(filePath)

let ind = 0;
list.forEach(item=>{
    if(/html$/.test(item)){
        fs.renameSync(path.join(filePath,item),path.join(filePath,`index${ind}.html`))
        ind++;
    }
})

