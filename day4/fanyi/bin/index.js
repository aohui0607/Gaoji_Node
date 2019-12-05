#! /usr/bin/env node

/**
 *翻译 
 */

const program = require('commander');

const inquirer = require('inquirer');

const superagent = require('superagent');

const { version } = require('../package.json');

let list = [
    { message: "请输入单词", name: "name" }
]

program
    .version(version,'-v,--version')
    .action(() => {
        inquirer.prompt(list).then(answers => {
            superagent
                .get('http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1')
                .query({ q:answers.name}) // query string
                .end((err, res) => {
                    console.log(res.body.translation[0])
                });
        });
    })

program.parse(process.argv)

