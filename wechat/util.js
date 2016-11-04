/**
 * Created by Administrator on 2016-11-04.
 */

var tpl = require('./tpl');
function formatMessage(result){

    var message = {};
    if(typeof  result === 'object'){

        var keys = Object.keys(result);

        for(var i = 0;i<keys.length;i++){
            var item =  result[keys[i]];

            var key = keys[i];
            if(!(item instanceof  Array)|| item.length === 0){
                continue;
            }

            if(item.length === 1){
                var val = item[0];
                if(typeof val === 'object'){
                    message[key] = formatMessage(val);
                }else{
                    message[key] = (val||'').trim();
                }

            }else{
                message[key]=[];
                for(var j = 0,k=item.length;j<k;j++){
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
}
exports.formatMessage = formatMessage;
exports.tpl = function(content,message){
    console.log('in wechat util tpl function ');
    console.log('content : '+content);
    console.log('message : ' + JSON.stringify(message) );
    var info = {};
    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;

    if(Array.isArray(content)){
        type = 'news'
    }

    type = content.type||type;
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;

    console.log('info : '+JSON.stringify(info));
    return tpl.compiled(info);

};