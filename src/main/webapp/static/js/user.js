/**
 * Created by qian.chen on 2019/5/6.
 */
//日期选择
laydate.render({
    elem: '#add-time',
    range: true
});
function hide() {
    $('.hide-iframe').removeClass('active');
    $('.confirm-create-iframe').removeClass('active');
}

$('.close').click(function () {
    hide();
})
// 点击取消时
$('.pop-content  .pop-btn .reduce').click(function () {
    hide();
    $(this).parents('.pop-iframe').removeClass('active');
})
// 点击确定时
$('.pop-content  .pop-btn .yes').click(function () {
    hide();
    $(this).parents('.pop-iframe').removeClass('active');
})
function shade(open, text) {
    var width = document.body.scrollWidth;
    var height = document.body.scrollHeight;
    $('.hide-iframe').addClass('active');
    $('.hide-iframe').css({
        'width': width,
        'height': height
    });
    $('.pop-iframe').each(function () {
        var openContent = $(this).attr('openContent');
        console.log(openContent, open);
        if (openContent == open) {
            $(this).addClass('active');
            if (open == 'start-use') {
                console.log(text);
                if (text == '启用') {
                    $('.off-or-on').text('您确定要禁用该账户吗？');
                    var content = '<p style="  font-size: 15px;color: #fb2a2a;margin-top:30px;">禁用后，该账号将无法登录</p>';
                    $('.off-or-on').after(content);
                } else {
                    $('.off-or-on').text('您确定要启用该账户吗？');
                }
            }
        }
    })
}
$(function () {
    var account = '';
    var status = '';
    var intStatus = '';
    $('td[openTab="start-use"]').click(function () {
        var openTab = $(this).attr('openTab');
        var text = $(this).text();
        shade(openTab, text);
        account = $(this).siblings('.use-account').text();
        status = $(this).text();

        if (status == '启用') {
            intStatus = 1;
        } else if (status == '禁用') {
            intStatus = 0;
        }
    })
    $('div[openContent="start-use"] button.yes').click(function () {
        $.ajax({
            type: "POST",
            url: "/alink-hq/account/enable",
            data: {account: account, status: intStatus},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.result == '000') {
                    location.reload();
                }
            }
        });
    })
})

$(function () {
    var account = '';
    $('img[openTab="reset-pwd"]').click(function () {
        var openTab = $(this).attr('openTab');
        shade(openTab);
        account = $(this).parent().siblings('.use-account').text();
    })
    $('div[openContent="reset-pwd"] button.yes').click(function () {
        $('div[openContent="new-pwd"]').addClass('active');
        $('.hide-iframe').addClass('active');
        $.ajax({
            type: "POST",
            url: "/alink-hq/account/resetPwd",
            data: {account: account},
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res.result == '000') {
                    var pwd = res.pwd;
                    var account = res.account;
                    $('.t-account-result').text(account);
                    $('.t-pwd-result').text(pwd);
                }
            }
        });
    })
})
$(function () {
    var account;
    $('img[openTab="delete-account"]').click(function () {
        var openTab = $(this).attr('openTab');
        shade(openTab);
        account = $(this).parent().siblings('.use-account').text();
    })
    $('div[openContent="delete-account"] button.yes').click(function () {
        $.ajax({
            type: "POST",
            url: "/alink-hq/account/delete",
            data: {account: account},
            dataType: "json",
            success: function (data) {
                console.log(data.result);
                if (data.result == '303') {
                    //移交
                    $('div[openContent="delete-account-hasProject"]').addClass('active');
                    $('div[openContent="delete-account"]').removeClass('active');
                } else if (data.result == '000') {
                    location.reload();
                }
            }
        });
    })
    $('div[openContent="delete-account-hasProject"] button.yes').click(function () {
        location.href = '/alink-hq/project/list';
    })
})
$(function () {
    // myBrowser()
    var tabs = "userList";
    var index = 1;
    left(tabs, index);
})

