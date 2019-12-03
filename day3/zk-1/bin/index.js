#! /usr/bin/env node

const fs = require('fs');

let file = process.argv[2].slice(1);

const path = require('path');

function rendFile(ownPath) {
    let filePath = path.join(process.cwd(),ownPath)
    if (fs.existsSync(filePath)) {
        if(fs.statSync(filePath).isDirectory()){
            let list = fs.readdirSync(filePath)
            list.forEach(item=>{
                rendFile(path.join(ownPath,item))
            })
        }else{
            let size = fs.statSync(filePath).size;
            let exname = path.extname(filePath).slice(1);
            console.log(`${ownPath}--${exname}--${size}`)
        }
    }else{
        console.log("此路径不存在")
    }
}

rendFile(file)