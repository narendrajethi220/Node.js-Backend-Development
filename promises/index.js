//eventual completion or failure of an async operations and its resulting value

function delayFn(time){
    return new Promise((resolve)=>setTimeout(resolve,time));
}
console.log("Promise start");
delayFn(2000).then(()=>{
    console.log('after 2 seconds promise resolve');
})
console.log("end");

// catchine error in promises
function divide(num1, num2){
    return new Promise((resolve,reject)=>{
        if(num2===0){
            reject("num2 can't be zero");
        }
        else {
            resolve(num1/num2);
        }
    })
}

divide(10,5).then(result=>
    console.log(result))
    .catch(error=>console.log(error));

divide(100,0).then(res=>console.log(res))
.catch(err=>console.log(err));

