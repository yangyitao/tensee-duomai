/// <reference path="api.js" />
/// <reference path="zepto.js" />
/// <reference path="honesty.base.js" />
function SmartUpdate() {
    var Setting = $honesty.GetSetting();
    var _options = {
        Params:
            {
                result: "InitFileList"
            },
        ProcName: "proc_SOM_Sys_FileLibrary",
        DataType: "DataTable",
        ExecType: "PROC",
        Mode: "MSSQL"
    }
    $.ajax({
        type: "POST",
        url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.AjaxChannel,
        data: JSON.stringify(_options),
        timeout: 60000,
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
        success: function (_result) {
            var data = {};
            api.readFile({
                path: "widget://config.txt"
            }, function (ret, err) {
                if (ret.status) {
                    try {
                        data = eval('(' + ret.data + ')');
                    }
                    catch (e) {

                    }
                    if (_result.Code == "1") {
                        if (_result.Data.length > 0) {
                            $.each(_result.Data, function (i, item) {
                                var _FileObject = data[item.FileID] || undefined;
                                if (_FileObject != undefined && _FileObject != null) {
                                    if (_FileObject.ModifyDate != item.ModifyDate) {
                                        api.download({
                                            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + item.NetworkPath,
                                            savePath: api.wgtRootDir + "/" + item.FilePath,
                                            report: true,
                                            cache: false,
                                            allowResume: false
                                        }, function (downret, downerr) {
                                            if (downret) {
                                                if (downret.state == "1") {
                                                    data[item.FileID] = {};
                                                    data[item.FileID]["ModifyDate"] = item.ModifyDate;
                                                    data[item.FileID]["FileName"] = item.FileName;
                                                    data[item.FileID]["FilePath"] = item.FilePath;
                                                    data[item.FileID]["NetworkPath"] = item.NetworkPath;
                                                    api.writeFile({
                                                        path: "widget://config.txt",
                                                        data: JSON.stringify(data)
                                                    }, function (writeret, writeerr) {

                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                                else {
                                    api.download({
                                        url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + item.NetworkPath,
                                        savePath: api.wgtRootDir + "/" + item.FilePath,
                                        report: true,
                                        cache: false,
                                        allowResume: false
                                    }, function (downret, downerr) {
                                        if (downret) {
                                            if (downret.state == "1") {
                                                data[item.FileID] = {};
                                                data[item.FileID]["ModifyDate"] = item.ModifyDate;
                                                data[item.FileID]["FileName"] = item.FileName;
                                                data[item.FileID]["FilePath"] = item.FilePath;
                                                data[item.FileID]["NetworkPath"] = item.NetworkPath;
                                                api.writeFile({
                                                    path: "widget://config.txt",
                                                    data: JSON.stringify(data)
                                                }, function (writeret, writeerr) {
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
                else {
                    if (_result.Code == "1") {
                        if (_result.Data.length > 0) {
                            $.each(_result.Data, function (i, item) {
                                var _FileObject = data[item.FileID] || undefined;
                                if (_FileObject != undefined && _FileObject != null) {
                                    if (_FileObject.ModifyDate != item.ModifyDate) {
                                        api.download({
                                            url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + item.NetworkPath,
                                            savePath: api.wgtRootDir + "/" + item.FilePath,
                                            report: true,
                                            cache: false,
                                            allowResume: false
                                        }, function (downret, downerr) {
                                            if (downret) {
                                                if (downret.state == "1") {
                                                    data[item.FileID] = {};
                                                    data[item.FileID]["ModifyDate"] = item.ModifyDate;
                                                    data[item.FileID]["FileName"] = item.FileName;
                                                    data[item.FileID]["FilePath"] = item.FilePath;
                                                    data[item.FileID]["NetworkPath"] = item.NetworkPath;
                                                    api.writeFile({
                                                        path: "widget://config.txt",
                                                        data: JSON.stringify(data)
                                                    }, function (writeret, writeerr) {
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                                else {
                                    api.download({
                                        url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + item.NetworkPath,
                                        savePath: api.wgtRootDir + "/" + item.FilePath,
                                        report: true,
                                        cache: false,
                                        allowResume: false
                                    }, function (downret, downerr) {
                                        if (downret) {
                                            if (downret.state == "1") {
                                                data[item.FileID] = {};
                                                data[item.FileID]["ModifyDate"] = item.ModifyDate;
                                                data[item.FileID]["FileName"] = item.FileName;
                                                data[item.FileID]["FilePath"] = item.FilePath;
                                                data[item.FileID]["NetworkPath"] = item.NetworkPath;
                                                api.writeFile({
                                                    path: "widget://config.txt",
                                                    data: JSON.stringify(data)
                                                }, function (writeret, writeerr) {
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        },
        error: function (XMLHttpRequest, textStatus, thrownError) {
        }
    });
}