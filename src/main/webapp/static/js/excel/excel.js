var excel = "";
var idTmr;

function method5(tableid) {
    $("#toExcel").append(excel);
    if (getExplorer() == 'ie') {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;

        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }
    } else {
        tableToExcel(tableid);
    }
    $("#toExcel").empty();
}

//赋值全局变量excel
function toExcel(list) {
    excel = "";
    for (var i = 0; i < list.length; i++) {
        excel += '<tr><td style="mso-number-format: \'\@\';">' + list[i].account + '</td>';
        excel += "<td style='mso-number-format: \"\@\";'>" + list[i].pwd + "</td></tr>";
    }
}

var tableToExcel = (function () {
    var uri = "data:application/vnd.ms-excel;base64,"
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
        '<head>' +
        '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">'
        +'<xml><x:ExcelWorkbook><x:ExcelWorksheets> <x:ExcelWorksheet><x:Name>创建用户</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>'+
        '</head>' +
        '<body><table>{table}</table></body></html>',
        base64 = function (s) {
            return window.btoa(unescape(encodeURIComponent(s)))
        },
        format = function (s, c) {
            return s.replace(/{(\w+)}/g,
                function (m, p) {
                    return c[p];
                })
        }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
        var link = document.createElement("a");
        link.href = uri + base64(format(template, ctx));
        link.style = "visibility:hidden";
        link.download = "创建用户-"+(new Date()).valueOf()+".xls";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
//            window.location.href = uri + base64(format(template, ctx));
    }
})()

function getExplorer() {
    var explorer = window.navigator.userAgent;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}