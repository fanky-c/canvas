/**
 *  YYMobile Javascript API
 *  API Level: 2
 *  Version: 1.2.10
 */

function consoleLog() {
    if (console) {
        console.log.apply(console, arguments)
    }
}

YYMobileJavascriptAPILevelTable = {
    "yyuigoto": 1,
    "pop": 1,
    "gotoLogin": 1,
    "gotoRegister": 1,
    "gotoPersonalCenter": 1,
    "gotoVipSign": 1,
    "gotoPhotoAlbum": 1,
    "gotoPrivilege": 1,
    "gotoCharacterEmoticonPrivilege": 1,
    "gotoColorfulBubblePrivilege": 1,
    "gotoLiveHome": 1,
    "gotoLiveCenter": 1,
    "gotoSettingCenter": 1,
    "gotoColorfulBubble": 1,
    "gotoPluginManagementSetting": 1,
    "gotoNeighborhood": 1,
    "joinChannel": 1,
    "joinLive": 1,
    "gotoPluginManagement": 1,
    "gotoPluginItem": 1,
    "gotoPluginItemOutline": 1,
    "checkLoginStatusWithCallback": 1,
    "requestUserWebToken": 1,
    "followUser": 1,
    "unFollowUser": 1,
    "getAppInfo": 2,
    "setPhoneNumber": 2,
    "showAlertMessage": 2,
    "setCommonStorageValueForKey": 2,
    "getCommonStorageValueForKey": 2,
    "showProgressWindow": 2,
    "hideProgressWindow": 2,
    "postNotification": 2,
    "deleteSharedCookie": 2,
    "gotoWeb": 2,
    "goto1931": 2,
    "gotoMessageCenter": 2,
    "closeAllWindow": 3,
    "gotoBrowser": 3,
    "showBackBtn": 3,
    "hideBackBtn": 3
}

YYMobileJavascriptAPIVersionTable = {
    "yyuigoto": "1.1",
    "pop": "1.1",
    "gotoLogin": "1.1",
    "gotoRegister": "1.1",
    "gotoPersonalCenter": "1.1",
    "gotoVipSign": "1.1",
    "gotoPhotoAlbum": "1.1",
    "gotoPrivilege": "1.1",
    "gotoCharacterEmoticonPrivilege": "1.1",
    "gotoColorfulBubblePrivilege": "1.1",
    "gotoLiveHome": "1.1",
    "gotoLiveCenter": "1.1",
    "gotoSettingCenter": "1.1",
    "gotoColorfulBubble": "1.1",
    "gotoPluginManagementSetting": "1.1",
    "gotoNeighborhood": "1.1",
    "joinChannel": "1.1",
    "joinLive": "1.1",
    "gotoPluginManagement": "1.1",
    "gotoPluginItem": "1.1",
    "gotoPluginItemOutline": "1.1",
    "checkLoginStatusWithCallback": "1.1",
    "requestUserWebToken": "1.1",
    "followUser": "1.1",
    "unFollowUser": "1.1",
    "getAppInfo": "1.2",
    "setPhoneNumber": "1.2",
    "showAlertMessage": "1.2",
    "setCommonStorageValueForKey": "1.2",
    "getCommonStorageValueForKey": "1.2",
    "showProgressWindow": "1.2",
    "hideProgressWindow": "1.2",
    "postNotification": "1.2",
    "deleteSharedCookie": "1.2",
    "gotoWeb": "1.2",
    "goto1931": "1.2",
    "gotoMessageCenter": "1.2",
    "closeAllWindow": "1.3",
    "gotoBrowser": "1.3",
    "showBackBtn": "1.3",
    "hideBackBtn": "1.3"
}

YYMobileJavascriptAPIVersionTable = {
    "1.1": 1,
    "1.2": 2,
    "1.3": 3
}

YYMobileNotificationIDs = {
    // 运营商流量包定购状态发生变化
    "CarrierDataTrafficPackageSubscribeStateChanged": 0x1001
}

