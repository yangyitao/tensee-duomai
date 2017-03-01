/// <reference path="api.js" />
/// <reference path="zepto.js" />
/// <reference path="honesty.base.js" />
function CloseWin() {
    $honesty.CloseWin();
}
function PostWageLevel(options) {
    var Setting = $honesty.GetSetting();
    var _opts = {};
    var defaults = {
        ZYear: "2016",
        ZMonth: "6",
        OrganizeID: ""
    }
    _opts = $.extend(defaults, options);
    var result;
    $.ajax({
        type: "POST",
        url: (Setting.SysMode == "QAS" ? Setting.QASSite : Setting.PRDSite) + Setting.WageChannel,
        data: JSON.stringify(_opts),
        timeout: 60000,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
        },
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