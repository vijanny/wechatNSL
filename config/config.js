/**
 * Created by Administrator on 2016-09-22.
 */

var path = require('path');
var util = require('./../lib/util');
var weChat_file = path.join(__dirname,'./weChat.txt');
var NLSConfig ={
    appID:'wx567ca5356967635c',
    appSecret:'d523b9488b93574fe481feb1a9790962',
    token:'gmri_com_cn_wechat_prj',
    getAccessToken:function(){
        return util.readFileAsync(weChat_file);
    },
    saveAccessToken:function(data){
        data = JSON.stringify(data);
        return util.writeFileAsync(weChat_file,data);
    }
};
var TestConfig ={
    appID:'wxc1c62269461a335d',
    appSecret:'af656d37f16486eb5536c05e5c637f68',
    token:'123',
    getAccessToken:function(){
        return util.readFileAsync(weChat_file);
    },
    saveAccessToken:function(data){
        data = JSON.stringify(data);
        return util.writeFileAsync(weChat_file,data);
    }
};

var config ={
    weChat:NLSConfig
};
module.exports = config;