/**
 * Created by Administrator on 2016-09-22.
 */
/**
 * Created by vijanny on 2016-09-22.
 */

var sha1 = require('sha1');
var WeChat = require('./weChat');
var getRawBody = require('raw-body');
var util =  require('./util');
var LibUtil = require('../lib/util');
module.exports = function (opts,handler) {



    var wechat = new WeChat(opts);
    return function *(next) {
        //console.log(this.query);
        var that = this;
        var token = opts.token;
        var signature = this.query.signature;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var nonce = this.query.nonce;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (this.method === 'GET') {
            if (sha === signature) {
                this.body = echostr;
            } else {
                this.body = 'wrong';
            }
        } else if (this.method === 'POST') {
            if (sha !== signature) {
                this.body = 'wrong';
                return false;
            }

            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            });
            console.log(data.toString());
            var content =  yield LibUtil.parseXMLAsync(data);
            console.log(content);
            var message = util.formatMessage(content.xml);
            console.log(message);

            this.weixin = message;

            yield handler.call(this,next);

            wechat.reply.call(this);
        }

    }
};