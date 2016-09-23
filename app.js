/**
 * Created by vijanny on 2016-09-22.
 */
var Koa = require('koa');
var wechat = require('./wechat/g');
var config = require('./config/config');

var app = new Koa();
app.use(wechat(config.weChat));//验证微信服务器过来的数据


app.listen(80);
console.log('listening:80');