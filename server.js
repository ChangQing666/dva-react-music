const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname+'/dist'));
app.use(main);
app.listen(3005, function(){
  console.log("本地服务已启动，端口3005:  http://localhost:3001/");
})
