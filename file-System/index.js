const fs=require('fs');
const path=require('path');

const dataFolder=path.join(__dirname,"data");

//checking if the folder exist or not & if not then creating new folder
if(!fs.existsSync(dataFolder)){
    fs.mkdirSync(dataFolder);
    console.log("dataFolder created successfully");
}
const filePath=path.join(dataFolder,'example.txt');
fs.writeFileSync(filePath,"Hello from Narendra Singh Jethi from the VS Code!");
console.log("File created successfully");
const readContentFromFile=fs.readFileSync(filePath,'utf8');
console.log("File Content ->",readContentFromFile);
fs.appendFileSync(filePath,"\n I am updating this from the vscode not directly inside the file");
const updatedContent=fs.readFileSync(filePath,"utf8");
console.log("Updated File->",updatedContent);

// Async way of creating the file
const asyncFilePath=path.join(dataFolder,"asyncFile.txt");
fs.writeFile(asyncFilePath,"Hello This is Async Way of creating the file",(err)=>{
    if(err) throw err;
    console.log("File created Successfully");
fs.readFile(asyncFilePath,'utf8',(err,data)=>{
    if(err) throw err;
    console.log("Data From File->",data);
}),
fs.appendFile(asyncFilePath,"\nThis is the appended by me from the code not inside the file",(err)=>{
   if(err) throw err;
   console.log("File Updated");
}),
fs.readFile(asyncFilePath,"utf8",(err,updatedData)=>{
    if(err) throw err;
    console.log(updatedData);
})
})

//UTF-8 stands for Unicode Transformation Format-8-bit. It's a character encoding standard that uses one to four bytes to represent Unicode characters. UTF-8 is the most common character encoding for the World Wide Web
