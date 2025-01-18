const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
const server = http.createServer((req,res)=>{
    let filePath = req.url==="/"? path.join(__dirname,"Pages","main.html"):path.join(__dirname,"Pages","profile.html")
    
    fs.readFile(filePath,(err,data)=>{
        if(err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data,"utf-8")
    })

    res.writeHead
})

server.listen(PORT,(res)=>{
    console.log(`The sever is listening to PORT ${PORT}`);
})