YYMobileNotificationUserInfoKeys = {

    // 运营商流量包定购状态发生变化, 新状态
    "CarrierDataTrafficPackageSubscribeStateChangedUserInfoNewState": "CarrierDataTrafficPackageSubscribeStateChangedUserInfoNewState"
}

YYMobileOverridable = {
    popAction: function() {
        return false;
    }
};

YYMobileJavascriptWasReady = false;
var __YYMobileAPILevel__ = 0;

function onJavascriptBridgeReady(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            consoleLog("bridge ready");
            initializeJSHandles(WebViewJavascriptBridge);
            callback(WebViewJavascriptBridge);
        }, false);
    }
}

function onYYMobileJavascriptAPIReady(callback) {
    if (YYMobileJavascriptWasReady) {
        callback();
    } else {
        document.addEventListener('YYMobileJavascriptAPIReady', function() {
            callback();
        });
    }
}

function initializeYYMobileAPI() {
    onJavascriptBridgeReady(function(bridge) {
        bridge.init(function(message, responseCallback) {});
        //                            bridge.callHandler("getAPILevel", null, function(level) {
        //                                               consoleLog("yymobile api ready, level: " + level)
        //                                               __YYMobileAPILevel__ = level;
        YYMobileJavascriptWasReady = true;
        var readyEvent = document.createEvent('Events')
        readyEvent.initEvent('YYMobileJavascriptAPIReady')
        document.dispatchEvent(readyEvent)
        //                                               })
    });
}

function initializeJSHandles(bridge) {
    bridge.registerHandler('brdigeEventHandler', onBridgeEvent);
    bridge.registerHandler('askForHandlePopAction', function(data, responseCallback) {
        var handled = YYMobileOverridable.popAction();
        responseCallback(handled);
    });
}

// Helper functions

function safeCallHandler(handler, arguments1, callback) {
    var p1 = handler;
    var p2 = arguments1;
    var p3 = callback;
    onYYMobileJavascriptAPIReady(function() {
        //                                     var levelRequired = APILevelTable[handler];
        //                                     if (levelRequired == null || levelRequired > __YYMobileAPILevel__) {
        //                                     var error = (handler + " requires YYMobile API level " + levelRequired + ", but current API level is " + __YYMobileAPILevel__);
        //                                     alert(error);
        //                                     }
        //                                     else
        {
            window.WebViewJavascriptBridge.callHandler(p1, p2, p3);
        }
    });
}

function getAPILevel(callback) {
    safeCallHandler("getAPILevel", null, callback);
}

function pop() {
    safeCallHandler("yyuipop");
}

function _goto(uri) {
    safeCallHandler("yyuigoto", {
        "uri": uri
    });
}

// 登录
/**
 * 打开登录页
 */

function gotoLogin() {
    _goto("yymobile://Login/Login");
    //window.YYApiCore.invokeClientMethod('ui', 'showLoginDialog');
}

/**
 * 打开注册页
 */

function gotoRegister() {
    _goto("yymobile://Login/Register");
}

// 个人中心
/**
 * 跳转至个人主页
 * Params:
 *      uid - 用户的uid(0为自己)
 */

function gotoPersonalCenter(uid) {
    _goto("yymobile://PersonalCenter/" + uid);
}

/**
 * 跳转至会员签
 */

function gotoVipSign() {
    _goto("yymobile://PersonalCenter/VipSign");
}

/**
 * 跳转至相册和作品页
 * Params:
 *      uid - 用户的uid(0为自己)
 */

function gotoPhotoAlbum(uid) {
    _goto("yymobile://PersonalCenter/" + uid + "/PhotoAlbum");
}

// 特权
/**
 * 跳转至连登特权首页
 */

function gotoPrivilege() {
    _goto("yymobile://Privilege/All");
}

/**
 * 跳转至字符画特权页
 */

function gotoCharacterEmoticonPrivilege() {
    _goto("yymobile://Privilege/CharacterEmoticon");
}

/**
 * 跳转至炫彩气泡特权页
 */

