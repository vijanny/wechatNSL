/**
 * Created by Administrator on 2016-09-23.
 */

var Promise = require('bluebird');
var request = Promise.promisify(require('request'));


var prefix ='https://api.weixin.qq.com/cgi-bin/';

var api = {
    accessToken:prefix+'token?grant_type=client_credential'
};

function weChat(opts){
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;

    this.getAccessToken()
        .then(function(data){

            try{
                data = JSON.parse(data);
            }catch(e){
                //遇到问题更新下AccessToken
                return that.updateAccessToken(data);
            }

            //判断是否是有效的票据信息
            if(that.isValidAccessToken(data)){
                return Promise.resolve(data);
            }else{
                //更新AccessToken
                return that.updateAccessToken(data);
            }
        })
        .then(function(data){
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            that.saveAccessToken(data);
        })
}

weChat.prototype.isValidAccessToken = function(data){
    if(!data||!data.access_token||!data.expires_in){
        return false;
    }

    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now < expires_in){
        return true;
    }else{
        return false;
    }
};

weChat.prototype.updateAccessToken = function(){
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken +'&appID='+appID+'&secret='+appSecret;
    return new Promise(function(resolve,reject){
        request({url:url,json:true}).then(function(response){
            var data  = response.body;
            console.log(data);
            var now = (new Date().getTime());
            var expires_in = now+(data.expires_in-20)*1000;
            data.expires_in = expires_in;
            resolve (data) ;
        });
    });
};

module.exports = weChat;
