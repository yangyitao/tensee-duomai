/// <reference path="zepto.js" />
/// <reference path="api.js" /> 
/*
-- =============================================
-- Author:		<Author			LostAngels>
-- Create date: <Create Date	2015/12/05>
-- Description:	<Description	HonestyWinUI框架插件>
-- Version:     <Version        0.0.1>
-- Email:       <Email          184005955@qq.com>
-- TelPhone:    <TelPhone       15068468662>
-- QQ:          <QQ             184005955>
-- =============================================
 */

(function (window) {
    var honesty = {};
    var Setting = {
        IsApp: true,
        SysMode: "QAS",
        PRDSite: "http://192.168.31.105:80",
        QASSite: "http://59.46.10.117:8001",
        AjaxChannel: "/Common/AjaxChannel.ashx",
        FlowChannel: "/Common/FlowChannel.ashx",
        UploadChannel: "/Common/AppUpload.ashx",
        AttendChannel: "/Common/AttendChannel.ashx",
        WageChannel: "/Common/WageChannel.ashx",
        FormChannel: "/Common/FlowForm.ashx",
        WeChatChannel: "/Common/WeChatChannel.ashx",
        SysVersion: "0.0.37_01",
        IsLocal: true
    };
    honesty.GUID = function () {
        /// <summary>
        /// 生成GUID编码
        /// </summary>
        this.date = new Date();
        /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
        if (typeof this.NewGUID != 'function') {
            honesty.GUID.prototype.NewGUID = function () {
                /// <summary>
                /// 初始化GUID编码
                /// </summary>
                this.date = new Date();
                var guidStr = '';
                sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
                sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
                for (var i = 0; i < 9; i++) {
                    guidStr += Math.floor(Math.random() * 16).toString(16);
                }
                guidStr += sexadecimalDate;
                guidStr += sexadecimalTime;
                while (guidStr.length < 32) {
                    guidStr += Math.floor(Math.random() * 16).toString(16);
                }
                return this.formatGUID(guidStr);
            }
            honesty.GUID.prototype.getGUIDDate = function () {
                return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
            }
            honesty.GUID.prototype.getGUIDTime = function () {
                return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
            }
            honesty.GUID.prototype.addZero = function (num) {
                if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                    return '0' + Math.floor(num);
                } else {
                    return num.toString();
                }
            }
            honesty.GUID.prototype.hexadecimal = function (num, x, y) {
                if (y != undefined) {
                    return parseInt(num.toString(), y).toString(x);
                } else {
                    return parseInt(num.toString()).toString(x);
                }
            }
            honesty.GUID.prototype.formatGUID = function (guidStr) {
                var str1 = guidStr.slice(0, 8) + '-',
                str2 = guidStr.slice(8, 12) + '-',
                str3 = guidStr.slice(12, 16) + '-',
                str4 = guidStr.slice(16, 20) + '-',
                str5 = guidStr.slice(20);
                return str1 + str2 + str3 + str4 + str5;
            }
        }
    };
    honesty.GetPageParam = function (name) {
        /// <summary>
        /// 通过参数名称获取页面传值
        /// </summary>
        /// <param name="name" type="String">
        ///  1: name - 参数名称(当为空时返回JSON对象即所有对象值)
        /// </param>
        var _result = null;
        if (Setting.IsApp) {
            if (api.pageParam != undefined && api.pageParam != null) {
                if (name != "") {
                    _result = api.pageParam[name];
                }
                else {
                    _result = api.pageParam;
                }
            }
            else {
                honesty.ShowMsg({
                    title: "警告",
                    msg: "未获取到对象“" + name + "”的值，接收的对象不存在",
                    callback: function () {
                        _result = null;
                    }
                });
            }
            return _result == undefined ? null : _result;
        }
        else {

        }
    };
    honesty.Back = function () {
        /// <summary>
        /// 后退一步
        /// </summary>
        if (Setting.IsApp) {
            api.closeWin();
        }
        else {

        }
    };
    honesty.Next = function () {
        /// <summary>
        /// 前进一步
        /// </summary>
        if (Setting.IsApp) {

        }
        else {

        }
    };
    honesty.ShowMsg = function (options) {
        /// <summary>
        /// 弹出消息框
        /// </summary> 
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合{title:标题内容,msg:消息内容,buttons:按钮数组标题,callback:function(ret,err){}回调函数ret.buttonIndex 从1开始}
        /// </param>
        var defaults = {
            title: "",
            msg: "提示消息",
            buttons: ["确认"],
            callback: function (ret, err) { }
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            api.alert({
                title: _opts.title,
                msg: _opts.msg,
                buttons: _opts.buttons
            }, _opts.callback);
        }
        else {

        }
    };
    honesty.ConfirmWin = function (options) {
        /// <summary>/// 选择消息框/// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合{title:标题内容,msg:消息内容,buttons:按钮数组标题,callback:function(ret,err){}回调函数ret.buttonIndex 从1开始}
        /// </param>
        var defaults = {
            title: "提示消息",
            msg: "提示消息",
            buttons: ["确认", "取消"],
            callback: function (ret, err) { }
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            api.confirm({
                title: _opts.title,
                msg: _opts.msg,
                buttons: _opts.buttons
            }, _opts.callback);
        }
        else {

        }
    };
    honesty.ConfirmToast = function (options) {
        /// <summary>
        /// 底部选择操作框
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合{title:标题内容,cancel:取消按钮标题,active:警示按钮标题,buttons:按钮数组标题,callback:function(ret,err){}回调函数ret.buttonIndex 从1开始 active为1,cancel为按钮数组长度+2}
        /// </param>
        var defaults = {
            title: "请选择进行操作",
            cancel: "取消",
            active: "确认",
            buttons: [],
            callback: function (ret, err) { }
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            api.actionSheet({
                title: _opts.title,
                cancelTitle: _opts.cancel,
                destructiveTitle: _opts.active,
                buttons: _opts.buttons,
            }, _opts.callback);
        }
        else {

        }
    };
    honesty.ShowToast = function (options) {
        /// <summary>
        /// 自动隐藏的提示框
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合{msg:消息内容,duration:停留时间,location:位置top/middle/bottom
        /// </param>
        var defaults = {
            msg: "数据异常，请稍后再试!",
            duration: 2000,
            location: "middle"
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            api.toast({
                msg: _opts.msg,
                duration: _opts.duration,
                location: _opts.location
            });
        }
        else {

        }
    };
    honesty.OpenWin = function (options) {
        /// <summary>
        /// 打开窗口
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            name: "",//窗口名称
            url: "",//URL地址
            title: "未命名",//窗口标题
            pageParam: {},//页面参数
            bounces: false,//页面是否可以进行拖动
            IsRoot: false,
            LevelNum: 1,//页面层级
            PageLeft: {
                Show: true,
                ClickName: "CloseWin()"
            },//标题导航栏左边按钮
            PageTitle: {
                Show: true
            },//导航栏标题信息
            PageRight: {
                Show: false
            },//导航栏右边按钮
            IsShow: true,//是否要显示导航栏
            slidBackEnabled: true
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            try {
                _opts.name = _opts.name == "" ? honesty.GUID().NewGUID() : _opts.name;
                _opts.pageParam.name = _opts.name;
                api.openWin({
                    name: _opts.name,
                    url: "widget://html/TitlePage.html",
                    title: _opts.title,
                    delay: 100,
                    pageParam: {
                        pageParam: _opts.pageParam,
                        PageLeft: _opts.PageLeft,
                        PageTitle: _opts.PageTitle,
                        PageRight: _opts.PageRight,
                        IsShow: _opts.IsShow,
                        PageURL: _opts.url,
                        NavTitle: _opts.title,
                        Bounces: _opts.bounces,
                        name: _opts.name,
                    },
                    bounces: _opts.bounces,
                    slidBackEnabled: _opts.slidBackEnabled,
                });
            }
            catch (e) {
                honesty.ShowMsg({ title: "警告", msg: e });
            }
        }
        else {

        }
    };
    honesty.CloseWin = function (options) {
        /// <summary>
        /// 关闭当前窗口
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            name: null,//窗口名称 
            animation: {
                type: 'push',
                subType: 'from_left',
                duration: 400
            }
        };
        _opts = $.extend(defaults, options);
        if (Setting.IsApp) {
            //api.closeWin(_opts);
            api.closeWin();
        }
        else {

        }
    };
    honesty.AjaxChannel = function (options) {
        var _opts = {};
        var defaults = {
            PostData: {
                Mode: "MSSQL",
                //SQL函数参数对象End
                Params: {},//存储过程参数集
                ProcName: "",//存储过程名称
                PageSize: 15,//分页数量
                NowPage: 1,//当前页数
                ReadFields: new Array(),//读取文件存储的长文本内容列
                WriteFields: new Array(),//将长文本内容以写文本内容方式存储的列
                TableColumn: new Array(),//进行输出的表格列JSON数组{Name:列,Type:数据类型,Format:格式(日期、小数、前缀、后缀)}
                DataType: "DataTable",//数据调用方式
                SQLText: "select 1+1",//执行SQL的语句
                ExecType: "PROC", //执行方式
                //SQL函数参数对象End

                //ESB函数参数对象Begin
                //PostData内容用Params这个
                URL: "",
                Handle: "POST",
                //ESB函数参数对象End

                //RFC函数参数对象Begin
                //输入参数
                Import: {
                    //输入参数对象JSON，可为JSON方式表现为结构体，数据类型格式由后台进行匹配转换
                    /*参数模板
                    I_PERNR: {
                        PERNR: "50000004"
                    },
                    I_BEGDA: "2015-10-10 10:48:55",
                    I_UZEIT: "2015-10-16 15:48:55",
                    */
                },
                Export: [
                    /*输出参数，可将结构体输出，输出对象为JSON，读取格式：Data.Export.O_RTCDE
                    参数模板
                    "O_RTCDE",
                    "O_RTMSG"
                    */
                ],
                //RFC函数名称
                FunctionName: "ZTEST_FM_02",
                //Table参数
                ITable: {
                    /*输入表参数，格式为表参数名称：行数组
                    参数模板
                    PT_TAB1:
                        [
                            {
                                "PERNR": "50000005"
                            },
                            {
                                "PERNR": "50000006"
                            }
                        ]
                    */
                },
                //需要返回的表
                ETable: [
                    /*输入表参数，格式为表参数名称：行数组，输出对象为JSON
                    读取格式：Data.ETable.PT_TAB1
                    $.each(_result.Data.ETable.PT_TAB1, function (i, item) {
                        alert(RParseStr(item.I_STR));
                    });
                    参数模板
                    "PT_TAB1",
                    "PT_TAB2",
                    "PT_TAB3"
                    */
                ]
                //RFC函数参数对象End
            },
            Cache: true,//是否对数据进行缓存
            CacheID: "",//缓存键值
            PageCache: true,//分页在缓存中进行
            IsPage: false,//是否进行分页操作 
            PageSum: 0,//分页总数
            CallBack: function () { },//执行回调函数 
            Loading: {
                Show: true,//是否加载Loading层
                Title: "数据加载中..."//Loading层显示描述
            },
            ShowError: true,//是否直接由AJAX输出错误消息
            async: true
        }
        _opts = $.extend(defaults, options);
        if (_opts.async) {
            var defer = $.Deferred();
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.AjaxChannel,
                data: JSON.stringify(_opts.PostData),
                timeout: 60000,
                async: _opts.async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.showProgress({
                                animationType: 'fade',
                                title: "请稍等",
                                text: _opts.Loading.Title,
                            });
                        }
                        else {

                        }
                    }
                },
                success: function (rData) {
                    defer.resolve(rData);
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    defer.resolve({ Data: "", Code: "0" });
                    honesty.ShowToast({ msg: _result });
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                }
            });
            return defer.promise();
        }
        else {
            var result;
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.AjaxChannel,
                data: JSON.stringify(_opts.PostData),
                timeout: 60000,
                async: _opts.async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.showProgress({
                                animationType: 'fade',
                                title: "请稍等",
                                text: _opts.Loading.Title,
                            });
                        }
                        else {

                        }
                    }
                },
                success: function (rData) {
                    result = rData;
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    honesty.ShowToast({ msg: _result });
                    result = { Data: "", Code: "0" };
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                }
            });
            return result;
        }
    }
    honesty.DisabledBack = function (disabled) {
        /// <summary>
        /// 禁用后退键
        /// </summary>
        /// <param name="disabled" type="Boolen">
        ///  1: disabled - true:禁用  false:启用
        /// </param>
        if (disabled) {
            api.addEventListener({
                name: "keyback"
            }, function (ret, err) {
                return false;
            });
        }
        else {
            api.removeEventListener({
                name: 'keyback'
            });
        }
    };
    honesty.DoubleBack = function () {
        /// <summary>
        /// Android点击两次返回退出程序
        /// </summary>
        var firstClick = new Date().getTime();
        api.addEventListener({
            name: "keyback"
        }, function (ret, err) {
            //如果当前时间减去标志时间大于2秒，说明是第一次点击返回键，反之为2秒内点了2次，则退出。
            if ((new Date().getTime() - firstClick) > 2000) {
                firstClick = new Date().getTime();
                honesty.ShowToast({ msg: "再按一次退出程序", location: "bottom" });
            } else {
                api.closeWidget();
            }
        });
    }
    honesty.AjaxError = function (StatusCode) {
        /// <summary>
        /// 返回Ajax请求的错误信息，格式为{"Data":"消息内容"}
        /// </summary>
        /// <param name="StatusCode" type="String">
        ///  1: StatusCode - Ajax请求错误代码
        /// </param>
        /// <returns type="JSON"/>
        var _MsgText = "您的网络不给力，请重新尝试!";
        if (StatusCode != "12029") {
            var _ErrorCode = StatusCode.substring(0, 1);
            switch (_ErrorCode) {
                case "0": _MsgText = "Ajax请求初始化失败!"; break;
                case "1": _MsgText = "服务器已经响应请求，请等待!"; break;
                case "2":
                    switch (StatusCode) {
                        case "201": _MsgText = "提示知道新文件的URL"; break;
                        case "202": _MsgText = "接受和处理、但处理未完成"; break;
                        case "203": _MsgText = "返回信息不确定或不完整"; break;
                        case "204": _MsgText = "请求收到，但返回信息为空"; break;
                        case "205": _MsgText = "服务器完成了请求，用户代理必须复位当前已经浏览过的文件"; break;
                        case "206": _MsgText = "服务器已经完成了部分用户的GET请求"; break;
                    }
                    break;
                case "3": _MsgText = "无法与服务器建立连接，请通知管理员!"; break;
                case "4": _MsgText = "提交的数据异常导致服务器无法正常响应，请检查数据!"; break;
                case "5": _MsgText = "当前服务器正繁忙，请稍等片刻之后重新提交，谢谢!"; break;
            }
        }
        else {
            _MsgText = "您的网络不通，请检查网络之后在重新提交!";
        }
        return "{\"Data\":\"" + _MsgText + "\"}";
    };
    honesty.DateTimeSelect = function (options) {
        /// <summary>
        /// 时间日期选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,    //使用选择页面的层级
            Type: "DateTime",
            ControlID: "",
            ControlValue: "",
            onchange: function (ret) { }
        }
        var _opts = $.extend(defaults, options);
        var url = "SelectPage/DateTimeSelect.html";
        for (var i = 0; i < _opts.LevelNum; i++) {
            url = "../" + url;
        }

        api.openFrame({
            name: 'SelectPage_DateTimeSelect',
            url: url,
            bounces: false,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam: {
                ControlValue: (_opts.Type == "Time" ? (_opts.ControlValue == "" ? "" : ("1900-01-01 " + _opts.ControlValue)) : _opts.ControlValue),
                Type: _opts.Type
            }
        });
        api.bringFrameToFront({
            from: 'SelectPage_DateTimeSelect'
        });


        api.addEventListener({
            name: 'SelectPage_DateTimeSelect'
        }, function (ret) {
            if (ret && ret.value) {
                $("#" + _opts.ControlID).val(ret.value.DateTime);
            }
            if (typeof (_opts.onchange) == "function") {
                var isChange = false;
                if (_opts.ControlValue != ret.value.DateTime) {
                    isChange = true;
                }
                _opts.onchange.call(this, isChange);
            }
        });

    }
    honesty.InitUserInfo = function (account, password, empid, pushkey) {
        /// <summary>
        /// 账号登陆验证操作 
        /// </summary> 
        /// <param name="account" type="String">
        ///  1: account  员工账号
        /// </param>
        /// <param name="password" type="String">
        ///  2: password  密码
        /// </param> 
        //api.showProgress({
        //    animationType: 'fade',
        //    title: "请稍等",
        //    text: "登录中...",
        //}); 
        var _options = {
            PostData: {
                Params: { "result": "WAPLogin", "Account": account, "Password": password, "SysVersion": Setting.SysVersion },
                ProcName: "proc_HC_GetUserInfo",
                DataType: "Text",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            //async: false,
            Loading: {
                Title: "登录中...",
                Show: true,
            },
        };
        $.when(honesty.AjaxChannel(_options)).done(function (LoginCheck) {
            if (LoginCheck.Code == "1") {
                if (LoginCheck.Data != "True") {
                    honesty.ShowMsg({ msg: LoginCheck.Data });
                }
                else {
                    _options = {
                        PostData: {
                            Params: { "result": "InitUserInfo", "Account": account, "Password": password },
                            ProcName: "proc_HC_GetUserInfo",
                            DataType: "DataTable",
                            ExecType: "PROC",
                            Mode: "MSSQL"
                        },
                        Loading: {
                            Title: "登录中...",
                            Show: true,
                        },
                        async: false,
                    };
                    $.when($honesty.AjaxChannel(_options)).done(function (_result) {
                        if (_result.Code == "1") {
                            if (_result.Data.length > 0) {
                                var ApplyState = "0", Status = "0";
                                $.each(_result.Data, function (i, item) {
//                                  SetSession("ImgEmpPicture", "head_defalt.jpg");
                                    SetSession("UserID", item.ID);
                                    SetSession("UserCode", item.Account);
                                    SetSession("UserStatus", item.Status);
                                    SetSession("UserName", item.UserName);
                                    SetSession("TelPhone", item.TelPhone);
                                    SetSession("DeptName", item.DeptName);
                                    SetSession("OrganizeID", item.OrganizeID);
                                    SetSession("EmpLevel", item.EmpLevel);
                                    SetSession("LevelDesc", item.LevelDesc);
                                    SetSession("Position", item.Position);
                                    SetSession("CompanyName", item.CompanyName);
                                    SetSession("ManageCompany", item.ManageCompany);
                                    SetSession("SapCode", item.SapCode);
                                    SetSession("ShopCode", item.ShopCode);
                                    SetSession("ShopName", item.DeptName);
                                    SetSession("AreaName", item.AreaName);
                                    SetSession("Province", item.Province);
                                    SetSession("City", item.City);
                                    SetSession("IsTry", item.IsTry);
                                    SetSession("CreateDate", item.CreateDate);
                                    SetSession("PositionAge", item.PositionAge);
                                    SetSession("ContractBegin", item.ContractBegin);
                                    SetSession("ContractEnd", item.ContractEnd);
                                    SetSession("IsLeader", item.IsLeader);
                                    SetSession("ShopList", item.ShopList);
                                    SetSession("ShopAddress", item.ShopAddress);
                                    SetSession("LastShiftDate", item.LastShiftDate);
                                    SetSession("CardSN", item.CardSN);
                                    SetSession("Site", item.Site);
                                    SetSession("ApplyState", item.ApplyState);
                                    SetSession("RoleList", item.RoleList);
                                    SetSession("Sex", item.Sex);
                                    SetSession("RoleList", item.RoleList);
                                    SetSession("DateDiff", ((new Date(item.NowDate) - new Date()) / 1000));
                                    SetSession("IsForm", item.IsForm);
                                    SetSession("IsInstead", item.IsInstead);
                                    SetSession("IsComPos", item.IsComPos);
                                    ApplyState = item.ApplyState;
                                    Status = item.Status;
                                    empid = item.ID;

                                });
                                if (ApplyState == "1") {
                                    honesty.ShowMsg({ msg: "账号处于申请审批状态中，不可登录!" })
                                    return false;
                                }
                                else if (ApplyState == "0") {
                                    api.openWin({
                                        bounces: false,
                                        name: "EntryTitle",
                                        url: "../HRFlow/EmpEntry/EntryTitle.html",
                                        slidBackEnabled: false,
                                        pageParam: { instanceid: empid, PushKey: pushkey }
                                    });
                                    return false;
                                }
                                else if (Status != "0") {
                                    honesty.ShowMsg({ msg: "该账号已被冻结" });
                                    return false;
                                }
                                api.setPrefs({
                                    key: 'LoginCode',
                                    value: GetSession("UserCode")
                                });
                                api.openWin({
                                    name: "Home",
                                    url: "../Home/Index.html",
                                    title: "CabbeenSOM",
                                    delay: 300,
                                    slidBackEnabled: false,
                                    animation: {
                                        type: 'ripple',
                                        duration: 400
                                    },
                                    bounces: false
                                });
                            }
                            else {
                                honesty.ShowMsg({ msg: "账号或密码错误!" });
                            }
                        }
                    });
                }
            }
        });

    };
    honesty.GetUserInfo = function (options) {
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var _opts = {};
        var defaults = {
            account: "",//账号
            userid: "",//编号 
            callback: function (ret) { }
        };
        _opts = $.extend(defaults, options);
        var User = {};
        var _options = {
            PostData: {
                Params: { "result": "LoadUserInfo", "Account": _opts.account, "UserID": _opts.userid },
                ProcName: "proc_HC_GetUserInfo",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            Loading: {
                Title: "获取用户信息中...",
                Show: true,
            },
        };

        $.when(honesty.AjaxChannel(_options)).done(function (_result) {
            if (_result.Code == "1") {
                if (_result.Data.length > 0) {
                    $.each(_result.Data, function (i, item) {
                        User = {
                            UserID: item.ID,
                            UserCode: item.Account,
                            UserStatus: item.Status,
                            UserName: item.UserName,
                            TelPhone: item.TelPhone,
                            DeptName: item.DeptName,
                            OrganizeID: item.OrganizeID,
                            EmpLevel: item.EmpLevel,
                            LevelDesc: item.LevelDesc,
                            Position: item.Position,
                            CompanyName: item.CompanyName,
                            ManageCompany: item.ManageCompany,
                            SapCode: item.SapCode,
                            ShopCode: item.ShopCode,
                            ShopName: item.DeptName,
                            AreaName: item.AreaName,
                            Province: item.Province,
                            City: item.City,
                            IsTry: item.IsTry,
                            CreateDate: item.CreateDate,
                            PositionAge: item.PositionAge,
                            ContractBegin: item.ContractBegin,
                            ContractEnd: item.ContractEnd,
                            IsLeader: item.IsLeader,
                            ShopCodeList: item.ShopCodes.split(","),
                            SapCodeList: item.SapCodes.split(","),
                            ShopList: item.ShopList.split(","),
                            ShopAddress: item.ShopAddress,
                            LastShiftDate: item.LastShiftDate,
                            CardSN: item.CardSN,
                            ApplyState: item.ApplyState,
                            Sex: item.Sex,
                            IsInstead: item.IsInstead,
                            IsComPos: item.IsComPos,
                        };
                    });
                    _opts.callback.call(this, { Data: User, Code: "1" });
                }
                else {
                    _opts.callback.call(this, { Data: {}, Code: "0" })
                }
            }
            else {
                _opts.callback.call(this, { Data: {}, Code: "0" })
            }
        });
    }
    honesty.GetSysVersion = function () {
        /// <summary>
        /// 返回系统版本号
        /// </summary>
        return Setting.SysVersion;
    };
    honesty.NowDate = function (frt) {
        /// <summary>
        /// 返回系统时间
        /// </summary>
        var _Date = new Date();
        _Date.setSeconds(_Date.getSeconds() + Number(GetSession("DateDiff")));
        if (frt) {
            return _Date.Format(frt);
        }
        else {
            return _Date;
        }
    }
    honesty.RangeTop = function (height) {
        /// <summary>
        /// 返回距离顶部高度根据高度值判断是否需要+25个像素（状态栏高度）
        /// </summary>
        var sysType = api.systemType;
        var ver = api.systemVersion;
        ver = parseFloat(ver);
        if (sysType == "ios") {
            height = height + 20;
        }
        else if (sysType == "android" && ver >= 4.4) {
            height = height + 25;
        };
        return height;
    }
    honesty.ShopSelect = function (options) {
        /// <summary>
        /// 店仓选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,    //到TitlePage层级
            JumpTitle: "",  //跳转页面名字
            JumpUrl: "",    //跳转页面Url
            JumpName: "",   //跳转页面名字

        }
        var _opts = $.extend(defaults, options);
        if (GetSession("ShopCodeNum")) {
            CheckShopSelect(_opts);
        }
        else {

            var _options = {
                PostData: {
                    Params: { "Result": "ShopCodeNum", "UserID": GetSession("UserID") },
                    ProcName: "proc_Authortity",
                    DataType: "Text",
                    ExecType: "PROC",
                    Mode: "MSSQL"
                }
            };
            $.when($honesty.AjaxChannel(_options)).done(function (_result) {
                if (_result.Code == "1") {
                    SetSession("ShopCodeNum", _result.Data);
                    CheckShopSelect(_opts);
                }
            });
        }
    }
    honesty.OrganizeSelect = function (options) {
        /// <summary>
        /// 店铺选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,    //到TitlePage层级
            JumpTitle: "",  //跳转页面名字
            JumpUrl: "",    //跳转页面Url
            JumpName: "",   //跳转页面名字

        }
        var _opts = $.extend(defaults, options);
        if (GetSession("OrganizeNum")) {
            CheckOrganizeSelect(_opts);
        }
        else {
            var _options = {
                PostData: {
                    Params: { "Result": "OrgainzeNum", "UserID": GetSession("UserID") },
                    ProcName: "proc_Authortity",
                    DataType: "Text",
                    ExecType: "PROC",
                    Mode: "MSSQL"
                }
            };
            $.when($honesty.AjaxChannel(_options)).done(function (_result) {
                if (_result.Code == "1") {
                    SetSession("OrganizeNum", _result.Data);
                    CheckOrganizeSelect(_opts);
                }
            });
        }
    }
    honesty.ShopEmpSelect = function (options) {
        /// <summary>
        /// 店铺人员选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,                 //到TitlePage层级
            ChooseType: "radio",
            ControlID: "",
            callback: function (ret) { },
        }
        var _opts = $.extend(defaults, options);
        $honesty.OpenWin({
            name: "SelectPage_ShopEmpSelect",
            url: "SelectPage/ShopEmpSelect.html",
            LevelNum: _opts.LevelNum,
            title: "店铺人员选择",
            pageParam: {
                ChooseType: _opts.ChooseType
            }
        });

        api.addEventListener({
            name: 'SelectPage_ShopEmpSelect'
        }, function (ret) {
            if (ret && ret.value) {
                if (_opts.ControlID != "") {
                    $("#" + _opts.ControlID).val(ret.value.UserName);
                    $("#" + _opts.ControlID).data("userID", ret.value.UserID);
                }
                if (typeof (_opts.callback) == "function") {
                    _opts.callback.call(this, ret.value);
                }
            }
        });

    }
    honesty.RegionalSelect = function (options) {
        /// <summary>
        /// 区域选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,    //到TitlePage层级
            JumpTitle: "",  //跳转页面名字
            JumpUrl: "",    //跳转页面Url
            JumpName: "",   //跳转页面名字

        }
        var _opts = $.extend(defaults, options);
        if (GetSession("RegionalNum")) {
            CheckRegionalSelect(_opts);
        }
        else {
            var _options = {
                PostData: {
                    Params: { "Result": "SelectLeaderCount", "UserID": GetSession("UserID") },
                    ProcName: "proc_SOM_ISR_RegionalSaleTitle",
                    DataType: "Text",
                    ExecType: "PROC",
                    Mode: "MSSQL"
                }
            };
            $.when($honesty.AjaxChannel(_options)).done(function (_result) {
                if (_result.Code == "1") {
                    SetSession("RegionalNum", _result.Data);
                    CheckRegionalSelect(_opts);
                }
            });
        }


    }
    honesty.RetailSelect = function (options) {
        /// <summary>
        /// 零售部门选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var defaults = {
            LevelNum: 1,    //到TitlePage层级
            JumpTitle: "",  //跳转页面名字
            JumpUrl: "",    //跳转页面Url
            JumpName: "",   //跳转页面名字

        }
        var _opts = $.extend(defaults, options);
        if (GetSession("RetailNum")) {
            CheckRetailSelect(_opts);
        }
        else {
            var _options = {
                PostData: {
                    Params: { "Result": "GetCount", "UserID": GetSession("UserID") },
                    ProcName: "proc_SOM_ISR_RetailSale",
                    DataType: "Text",
                    ExecType: "PROC",
                    Mode: "MSSQL"
                }
            };
            $.when($honesty.AjaxChannel(_options)).done(function (_result) {
                if (_result.Code == "1") {
                    SetSession("RetailNum", _result.Data);
                    CheckRetailSelect(_opts);
                }
            });
        }
    }
    honesty.AjaxFlow = function (options) {
        var _opts = {};
        var defaults = {
            CallBack: function () { },//执行回调函数 
            Loading: {
                Show: true,//是否加载Loading层
                Title: "流程数据加载中..."//Loading层显示描述
            },
            ShowError: true,//是否直接由AJAX输出错误消息
            Async: true
        }
        _opts = $.extend(defaults, options);
        if (_opts.Async) {
            var defer = $.Deferred();
            var result;
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.FlowChannel,
                data: JSON.stringify(_opts),
                timeout: 60000,
                async: _opts.Async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.showProgress({
                                animationType: 'fade',
                                title: "请稍等",
                                text: _opts.Loading.Title,
                            });
                        }
                        else {

                        }
                    }
                },
                success: function (rData) {
                    defer.resolve(rData);
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    honesty.ShowToast({ msg: _result });
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                }
            });
            return defer.promise();
        }
        else {
            var result;
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.FlowChannel,
                data: JSON.stringify(_opts),
                timeout: 60000,
                async: _opts.Async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (rData) {
                    result = rData;
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    honesty.ShowToast({ msg: _result });
                }
            });
            return result;
        }
    }
    honesty.InitSlaves = function (options) {/// <summary>
        /// 加载附件(参数为JSON)
        /// con_id:附件控件编号
        /// files:附件的值
        /// </summary> 
        /// <param name="options" type="JSON">
        ///  1: options - {"con_id":"","files":""}
        /// </param>
        var _opts = {};
        var defaults = {
            con_id: "",//附件控件编号
            files: "",//附件里的值
            dataname: "EmpFile",
            move: false
        };
        _opts = $.extend(defaults, options);
        var _width = (api.winWidth || $(window).width()) - 80;
        var isViewOpen = false; // 下载视图是否打开. 
        window.dmg = api.require('downloadManager');
        if (_opts.con_id != "") {
            if ($("#" + _opts.con_id).length > 0 && $.trim(_opts.files) != "") {
                $("#" + _opts.con_id).html("");
                $.each(_opts.files.split("|"), function (n, value) {
                    if (value != "") {
                        var FileID = new $honesty.GUID().NewGUID();
                        $("#" + _opts.con_id).append("<tr dataname='" + _opts.dataname + "' id='" + FileID + "' value='" + value + "'><td tapmode onclick=\"ShowSlaves(\'" + (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + value + "\',\'" + GetFileName(value) + "\')\" style='color:#5b9bd1;padding-left:5px;display:block !important;white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;text-align:left !important;width:" + _width + "px;height:40px;line-height:40px;'><span class='aui-iconfont aui-icon-down'>" + GetFileName(value) + "</td>" + (_opts.move == true ? "<td tapmode onclick=\"FileDelete(\'" + FileID + "\')\" style='width:40px;text-align:center'><div class='aui-iconfont aui-icon-delete'></div></td></tr>" : "</tr>"));
                    }
                });
                api.parseTapmode();
            }
        }

    }
    honesty.UploadField = function (options) {
        /// <summary>
        /// 文件上传
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param>
        var _opts = {};
        var defaults = {
            filePath: "",
            callBack: function () { }
        };
        _opts = $.extend(defaults, options);

        var _json = {
            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.UploadChannel,
            method: "post",
            cache: false,
            timeout: 40,
            dataType: 'json',
            data: {
                files: {
                    "img0": _opts.filePath
                }
            }
        };
        api.showProgress({
            animationType: 'fade',
            title: "上传中...",
            text: "请稍后...",
        });
        api.ajax(_json,
            function (ret, err) {
                if (ret) {
                    _opts.callBack && _opts.callBack(ret);
                }
                else {
                    $honesty.ShowToast({ msg: err.msg });
                }
                api.hideProgress();
            }
        );
    }
    honesty.UploadPicture = function (options) {
        var _opts = {};
        var defaults = {
            callBack: function (err) { }
        };
        _opts = $.extend(defaults, options);

        api.actionSheet({
            title: "请选择上传方式",
            buttons: ["拍照", "相册"],
        }, function (ret, err) {
            if (3 == ret.buttonIndex) {
                return;
            }
            var sourceType = "album";
            if (1 == ret.buttonIndex) {
                sourceType = "camera";
            }
            api.getPicture({
                sourceType: sourceType,
                encodingType: "jpg",
                mediaValue: "pic",
                quality: 50,

            }, function (ret, err) {
                if (ret) {
                    if (ret.data != "") {
                        honesty.UploadField({ filePath: ret.data, callBack: _opts.callBack });
                    }
                }
            });
        });
    }
    honesty.AjaxAttend = function (options) {
        var _opts = {};
        var defaults = {
            PostData: {
            },
            MathType: "",
            Loading: {
                Show: true,
                Title: "数据加载中..."
            }
        }
        _opts = $.extend(defaults, options);
        var defer = $.Deferred();
        $.ajax({
            type: "POST",
            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.AttendChannel + "?MathType=" + _opts.MathType,
            data: JSON.stringify(_opts.PostData),
            timeout: 10000,
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                if (_opts.Loading.Show) {
                    if (Setting.IsApp) {
                        api.showProgress({
                            animationType: 'fade',
                            title: "请稍等",
                            text: _opts.Loading.Title,
                        });
                    }
                    else {

                    }
                }
            },
            success: function (rData) {
                defer.resolve(rData);
                if (_opts.Loading.Show) {
                    if (Setting.IsApp) {
                        api.hideProgress();
                    }
                    else {

                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                var _result = honesty.AjaxError(textStatus);
                defer.resolve({ Data: "", Code: "0" });
                honesty.ShowToast({ msg: _result });
                if (_opts.Loading.Show) {
                    if (Setting.IsApp) {
                        api.hideProgress();
                    }
                    else {

                    }
                }
            }
        });
        return defer.promise();
    }
    honesty.UploadSlaves = function (DataRole) {
        var _width = (api.winWidth || $(window).width()) - 80;
        api.actionSheet({
            title: "请选择上传方式",
            buttons: ["拍照", "相册", "文件"],
        }, function (ret, err) {
            if (4 == ret.buttonIndex) {
                return;
            }
            else if (ret.buttonIndex == 1 || ret.buttonIndex == 2) {
                var sourceType = "album";
                if (1 == ret.buttonIndex) {
                    sourceType = "camera";
                }
                api.getPicture({
                    sourceType: sourceType,
                    encodingType: "jpg",
                    mediaValue: "pic"
                }, function (ret, err) {
                    if (ret) {
                        if (ret.data != "") {
                            honesty.UploadField({
                                filePath: ret.data, callBack: function (ret) {
                                    if (ret.FilePath != "") {
                                        var FileID = new $honesty.GUID().NewGUID();
                                        $("#" + DataRole).append("<tr dataname='" + DataRole + "' id='" + FileID + "' value='" + ret.FilePath + "'><td tapmode onclick=\"ShowSlaves(\'" + (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + ret.FilePath + "\',\'" + GetFileName(ret.FilePath) + "\')\" style='color:#5b9bd1;padding-left:5px;display:block !important;white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;text-align:left !important;width:" + _width + "px;height:40px;line-height:40px;'><span class='aui-iconfont aui-icon-down'>" + GetFileName(ret.FilePath) + "</td><td tapmode onclick=\"FileDelete(\'" + FileID + "\')\" style='width:40px;text-align:center'><div class='aui-iconfont aui-icon-delete'></div></td>");
                                    }
                                }
                            });
                        }
                    }
                });
            }
            else if (ret.buttonIndex == 3) {
                try {
                    var fileBrowserModule = api.require("fileBrowser");
                    fileBrowserModule.open(function (ret, err) {
                        fileBrowserModule.close();
                        if (ret.data != "") {
                            honesty.UploadField({
                                filePath: ret.data, callBack: function (ret) {
                                    if (ret.FilePath != "") {
                                        var FileID = new $honesty.GUID().NewGUID();
                                        $("#" + DataRole).append("<tr dataname='" + DataRole + "' id='" + FileID + "' value='" + ret.FilePath + "'><td tapmode onclick=\"ShowSlaves(\'" + (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + ret.FilePath + "\',\'" + GetFileName(ret.FilePath) + "\')\" style='color:#5b9bd1;padding-left:5px;display:block !important;white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;text-align:left !important;width:" + _width + "px;height:40px;line-height:40px;'><span class='aui-iconfont aui-icon-down'>" + GetFileName(ret.FilePath) + "</td><td tapmode onclick=\"FileDelete(\'" + FileID + "\')\" style='width:40px;text-align:center'><div class='aui-iconfont aui-icon-delete'></div></td>");
                                    }
                                }
                            });
                        }
                    });
                }
                catch (e) {
                    $honesty.ShowToast({ msg: e });
                }
            }
        });
    }
    honesty.MessageFile = function (options) {
        var _opts = {};
        var defaults = {
            uploadtype: "camera",
            UserID: new honesty.GUID().NewGUID()
        }
        _opts = $.extend(defaults, options);
        switch (_opts.uploadtype) {
            case "camera":
            case "album":
                api.getPicture({
                    sourceType: _opts.uploadtype,
                    encodingType: "jpg",
                    mediaValue: "pic"
                }, function (ret, err) {
                    if (ret) {
                        if (ret.data != "") {
                            honesty.UploadField({
                                filePath: ret.data, callBack: function (ret) {
                                    if (ret.FilePath != "") {
                                        var strXML = "<root><UserInfo><ReceiveID>" + _opts.UserID + "</ReceiveID></UserInfo></root>";
                                        var _options = {
                                            PostData: {
                                                Params: {
                                                    result: "SendMessage",
                                                    UserID: GetSession("UserID"),
                                                    strXML: strXML,
                                                    MsgContent: "",
                                                    MsgSlaves: ret.FilePath,
                                                    MsgType: "03"
                                                },
                                                ProcName: "proc_SOM_Other_Message",
                                                DataType: "Bool",
                                                ExecType: "PROC",
                                                Mode: "MSSQL"
                                            },
                                            async: false
                                        };
                                        var _result = $honesty.AjaxChannel(_options);
                                        if (_result.Code == "1") {
                                            if (_result.Data == "True") {
                                                var _FileName = GetFileName(ret.FilePath);
                                                var _FileFormat = _FileName.split(".")[1];
                                                _Content = '<div class="time">' + honesty.NowDate("yyyy-MM-dd hh:mm:ss") + '</div><div class="sender"><div class="area"><div class="userinfo"><font class="level">' + GetSession("Position") + '</font><span>' + GetSession("UserName") + '</span></div><div class="content" onclick=\"$honesty.ShowSlaves(\'' + ret.FilePath + '\')\"><big class="sender-arrow"></big><img src="../../res/fileicon/icon_' + _FileFormat + '.png" style="float: left" /><div style="float: right; min-width: 100px; max-width: 150px; padding-left: 10px;;margin-right:10px">' + _FileName + '</div></div></div><i class="user-icon aui-img-object aui-pull-left aui-iconfont' + (GetSession("Sex") == "女" ? " aui-icon-service aui-bg-danger" : " aui-icon-my aui-bg-info") + '"></i></div>';
                                                $("#MsgList").append(_Content);
                                            }
                                            else {
                                                $honesty.ShowMsg({ title: "错误", msg: "附件发送失败!" });
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
                break;
            case "file":
                try {
                    var fileBrowserModule = api.require("fileBrowser");
                    fileBrowserModule.open(function (ret, err) {
                        fileBrowserModule.close();
                        if (ret.data != "") {
                            honesty.UploadField({
                                filePath: ret.data, callBack: function (ret) {
                                    if (ret.FilePath != "") {
                                        var strXML = "<root><UserInfo><ReceiveID>" + _opts.UserID + "</ReceiveID></UserInfo></root>";
                                        var _options = {
                                            PostData: {
                                                Params: {
                                                    result: "SendMessage",
                                                    UserID: GetSession("UserID"),
                                                    strXML: strXML,
                                                    MsgContent: "",
                                                    MsgSlaves: ret.FilePath,
                                                    MsgType: "03"
                                                },
                                                ProcName: "proc_SOM_Other_Message",
                                                DataType: "Bool",
                                                ExecType: "PROC",
                                                Mode: "MSSQL"
                                            },
                                            async: false
                                        };
                                        var _result = $honesty.AjaxChannel(_options);
                                        if (_result.Code == "1") {
                                            if (_result.Data == "True") {
                                                var _FileName = GetFileName(ret.FilePath);
                                                var _FileFormat = _FileName.split(".")[1];
                                                _Content = '<div class="time">' + honesty.NowDate("yyyy-MM-dd hh:mm:ss") + '</div><div class="sender"><div class="area"><div class="userinfo"><font class="level">' + GetSession("Position") + '</font><span>' + GetSession("UserName") + '</span></div><div class="content" onclick=\"$honesty.ShowSlaves(\'' + ret.FilePath + '\')\"><big class="sender-arrow"></big><img src="../../res/fileicon/icon_' + _FileFormat + '.png" style="float: left" /><div style="float: right; min-width: 100px; max-width: 150px; padding-left: 10px;margin-right:10px">' + _FileName + '</div></div></div><i class="user-icon aui-img-object aui-pull-left aui-iconfont' + (GetSession("Sex") == "女" ? " aui-icon-service aui-bg-danger" : " aui-icon-my aui-bg-info") + '"></i></div>';
                                                $("#MsgList").append(_Content);
                                            }
                                            else {
                                                $honesty.ShowMsg({ title: "错误", msg: "附件发送失败!" });
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
                catch (e) {
                    $honesty.ShowToast({ msg: e });
                }
                break;
        }
    }
    honesty.ShowSlaves = function (url) {
        window.dmg = api.require("downloadManager");
        var name = GetFileName(url);
        dmg.enqueue({
            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + url,
            savePath: "fs://" + name,
            cache: true,
            allowResume: true,
            title: name,
            networkTypes: "all"
        }, function (ret, err) {
            dmg.openManagerView(function onItemClick(ret, err) {
                if (ret) {
                    var did = ret.id;
                    dmg.openDownloadedFile({
                        id: did,
                        mimeType: '',
                        savePath: '',
                    });
                }
            });
            isViewOpen = true;
            api.addEventListener({
                name: "keyback"
            }, function (ret, err) {
                if (ret) {
                    if (isViewOpen) {
                        dmg.closeManagerView();
                        isViewOpen = false;
                        return;
                    }
                    history.go(-1);
                }
            });
        });
    }
    honesty.GetSite = function () {
        return (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite);
    }
    honesty.Organize = function (options) {
        /// <summary>
        /// 组织架构选择
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param> 
        var defaults = {
            control: "",//触发控件编号
            deptname: api.pageParam.deptname || "多麦集团",//页面名称
            rootid: api.pageParam.rootid || "04F12BEB-D99D-43DF-AC9A-3042957D6BDA",//组织架构限制
            parentid: api.pageParam.parentid || "04F12BEB-D99D-43DF-AC9A-3042957D6BDA",//父节点编号
            typemode: api.pageParam.typemode || "A",//展示方式(O:组织架构,A:组织架构含人员,S:只加载含店铺的组织架构,C:只加载店铺的人员数据)
            ismore: "true",//是否多选
            parentwin: api.pageParam.parentwin || api.winName || "undefined",
            root: true,//限定大区
            isowner: false,//限定为只加载自己管辖的组织架构
            callback: function () { },//回调函数,
            defaultid: "",
            IsFirst: true,
            count: 0,
            listid: []
        }
        var _opts = $.extend(defaults, options);
        if (_opts.IsFirst) {
            var _AreaName = GetSession("AreaName");
            if (_opts.root) {
                switch (_AreaName) {
                    case "华南":
                        _opts.parentid = _opts.rootid = "b03abf91-67be-4b22-b2c8-0de0598876fc";
                        break;
                    case "华东":
                        _opts.parentid = _opts.rootid = "377735cb-eb28-4b0a-a8e1-f9e3bdcad863";
                        break;
                    case "北方":
                        _opts.parentid = _opts.rootid = "ce8ef2f7-44b6-45a0-9f33-d5f6fc493922";
                        break;

                    case "西北":
                        _opts.parentid = _opts.rootid = "214d0b66-663e-4170-8d14-a49de334c05f";
                        break;
                    case "成都":
                        _opts.parentid = _opts.rootid = "b298e965-9069-404a-a7bf-342d38b844a0";
                        break;
                }
            }
            if (_opts.isowner) {
                _opts.parentid = _opts.rootid = GetSession("OrganizeID");
            }
            if (GetSession("RoleList")) {
                if (GetSession("RoleList").toString().indexOf("EFB111AA-2308-48E2-B1FC-54181EC35E3F") >= 0) {
                    _opts.parentid = _opts.rootid = "04F12BEB-D99D-43DF-AC9A-3042957D6BDA";
                }
            }

            var SelectList = $("#" + _opts.control).data("listid") || [];
            $("#" + _opts.control).removeData("nlistid");
            $("#" + _opts.control).removeData("nlist");
            _opts.count = SelectList.length;
            _opts.listid = SelectList;
            if ($("#" + _opts.control).data("list") == undefined) {
                if (SelectList.length > 0) {
                    var Name = $("#" + _opts.control).val();
                    var _ArrName = [];
                    _ArrName = Name.split(",");
                    var ListJSON = {};
                    for (var i = 0; i < SelectList.length; i++) {
                        ListJSON[SelectList[i].toLocaleLowerCase()] = _ArrName[i];
                    }
                    $("#" + _opts.control).data("list", ListJSON);
                }
            }
            api.addEventListener({
                name: _opts.parentwin + "|OrganizeOK",
            }, function (ret, err) {
                if (ret) {
                    if ($("#" + _opts.control).length > 0) {
                        var ListID = $("#" + _opts.control).data("nlistid") || $("#" + _opts.control).data("listid") || [];
                        var List = $("#" + _opts.control).data("nlist") || $("#" + _opts.control).data("list") || {};
                        var Name = "", Value = "";
                        if (_opts.ismore == "false") {
                            $.each(ListID, function (i, item) {
                                item = item.toLocaleLowerCase();
                                if (Name != "")
                                    Name += ",";
                                if (Value != "") {
                                    Value += ",";
                                }
                                Name += List[item];
                                Value += item;
                            });
                            $("#" + _opts.control).val(Name);
                        }
                        else {
                            $.each(ListID, function (i, item) {
                                item = item.toLocaleLowerCase();
                                if (Name != "")
                                    Name += ",";
                                if (Value != "") {
                                    Value += ",";
                                }
                                Name += List[item];
                                Value += item;
                            });
                            $("#" + _opts.control).val(Name);
                        }
                        $("#" + _opts.control).data("listid", ListID);
                        $("#" + _opts.control).data("list", List);
                        $("#" + _opts.control).removeData("nlistid");
                        $("#" + _opts.control).removeData("nlist");
                        if (Name != "") {
                            if (!$("#" + _opts.control + "_clear").length > 0) {
                                $btnClear = $('<i class="aui-input-addon aui-iconfont aui-icon-close aui-text-danger" style="width:20px !important;" tapmode id="' + _opts.control + '_clear"></i>');
                                $("#" + _opts.control).after($btnClear);
                                api.parseTapmode();
                                $btnClear.tap(function () {
                                    honesty.ConfirmWin({
                                        title: "提示",
                                        msg: "是否要清空该组织架构选择的内容?",
                                        buttons: ["确认", "取消"],
                                        callback: function (ret, err) {
                                            if (ret.buttonIndex == 1) {
                                                $("#" + _opts.control).removeData("listid");
                                                $("#" + _opts.control).removeData("list");
                                                $("#" + _opts.control).val("");
                                                $btnClear.remove();
                                            }
                                        }
                                    });
                                });
                            }
                        }
                        if (_opts.callback != null) {
                            _opts.callback.call();
                        }
                    }
                }
            });
            api.addEventListener({
                name: _opts.parentwin + "|ItemSelect"
            }, function (ret, err) {
                if (ret) {
                    if ($("#" + _opts.control).length > 0) {
                        var ListID = $("#" + _opts.control).data("listid") || [];
                        var List = $("#" + _opts.control).data("list") || {};
                        var NListID = $("#" + _opts.control).data("nlistid") || [];
                        var NList = $("#" + _opts.control).data("nlist") || {};
                        if (NListID.length < 1) {
                            $.each(ListID, function (i, item) {
                                item = item.toLocaleLowerCase();
                                NListID.push(item);
                                NList[item] = List[item];
                            });
                        }
                        ret.value.Item.ID = ret.value.Item.ID.toLocaleLowerCase();
                        if (_opts.ismore == "true") {
                            if (ret.value.Item.IsCheck) {
                                var isSave = $.inArray(ret.value.Item.ID, NListID);
                                if (isSave == -1) {
                                    NListID.push(ret.value.Item.ID);
                                    NList[ret.value.Item.ID] = ret.value.Item.Name;
                                }
                            }
                            else {
                                var isSave = $.inArray(ret.value.Item.ID, NListID);
                                NListID.splice(isSave, 1);
                                delete List[ret.value.Item.ID];
                            }
                        }
                        else {
                            NListID = [ret.value.Item.ID];
                            NList[ret.value.Item.ID] = ret.value.Item.Name;
                        }
                        $("#" + _opts.control).data("nlistid", NListID);
                        $("#" + _opts.control).data("nlist", NList);
                        api.sendEvent({
                            name: _opts.parentwin + "|ItemCount",
                            extra: {
                                Count: NListID.length,
                                NListID: NListID
                            }
                        });
                    }
                }
            });
        }
        api.openWin({
            name: _opts.parentid,
            url: "widget://html/SelectPage/Organize_Win.html",
            title: _opts.deptname,
            slidBackEnabled: true,
            pageParam: {
                deptname: _opts.deptname,
                rootid: _opts.rootid,
                parentid: _opts.parentid,
                typemode: _opts.typemode,
                ismore: _opts.ismore,
                parentwin: _opts.parentwin,
                count: _opts.count,
                listid: _opts.listid
            }
        });
    }
    honesty.RemoveEvent = function (options) {
        /// <summary>
        /// 移除事件监听
        /// </summary>
        /// <param name="options" type="Json">
        ///  1: options - JSON参数集合
        /// </param> 
        var defaults = {
            event: []
        }
        var _opts = $.extend(defaults, options);
        $.each(event, function (i, item) {
            api.removeEventListener({
                name: item
            });
        });
    }
    honesty.MultiSelector = function (options) {
        var _opts = {};
        var defaults = {
            text: {
                title: '标题',
                leftBtn: '取消',
                rightBtn: '确定',
                selectAll: '全选'
            },
            item: [],
            callbackOK: function (ret) { },
            callbackNO: function (ret) { }
        }
        _opts = $.extend(defaults, options);
        var UIMultiSelector = api.require('UIMultiSelector');
        UIMultiSelector.open({
            rect: {
                h: 244
            },
            text: _opts.text,
            max: 0,
            styles: {
                mask: 'rgba(0,0,0,0.3)',
                title: {
                    bg: '#333333',
                    color: '#fcee88',
                    size: 16,
                    h: 44
                },
                leftButton: {
                    bg: '#8f8f94',
                    w: 80,
                    h: 35,
                    marginT: 5,
                    marginL: 8,
                    color: 'rgb(0,0,0)',
                    size: 14,
                },
                rightButton: {
                    bg: '#f3c200',
                    w: 80,
                    h: 35,
                    marginT: 5,
                    marginR: 8,
                    color: '#FFFFFF',
                    size: 14,
                },
                item: {
                    h: 43,
                    bg: 'white',
                    color: '#333333',
                    active: '#f3c200',
                    highlight: '#f3c200',
                    size: 14,
                    lineColor: '#ddd',
                    textAlign: 'center',
                },
                icon: {
                    w: 20,
                    h: 20,
                    bg: 'widget://res/img/uncheck.jpg',
                    bgActive: 'widget://res/img/check.jpg',
                    align: 'left',
                }
            },
            animation: true,
            items: _opts.item
        }, function (ret) {
            if (ret) {
                if (ret.eventType == "clickRight") {
                    if (typeof (_opts.callbackOK) == "function") {
                        _opts.callbackOK.call(this, ret);
                    }
                    UIMultiSelector.hide();
                }
                if (ret.eventType == "clickLeft") {
                    if (typeof (_opts.callbackNO) == "function") {
                        _opts.callbackNO.call(this, ret);
                    }
                    UIMultiSelector.hide();
                }
            }
        });
    }
    honesty.IsLocal = function () {
        return Setting.IsLocal;
    }
    honesty.IniScreen = function () {
        if (api.systemType == "android") {
            $("meta[name=viewport]").attr("content", "width=320,maximum-scale=1.3,minimum-scale=1,initial-scale=" + (window.screen.width / 320).toFixed(1));
        }
    }
    honesty.DelHtml = function (str) {
        return str.replace(/<[^>]+>/g, "");
    }
    honesty.MessageBox = function () {
        api.openWin({
            name: "Message_MessageBox_Title",
            url: "widget://html/Message/MessageBox_Title.html",
            title: "站内通讯"
        });
    }
    honesty.Ticket = function () {
        api.openWin({
            name: "Customer_WeChat_Ticket_Win",
            url: "widget://html/Customer/WeChat/Ticket_Win.html",
            title: "优惠券"
        });
    }
    honesty.FormChannel = function (options) {
        var _opts = {};
        var defaults = {
            table: "",
            primary: {},
            data: {}
        }
        _opts = $.extend(defaults, options);
        var result;
        $.ajax({
            type: "POST",
            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.FormChannel,
            data: JSON.stringify(_opts),
            timeout: 60000,
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (rData) {
                result = rData;
            },
            error: function (XMLHttpRequest, textStatus, thrownError) {
                var _result = honesty.AjaxError(textStatus);
                honesty.ShowToast({ msg: _result });
                result = { Data: "", Code: "0" };
            }
        });
        return result;
    }
    honesty.GetSetting = function () {
        return Setting;
    }
    honesty.WeChatChannel = function (options) {
        var _opts = {};
        var defaults = {
            Mode: "CreateBarCode",
            CodeType: "",
            EventKey: "",
            LimitTime: 30,
            OpenID: "",
            MsgContent: "",
            CallBack: function () { },//执行回调函数 
            Loading: {
                Show: true,//是否加载Loading层
                Title: "数据加载中..."//Loading层显示描述
            },
            ShowError: true,//是否直接由AJAX输出错误消息
            async: true
        }
        _opts = $.extend(defaults, options);
        if (_opts.async) {
            var defer = $.Deferred();
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.WeChatChannel,
                data: JSON.stringify(_opts),
                timeout: 60000,
                async: _opts.async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.showProgress({
                                animationType: 'fade',
                                title: "请稍等",
                                text: _opts.Loading.Title,
                            });
                        }
                        else {

                        }
                    }
                },
                success: function (rData) {
                    defer.resolve(rData);
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    defer.resolve({ Data: "", Code: "0" });
                    honesty.ShowToast({ msg: _result });
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                }
            });
            return defer.promise();
        }
        else {
            var result;
            $.ajax({
                type: "POST",
                url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.WeChatChannel,
                data: JSON.stringify(_opts),
                timeout: 60000,
                async: _opts.async,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function () {
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.showProgress({
                                animationType: 'fade',
                                title: "请稍等",
                                text: _opts.Loading.Title,
                            });
                        }
                        else {

                        }
                    }
                },
                success: function (rData) {
                    result = rData;
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, thrownError) {
                    var _result = honesty.AjaxError(textStatus);
                    honesty.ShowToast({ msg: _result });
                    result = { Data: "", Code: "0" };
                    if (_opts.Loading.Show) {
                        if (Setting.IsApp) {
                            api.hideProgress();
                        }
                        else {

                        }
                    }
                }
            });
            return result;
        }
    }
    window.$honesty = honesty;
})(window);
///设置session
function SetSession(name, value) {
    /// <summary>
    /// 获取URL参数值
    /// name:key值
    /// </summary> 
    localStorage.setItem(name, value);
}
///获取session
function GetSession(name) {
    if (name == "LastShiftDate") {
        var _options = {
            PostData: {
                Params: {
                    result: "GetLastShiftDate",
                    UserID: GetSession("UserID")
                },
                ProcName: "proc_HC_GetUserInfo",
                DataType: "Text",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var _result = $honesty.AjaxChannel(_options);
        return _result.Data;
    }
    else {
        return localStorage.getItem(name);
    }
}
//判断店铺选择跳转
function CheckShopSelect(_opts) {
    if (GetSession("ShopCodeNum") == "1") {
        if (GetSession("EmpLevel") > "D") {
            $honesty.OpenWin({
                name: _opts.JumpName,
                url: _opts.JumpUrl,
                title: _opts.JumpTitle,
                LevelNum: _opts.LevelNum,
                pageParam: {
                    ShopCode: GetSession("ShopCode"),
                    OrganizeID: GetSession("OrganizeID")
                }
            });
        }
        else {
            $honesty.OpenWin({
                name: "SelectPage_ShopSelect",
                url: "SelectPage/ShopSelect.html",
                LevelNum: _opts.LevelNum,
                title: "店仓号选择",
                pageParam: {
                    JumpTitle: _opts.JumpTitle,
                    JumpUrl: _opts.JumpUrl,
                    JumpName: _opts.JumpName
                }
            });
        }
    }
    else if (Number(GetSession("ShopCodeNum")) > 1) {
        $honesty.OpenWin({
            name: "SelectPage_ShopSelect",
            url: "SelectPage/ShopSelect.html",
            LevelNum: _opts.LevelNum,
            title: "店仓号选择",
            pageParam: {
                JumpTitle: _opts.JumpTitle,
                JumpUrl: _opts.JumpUrl,
                JumpName: _opts.JumpName
            }
        });
    }
    else {
        $honesty.ShowToast({ msg: "您无权访问该页面" });
    }
}
//判断店铺选择跳转
function CheckOrganizeSelect(_opts) {
    if (GetSession("OrganizeNum") == "1") {
        if (GetSession("EmpLevel") > "D") {
            $honesty.OpenWin({
                name: _opts.JumpName,
                url: _opts.JumpUrl,
                title: _opts.JumpTitle,
                LevelNum: _opts.LevelNum,
                pageParam: {
                    ShopCode: GetSession("ShopCode"),
                    OrganizeID: GetSession("OrganizeID")
                }
            });
        }
        else {
            $honesty.OpenWin({
                name: "SelectPage_OrganizeSelect",
                url: "SelectPage/OrganizeSelect.html",
                LevelNum: _opts.LevelNum,
                title: "店铺选择",
                pageParam: {
                    JumpTitle: _opts.JumpTitle,
                    JumpUrl: _opts.JumpUrl,
                    JumpName: _opts.JumpName
                }
            });
        }
    }
    else if (Number(GetSession("OrganizeNum")) > 1) {
        $honesty.OpenWin({
            name: "SelectPage_OrganizeSelect",
            url: "SelectPage/OrganizeSelect.html",
            LevelNum: _opts.LevelNum,
            title: "店铺选择",
            pageParam: {
                JumpTitle: _opts.JumpTitle,
                JumpUrl: _opts.JumpUrl,
                JumpName: _opts.JumpName
            }
        });
    }
    else {
        $honesty.ShowToast({ msg: "您无权访问该页面" });
    }
}
//判断区域选择跳转
function CheckRegionalSelect(_opts) {
    if (GetSession("RegionalNum") == "1") {
        $honesty.OpenWin({
            name: _opts.JumpName,
            url: _opts.JumpUrl,
            title: _opts.JumpTitle,
            LevelNum: _opts.LevelNum
        });
    }
    else if (Number(GetSession("RegionalNum")) > 1) {
        $honesty.OpenWin({
            name: "SelectPage_RegionalSelect",
            url: "SelectPage/RegionalSelect.html",
            LevelNum: _opts.LevelNum,
            title: "区域选择",
            pageParam: {
                JumpTitle: _opts.JumpTitle,
                JumpUrl: _opts.JumpUrl,
                JumpName: _opts.JumpName
            }
        });
    }
    else {
        $honesty.ShowToast({ msg: "您无权访问该页面" });
    }
}
//判断零售选择跳转
function CheckRetailSelect(_opts) {
    if (GetSession("RetailNum") == "1") {
        $honesty.OpenWin({
            name: _opts.JumpName,
            url: _opts.JumpUrl,
            title: _opts.JumpTitle,
            LevelNum: _opts.LevelNum
        });
    }
    else if (Number(GetSession("RetailNum")) > 1) {
        $honesty.OpenWin({
            name: "SelectPage_RetailSelect",
            url: "SelectPage/RetailSelect.html",
            LevelNum: _opts.LevelNum,
            title: "零售部选择",
            pageParam: {
                JumpTitle: _opts.JumpTitle,
                JumpUrl: _opts.JumpUrl,
                JumpName: _opts.JumpName
            }
        });
    }
    else {
        $honesty.ShowToast({ msg: "您无权访问该页面" });
    }
}
//获取文件名字
function GetFileName(filename) {
    return filename.substr((filename.lastIndexOf("/") + 1));
}
//附件下载
function ShowSlaves(url, name) {
    window.dmg = api.require("downloadManager");
    dmg.enqueue({
        url: url, savePath: 'fs://' + name,
        cache: true,
        allowResume: true,
        title: name,
        networkTypes: 'all'
    }, function (ret, err) {
        dmg.openManagerView(function onItemClick(ret, err) {
            if (ret) {
                var did = ret.id;
                dmg.openDownloadedFile({
                    id: did,
                    mimeType: '',
                    savePath: '',
                });
            }
        });
        isViewOpen = true;
        api.addEventListener({
            name: 'keyback'
        }, function (ret, err) {
            if (ret) {
                if (isViewOpen) {
                    dmg.closeManagerView();
                    isViewOpen = false;
                    return;
                }
                history.go(-1);
            }
        });
    });
}
//附件删除
function FileDelete(FileID) {
    $honesty.ConfirmWin({
        msg: "是否删除该文件?", callback: function (ret, err) {
            if (ret.buttonIndex == "1") {
                $("#" + FileID).remove();
            }
        }
    });
}
//计算日期差
function DateDiff(date1, date2) {
    var arr1 = date1.split('-');
    var arr2 = date2.split('-');
    var d1 = new Date(arr1[0], arr1[1], arr1[2]);
    var d2 = new Date(arr2[0], arr2[1], arr2[2]);
    return (d2.getTime() - d1.getTime()) / (1000 * 3600 * 24) + 1;
}
//加载民族
function InitNation(options) {
    /// <summary>
    /// 加载民族
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Nation:
            [
                { ID: "HA", Value: "汉族" },
                { ID: "AC", Value: "阿昌族" },
                { ID: "BA", Value: "白族" },
                { ID: "BL", Value: "布朗族" },
                { ID: "BN", Value: "保安族" },
                { ID: "BY", Value: "布依族" },
                { ID: "CS", Value: "朝鲜族" },
                { ID: "DA", Value: "傣族" },
                { ID: "DE", Value: "德昂族" },
                { ID: "DO", Value: "侗族" },
                { ID: "DR", Value: "独龙族" },
                { ID: "DU", Value: "达斡尔族" },
                { ID: "DX", Value: "东乡族" },
                { ID: "EW", Value: "鄂温克族" },
                { ID: "GI", Value: "京族" },
                { ID: "GL", Value: "讫佬族" },
                { ID: "GS", Value: "高山族" },
                { ID: "HN", Value: "哈尼族" },
                { ID: "HU", Value: "回族" },
                { ID: "HZ", Value: "赫哲族" },
                { ID: "JN", Value: "基诺族" },
                { ID: "JP", Value: "景颇族" },
                { ID: "KG", Value: "柯尔克孜族" },
                { ID: "KZ", Value: "哈萨克族" },
                { ID: "LB", Value: "路巴族" },
                { ID: "LH", Value: "拉枯族" },
                { ID: "LL", Value: "黎族" },
                { ID: "LS", Value: "傈僳族" },
                { ID: "MA", Value: "满族" },
                { ID: "MB", Value: "门巴族" },
                { ID: "MG", Value: "蒙古族" },
                { ID: "MH", Value: "苗族" },
                { ID: "ML", Value: "松佬族" },
                { ID: "MN", Value: "毛南族" },
                { ID: "NU", Value: "怒族" },
                { ID: "NX", Value: "纳西族" },
                { ID: "OR", Value: "鄂伦春族" },
                { ID: "PM", Value: "普米族" },
                { ID: "QL", Value: "羌族" },
                { ID: "R5", Value: "俄罗斯族" },
                { ID: "SH", Value: "舍族" },
                { ID: "SL", Value: "撤拉族" },
                { ID: "SU", Value: "水族" },
                { ID: "TA", Value: "塔吉克族" },
                { ID: "TJ", Value: "土家族" },
                { ID: "TT", Value: "塔塔尔族" },
                { ID: "TU", Value: "土族" },
                { ID: "UG", Value: "维吾尔族" },
                { ID: "UZ", Value: "乌孜别克族" },
                { ID: "VA", Value: "低族" },
                { ID: "XB", Value: "锡伯族" },
                { ID: "YA", Value: "瑶族" },
                { ID: "YG", Value: "裕固族" },
                { ID: "YI", Value: "彝族" },
                { ID: "ZA", Value: "藏族" },
                { ID: "ZH", Value: "壮族" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Nation, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Nation;
    }
}

function GetNationText(Key) {
    var _Json = {
        "AC": "阿昌族",
        "BA": "白族",
        "BL": "布朗族",
        "BN": "保安族",
        "BY": "布依族",
        "CS": "朝鲜族",
        "DA": "傣族",
        "DE": "德昂族",
        "DO": "侗族",
        "DR": "独龙族",
        "DU": "达斡尔族",
        "DX": "东乡族",
        "EW": "鄂温克族",
        "GI": "京族",
        "GL": "讫佬族",
        "GS": "高山族",
        "HA": "汉族",
        "HN": "哈尼族",
        "HU": "回族",
        "HZ": "赫哲族",
        "JN": "基诺族",
        "JP": "景颇族",
        "KG": "柯尔克孜族",
        "KZ": "哈萨克族",
        "LB": "路巴族",
        "LH": "拉枯族",
        "LL": "黎族",
        "LS": "傈僳族",
        "MA": "满族",
        "MB": "门巴族",
        "MG": "蒙古族",
        "MH": "苗族",
        "ML": "松佬族",
        "MN": "毛南族",
        "NU": "怒族",
        "NX": "纳西族",
        "OR": "鄂伦春族",
        "PM": "普米族",
        "QL": "羌族",
        "R5": "俄罗斯族",
        "SH": "舍族",
        "SL": "撤拉族",
        "SU": "水族",
        "TA": "塔吉克族",
        "TJ": "土家族",
        "TT": "塔塔尔族",
        "TU": "土族",
        "UG": "维吾尔族",
        "UZ": "乌孜别克族",
        "VA": "低族",
        "XB": "锡伯族",
        "YA": "瑶族",
        "YG": "裕固族",
        "YI": "彝族",
        "ZA": "藏族",
        "ZH": "壮族"
    }
    return _Json[Key];
}
//加载政治面貌
function InitPolitics(options) {
    /// <summary>
    /// 加载政治面貌
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Politic:
            [
                { ID: "13", Value: "群众" },
                { ID: "14", Value: "团员" },
                { ID: "15", Value: "党员" },
                { ID: "16", Value: "其他" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Politic, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Politic;
    }
}

function GetPolitics(Key) {
    var _Json = {
        "13": "群众",
        "14": "团员",
        "15": "党员",
        "16": "其他",
    }
    return _Json[Key];
}
//加载上装尺码

function InitClothes(options) {
    /// <summary>
    /// 加载上装尺码
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Sex: "男",
        Man:
            [
                { ID: "", Value: "请选择..." },
                { ID: "46", Value: "46" },
                { ID: "48", Value: "48" },
                { ID: "50", Value: "50" },
                { ID: "52", Value: "52" },
                { ID: "54", Value: "54" }
            ],
        Woman:
            [
                { ID: "", Value: "请选择..." },
                { ID: "46", Value: "46" },
                { ID: "48", Value: "48" },
                { ID: "50", Value: "50" },
                { ID: "52", Value: "52" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        if (_opts.Sex == "男") {
            $.each(_opts.Man, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        } else {
            $.each(_opts.Woman, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        }
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        if (_opts.Sex == "男") {
            return _opts.Man;
        } else {
            return _opts.Woman;
        }
    }
}
//加载下装尺码

function InitTrousers(options) {
    /// <summary>
    /// 加载下装尺码
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Sex: "男",
        Man:
            [
                { ID: "", Value: "请选择..." },
                { ID: "48", Value: "48" },
                { ID: "50", Value: "50" },
                { ID: "52", Value: "52" },
                { ID: "54", Value: "54" }
            ],
        Woman:
            [
                { ID: "", Value: "请选择..." },
                { ID: "26", Value: "26" },
                { ID: "27", Value: "27" },
                { ID: "28", Value: "28" },
                { ID: "29", Value: "29" },
                { ID: "30", Value: "30" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        if (_opts.Sex == "男") {
            $.each(_opts.Man, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        } else {
            $.each(_opts.Woman, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        }
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        if (_opts.Sex == "男") {
            return _opts.Man;
        } else {
            return _opts.Woman;
        }
    }
}
//加载鞋子尺码

function InitShoe(options) {
    /// <summary>
    /// 加载鞋子尺码
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Sex: "男",
        Man:
            [
                { ID: "", Value: "请选择..." },
                { ID: "38", Value: "38" },
                { ID: "39", Value: "39" },
                { ID: "40", Value: "40" },
                { ID: "41", Value: "41" },
                { ID: "42", Value: "42" },
                { ID: "43", Value: "43" }
            ],
        Woman:
            [
                { ID: "", Value: "请选择..." },
                { ID: "35", Value: "35" },
                { ID: "36", Value: "36" },
                { ID: "37", Value: "37" },
                { ID: "38", Value: "38" },
                { ID: "39", Value: "39" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        if (_opts.Sex == "男") {
            $.each(_opts.Man, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        } else {
            $.each(_opts.Woman, function (i, item) {
                $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
            });
        }
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        if (_opts.Sex == "男") {
            return _opts.Man;
        } else {
            return _opts.Woman;
        }
    }
}
//加载血型

function InitBlood(options) {
    /// <summary>
    /// 加载血型
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Blood:
            [
                { ID: "A", Value: "A" },
                { ID: "B", Value: "B" },
                { ID: "AB", Value: "AB" },
                { ID: "O", Value: "O" },
                { ID: "Z", Value: "其他" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Blood, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Blood;
    }
}
//加载招聘渠道

function InitRecruitment(options) {
    /// <summary>
    /// 加载招聘渠道
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Recruitment:
            [
                { ID: "01", Value: "店铺POP" },
                { ID: "02", Value: "58同城网" },
                { ID: "03", Value: "赶集网" },
                { ID: "04", Value: "校园招聘" },
                { ID: "05", Value: "中介" },
                { ID: "06", Value: "熟人推荐" },
                { ID: "07", Value: "前程无忧" },
                { ID: "08", Value: "其他" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Recruitment, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Recruitment;
    }
}
//加载学历

function InitEducation(options) {
    /// <summary>
    /// 加载学历
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Education:
            [
                { ID: "10", Value: "博士后" },
                { ID: "11", Value: "博士" },
                { ID: "20", Value: "硕士" },
                { ID: "30", Value: "本科" },
                { ID: "40", Value: "大专" },
                { ID: "50", Value: "中专" },
                { ID: "51", Value: "职高" },
                { ID: "52", Value: "技校" },
                { ID: "60", Value: "高中" },
                { ID: "70", Value: "初中" },
                { ID: "80", Value: "小学" },
                { ID: "90", Value: "文盲或半文盲" },
                { ID: "99", Value: "其他" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Education, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Education;
    }
}

function GetEducation(Key) {
    var _Json = {
        "10": "博士后",
        "11": "博士",
        "20": "硕士",
        //"21": "研究生毕业",
        //"22": "研究生结业",
        "30": "本科",
        "40": "大专",
        "50": "中专",
        "51": "职高",
        "52": "技校",
        "60": "高中",
        "70": "初中",
        "80": "小学",
        "90": "文盲或半文盲",
        "99": "其他",
    };
    return _Json[Key];
}
//加载证书

function InitDiploma(options) {
    /// <summary>
    /// 加载证书
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Diploma:
            [
                { ID: "10", Value: "毕业" },
                { ID: "11", Value: "结业" },
                { ID: "12", Value: "肄业" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Diploma, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Education;
    }
}

function GetDiploma(Key) {
    var _Json = {
        "10": "毕业",
        "11": "结业",
        "12": "肄业",
    };
    return _Json[Key];
}
//加载岗位列表

function InitPosition(options) {
    /// <summary>
    /// 加载家庭成员关系
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        Position:
            [
                { ID: "", Value: "请选择..." },
                { ID: "E1", Value: "店经理" },
                { ID: "F1", Value: "高级店长" },
                { ID: "F2", Value: "中级店长" },
                { ID: "F3", Value: "初级店长" },
                //{ ID: "G1", Value: "助店" },
                { ID: "H1", Value: "高级导购" },
                //{ ID: "H2", Value: "中级导购" },
                //{ ID: "H3", Value: "初级导购" },
                { ID: "H4", Value: "导购" },
                //{ ID: "I1", Value: "陈列小帮手" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.Position, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.Position;
    }
}

function GetPosition(Key) {
    var _Json = {
        "E1": "店经理",
        "F1": "高级店长",
        "F2": "中级店长",
        "F3": "初级店长",
        "G1": "助店",
        "H1": "高级导购",
        "H2": "中级导购",
        "H3": "初级导购",
        "H4": "导购",
        "I1": "陈列小帮手",
    };
    return _Json[Key];
}
//加载家庭成员关系

function InitRelationShip(options) {
    /// <summary>
    /// 加载家庭成员关系
    /// </summary>
    var _opts = {};
    var defaults = {
        Con_ID: "",
        Select: "",
        RelationShip:
            [
               { ID: "1", Value: "配偶" },
               { ID: "10", Value: "离异双方" },
               { ID: "11", Value: "父亲" },
               { ID: "12", Value: "母亲" },
               { ID: "15", Value: "兄弟" },
               { ID: "16", Value: "姐妹" },
               { ID: "2", Value: "子女" },
               { ID: "7", Value: "紧急联络" }
            ]
    };
    _opts = $.extend(defaults, options);
    if ($("#" + _opts.Con_ID).length > 0) {
        $("#" + _opts.Con_ID).empty();
        $.each(_opts.RelationShip, function (i, item) {
            $("#" + _opts.Con_ID).append("<option value='" + item.ID + "'>" + item.Value + "</option>");
        });
        if (_opts.Select != "") {
            $("#" + _opts.Con_ID).val(Select);
        }
    } else {
        return _opts.RelationShip;
    }
}

function GetRelationShip(Key) {
    var _Json = {
        "1": "配偶",
        "10": "离异双方",
        "11": "父亲",
        "12": "母亲",
        "15": "兄弟",
        "16": "姐妹",
        "2": "子女",
        "7": "紧急联络",
    };
    return _Json[Key];
}