function gotoColorfulBubblePrivilege() {
    _goto("yymobile://Privilege/ColorfulBubble");
}

// 直播中心
/**
 * 跳转至直播首页
 */

function gotoLiveHome() {
    _goto("yymobile://LiveCenter/Nav/-1");
}

/**
 * 跳转至1931首页
 */

function goto1931Home() {
    _goto("yymobile://1931/Home");
}

/**
 * 跳转至直播分类
 * Params:
 *      categoryId - 分类id(表现为直播大厅左侧的分类列表)
 *      subCategoryId - 子分类id(表现直播分类上方的子分类切换)
 */

function gotoLiveCenter(categoryId, subCategoryId) {
    _goto("yymobile://LiveCenter/" + categoryId + "/" + subCategoryId);
}

// 设置
/**
 * 跳转至设置页面
 */

function gotoSettingCenter() {
    _goto("yymobile://Settings/Home");
}

/**
 * 跳转至炫彩气泡设置页面
 */

function gotoColorfulBubble() {
    _goto("yymobile://Settings/ColorfulBubble");
}

/**
 * 跳转至插件管理设置页面
 */

function gotoPluginManagementSetting() {
    _goto("yymobile://Settings/PluginManagement");
}

// 社交
/**
 * 跳转至附近的人
 */

function gotoNeighborhood() {
    _goto("yymobile://Social/Neighborhood");
}

// 频道
/**
 * 根据频道号进入频道
 * Params:
 *      channelId - 频道号
 */

function joinChannel(channelId) {
    _goto("yymobile://Channel/" + channelId);
}

/**
 * 根据sid和ssid进入频道
 * Params:
 *      sid - 频道的sid
 *      ssid - 频道的ssid
 */

function joinLive(sid, ssid) {
    _goto("yymobile://Channel/Live/" + sid + "/" + ssid);
}

// 插件
/**
 * 跳转至插件管理页
 */

function gotoPluginManagement() {
    _goto("yymobile://Plugin/Management");
}

/**
 * 跳转至特定插件的设置页
 * Params:
 *      appId - 插件的appId
 */

function gotoPluginItem(appId) {
    _goto("yymobile://Plugin/Item/" + appId);
}

/**
 * 跳转至特定插件的内容页
 * Params:
 *      appId - 插件的appId
 */

function gotoPluginItemOutline(appId) {
    _goto("yymobile://Plugin/Item/" + appId + "/Outline");
}

function gotoWeb(url, showToolbar, enableJSAPI) {
    var encodedURL = encodeURIComponent(encodeURIComponent(url));
    var features = (1 << 2);
    if (showToolbar) {
        features = features | (1 << 1);
    }
    if (enableJSAPI) {
        features = features | (1 << 0);
    }
    _goto("yymobile://Web/Features/" + features + "/Url/" + encodedURL);
}

function goto1931(url) {
    var encodedURL = encodeURIComponent(encodeURIComponent(url));
    _goto("yymobile://1931/" + encodedURL);
}

function gotoMessageCenter() {
    _goto("yymobile://MessageCenter/Home");
}

function goto1931Girl(url) {
    var encodedURL = encodeURIComponent(encodeURIComponent(url));
    _goto("yymobile://1931/Girl/" + encodedURL);
}

/**
 * @param tabs  [
        {
            tabId: 100000101,
            tabName: "回复",
            actionUrl: "http://1931.yy.com/mobile/index.html",
            defaultOpen : true
        },
        {
            tabId: 100000102,
            tabName: "@我",
            actionUrl: "http://bbs.1931.yy.com",
            defaultOpen : false
        }
    ]
 */

function goto1931Tabs(tabs) {
    var encodedData = encodeURIComponent(encodeURIComponent(JSON.stringify(tabs)));
    _goto("yymobile://1931/Tabs/" + encodedData);
}

