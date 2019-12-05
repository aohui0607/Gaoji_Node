// function play(timer,key,callback){
//     setTimeout(()=>{
//         let nextkey = key+1
//         callback(nextkey)
//     },timer)
// }

// play(1000,1,(two)=>{
//     console.log(`第${two}关的钥匙`)
//     play(2000,two,(three)=>{
//         console.log(`第${three}关的钥匙`)
//         play(3000,three,(four)=>{
//             console.log(`第${four}关的钥匙`)
//         })
//     })
// })

function play(timer,key){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let nextkey=key+1
            resolve(nextkey)
        },timer)
    })
}

// play(1000,1).then((nextkey)=>{
//     console.log(nextkey)
//     return play(2000,nextkey)
// },(error)=>{
//     // console.log(error)
// }).then((nextkey)=>{
//     console.log(nextkey)
//     return play(2000,nextkey)
// }).then((nextkey)=>{
//     console.log(nextkey)
//     return play(2000,nextkey)
// })

async function run(){
    let key2 = await play(1000,1)
    console.log(key2)
    let key3 = await play(1000,1)
    console.log(key3)
    let key4 = await play(1000,1)
    console.log(key4)
}

run().then((res)=>{
    
})