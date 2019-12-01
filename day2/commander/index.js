#! /usr/bin/env node


let program = require('commander');
const inquirer = require("inquirer");
const fs = require('fs');
const user = JSON.parse(fs.readFileSync('./userList.json', "utf-8"))
const promptList = [{
    type: 'input',
    message: '姓名:',
    name: 'name',
    default: "张三" // 默认值
}, {
    type: 'password',
    message: '密码:',
    name: 'pwd',
    default: "123456" // 默认值
}, {
    type: 'input',
    message: '请输入身份证号:',
    name: 'shengfenzheng',
    default: "身份证号"
    // validate: function(val) {
    //     if(val.match(/\d{18}/g)) { // 校验位数
    //         return val;
    //     }
    //     return "请输入18位数字";
    // }
}, {
    type: 'list',
    message: '请选择性别:',
    name: 'fruit',
    choices: [
        "男",
        "女"
    ],
    filter: function (val) { // 使用filter将回答变为小写
        return val.toLowerCase();
    }
}]

// const userList = [
//     {
//         username: "闫澳辉",
//         password: "123456",
//         shengfenzheng: "130428200106072330",
//         xingbie: "男"
//     }
// ]


program
    .version('1.0.0', '-v,--version')
    .command("login")
    .action(() => {
        inquirer.prompt(promptList).then(answers => {
            console.log(answers); // 返回的结果
            if(answers.shengfenzheng.match(/\d{18}/g)){
                if (user.some(item => item.shengfenzheng === answers.shengfenzheng)) {
                    console.log("用户存在")
                    return
                } else {
                    user.push(answers)
                    return fs.writeFileSync('./userList.json', JSON.stringify(user))
                }
            }else{
                console.log('身份整存在，请重新认证')
            }
            
        })
    })

program.parse(process.argv)