/**
 * @param photos {
    defaultPhoto : 0, // 下标从0开始
    photos : [{
        imgId : 12,
        thumbnail : "http://res.3g.yystatic.com/images/act/201405-unicom-2.jpg",
        imgUrl : "http://res.3g.yystatic.com/images/act/201405-unicom-2.jpg",
        imgName : "图片啊图片",
        hasLoved : true | false,
        girlName : "妹子",
        shareContent : "分享内容",
        loveAction : "http://1931.yy.com/dream/love.action?ticket=%ticket%&img=%imgId%",
        loveCount : 1234, // 大于0时, 显示出数字
        shareCount : 234,
        clickCount : 456,
        downloadCount : 567,
        commentCount : 678,
        createTime : "2004-05-15"
    }, {...}, {...}]
}
 */

function goto1931PhotoView(photos) {
    var encodedData = encodeURIComponent(encodeURIComponent(JSON.stringify(photos)));
    _goto("yymobile://1931/PhotoView/" + encodedData);
}

/**
 * 登录态判断
 * Params:
 *      successCallback - 当前为用户密码登录时的回调
 *      otherwiseCallback - 当前为未登录或匿名登录时的回调
 */

function checkLoginStatusWithCallback(successCallback, otherwiseCallback) {
    safeCallHandler("isLoggedInWithUserPassword", {}, function(response) {
        if (response) {
            successCallback();
        } else {
            otherwiseCallback();
        }
    });
}

function loginTest() {
    checkLoginStatusWithCallback(function() {
            joinChannel(2080)
        },
        function() {
            gotoLogin()
        });
}

/*
 查询网页登陆token
 */

function requestUserWebToken(callback) {
    safeCallHandler("requestWebToken", {}, callback);
}

/*
 关注用户
 */

function followUser(uid) {
    safeCallHandler("followUser", uid);
}

/*
 取消关注
 */

function unFollowUser(uid) {
    safeCallHandler("unFollowUser", uid);
}

/**
 *  获取app信息
 *  requires YYMobile API Level - 2
 *  @param callback 回调函数, 参数为appInfo对象
 *  appInfo对象包括:
 *      uid: 当前登录帐号的uid, 整数
 *      imid: 当前登录帐号的yy号, 整数
 *      phoneNumber: 当前手机的手机号, 字符串(iPhone无法获取, 返回"", 若调用过setPhoneNumber则返回相应的号码)
 *      carrier: 当前运营商的类型, 整数(0为未知, 1为中国移动, 2为中国联通, 3为中国电信, 0x0000FFFF为其他)
 *      carrierName: 当前运营商的名称(参考使用), 字符串
 *      system: 当前设备的操作系统, 字符串(如iOS, Android)
 *      systemVersion: 当前设备的操作系统版本, 整数(如7.0)
 *      deviceName: 当前设备的名称, 字符串, 如(iPhone5, 1)
 *      appVersion: yy的版本号
 */

function getAppInfo(callback) {
    safeCallHandler("getAppInfo", {}, function(response) {
        callback(response)
    });
}

/**
 *  设置手机号码
 *  requires YYMobile API Level - 2
 *  @param phoneNumber 字符串
 */

function setPhoneNumber(phoneNumber) {
    safeCallHandler("setPhoneNumber", phoneNumber);
}

/**
 *  弹出Alert对话框
 *  requires YYMobile API Level - 2
 *  @param title 标题
 *  @param message 消息
 *  @param buttons 要增加的按钮
 *  @param callback 回调函数, 参数为用户按钮的索引(0开始)
 *
 */

function showAlertMessage(title, message, buttons, callback) {
    safeCallHandler("showAlertMessage", {
        "title": title,
        "message": message,
        "buttons": buttons
    }, function(response) {
        callback(response)
    });
}

function showAlertMessageSimple(title, message) {
    showAlertMessage(title, message, new Array('我知道了'), function(result) {});
}

/**
 *  保存通用存储键值对
 *  requires YYMobile API Level - 2
 *  @param value - 值
 *  @param key - 键, 必须为字符串
 *  @param callback - 设置完成的回调, 参数为response对象
 *  response对象包括
 *      error - 保存过程中发生的错误
 */

