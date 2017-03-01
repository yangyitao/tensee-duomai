/// <reference path="zepto.js" />
/// <reference path="honesty.base.js" />
(function (window) {
    var honestyFlow = {};
    var ButtonPosition = "bottom";
    honestyFlow.InitFlow = function (options) {
        try {
            if ($("#flow_button").length > 0) {
                $("#flow_button").remove();
            }
            var _opts = {};
            var defaults = {
                instanceid: api.pageParam.instanceid || new $honesty.GUID().NewGUID(),//业务主表主键
                wapflowpage: api.pageParam.wapflowpage || (api.pageParam.name || "").replace(/_/g, "/"),
                Async: true,
                ShowButton: true
            };
            _opts = $.extend(defaults, options);
            var WAPFlowPage = _opts.wapflowpage;
            var IsRead = api.pageParam.isread;
            var StepInfo = {
                stepid: api.pageParam.stepid || "",//步骤编号
                stepname: api.pageParam.stepname || "",//步骤名称
                sendbutton: false,//发送按钮
                backbutton: false,//后退按钮
                pausebutton: false,//暂存按钮
                completedbutton: false,//结束按钮
                deletebutton: false,
                sn: api.pageParam.sn || "",//单据编号
                flowname: api.pageParam.flowname || "",//流程名称
                instanceid: _opts.instanceid,//流程实例编号
                taskid: api.pageParam.taskid || new $honesty.GUID().NewGUID(),//流程任务编号
                title: api.pageParam.title || "",//流程标题
                stepfields: [],//当前步骤字段是否可编辑操作
                notnullnote: "0",//审批意见是否必填
                isfirst: "0",
                handle: "GetStepInfo",
                flowpage: WAPFlowPage,
                Async: _opts.Async,
                Code: 0
            };
            $btnTable = $('<table id="flow_button" style="width: 100%"></table>');
            $flowButton = $('<footer class="aui-nav" id="footer" style="padding: 5px 5px; text-align: center; border-top: 1px solid #dce1e7;display:none;"></footer>');
            $SendButton = $('<td><div id="btnSend" tapmode data-role="flowButton" data-control="Send" class="aui-btn aui-btn-default aui-btn-block aui-btn-outlined" style="padding: 6px 12px;font-weight:200;color:#000;">提交</div></td>');
            $PauseButton = $('<td><div id="btnPause" tapmode data-role="flowButton" data-control="Pause" class="aui-btn aui-btn-default aui-btn-block aui-btn-outlined" style="padding: 6px 12px;font-weight:200;color:#000;">暂存</div></td>');
            $DeleteButton = $('<td><div id="btnDelete" tapmode data-role="flowButton" data-control="Delete" class="aui-btn aui-btn-default aui-btn-block aui-btn-outlined" style="padding: 6px 12px;font-weight:200;color:#000;">删除</div></td>');
            $BackButton = $('<td><div id="btnBack" tapmode data-role="flowButton" data-control="Back" class="aui-btn aui-btn-default aui-btn-block aui-btn-outlined" style="padding: 6px 12px;font-weight:200;color:#000;">退回</div></td>');
            $CompleteButton = $('<td><div id="btnComplete" tapmode data-role="flowButton" data-control="Complete" class="aui-btn aui-btn-default aui-btn-block aui-btn-outlined" style="padding: 6px 12px;font-weight:200;color:#000;">完成</div></td>');
            $btnGroup = $('<tr id="flowButtonGroup"></tr>');
            $btnGroup.append($SendButton);
            $btnGroup.append($BackButton);
            $btnGroup.append($PauseButton);
            $btnGroup.append($DeleteButton);
            $btnGroup.append($CompleteButton);
            $btnTable.append($btnGroup);
            $flowButton.append($btnTable);
            $("body").append($flowButton);
            $("#flowButtonGroup div[data-role='flowButton']").unbind("tap").tap(function () {
                var _Control = $(this).attr("data-control");
                switch (_Control) {
                    case "Send":
                        honestyFlow.SendFlow();
                        break
                    case "Pause":
                        honestyFlow.PauseFlow();
                        break
                    case "Delete":
                        $honesty.ConfirmWin({
                            title: "提示",
                            msg: "是否要删除该流程?",
                            buttons: ["确认", "取消"],
                            callback: function (ret, err) {
                                if (ret.buttonIndex == 1) {
                                    honestyFlow.DeleteFlow({
                                        Callback: function () {
                                            $honesty.CloseWin();
                                        }
                                    });
                                }
                            }
                        });
                        break
                    case "Back":
                        honestyFlow.BackFlow();
                        break
                    case "Complete":
                        honestyFlow.CompleteFlow();
                        break
                    default: break;
                }
            });
            if (_opts.Async) {
                $.when($honesty.AjaxFlow(StepInfo)).done(function (_result) {
                    StepInfo = $.extend(StepInfo, _result);
                    if (StepInfo.Code == "1") {
                        if ($("#txtSN").length > 0) {
                            $("#txtSN").val(StepInfo.sn);
                        }
                        if ($("#InfoSN").length > 0) {
                            $("#InfoSN").html(StepInfo.sn);
                        }
                        if (StepInfo.sendbutton != "True") {
                            $SendButton.remove();
                        }
                        if (StepInfo.backbutton != "True") {
                            $BackButton.remove();
                        }
                        if (StepInfo.pausebutton != "True") {
                            $PauseButton.remove();
                        }
                        if (StepInfo.deletebutton != "True") {
                            $DeleteButton.remove();
                        }
                        if (StepInfo.completedbutton != "True") {
                            $CompleteButton.remove();
                        }
                        $("#flow_button").attr("stepid", StepInfo.stepid);
                        $("#flow_button").attr("flowname", StepInfo.flowname);
                        $("#flow_button").attr("instanceid", StepInfo.instanceid);
                        $("#flow_button").attr("stepname", StepInfo.stepname);
                        $("#flow_button").attr("taskid", StepInfo.taskid);
                        $("#flow_button").attr("flowid", StepInfo.flowid);
                        $("#flow_button").attr("sn", StepInfo.sn);
                        $("#flow_button").attr("first", StepInfo.isfirst);
                        $("#flow_button").attr("notnullnote", StepInfo.notnullnote);
                        $("#flow_button").attr("flowpage", WAPFlowPage);
                        if (StepInfo.isfirst == "1") {
                            $("#flow_button").attr("title", GetSession("UserName") + "的" + StepInfo.flowname + "(" + StepInfo.sn + ")");
                        }
                        else {
                            $("#flow_button").attr("title", StepInfo.title);
                        }
                        if (IsRead == "true" || !_opts.ShowButton) {
                            $("#flowButtonGroup").hide();
                            $("#flow_button").attr("isread", true);
                            $flowButton.hide();
                        }
                        else {
                            $("#flow_button").attr("isread", false);
                            $flowButton.show();
                        }
                    }
                    else {
                        $honesty.ShowMsg({
                            title: "警告", msg: "流程信息加载失败，请联系管理员排查原因", callback: function () {
                                api.closeToWin({ name: "User_Login" });
                            }
                        });
                    }
                });
            }
            else {
                var _result = $honesty.AjaxFlow(StepInfo);
                StepInfo = $.extend(StepInfo, _result);
                if (StepInfo.Code == "1") {
                    if ($("#txtSN").length > 0) {
                        $("#txtSN").val(StepInfo.sn);
                    }
                    if ($("#InfoSN").length > 0) {
                        $("#InfoSN").html(StepInfo.sn);
                    }
                    if (StepInfo.sendbutton != "True") {
                        $SendButton.remove();
                    }
                    if (StepInfo.backbutton != "True") {
                        $BackButton.remove();
                    }
                    if (StepInfo.pausebutton != "True") {
                        $PauseButton.remove();
                    }
                    if (StepInfo.deletebutton != "True") {
                        $DeleteButton.remove();
                    }
                    if (StepInfo.completedbutton != "True") {
                        $CompleteButton.remove();
                    }
                    $("#flow_button").attr("stepid", StepInfo.stepid);
                    $("#flow_button").attr("flowname", StepInfo.flowname);
                    $("#flow_button").attr("instanceid", StepInfo.instanceid);
                    $("#flow_button").attr("stepname", StepInfo.stepname);
                    $("#flow_button").attr("taskid", StepInfo.taskid);
                    $("#flow_button").attr("flowid", StepInfo.flowid);
                    $("#flow_button").attr("sn", StepInfo.sn);
                    $("#flow_button").attr("first", StepInfo.isfirst);
                    $("#flow_button").attr("notnullnote", StepInfo.notnullnote);
                    $("#flow_button").attr("flowpage", WAPFlowPage);
                    if (StepInfo.isfirst == "1") {
                        $("#flow_button").attr("title", GetSession("UserName") + "的" + StepInfo.flowname + "(" + StepInfo.sn + ")");
                    }
                    else {
                        $("#flow_button").attr("title", StepInfo.title);
                    }
                    if (IsRead == "true" || !_opts.ShowButton) {
                        $("#flowButtonGroup").hide();
                        $("#flow_button").attr("isread", true);
                        $flowButton.hide();
                    }
                    else {
                        $("#flow_button").attr("isread", false);
                        $flowButton.show();
                    }
                }
                else {
                    $honesty.ShowMsg({
                        title: "警告", msg: "流程信息加载失败，请联系管理员排查原因", callback: function () {
                            api.closeToWin({ name: "User_Login" });
                        }
                    });
                }
            }
            api.sendEvent({
                name: "Right|" + $("#flow_button").attr("instanceid")
            });
        }
        catch (e) {
            alert(e);
        }
    };

    honestyFlow.SendFlow = function (options) {
        var _opts = {};
        var defaults = {
            stepid: honestyFlow.GetFlowInfo("stepid") || new $honesty.GUID().NewGUID(),
            stepname: honestyFlow.GetFlowInfo("stepname") || "",
            sn: honestyFlow.GetFlowInfo("sn") || "",
            flowname: honestyFlow.GetFlowInfo("flowname") || "",
            instanceid: honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID(),
            taskid: honestyFlow.GetFlowInfo("taskid") || new $honesty.GUID().NewGUID(),
            title: honestyFlow.GetFlowInfo("title") || "未命名任务",
            senderid: GetSession("UserID") || "",
            handle: "GetNextStep",
            flowpage: honestyFlow.GetFlowInfo("flowpage"),
            Async: true,
            Code: 0,
            Loading: {
                Show: true,
                Title: "接收人加载中..."
            },
            Callback: function () { },
            ExecuteType: false
        };
        _opts = $.extend(defaults, options);
        $HC_Flow1 = $('<div id="FlowControl" class="aui-content" style="position: fixed; right: 0; left: 0; top: 0; z-index: 99; height: 100%; background-color: rgba(0,0,0,0.0);"></div>');
        $HC_Flow1_1 = $('<div style="position:absolute;width: 90%;heigth:80%; background-color:rgba(0,0,0,0.8);top:40%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding: 3px;"></div>');
        $HC_Flow2 = $('<div id="FlowTop" class="aui-btn-row" style="padding: 0;"></div>');
        $HC_Flow2_1 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: left; border-right: 1px solid #a5a5a7; color:#fff" id="btnYes">确认</div>');
        $HC_Flow2_2 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: right;color:#fff" id="btnNo">取消</div>');
        //$HC_Flow2_3 = $('<div style="clear: both"></div>');
        $HC_Flow2_4 = $('<div style="margin:3px 3px 0px 3px"><textarea tapmode id="txtNote" cols="20" rows="3" style="margin-bottom:0;" placeholder="请输入办理意见!"></textarea></div>');
        $HC_Flow3 = $('<div id="FlowContent" class="aui-form" style="overflow-y: auto;widht:100%;margin: 3px 3px 3px 3px;;max-height:200px;"></div>');
        $.when($honesty.AjaxFlow(_opts)).done(function (_result) {
            if (_result.Code == "1") {
                if (_result.Data.length > 0) {
                    $.each(_result.Data, function (i, item) {
                        var $Emp;
                        if (i == 0) {
                            $Emp = $('<div class="aui-input-row" style="margin:0px;"><label tapmode class="aui-input-addon" style="width: 1800px; text-align: left;"><input class="aui-radio aui-radio-warning" type="radio" name="ReceiveUser" value="' + item.UserID + '" nstepid="' + item.StepID + '" nstepname="' + item.StepName + '" checked/><font style="height: 42px; line-height: 42px; vertical-align: middle; padding: 6px 8px">' + item.Name + '</font></label></div>');
                        }
                        else {
                            $Emp = $('<div class="aui-input-row"><label tapmode class="aui-input-addon" style="width: 1800px; text-align: left;"><input class="aui-radio aui-radio-warning" type="radio" name="ReceiveUser" value="' + item.UserID + '" nstepid="' + item.StepID + '" nstepname="' + item.StepName + '"/><font style="height: 42px; line-height: 42px; vertical-align: middle; padding: 6px 8px">' + item.Name + '</font></label></div>');
                        }
                        $HC_Flow3.append($Emp);
                    });
                    $HC_Flow2.append($HC_Flow2_4);
                    $HC_Flow2.append($HC_Flow2_1);
                    $HC_Flow2.append($HC_Flow2_2);
                    $HC_Flow1_1.append($HC_Flow3);
                    $HC_Flow1_1.append($HC_Flow2);
                    $HC_Flow1.append($HC_Flow1_1);
                    if (honestyFlow.GetFlowInfo("first") == "1" && $("#flow_button").attr("notnullnote") == "0") {
                        $HC_Flow2_4.hide();
                    }
                    $HC_Flow2_1.tap(function () {
                        if ($("#txtNote").val() == "" && $("#flow_button").attr("notnullnote") == "1") {
                            $honesty.ShowMsg({ title: "提示", msg: "请填写办理意见!" });
                            return;
                        }
                        var Emp = $('#FlowControl input[name="ReceiveUser"]:checked');
                        if (Emp.attr("value") == undefined || Emp.attr("value") == "") {
                            $honesty.ShowMsg({ title: "提示", msg: "请选择流程接收人!" });
                            return;
                        }
                        _opts.receiveid = Emp.attr("value");
                        _opts.nstepid = Emp.attr("nstepid");
                        _opts.nstepname = Emp.attr("nstepname");
                        _opts.comment = $("#txtNote").val();
                        _opts.handle = "SendFlow";
                        _opts.Loading.Title = "流程提交中...";
                        if (_opts.ExecuteType) {
                            var callbackResult = true;
                            if (_opts.Callback != null) {
                                callbackResult = _opts.Callback.call();
                            }
                            if (callbackResult || callbackResult == undefined || callbackResult == null) {
                                _opts.Async = false;
                                _flowresult = $honesty.AjaxFlow(_opts);
                                if (_flowresult.Code == "1") {
                                    $honesty.ShowToast({ msg: "提交成功!" });
                                    api.sendEvent({
                                        name: "ReloadWorkFlow"
                                    });
                                    $honesty.CloseWin();
                                }
                                else {
                                    if (_flowresult.Data == "False") {
                                        $honesty.ShowToast({ msg: "流程提交失败，请重试!" });
                                    }
                                    else {
                                        $honesty.ShowToast({ msg: _flowresult.Data });
                                    }
                                }
                            }
                        }
                        else {
                            $.when($honesty.AjaxFlow(_opts)).done(function (_flowresult) {
                                if (_flowresult.Code == "1") {
                                    $honesty.ShowToast({ msg: "提交成功!" });
                                    api.sendEvent({
                                        name: "ReloadWorkFlow"
                                    });
                                    setTimeout(function () {
                                        if (_opts.Callback != null) {
                                            _opts.Callback.call();
                                        }
                                        $honesty.CloseWin();
                                    }, 700);
                                }
                                else {
                                    if (_flowresult.Data == "False") {
                                        $honesty.ShowToast({ msg: "流程提交失败，请重试!" });
                                    }
                                    else {
                                        $honesty.ShowToast({ msg: _flowresult.Data });
                                    }
                                }
                            });
                        }
                    });
                    $HC_Flow2_2.tap(function () {
                        $("#FlowControl").remove();
                    });
                    $("body").append($HC_Flow1);
                    //$("#FlowContent").height($("#FlowControl").height() - $("#FlowTop").height());
                }
                else {
                    $honesty.ShowMsg({
                        title: "提示", msg: "该节点未获取到接收人!", callback: function (ret, err) {
                            return;
                        }
                    });
                }
            }
            else {
                $honesty.ShowMsg({
                    title: "提示", msg: "该节点未获取到接收人!", callback: function (ret, err) {
                        return;
                    }
                });
            }
        });
    };

    honestyFlow.PauseFlow = function (options) {
        var _opts = {};
        var defaults = {
            stepid: honestyFlow.GetFlowInfo("stepid") || new $honesty.GUID().NewGUID(),
            stepname: honestyFlow.GetFlowInfo("stepname") || "",
            sn: honestyFlow.GetFlowInfo("sn") || "",
            flowname: honestyFlow.GetFlowInfo("flowname") || "",
            instanceid: honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID(),
            taskid: honestyFlow.GetFlowInfo("taskid") || new $honesty.GUID().NewGUID(),
            title: honestyFlow.GetFlowInfo("title") || "未命名任务",
            senderid: GetSession("UserID") || "",
            handle: "PauseFlow",
            flowpage: honestyFlow.GetFlowInfo("flowpage"),
            Async: true,
            Code: 0,
            Loading: {
                Show: true,
                Title: "流程暂存中..."
            },
            Callback: function () { }
        };
        _opts = $.extend(defaults, options);
        $.when($honesty.AjaxFlow(_opts)).done(function (_result) {
            if (_result.Code == "1") {
                $honesty.ShowToast({ msg: "暂存成功!" });
                setTimeout(function () {
                    if (_opts.Callback != null) {
                        _opts.Callback.call();
                    }
                }, 700);
            }
            else {
                $honesty.ShowToast({ msg: "暂存失败!" });
                setTimeout(function () {
                    if (_opts.Callback != null) {
                        _opts.Callback.call();
                    }
                }, 700);
            }
        });
    };

    honestyFlow.DeleteFlow = function (options) {
        var _opts = {};
        var defaults = {
            stepid: honestyFlow.GetFlowInfo("stepid") || new $honesty.GUID().NewGUID(),
            stepname: honestyFlow.GetFlowInfo("stepname") || "",
            sn: honestyFlow.GetFlowInfo("sn") || "",
            flowname: honestyFlow.GetFlowInfo("flowname") || "",
            instanceid: honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID(),
            taskid: honestyFlow.GetFlowInfo("taskid") || new $honesty.GUID().NewGUID(),
            title: honestyFlow.GetFlowInfo("title") || "未命名任务",
            senderid: GetSession("UserID") || "",
            handle: "DeleteFlow",
            flowpage: honestyFlow.GetFlowInfo("flowpage"),
            Async: true,
            Code: 0,
            Loading: {
                Show: true,
                Title: "流程删除中..."
            },
            Callback: function () { },
            ExecuteType: false
        };
        _opts = $.extend(defaults, options);
        if (_opts.ExecuteType) {
            var callbackResult = true;
            if (_opts.Callback != null) {
                callbackResult = _opts.Callback.call();
            }
            if (callbackResult || callbackResult == undefined || callbackResult == null) {
                _opts.Async = false;
                _result = $honesty.AjaxFlow(_opts);
                if (_result.Code == "1") {
                    $honesty.ShowToast({ msg: "删除成功!" });
                    api.sendEvent({
                        name: "ReloadWorkFlow"
                    });
                    $honesty.CloseWin();
                }
                else {
                    $honesty.ShowToast({ msg: "删除失败!" });
                }
            }
        }
        else {
            $.when($honesty.AjaxFlow(_opts)).done(function (_result) {
                if (_result.Code == "1") {
                    $honesty.ShowToast({ msg: "删除成功!" });
                    api.sendEvent({
                        name: "ReloadWorkFlow"
                    });
                    setTimeout(function () {
                        if (_opts.Callback != null) {
                            _opts.Callback.call();
                        }
                    }, 700);
                }
                else {
                    $honesty.ShowToast({ msg: "删除失败!" });
                    setTimeout(function () {
                        if (_opts.Callback != null) {
                            _opts.Callback.call();
                        }
                    }, 700);
                }
            });
        }
    };

    honestyFlow.BackFlow = function (options) {
        var _opts = {};
        var defaults = {
            stepid: honestyFlow.GetFlowInfo("stepid") || new $honesty.GUID().NewGUID(),
            stepname: honestyFlow.GetFlowInfo("stepname") || "",
            sn: honestyFlow.GetFlowInfo("sn") || "",
            flowname: honestyFlow.GetFlowInfo("flowname") || "",
            instanceid: honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID(),
            taskid: honestyFlow.GetFlowInfo("taskid") || new $honesty.GUID().NewGUID(),
            title: honestyFlow.GetFlowInfo("title") || "未命名任务",
            senderid: GetSession("UserID") || "",
            handle: "GetBackStep",
            flowpage: honestyFlow.GetFlowInfo("flowpage"),
            Async: true,
            Code: 0,
            Loading: {
                Show: true,
                Title: "退回信息加载中..."
            },
            Callback: function () { },
            ExecuteType: false
        };
        _opts = $.extend(defaults, options);
        $HC_Flow1 = $('<div id="FlowControl" class="aui-content" style="position: fixed; right: 0; left: 0; top: 0; z-index: 99; height: 100%; background-color: rgba(0,0,0,0.0);"></div>');
        $HC_Flow1_1 = $('<div style="position:absolute;width: 90%;heigth:80%; background-color:rgba(0,0,0,0.8);top:40%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding: 3px;"></div>');
        $HC_Flow2 = $('<div id="FlowTop" class="aui-btn-row" style="padding: 0;"></div>');
        $HC_Flow2_1 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: left; border-right: 1px solid #a5a5a7; color:#fff" id="btnYes">确认</div>');
        $HC_Flow2_2 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: right;color:#fff" id="btnNo">取消</div>');
        //$HC_Flow2_3 = $('<div style="clear: both"></div>');
        $HC_Flow2_4 = $('<div style="margin:3px 3px 0px 3px"><textarea tapmode id="txtNote" cols="20" rows="3" style="margin-bottom:0;" placeholder="请输入办理意见!"></textarea></div>');
        $HC_Flow3 = $('<div id="FlowContent" class="aui-form" style="overflow-y: auto;widht:100%;margin: 3px 3px 0 3px;;max-height:200px;"></div>');
        $.when($honesty.AjaxFlow(_opts)).done(function (_result) {
            if (_result.Code == "1") {
                if (_result.Data.length > 0) {
                    $.each(_result.Data, function (i, item) {
                        var $Emp;
                        if (i == 0) {
                            $Emp = $('<div class="aui-input-row"><label tapmode class="aui-input-addon" style="width: 1800px; text-align: left;"><input class="aui-radio aui-radio-warning" type="radio" name="ReceiveUser" value="' + item.PrevStepID + '" nstepid="' + item.PrevStepID + '" nstepname="' + item.PrevStepName + '" checked/><font style="height: 42px; line-height: 42px; vertical-align: middle; padding: 6px 8px">' + item.PrevStepName + '</font></label></div>');
                        }
                        else {
                            $Emp = $('<div class="aui-input-row"><label tapmode class="aui-input-addon" style="width: 1800px; text-align: left;"><input class="aui-radio aui-radio-warning" type="radio" name="ReceiveUser" value="' + item.PrevStepID + '" nstepid="' + item.PrevStepID + '" nstepname="' + item.PrevStepName + '"/><font style="height: 42px; line-height: 42px; vertical-align: middle; padding: 6px 8px">' + item.PrevStepName + '</font></label></div>');
                        }
                        $HC_Flow3.append($Emp);
                    });
                    $HC_Flow2.append($HC_Flow2_4);
                    $HC_Flow2.append($HC_Flow2_1);
                    $HC_Flow2.append($HC_Flow2_2);
                    $HC_Flow1_1.append($HC_Flow3);
                    $HC_Flow1_1.append($HC_Flow2);
                    $HC_Flow1.append($HC_Flow1_1);
                    if (honestyFlow.GetFlowInfo("first") == "1" && $("#flow_button").attr("notnullnote") == "0") {
                        $HC_Flow2_4.hide();
                    }
                    $HC_Flow2_1.tap(function () {
                        if ($("#txtNote").val() == "" && $("#flow_button").attr("notnullnote") == "1") {
                            $honesty.ShowMsg({ title: "提示", msg: "请填写办理意见!" });
                            return;
                        }
                        var Emp = $('#FlowControl input[name="ReceiveUser"]:checked');
                        if (Emp.attr("value") == undefined || Emp.attr("value") == "") {
                            $honesty.ShowMsg({ title: "提示", msg: "请选择流程接收人!" });
                            return;
                        }
                        _opts.receiveid = Emp.attr("value");
                        _opts.nstepid = Emp.attr("nstepid");
                        _opts.nstepname = Emp.attr("nstepname");
                        _opts.comment = $("#txtNote").val();
                        _opts.handle = "BackFlow";
                        _opts.Loading.Title = "流程退回中...";
                        if (_opts.ExecuteType) {
                            var callbackResult = true;
                            if (_opts.Callback != null) {
                                callbackResult = _opts.Callback.call();
                            }
                            if (callbackResult || callbackResult == undefined || callbackResult == null) {
                                _opts.Async = false;
                                _flowresult = $honesty.AjaxFlow(_opts);
                                if (_flowresult.Code == "1") {
                                    $honesty.ShowToast({ msg: "退回成功!" });
                                    api.sendEvent({
                                        name: "ReloadWorkFlow"
                                    });
                                    $honesty.CloseWin();
                                }
                                else {
                                    if (_flowresult.Data == "False") {
                                        $honesty.ShowToast({ msg: "流程退回失败，请重试!" });
                                    }
                                    else {
                                        $honesty.ShowToast({ msg: _flowresult.Data });
                                    }
                                }
                            }
                        }
                        else {
                            $.when($honesty.AjaxFlow(_opts)).done(function (_flowresult) {
                                if (_flowresult.Code == "1") {
                                    $honesty.ShowToast({ msg: "退回成功!" });
                                    api.sendEvent({
                                        name: "ReloadWorkFlow"
                                    });
                                    setTimeout(function () {
                                        if (_opts.Callback != null) {
                                            _opts.Callback.call();
                                        }
                                        $honesty.CloseWin();
                                    }, 700);
                                }
                                else {
                                    if (_flowresult.Data == "False") {
                                        $honesty.ShowToast({ msg: "流程退回失败，请重试!" });
                                    }
                                    else {
                                        $honesty.ShowToast({ msg: _flowresult.Data });
                                    }
                                }
                            });
                        }
                    });
                    $HC_Flow2_2.tap(function () {
                        $("#FlowControl").remove();
                    });
                    $("body").append($HC_Flow1);
                    $("#FlowContent").height($("#FlowControl").height() - $("#FlowTop").height());
                }
                else {
                    $honesty.ShowMsg({
                        title: "提示", msg: "该节点未获取到接收人!", callback: function (ret, err) {
                            return;
                        }
                    });
                }
            }
            else {
                $honesty.ShowMsg({
                    title: "提示", msg: "该节点未获取到接收人!", callback: function (ret, err) {
                        return;
                    }
                });
            }
        });
    };

    honestyFlow.CompleteFlow = function (options) {
        var _opts = {};
        var defaults = {
            stepid: honestyFlow.GetFlowInfo("stepid") || new $honesty.GUID().NewGUID(),
            stepname: honestyFlow.GetFlowInfo("stepname") || "",
            sn: honestyFlow.GetFlowInfo("sn") || "",
            flowname: honestyFlow.GetFlowInfo("flowname") || "",
            instanceid: honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID(),
            taskid: honestyFlow.GetFlowInfo("taskid") || new $honesty.GUID().NewGUID(),
            title: honestyFlow.GetFlowInfo("title") || "未命名任务",
            senderid: GetSession("UserID") || "",
            handle: "CompleteFlow",
            flowpage: honestyFlow.GetFlowInfo("flowpage"),
            Async: true,
            Code: 0,
            Loading: {
                Show: true,
                Title: "流程办理中..."
            },
            Callback: function () { },
            ExecuteType: false
        };
        _opts = $.extend(defaults, options);
        $HC_Flow1 = $('<div id="FlowControl" class="aui-content" style="position: fixed; right: 0; left: 0; top: 0; z-index: 99; height: 100%; background-color: rgba(0,0,0,0.0);"></div>');
        $HC_Flow1_1 = $('<div style="position:absolute;width: 90%;heigth:80%; background-color:rgba(0,0,0,0.8);top:40%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);padding: 3px;"></div>');
        $HC_Flow2 = $('<div id="FlowTop" class="aui-btn-row" style="padding: 0;"></div>');
        $HC_Flow2_1 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: left; border-right: 1px solid #a5a5a7; color:#fff" id="btnYes">确认</div>');
        $HC_Flow2_2 = $('<div tapmode style="width: 50%; height: 50px; line-height: 50px; float: right;color:#fff" id="btnNo">取消</div>');
        //$HC_Flow2_3 = $('<div style="clear: both"></div>');
        $HC_Flow2_4 = $('<div style="margin:3px 3px 0px 3px"><textarea tapmode id="txtNote" cols="20" rows="3" style="margin-bottom:0;" placeholder="请输入办理意见!"></textarea></div>');
        $HC_Flow3 = $('<div id="FlowContent" class="aui-form" style="overflow-y: auto;widht:100%;margin: 3px 3px 0 3px;;max-height:200px;"></div>');
        $HC_Flow2.append($HC_Flow2_4);
        $HC_Flow2.append($HC_Flow2_1);
        $HC_Flow2.append($HC_Flow2_2);
        $HC_Flow1_1.append($HC_Flow3);
        $HC_Flow1_1.append($HC_Flow2);
        $HC_Flow1.append($HC_Flow1_1);
        $HC_Flow2_1.tap(function () {
            if ($("#txtNote").val() == "" && $("#flow_button").attr("notnullnote") == "1") {
                $honesty.ShowMsg({ title: "提示", msg: "请填写办理意见!" });
                return;
            }
            _opts.comment = $("#txtNote").val();
            if (_opts.ExecuteType) {
                var callbackResult = true;
                if (_opts.Callback != null) {
                    callbackResult = _opts.Callback.call();
                }
                if (callbackResult || callbackResult == undefined || callbackResult == null) {
                    _opts.Async = false;
                    _flowresult = $honesty.AjaxFlow(_opts);
                    if (_flowresult.Code == "1") {
                        $honesty.ShowToast({ msg: "办理完成!" });
                        api.sendEvent({
                            name: "ReloadWorkFlow"
                        });
                        $honesty.CloseWin();
                    }
                    else {
                        if (_flowresult.Data == "False") {
                            $honesty.ShowToast({ msg: "流程办理失败，请重试!" });
                        }
                        else {
                            $honesty.ShowToast({ msg: _flowresult.Data });
                        }
                    }
                }
            }
            else {
                $.when($honesty.AjaxFlow(_opts)).done(function (_flowresult) {
                    if (_flowresult.Code == "1") {
                        $honesty.ShowToast({ msg: "办理完成!" });
                        setTimeout(function () {
                            if (_opts.Callback != null) {
                                _opts.Callback.call();
                            }
                            $honesty.CloseWin();
                        }, 700);
                    }
                    else {
                        if (_flowresult.Data == "False") {
                            $honesty.ShowToast({ msg: "流程办理失败，请重试!" });
                        }
                        else {
                            $honesty.ShowToast({ msg: _flowresult.Data });
                        }
                    }
                });
            }
        });
        $HC_Flow2_2.tap(function () {
            $("#FlowControl").remove();
        });
        $("body").append($HC_Flow1);
    };

    honestyFlow.GetFlowInfo = function (field) {
        /// <summary>
        /// 获取流程配置信息
        /// </summary>
        /// <param name="field" type="String">
        ///  1: field - 流程标示
        /// </param>
        return $("#flow_button").attr(field) || null;
    };

    honestyFlow.FileControl = function () {
        var UploadFiles = $("div[data-type='UploadSlave']");
        var ClearFiles = $("div[data-type='ClearSlave']");
        $.each(UploadFiles, function (i, item) {
            $(item).tap(function () {
                $honesty.UploadSlaves($(item).attr("data-column") + "_FileList");
            });
        });
        $.each(ClearFiles, function (i, item) {
            $(item).tap(function () {
                $honesty.ConfirmWin({
                    title: "提示",
                    msg: "是否删除所有文件?",
                    buttons: ["确认", "取消"],
                    callback: function (ret, err) {
                        if (ret.buttonIndex == 1) {
                            $("#" + $(item).attr("data-column") + "_FileList").html("");
                        }
                    }
                });
            });
        });
    };

    honestyFlow.GroupDisplay = function () {
        var Group = $("li[data-isgroup='true']");
        $.each(Group, function (i, item) {
            $(item).tap(function () {
                $("[data-role='" + $(item).attr("data-group") + "']").fadeToggle(200);
                if ($(item).attr("data-show") == "hide") {
                    $(item).children("p").html("点击收起");
                    $(item).attr("data-show", "show");
                }
                else {
                    $(item).children("p").html("点击显示详情");
                    $(item).attr("data-show", "hide");
                }
            });
        });
    };

    honestyFlow.InitFlowData = function () {
        var FormAttribute = $("#FormAttribute");
        var DBTable = $(FormAttribute).attr("data-table") || "";
        var PrimaryKey = $(FormAttribute).attr("data-primarykey") || "ID";
        var SubTable = $.parseJSON($(FormAttribute).attr("data-subtable")) || [];
        var DataInfo = {}, SubData = [];
        var SenderInfo = {}, SenderLeaderInfo = {}, CurrentInfo = {}, CurrentLeaderInfo = {};
        var _options = {
            PostData: {
                Params: {
                    result: "InitFlowData",
                    PrimaryColumn: PrimaryKey,
                    InstanceID: $("#flow_button").attr("instanceid"),
                    DBTable: DBTable
                },
                ProcName: "proc_SOM_Others_FlowForm",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var _result = $honesty.AjaxChannel(_options);
        if (_result.Code == "1") {
            if (_result.Data.length > 0) {
                $.each(_result.Data, function (i, item) {
                    DataInfo = item;
                });
            }
        }
        var _options = {
            PostData: {
                Params: {
                    result: "SenderInfo",
                    EmpID: GetSession("UserID"),
                    InstanceID: $("#flow_button").attr("instanceid")
                },
                ProcName: "proc_SOM_Others_FlowForm",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var Sender = $honesty.AjaxChannel(_options);
        if (Sender.Code == "1") {
            if (Sender.Data.length > 0) {
                $.each(Sender.Data, function (i, item) {
                    SenderInfo = item;
                });
            }
        }
        var _options = {
            PostData: {
                Params: {
                    result: "SenderLeaderInfo",
                    EmpID: GetSession("UserID"),
                    InstanceID: $("#flow_button").attr("instanceid")
                },
                ProcName: "proc_SOM_Others_FlowForm",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var SenderLeader = $honesty.AjaxChannel(_options);
        if (SenderLeader.Code == "1") {
            if (SenderLeader.Data.length > 0) {
                $.each(SenderLeader.Data, function (i, item) {
                    SenderLeaderInfo = item;
                });
            }
        }

        var _options = {
            PostData: {
                Params: {
                    result: "CurrentInfo",
                    EmpID: GetSession("UserID")
                },
                ProcName: "proc_SOM_Others_FlowForm",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var Current = $honesty.AjaxChannel(_options);
        if (Current.Code == "1") {
            if (Current.Data.length > 0) {
                $.each(Current.Data, function (i, item) {
                    CurrentInfo = item;
                });
            }
        }
        var _options = {
            PostData: {
                Params: {
                    result: "CurrentLeaderInfo",
                    EmpID: GetSession("UserID")
                },
                ProcName: "proc_SOM_Others_FlowForm",
                DataType: "DataTable",
                ExecType: "PROC",
                Mode: "MSSQL"
            },
            async: false
        };
        var CurrentLeader = $honesty.AjaxChannel(_options);
        if (CurrentLeader.Code == "1") {
            if (CurrentLeader.Data.length > 0) {
                $.each(CurrentLeader.Data, function (i, item) {
                    CurrentLeaderInfo = item;
                });
            }
        }
        var FlowArr = $("[data-flow=true]");
        var FlowSlave = $("[data-isslave=true]");
        $.each(FlowArr, function (i, item) {
            var Default = $(item).attr("data-default") || "";
            var Column = $(item).attr("data-column") || "";
            if (Default != "") {
                if ($(item).is("input,textarea,select,radio,checkbox")) {
                    switch (Default.replace(/!/g, "")) {
                        case "InstanceID":
                            $(item).val(DataInfo[Column] || $honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID());
                            break;
                        case "Title":
                            $(item).val(DataInfo[Column] || $honestyFlow.GetFlowInfo("title"));
                            break;
                        case "SN":
                            $(item).val(DataInfo[Column] || $honestyFlow.GetFlowInfo("sn"));
                            break;
                        case "DateTime":
                            $(item).val(DataInfo[Column] || new Date($honesty.NowDate()).Format("yyyy/MM/dd hh:mm:ss"));
                            break;
                        case "Date":
                            $(item).val(DataInfo[Column] || new Date($honesty.NowDate()).Format("yyyy/MM/dd"));
                            break;
                        case "Time":
                            $(item).val(DataInfo[Column] || new Date($honesty.NowDate()).Format("hh:mm:ss"));
                            break;
                        default:
                            $(item).val(DataInfo[Column] || SenderInfo[Default] || SenderLeaderInfo[Default] || CurrentInfo[Default] || CurrentLeaderInfo[Default]);
                            break;
                    }
                }
                else {
                    switch (Default.replace(/!/g, "")) {
                        case "InstanceID":
                            $(item).html(DataInfo[Column] || $honestyFlow.GetFlowInfo("instanceid") || new $honesty.GUID().NewGUID());
                            break;
                        case "Title":
                            $(item).html(DataInfo[Column] || $honestyFlow.GetFlowInfo("title"));
                            break;
                        case "SN":
                            $(item).html(DataInfo[Column] || $honestyFlow.GetFlowInfo("sn"));
                            break;
                        case "DateTime":
                            $(item).html(DataInfo[Column] || new Date($honesty.NowDate()).Format("yyyy/MM/dd hh:mm:ss"));
                            break;
                        case "Date":
                            $(item).html(DataInfo[Column] || new Date($honesty.NowDate()).Format("yyyy/MM/dd"));
                            break;
                        case "Time":
                            $(item).html(DataInfo[Column] || new Date($honesty.NowDate()).Format("hh:mm:ss"));
                            break;
                        default:
                            $(item).html(DataInfo[Column] || SenderInfo[Default] || SenderLeaderInfo[Default] || CurrentInfo[Default] || CurrentLeaderInfo[Default]);
                            break;
                    }
                }
            }
            else {
                if ($(item).is("input,textarea,select,radio,checkbox")) {
                    $(item).val(DataInfo[Column] || "");
                }
                else {
                    $(item).html(DataInfo[Column] || "");
                }
            }
            if ($(item).attr("data-isread") == "true") {
                $(item).attr("readonly", true);
            }
        });
        $.each(FlowSlave, function (i, item) {
            var IsMove = false;
            var Column = $(item).attr("data-slave") || "";
            if ($("#flow_button").attr("first") == "1" && $("#flow_button").attr("isread") == "false") {
                IsMove = true;
            }
            $honesty.InitSlaves({ con_id: Column + "_FileList", dataname: Column + "_FileList", move: IsMove, files: DataInfo[Column] });
        });
    };

    honestyFlow.SaveFlowData = function () {
        var FormData = {
            table: "",
            primary: {},
            data: {}
        };
        var FormAttribute = $("#FormAttribute");
        var DBTable = $(FormAttribute).attr("data-table") || "";
        var PrimaryKey = $(FormAttribute).attr("data-primarykey") || "ID";
        var FlowArr = $("[data-flow=true]");
        var FlowSlave = $("[data-isslave=true]");
        $.each(FlowArr, function (i, item) {
            if (DBTable == "") {
                DBTable = $(item).attr("data-table");
            }
            if (PrimaryKey != $(item).attr("data-column")) {
                if ($(item).is("input,textarea,select,radio,checkbox")) {
                    FormData.data[$(item).attr("data-column")] = $(item).val();
                }
                else {
                    FormData.data[$(item).attr("data-column")] = $(item).html();
                }
            }
        });
        for (var i = 0; i < FlowSlave.length; i++) {
            var Slave = FlowSlave[i];
            var SlaveStr = "";
            $.each($(Slave).find("tr[dataname='" + $(Slave).attr("id") + "']"), function (i, item) {
                SlaveStr += $(item).attr("value") + "|";
            });
            FormData.data[$(Slave).attr("data-slave")] = SlaveStr;
        }
        FormData["table"] = DBTable;
        FormData.primary[PrimaryKey] = $honestyFlow.GetFlowInfo("instanceid");
        FormData.data["Title"] = $("#flow_button").attr("title");
        var result = $honesty.FormChannel(FormData);
        if (result["Data"] == "True") {
            return true;
        }
        else {
            return false;
        }
    };

    honestyFlow.BindDateFunction = function () {
        var DateArr = $("input[data-flow=true][data-role='date']");
        $.each(DateArr, function (i, item) {
            $(item).unbind("tap").tap(function () {
                var Type = $(item).attr("data-dateformat");
                switch (Type) {
                    case "yyyy-MM-dd": Type = "Date"; break;
                    case "yyyy-MM-dd hh:mm:ss": Type = "DateTime"; break;
                    case "hh:mm:ss": Type = "Time"; break;
                }
                $honesty.DateTimeSelect({
                    Type: Type,
                    ControlID: $(this).attr("id"),
                    ControlValue: $(this).val(),
                    onchange: function (ret) {
                        if (ret) {
                        }
                    }
                });
            });
        });
    };

    honestyFlow.DesignInitFlow = function () {
        //流程初始化加载
        honestyFlow.FileControl();
        honestyFlow.GroupDisplay();
        honestyFlow.InitFlowData();
        honestyFlow.BindDateFunction();
    };

    window.$honestyFlow = honestyFlow;
})(window);