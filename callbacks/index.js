const fs=require('fs');
function person(name, callbackfn){
    console.log(`Hello ${name}`);
    callbackfn();
}
function address(){
    console.log('India');
}
person('Narendra', address);

//another example of callbacks
fs.readFile('callbackfile.txt',"utf8",(err,data)=>{
    if(err){
        console.log("Error reading file",err);
        return ;
    }
    else{
       console.log(data);
    }
})

//callback hell
fs.readFile('callbackfile.txt', "utf8",(err,data)=>{
    if(err){
        console.log(err);
       return;
    }
    const modifyFileData=data.toUpperCase();
    fs.writeFile('callbackfile.txt',modifyFileData,(err)=>{
        if(err){
            console.log(err);
            return ;
        }
        console.log('File updated successuflly');
    fs.readFile('callbackfile.txt',"utf8",(err,data)=>{
        if(err){
            console.log(err);
            return ;
        }
        console.log(data);
    })   
  })  
})