function setCommonStorageValueForKey(value, key, callback) {
    safeCallHandler("setCommonStorageValueForKey", {
        "value": value,
        "key": key
    }, function(response) {
        callback(response);
    });
}

/**
 *  读取通用存储键值对
 *  required javescript API Level - 2
 *  @param key - 键
 *  @param callback - 设置完成的回调, 参数为response对象
 *  response对象包括
 *      error - 读取过程中发生的错误
 *      value - 取值结果
 */

function getCommonStorageValueForKey(key, callback) {
    safeCallHandler("getCommonStorageValueForKey",
        key, function(response) {
            callback(response);
        })
}

/**
 *  显示loading窗口
 *  required javescript API Level - 2
 *  @param label - 标签
 */

function showProgressWindow(label) {
    safeCallHandler("showProgressWindow", {
        "label": label
    });
}

/**
 *  隐藏loading窗口
 *  required javescript API Level - 2
 */

function hideProgressWindow() {
    safeCallHandler("hideProgressWindow");
}

function postNotification(notificationID, userInfo) {
    if (notificationID) {
        safeCallHandler("postNotification", {
            "notificationID": notificationID,
            "userInfo": userInfo
        });
    }
}

function deleteSharedCookie(cookieDomain, callback) {
    safeCallHandler("deleteSharedCookie", cookieDomain, function(response) {
        if (callback) {
            callback(response.count);
        }
    });
}

/*
 客户端事件侦听
 */

function onBridgeEvent(event) {
    switch (event.type) {
        case "LoginEvent":
            if (YYMobileOverridable.loginEvent) {
                YYMobileOverridable.loginEvent(event);
            }
            //consoleLog("on login uid="+event.uid+",success="+event.isSuccess)
            break;
        case "LogoutEvent":
            consoleLog("on logout")
            break;
        case "FollowEvent":
            consoleLog("on follow success=" + event.isSuccess + ",uid=" + event.uid)
            break;
        case "UnFollowEvent":
            consoleLog("on unfollow success=" + event.isSuccess + ",uid=" + event.uid)
            break;
        case "ApiUnSupportedEvent":
            consoleLog("client un support api:" + event.apiUri)
            break;
    }
}

initializeYYMobileAPI();

// Public APIs
YYMobile = {
    Overridable: YYMobileOverridable,
    NotificationIDs: YYMobileNotificationIDs,
    NotificationUserInfoKeys: YYMobileNotificationUserInfoKeys,
    // Level 1
    pop: pop,
    gotoLogin: gotoLogin,
    gotoRegister: gotoRegister,
    gotoPersonalCenter: gotoPersonalCenter,
    gotoVipSign: gotoVipSign,
    gotoPhotoAlbum: gotoPhotoAlbum,
    gotoPrivilege: gotoPrivilege,
    gotoCharacterEmoticonPrivilege: gotoCharacterEmoticonPrivilege,
    gotoColorfulBubblePrivilege: gotoColorfulBubblePrivilege,
    gotoLiveHome: gotoLiveHome,
    gotoLiveCenter: gotoLiveCenter,
    gotoSettingCenter: gotoSettingCenter,
    gotoColorfulBubble: gotoColorfulBubble,
    gotoPluginManagementSetting: gotoPluginManagementSetting,
    gotoNeighborhood: gotoNeighborhood,
    joinChannel: joinChannel,
    joinLive: joinLive,
    gotoPluginManagement: gotoPluginManagement,
    gotoPluginItem: gotoPluginItem,
    gotoPluginItemOutline: gotoPluginItemOutline,
    checkLoginStatusWithCallback: checkLoginStatusWithCallback,
    requestUserWebToken: requestUserWebToken,
    followUser: followUser,
    unFollowUser: unFollowUser,

    // Level 2
    getAPILevel: getAPILevel,
    getAppInfo: getAppInfo,
    setPhoneNumber: setPhoneNumber,
    showAlertMessage: showAlertMessage,
    showAlertMessageSimple: showAlertMessageSimple,
    setCommonStorageValueForKey: setCommonStorageValueForKey,
    getCommonStorageValueForKey: getCommonStorageValueForKey,
    showProgressWindow: showProgressWindow,
    hideProgressWindow: hideProgressWindow,
    postNotification: postNotification,
    deleteSharedCookie: deleteSharedCookie,
    gotoWeb: gotoWeb,
    goto1931: goto1931,
    gotoMessageCenter: gotoMessageCenter,
    
    // Level 3
    closeAllWindow : function closeAllWindow() {
    	safeCallHandler("closeAllWindow");
    },
    showBackBtn : function showBackBtn() {
    	safeCallHandler("showBackBtn");
    },
    hideBackBtn : function hideBackBtn() {
    	safeCallHandler("hideBackBtn");
    },
    gotoBrowser : function gotoBrowser(url) {
    	safeCallHandler("gotoBrowser", {
            "url": url
        });
    }
};

