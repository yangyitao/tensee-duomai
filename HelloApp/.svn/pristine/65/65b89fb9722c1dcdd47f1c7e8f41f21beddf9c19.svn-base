
/// <reference path="zepto.js" />
/// <reference path="honesty.base.js" />
/**
* AUI JAVASCRIPT PLUGIN
* aui-indexid-list.js 索引列表
* version 0.0.1
* Copyright (c) 2015 auicss.com @流浪男  QQ：343757327  群：344869952
*/
(function (window) {
    var aui = {};
    var ischange = false;
    var listArr = document.querySelectorAll(".aui-indexed-list li");
    var indexedWrap = document.querySelector(".aui-indexed-list");
    // 搜索类
    var searchWrap = document.querySelector(".aui-searchbar-wrap");
    var searchBar = document.querySelector(".aui-searchbar");
    var clearBtn = document.getElementById("aui-searchbar-clear");
    var searchInput = document.getElementById("aui-searchbar-input");
    var searchCancel = document.getElementById("aui-searchbar-cancel");
    // 右侧bar
    var bar = document.querySelector(".aui-indexed-list-bar");
    // 重置bar高度
    var barList = document.querySelectorAll(".aui-indexed-list-bar a");
    var barH = bar.offsetHeight;
    var newBarH = barList.length * 15;
    var _init = function () {
        //indexedWrap.style.height = (window.innerHeight - searchWrap.offsetHeight) + "px";
        searchBar.addEventListener("tap", function () {
            searchWrap.classList.add("focus");
            searchInput.focus();
        }, false)
        clearBtn.addEventListener("tap", function () {
            searchInput.value = '';
        }, false)
        searchCancel.addEventListener("tap", function () {
            searchWrap.classList.remove("focus");
            searchInput.value = '';
            searchInput.blur();
            if (ischange) {
                var pageinfo = $(searchInput).data("pageinfo") || {};
                var _options = {
                    PostData: {
                        Params: {
                            ParentID: pageinfo.parentid,
                            TypeMode: pageinfo.typemode,
                            RootID: pageinfo.rootid,
                            Key: searchInput.value
                        },
                        ProcName: "proc_SOM_Other_Organize",
                        DataType: "DataTable",
                        ExecType: "PROC",
                        Mode: "MSSQL"
                    }
                };
                $("#OrganizeList,#EmpList,#IndexList").html("");
                var _OrganizeHtml = "";
                var _EmpHtml = {};
                var _width = (api.winWidth || $(window).width()) - 90;
                $.when($honesty.AjaxChannel(_options).done(function (_result) {
                    if (_result.Code == "1") {
                        try {
                            if (_result.Data.length > 0) {
                                $.each(_result.Data, function (i, item) {
                                    if (item.TypeCode == "Root" || item.TypeCode == "Dept") {
                                        if (_OrganizeHtml == "") {
                                            _OrganizeHtml = '<li class="aui-list-view-cell aui-indexed-list-view-group"><span class="aui-iconfont aui-icon-favorfill" data-value="*"></span>部门列表</li>';
                                        }
                                        var _icon = "aui-iconfont aui-icon-homefill aui-text-info";
                                        var _ChildCount = "";
                                        if (item.TypeCode == "Dept" && item.ChildCount > 0) {
                                            _icon = "aui-iconfont aui-icon-shopfill aui-text-warning";
                                            _ChildCount = "(" + item.ChildCount + ")";
                                        }
                                        else if (item.TypeCode == "Dept" && item.ChildCount == 0) {
                                            _icon = "aui-iconfont aui-icon-shopfill aui-text-success";
                                            _ChildCount = "(" + item.ChildCount + ")";
                                        }
                                        if ($.inArray(item.ID, listid) != -1) {
                                            checked = "checked";
                                        }
                                        else {
                                            checked = "";
                                        }
                                        _OrganizeHtml += '<li class="aui-list-view-cell">' +
                                            (typemode == "O" || (typemode == "S" && item.IsShop == "True") ? (
                                            '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="Dept" data-name="' + item.Name +
                                            '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                            '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="ExpandDept" data-id="' + item.ID + '" data-child="' + item.ChildCount + '" data-name="' + item.Name +
                                            '" data-isshop="' + item.IsShop + '"><i class="' + _icon + '" style="zoom:1.44;margin-right:2px"></i>' + item.Name + _ChildCount + '</div></li>';
                                    }
                                    else if (item.TypeCode == "M" || item.TypeCode == "F") {
                                        if (_EmpHtml[item.SpellCode.substring(0, 1)] == "" || _EmpHtml[item.SpellCode.substring(0, 1)] == undefined) {
                                            _EmpHtml[item.SpellCode.substring(0, 1)] = '<li class="aui-list-view-cell aui-indexed-list-view-group" id="group-' + item.SpellCode.substring(0, 1) + '" data-group="' + item.SpellCode.substring(0, 1) + '">' + item.SpellCode.substring(0, 1) + '</li>';
                                        }
                                        if ($.inArray(item.ID, listid) != -1) {
                                            checked = "checked";
                                        }
                                        else {
                                            checked = "";
                                        }
                                        switch (item.TypeCode) {
                                            case "M":
                                                _EmpHtml[item.SpellCode.substring(0, 1)] += '<li class="aui-list-view-cell">' +
                                                    (typemode == "A" || typemode == "C" ? (
                                                    '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="User" data-name="' + item.Name +
                                                    '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                                    '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="Expand" data-id="' + item.ID + '" data-child="0" data-name="' + item.Name + '"><i class="aui-iconfont aui-icon-my aui-bg-info" style="zoom:1.3;margin-right:3px"></i>' + item.Name + '</div></li>';
                                                break;
                                            case "F":
                                                _EmpHtml[item.SpellCode.substring(0, 1)] += '<li class="aui-list-view-cell">' +
                                                    (typemode == "A" || typemode == "C" ? (
                                                    '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="User" data-name="' + item.Name +
                                                    '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                                    '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="Expand" data-id="' + item.ID + '" data-child="0" data-name="' + item.Name + '"><i class="aui-iconfont aui-icon-service aui-bg-danger" style="zoom:1.3;margin-right:3px"></i>' + item.Name + '</div></li>';
                                                break;
                                        }
                                        if (_EmpHtml["@"] == "" || _EmpHtml["@"] == undefined) {
                                            _EmpHtml["@"] = '<li class="aui-list-view-cell aui-indexed-list-view-group"><span class="aui-iconfont aui-icon-group" data-value="*"></span>人员列表</li>';
                                        }
                                    }
                                });
                                $("#OrganizeList").append(_OrganizeHtml);
                                for (var i = 64; i < 91; i++) {
                                    $("#EmpList").append(_EmpHtml[String.fromCharCode(i)]);
                                    if (i > 64 && _EmpHtml[String.fromCharCode(i)] != "" && _EmpHtml[String.fromCharCode(i)] != undefined) {
                                        $("#IndexList").append('<a data-value="' + String.fromCharCode(i) + '">' + String.fromCharCode(i) + '</a>');
                                    }
                                }
                                api.parseTapmode();
                                $("#OrganizeList div[data-role='ExpandDept'],#EmpList div[data-role='Expand']").tap(function () {
                                    var _ParentID = $(this).attr("data-id");
                                    var _ChildCount = $(this).attr("data-child");
                                    var _ParentName = $(this).attr("data-name");
                                    var _DataRole = $(this).attr("data-role");
                                    var _IsShop = $(this).attr("data-isshop");
                                    if (_ChildCount == 0) {
                                        if (typemode == "O" || (typemode == "S" && _IsShop == "True")) {
                                            $("#OrganizeList input[data-id='" + _ParentID + "']").prop("checked", true);
                                            ItemSelect(_ParentID, _ParentName, true);
                                            if (ismore == "true") {
                                                if ($.inArray(_ParentID, listid) == -1) {
                                                    listid.push(_ParentID);
                                                }
                                            }
                                            else {
                                                listid = [_ParentID];
                                            }
                                            return;
                                        }
                                        else if (typemode == "A" || typemode == "C") {
                                            if (_DataRole == "ExpandDept") {
                                                $honesty.ShowToast({ msg: "当前部门已不能展开!" });
                                            }
                                            else if (ControlType == "checkbox" && $("#EmpList input[data-id='" + _ParentID + "']").is(":checked")) {
                                                $("#EmpList input[data-id='" + _ParentID + "']").prop("checked", false);
                                                ItemSelect(_ParentID, _ParentName, false);
                                                listid.splice($.inArray(_ParentID, listid), 1);
                                            }
                                            else {
                                                $("#EmpList input[data-id='" + _ParentID + "']").prop("checked", true);
                                                ItemSelect(_ParentID, _ParentName, true);
                                                if (ismore == "true") {
                                                    if ($.inArray(_ParentID, listid) == -1) {
                                                        listid.push(_ParentID);
                                                    }
                                                }
                                                else {
                                                    listid = [_ParentID];
                                                }
                                            }
                                            return;
                                        }
                                        else if ((typemode == "S" && _IsShop != "True")) {
                                            $honesty.ShowToast({ msg: "当前部门已不能展开!" });
                                            return;
                                        }
                                    }
                                    $honesty.Organize({
                                        deptname: _ParentName,
                                        rootid: rootid,
                                        parentid: _ParentID,
                                        typemode: typemode,
                                        ismore: ismore,
                                        parentwin: parentwin,
                                        IsFirst: false,
                                        count: count,
                                        listid: listid
                                    });
                                });
                                $("#OrganizeList input,#EmpList input").change(function () {
                                    var _ParentID = $(this).attr("data-id");
                                    var _ParentName = $(this).attr("data-name");
                                    ItemSelect($(this).attr("data-id"), $(this).attr("data-name"), $(this).is(":checked"));
                                    if (ismore == "true") {
                                        if ($(this).is(":checked")) {
                                            var isSave = $.inArray(_ParentID, listid);
                                            if (isSave == -1) {
                                                listid.push(_ParentID);
                                            }
                                        }
                                        else {
                                            listid.splice($.inArray(_ParentID, listid), 1);
                                        }
                                    }
                                    else {
                                        listid = [_ParentID];
                                    }
                                });
                            }
                            else {
                                $("#OrganizeList").html('<li class="aui-list-view-cell aui-indexed-list-view-group" style="text-align:center;font-size:15px"><span class="aui-iconfont aui-icon-favorfill aui-text-danger" data-value="*"></span>无数据，请尝试下拉刷新组织架构!</li>');
                            }
                        }
                        catch (e) {
                            alert(e);
                        }
                    }
                }));
                ischange = false;
            }

        }, false)
        searchInput.addEventListener("input", function () {
            var keyword = searchInput.value;
            keyword = (keyword || '').toUpperCase();
            setTimeout(function () {
                var groupElement = indexedWrap.querySelector('[data-group="' + keyword + '"]');
                if (groupElement) {
                    console.log(groupElement.offsetTop);
                    indexedWrap.scrollTop = groupElement.offsetTop;
                }
                else {
                    if (keyword.trim() != "") {
                        ischange = true;
                        var pageinfo = $(searchInput).data("pageinfo") || {};
                        var _options = {
                            PostData: {
                                Params: {
                                    ParentID: pageinfo.parentid,
                                    TypeMode: pageinfo.typemode,
                                    RootID: pageinfo.rootid,
                                    Key: keyword
                                },
                                ProcName: "proc_SOM_Other_Organize",
                                DataType: "DataTable",
                                ExecType: "PROC",
                                Mode: "MSSQL"
                            }
                        };
                        $("#OrganizeList,#EmpList,#IndexList").html("");
                        var _OrganizeHtml = "";
                        var _EmpHtml = {};
                        var _width = (api.winWidth || $(window).width()) - 90;
                        $.when($honesty.AjaxChannel(_options).done(function (_result) {
                            if (_result.Code == "1") {
                                try {
                                    if (_result.Data.length > 0) {
                                        $.each(_result.Data, function (i, item) {
                                            if (item.TypeCode == "Root" || item.TypeCode == "Dept") {
                                                if (_OrganizeHtml == "") {
                                                    _OrganizeHtml = '<li class="aui-list-view-cell aui-indexed-list-view-group"><span class="aui-iconfont aui-icon-favorfill" data-value="*"></span>部门列表</li>';
                                                }
                                                var _icon = "aui-iconfont aui-icon-homefill aui-text-info";
                                                var _ChildCount = "";
                                                if (item.TypeCode == "Dept" && item.ChildCount > 0) {
                                                    _icon = "aui-iconfont aui-icon-shopfill aui-text-warning";
                                                    _ChildCount = "(" + item.ChildCount + ")";
                                                }
                                                else if (item.TypeCode == "Dept" && item.ChildCount == 0) {
                                                    _icon = "aui-iconfont aui-icon-shopfill aui-text-success";
                                                    _ChildCount = "(" + item.ChildCount + ")";
                                                }
                                                if ($.inArray(item.ID, listid) != -1) {
                                                    checked = "checked";
                                                }
                                                else {
                                                    checked = "";
                                                }
                                                _OrganizeHtml += '<li class="aui-list-view-cell">' +
                                                    (typemode == "O" || (typemode == "S" && item.IsShop == "True") ? (
                                                    '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="Dept" data-name="' + item.Name +
                                                    '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                                    '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="ExpandDept" data-id="' + item.ID + '" data-child="' + item.ChildCount + '" data-name="' + item.Name +
                                                    '" data-isshop="' + item.IsShop + '"><i class="' + _icon + '" style="zoom:1.44;margin-right:2px"></i>' + item.Name + _ChildCount + '</div></li>';
                                            }
                                            else if (item.TypeCode == "M" || item.TypeCode == "F") {
                                                if (_EmpHtml[item.SpellCode.substring(0, 1)] == "" || _EmpHtml[item.SpellCode.substring(0, 1)] == undefined) {
                                                    _EmpHtml[item.SpellCode.substring(0, 1)] = '<li class="aui-list-view-cell aui-indexed-list-view-group" id="group-' + item.SpellCode.substring(0, 1) + '" data-group="' + item.SpellCode.substring(0, 1) + '">' + item.SpellCode.substring(0, 1) + '</li>';
                                                }
                                                if ($.inArray(item.ID, listid) != -1) {
                                                    checked = "checked";
                                                }
                                                else {
                                                    checked = "";
                                                }
                                                switch (item.TypeCode) {
                                                    case "M":
                                                        _EmpHtml[item.SpellCode.substring(0, 1)] += '<li class="aui-list-view-cell">' +
                                                            (typemode == "A" || typemode == "C" ? (
                                                            '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="User" data-name="' + item.Name +
                                                            '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                                            '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="Expand" data-id="' + item.ID + '" data-child="0" data-name="' + item.Name + '"><i class="aui-iconfont aui-icon-my aui-bg-info" style="zoom:1.3;margin-right:3px"></i>' + item.Name + '</div></li>';
                                                        break;
                                                    case "F":
                                                        _EmpHtml[item.SpellCode.substring(0, 1)] += '<li class="aui-list-view-cell">' +
                                                            (typemode == "A" || typemode == "C" ? (
                                                            '<input class="aui-pull-right aui-' + ControlType + ' aui-' + ControlType + '-warning" name="User" data-name="' + item.Name +
                                                            '" data-id="' + item.ID + '" type="' + ControlType + '" tapmode ' + checked + '>') : "") +
                                                            '<div style="width:' + _width + 'px;display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" tapmode data-role="Expand" data-id="' + item.ID + '" data-child="0" data-name="' + item.Name + '"><i class="aui-iconfont aui-icon-service aui-bg-danger" style="zoom:1.3;margin-right:3px"></i>' + item.Name + '</div></li>';
                                                        break;
                                                }
                                                if (_EmpHtml["@"] == "" || _EmpHtml["@"] == undefined) {
                                                    _EmpHtml["@"] = '<li class="aui-list-view-cell aui-indexed-list-view-group"><span class="aui-iconfont aui-icon-group" data-value="*"></span>人员列表</li>';
                                                }
                                            }
                                        });
                                        $("#OrganizeList").append(_OrganizeHtml);
                                        for (var i = 64; i < 91; i++) {
                                            $("#EmpList").append(_EmpHtml[String.fromCharCode(i)]);
                                            if (i > 64 && _EmpHtml[String.fromCharCode(i)] != "" && _EmpHtml[String.fromCharCode(i)] != undefined) {
                                                $("#IndexList").append('<a data-value="' + String.fromCharCode(i) + '">' + String.fromCharCode(i) + '</a>');
                                            }
                                        }
                                        api.parseTapmode();
                                        $("#OrganizeList div[data-role='ExpandDept'],#EmpList div[data-role='Expand']").tap(function () {
                                            var _ParentID = $(this).attr("data-id");
                                            var _ChildCount = $(this).attr("data-child");
                                            var _ParentName = $(this).attr("data-name");
                                            var _DataRole = $(this).attr("data-role");
                                            var _IsShop = $(this).attr("data-isshop");
                                            if (_ChildCount == 0) {
                                                if (typemode == "O" || (typemode == "S" && _IsShop == "True")) {
                                                    $("#OrganizeList input[data-id='" + _ParentID + "']").prop("checked", true);
                                                    ItemSelect(_ParentID, _ParentName, true);
                                                    if (ismore == "true") {
                                                        if ($.inArray(_ParentID, listid) == -1) {
                                                            listid.push(_ParentID);
                                                        }
                                                    }
                                                    else {
                                                        listid = [_ParentID];
                                                    }
                                                    return;
                                                }
                                                else if (typemode == "A" || typemode == "C") {
                                                    if (_DataRole == "ExpandDept") {
                                                        $honesty.ShowToast({ msg: "当前部门已不能展开!" });
                                                    }
                                                    else if (ControlType == "checkbox" && $("#EmpList input[data-id='" + _ParentID + "']").is(":checked")) {
                                                        $("#EmpList input[data-id='" + _ParentID + "']").prop("checked", false);
                                                        ItemSelect(_ParentID, _ParentName, false);
                                                        listid.splice($.inArray(_ParentID, listid), 1);
                                                    }
                                                    else {
                                                        $("#EmpList input[data-id='" + _ParentID + "']").prop("checked", true);
                                                        ItemSelect(_ParentID, _ParentName, true);
                                                        if (ismore == "true") {
                                                            if ($.inArray(_ParentID, listid) == -1) {
                                                                listid.push(_ParentID);
                                                            }
                                                        }
                                                        else {
                                                            listid = [_ParentID];
                                                        }
                                                    }
                                                    return;
                                                }
                                                else if ((typemode == "S" && _IsShop != "True")) {
                                                    $honesty.ShowToast({ msg: "当前部门已不能展开!" });
                                                    return;
                                                }
                                            }
                                            $honesty.Organize({
                                                deptname: _ParentName,
                                                rootid: rootid,
                                                parentid: _ParentID,
                                                typemode: typemode,
                                                ismore: ismore,
                                                parentwin: parentwin,
                                                IsFirst: false,
                                                count: count,
                                                listid: listid
                                            });
                                        });
                                        $("#OrganizeList input,#EmpList input").change(function () {
                                            var _ParentID = $(this).attr("data-id");
                                            var _ParentName = $(this).attr("data-name");
                                            ItemSelect($(this).attr("data-id"), $(this).attr("data-name"), $(this).is(":checked"));
                                            if (ismore == "true") {
                                                if ($(this).is(":checked")) {
                                                    var isSave = $.inArray(_ParentID, listid);
                                                    if (isSave == -1) {
                                                        listid.push(_ParentID);
                                                    }
                                                }
                                                else {
                                                    listid.splice($.inArray(_ParentID, listid), 1);
                                                }
                                            }
                                            else {
                                                listid = [_ParentID];
                                            }
                                        });
                                    }
                                    else {
                                        $("#OrganizeList").html('<li class="aui-list-view-cell aui-indexed-list-view-group" style="text-align:center;font-size:15px"><span class="aui-iconfont aui-icon-favorfill aui-text-danger" data-value="*"></span>无数据，请尝试下拉刷新组织架构!</li>');
                                    }
                                }
                                catch (e) {
                                    alert(e);
                                }
                            }
                        }));
                    }
                }
            }, 100)
        }, false)
        bar.style.height = newBarH + "px";
        bar.style.top = "50%";
        bar.style.marginTop = "-" + ((newBarH - searchWrap.offsetHeight) / 2) + "px";
        bar.addEventListener('touchstart', function (event) {
            bar.style.opacity = "1";
            scrollTop(event);
        }, false);
        // 监听bar滑动
        bar.addEventListener('touchmove', function (event) {
            scrollTop(event);
        }, false);
        document.body.addEventListener('touchend', function (event) {
            removeToast(event);
        }, false);
        document.body.addEventListener('touchcancel', function (event) {
            removeToast(event);
        }, false);
    }
    var scrollTop = function (event) {
        event.preventDefault();
        var clientX = event.changedTouches[0].clientX;
        var clientY = event.changedTouches[0].clientY;
        var _thisBar = document.elementFromPoint(clientX, clientY);
        if (clientX < window.innerWidth & clientY < window.innerHeight & clientY > 0) {
            var thisValue = _thisBar.getAttribute("data-value");
            if (thisValue) {
                var groupElement = indexedWrap.querySelector('[data-group="' + thisValue + '"]');
                if (thisValue != 'search' & thisValue != '*') {
                    document.querySelector(".aui-indexed-list-toast").textContent = thisValue;
                    document.querySelector(".aui-indexed-list-toast").classList.add("active");
                    document.querySelector(".aui-indexed-list-toast").style.top = clientY + 'px';
                }
                if (groupElement) {
                    indexedWrap.scrollTop = groupElement.offsetTop;
                }
            } else {
                document.querySelector(".aui-indexed-list-toast").textContent = '';
                document.querySelector(".aui-indexed-list-toast").classList.remove("active");
            }
        }
    }
    var removeToast = function (event) {
        bar.style.opacity = "0.6";
        document.querySelector(".aui-indexed-list-toast").classList.remove("active");
        bar.classList.remove('active');
    }
    _init();
    window.$aui = aui;
})(window);
