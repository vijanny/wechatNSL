/**
 * Created by vijanny on 2016-09-22.
 */
var Koa = require('koa');
var wechat = require('./wechat/g');
var config = require('./config/config');
var weixin = require('./weixin');
var app = new Koa();
app.use(wechat(config.weChat,weixin.reply));//验证微信服务器过来的数据


app.listen(80);
console.log('listening:80');