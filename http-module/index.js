const http=require('http');
const server=http.createServer((req,res)=>{
    const url=req.url;
    console.log(url);
//routes
if(url==='/'){
    res.writeHead(200,{"content-type":"text/plain"});
    res.end("Welcome to my HomePage");
}
else if(url==='/projects'){
    res.writeHead(200,{"content-type":"text/plain"});
    res.end("Welcome to the projects sections");
}
else{
    res.writeHead(200,{"content-type":"text/plain"});
    res.end("This page can not be found!");
}
})
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`Server is now listening to port ${PORT}`);
})
