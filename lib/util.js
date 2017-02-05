'use strict'

import path from 'path';
import fs from 'fs';
import os from 'os';
import http from 'http';
import color from './color';

const util = {
	
	//判断类型
	isType: function(obj){
        let type,
        toString = Object.prototype.toString.call(obj);
        if(obj == null){
            type = String(obj);
        }else{
        	type = toString.toLowerCase();
        	type = type.substring(8,type.length - 1);
        }
        return type;
	},

	//变成数组
    makeArray: function(obj){
        return Array.prototype.slice.call(obj);
    },	

	//参考path.join
    joinFormat: function(){
        var iArgv = Array.prototype.slice.call(arguments);
        var r = path.join.apply(path, iArgv);

        if(/^\.[\\\/]/.test(iArgv[0])){
            r = './' + r;
        }
        return r
            .replace(/\\+/g, '/')
            .replace(/(^http[s]?:)[\/]+/g, '$1//');

    },

    /**
     * [mkdirsSync 创建目录]
     * @param  {[type]} dirname [description]
     * @return {[type]}         [description]
     */
    mkdirsSync: function(dirname){
        var she = this;
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (she.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    },
    
    //模拟promise
    Promise: function(fn){
            var she = this;
            
            she.queue = [];
            she.current = 0;
            she.then = function(fn){
                if(typeof fn == 'function'){
                    she.queue.push(fn);
                }
                return she;
            };
            she.start = function(){
                var myArgv = Array.prototype.slice.call(arguments);
                she.resolve.apply(she, myArgv);
            };

            she.resolve = function(){
                var myArgv = Array.prototype.slice.call(arguments);
                
                myArgv.push(she.resolve);
                if(she.current){
                    myArgv.push(she.queue[she.current - 1]);
                }

                if(she.current != she.queue.length){
                    she.queue[she.current++].apply(she, myArgv);
                }
            };
            if(fn){
                she.then(fn);
            }    	
    }    
};


util.vars = {
	//是否是window操作系统
	IS_WINDOWS: process.platform == 'win32',
    
    // 本机 ip地址
    LOCAL_SERVER: (function(){
        var ipObj = os.networkInterfaces(),
            ipArr;
        for(var key in ipObj){
            if(ipObj.hasOwnProperty(key)){
                ipArr = ipObj[key];
                for(var fip, i = 0, len = ipArr.length; i < len; i++){
                    fip = ipArr[i];
                    if(fip.family.toLowerCase() == 'ipv4' && !fip.internal){
                        return fip.address;
                    }
                }
            }
        }
        return '127.0.0.1';
    })()
}; 

module.exports = util;