$(function () {
    var page = parseInt($('.pages').text());
    var pageTotal = parseInt($('.pageTotal').text());
    if (page == 1) {
        // $('.prev-page img').attr('src', '/alink-hq/static/img/left-arrow.png');
        // $(".prev-page ").addClass('disabled');
        $('.prev').removeClass('active');
        $(".prev-page").addClass('disabled');

    } else {
        // $('.prev-page img').attr('src', '/alink-hq/static/img/left-arrow-color.png');
        $('.prev').addClass('active');
    }
    if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next-page").addClass('disabled');
        // $('.next-page img').attr('src', '/alink-hq/static/img/right-arrow.png');
        // $(".next-page ").addClass('disabled');
    } else {
        // $('.next-page img').attr('src', '/alink-hq/static/img/right-arrow-color.png');
        $(".next").addClass('active');
    }
})


function skipLimit() {
    var skipPage = parseInt($('#skipPage').val());
    var pageTotal = parseInt($('.pageTotal').text());
    if (skipPage < 1 || skipPage > pageTotal) {
        $('#skipPage').val('');
    }
}

//条件筛选
$(function () {
    var url = window.location.href;
    var account = GetUrlParam("account");
    var company = GetUrlParam("fid");
    var role = GetUrlParam("roleId");
    var startDate = GetUrlParam("startDate");
    var endDate = GetUrlParam("endDate");
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    $('#skipPage').val(pageNum);
    $('#page-select option').each(function () {
        if ($(this).val() == pageSize) {
            $(this).attr("selected", "selected");
        }
    })
    if (startDate != '' && endDate != '') {
        var addTime = startDate + ' - ' + endDate;
        $('#add-time').val(addTime);
    }
    $('#account').val(decodeURI(account));

    if (role == '') {
        $('#role option').eq(0).prop('selected', true);
    } else {
        $('#role').val(role);
    }
    if (company == '') {
        $('#company option').eq(0).prop('selected', true);
    } else {
        $('#company').val(company);
    }

    // $('table tr td.role').each(function () {
    //     var roleId = parseInt($(this).text());
    //     if (roleId == 4) {
    //         $(this).text('施工人员');
    //     } else if (roleId == 3) {
    //         $(this).text('乙方管理员');
    //     } else if (roleId == 2) {
    //         $(this).text('管理员');
    //     }
    // })
    $('table tr td.status').each(function () {
        var status = parseInt($(this).text());
        if (status == 1) {
            $(this).text('启用');
        } else if (status == 0) {
            $(this).text('禁用');
        }
    })
    //查询按钮点击
    $('.search-button button').click(function () {
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if(!pageNum){
            pageNum=1;
        }
        if(!pageSize){
            pageSize=10;
        }
        condition(pageSize, pageNum);
    })
//选择页数变化
    $('#page-select').change(function () {
        var pageSize = $(this).children('option:selected').val();
        var pageNum = $('#skipPage').val();
        condition(pageSize, pageNum);
    });
//跳转页数变化
    $('#skipPageBtn').click(function () {
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        condition(pageSize, pageNum);
    })

})

function mouseDown() {
    $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip-color.png');
}
function mouseUp() {
    $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip.png');
}

function condition(pageSize, pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1);
    } else {
        var url2 = url + '?';
    }
    var account = $('#account').val();
    if ($('#company').val() != '请选择公司') {
        var company = $('#company').val();
    } else {
        var company = '';
    }
    if ($('#role').val() != '请选择角色') {
        var role = $('#role').val();
    } else {
        var role = '';
    }
    var addTime = $('#add-time').val();
    var startDate = addTime.substring(0, 10);
    var endDate = addTime.substring(13, 23);
    var newUrl = url2 + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&account=' + account + '&fid=' + company + '&roleId=' + role + '&startDate=' + startDate + '&endDate=' + endDate;
    location.href = newUrl;
}

//paraName 等找参数的名称
function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}