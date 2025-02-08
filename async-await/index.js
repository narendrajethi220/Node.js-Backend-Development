// syntactical sugar ,makes simpler and make promise easier to write
//async - make a function returns a promise
//await - make a function wait for a promise

function delayfn(time){
    return new Promise(resolve=>setTimeout(resolve,time));
}

async function delayedGreet(name){
    await delayfn(2000);
    console.log(`Hello ${name} after 2 sec`);
}
 delayedGreet("Narendra");
 console.log("Hello From async await");

//  catching error in async await
async function division(num1, num2){
    try{
     if(num2===0){
        throw new Error("can't divide by zero"); 
    }
    return num1/num2;
    }
    catch(error){
     console.log(error);
    }
}

async function mainFn(){
    console.log(division(10,2));
    console.log(division(100,0));
}

division(10,0);