// 1931 API 中的可重写方法
Y1931Overridable = {
    /**
     *  用于处理导航按钮点击事件
     *  @param identifier - 被点击按钮的标识, see Y1931API.createBarButtonItem
     */
    onNavigationBarButtonItemTapped: function(identifier, selected) {},

    onGetNavigationBarInformation: function() {
        return {};
    }
};

Y1931BarButtonItemIcons = {
    "POST": 1000,
    "MESSAGE": 1001,
    "SHARE": 1002,
    "POSTOWNER": 1003,
    "CLOSE": 1004,
    "CLEARMESSAGE": 1005
};

Y1931Images = {
    "1931LOGO": 1931
};

Y1931API = {
    initialize1931API: function() {
        onJavascriptBridgeReady(function(bridge) {
            bridge.registerHandler('1931NavigationBarButtonItemTapped', function(data, responseCallback) {
                Y1931Overridable.onNavigationBarButtonItemTapped(data.identifier, data.selected);
            });
            bridge.registerHandler('get1931NavigationBarInformation', function(data, responseCallback) {
                responseCallback(Y1931Overridable.onGetNavigationBarInformation())
            });
        })

    },

    /**
     *  创建一个导航条按钮item
     *  @param identifier - 按钮标识, 用于onNavigationBarButtonItemTapped回调
     *  @param title - 按钮标题
     *  @param icon - 按钮图片(如有此项, 则不显示title)
     *  @param badge - 按钮的badge(string)
     */
    createBarButtonItem: function(identifier, title, icon, selectable, badge, selected) {
        var button = {};
        button.identifier = identifier;
        button.icon = icon;
        button.title = title;
        button.selectable = selectable;
        button.badge = badge;
        button.selected = selected;
        return button;
    },

    createNavigationBarInformation: function(title, titleImage, rightItems) {
        var info = {};
        info.title = title;
        info.titleImage = titleImage;
        info.rightItems = rightItems;
        return info;
    },

    /**
     *  设置导航条左侧按钮组(从左到右显示)
     *  @param items - Array of items
     */
    setNavigationBarLeftItems: function(items) {

    },

    /**
     *  设置导航条右侧按钮组(从左到右显示)
     *  @param items - Array of items
     */
    setNavigationBarRightItems: function(items) {
        safeCallHandler("setNavigationRightItems", items);
    },

    /**
     *  设置导航条标题
     *  @param title - a String
     */
    setNavigationTitle: function(title, titleImage) {
        safeCallHandler("setNavigationTitle", {
            "title": title,
            "titleImage": titleImage
        });
    },

    updateNavigationBarItemBadge: function(itemId, badge) {
        safeCallHandler("updateNavigationBarItemBadge", {
            "itemId": itemId,
            "badge": badge
        })
    },

    /**
     *  分享内容
     */
    share: function(content, imageUrl, title, shareUrl, musicUrl, videoUrl) {
        safeCallHandler("share", {
            "content": content,
            "imageUrl": imageUrl,
            "title": title,
            "shareUrl": shareUrl,
            "musicUrl": musicUrl,
            "videoUrl": videoUrl
        });
    }
};

Y1931API.initialize1931API();
