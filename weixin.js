/**
 * Created by Administrator on 2016-11-04.
 */

exports.reply = function *(next){
    var message = this.weixin;
    this.body = '';
    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey){
                console.log('扫码进来： '+message.EventKey +' '+message.ticket);
            }
            this.body = '你订阅了这个号\r\n'+'消息ID：'+message.MsgId
        }else if(message.Event === 'unsubscribe'){
            console.log('无情取关');
            this.body = ''
        }
    }else if(message.MsgType === 'text'){

    }
    yield next;
};