// const express = require('express')
// const next = require('next')
// const {createProxyMiddleware} = require('http-proxy-middleware')

// const dev = process.env.NODE_ENV !== 'production'

// const app = next({dev});
// const handle = app.getRequestHandler();

// app.prepare().then(()=>{
// const server = express()
// if(dev){
//     server.use("/api", createProxyMiddleware({
//         target:"http://localhost:8080",
//         changeOrigin:true,
//     }));

// }
// server.all("*", (req, res)=>{
//     return handle(req, res);
// });
// server.listen(3000, (err)=>{
//     if(err) throw err;
//     console.log('> Ready on http://localhost:8080');
// })
// }).catch((err)=>{
//     console.log(err);
// })

const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  if(dev){
      server.use(
        "/api",
        createProxyMiddleware({
          target: "http://localhost:8000",
          changeOrigin: true,
        })
      );
  }

  server.all("*", (req, res) => handle(req, res));

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
