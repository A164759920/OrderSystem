// system require
const Path = require("path");
const http = require("http");

// node_module require
const Koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const static = require("koa-static");
const mount = require("koa-mount");

const { HTTP_PORT, MOUNT_NAME } = require("./config.default.js");
const { router } = require("./router/index");

const server = new Koa();
server
  .use(mount(MOUNT_NAME, static(Path.join(__dirname, "./static"))))
  .use(cors())
  .use(
    koaBody({
      multipart: true,
      encoding: "utf-8",
      formidable: {
        uploadDir: Path.join(__dirname, "./static"), //上传目录，默认放置在启动目录
        keepExtensions: true, //保存文件后缀
        maxFieldsSize: 10485760, //默认文件大小
      },
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());

http.createServer(server.callback()).listen(HTTP_PORT, "0.0.0.0", () => {
  console.log(`🚀 HTTP server is running on: ${HTTP_PORT}`);
});
