/**
 * Created by Administrator on 2016-09-22.
 */

var fs =  require('fs');
var Promise = require('bluebird');
var xml2js = require('xml2js');


exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve,reject){
       xml2js.parseString(xml,{trim:true},function(err,content){
           if(err) reject(err);
           else resolve(content);
       }) ;
    });
};
exports.readFileAsync = function(fpath,encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(fpath,encoding,function(err,content){
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        })
    })
};
exports.writeFileAsync=function(fpath,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(fpath,content,function(err,content){
            if(err){
                reject(err);
            }else{
                resolve(content);
            }
        })
    })
};