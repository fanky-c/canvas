'use strict';
var require = {
    paths: {
        //global lib
        zepto: '../../js/lib/zepto/yymzepto.min',
        jQuery: '../../js/lib/jquery/jquery-1.8.0.min',
        jsonp: '../../js/lib/jsonp/jquery.jsonp',
        artTemplate: '../../js/lib/artTemplate/artTemplate',
        lazyload:'../../js/lib/lazyload/lazyload.min',
        swiper:'../../js/lib/swiper/swiper.min',
        fastclick:'../../js/lib/fastclick/fastclick',
        underscore:'../../js/lib/underscore/underscore',        
        YYMobileBridge:'../../js/lib/YYMobileBridge/YYMobileBridge',
        yyBridge:'../../js/lib/yyBridge/WAJavascriptBridge',
        yymobile:'../../js/lib/yymobile/yymobile_api_v1.2.12',
        reportPhoneEvent2:'../../js/lib/reportPhoneEvent/mPublic_hiido.v1.0.2',
        iscroll:'../../js/lib/iscroll/iscroll',
        util:'../../js/lib/util/util',
        canvasArror:'../../js/lib/canvasArror/canvasArror',
        canvasBall:'../../js/lib/canvasBall/canvasBall'         
    },
    shim: {
        jQuery: {
            exports: '$'
        },
        jsonp:{
           deps: ['jQuery'],
           exports: '$.jsonp' 
        },                
        YYMobileBridge:{
           deps: ['jQuery'],
           exports:'YYMobileBridge'
        },
        yyBridge: {
            deps: ['YYMobileBridge'],
            exports: 'yyBridge'
        },
        yymobile:{
             deps:['yyBridge']
        },
        reportPhoneEvent2:{
            deps:['yymobile'],
            exports: 'reportPhoneEvent2'
        },        
        artTemplate: {
            exports: 'artTemplate'
        },
        lazyload: {
           deps:["jQuery"],
           exports: 'lazyload'   
        },
        swiper: {
           deps:["jQuery"],
           exports: 'swiper'   
        },
        iscroll: {
            deps:['jQuery'],
            exports:'iscroll'
        },
        util:{
              exports:'util'
        },
        canvasArror:{
              exports:'Arror'
        },
        canvasBall:{
               exports:'Ball'
        }
    }
};


if(typeof module === "object" && typeof module.exports === 'object'){
    module.exports = require; 
}
