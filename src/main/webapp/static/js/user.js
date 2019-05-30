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
    //获取输入内容
    var content = $(".wishContent").val();
    var account = $("#memo-account").val();
    $.ajax({
        type: "POST",
        url: "/alink-hq/account/saveMemo",
        data: {account: account, content: content},
        dataType: "json",
        success: function (res) {
            console.log(res);
            if (res.result == '000') {
                location.reload();
            }
        }
    });
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
        // console.log(openContent, open);
        if (openContent == open) {
            $(this).addClass('active');
            if (open == 'start-use') {
                // console.log(text);
                $('.pop-content').find('p.unuse').remove();
                if (text == '启用') {
                    $(' .off-or-on').text('您确定要禁用该账户吗？');
                    var content = '<p class="unuse" style="  font-size: 14px;color: #fb2a2a;margin-top:10px;">禁用后，该账号将无法登录</p>';
                    $(' .pop-content').append(content);
                } else {
                    $(' .off-or-on').text('您确定要启用该账户吗？');
                }
            }
        }
    })
}
$(function () {
    var account = '';
    var status = '';
    var intStatus = '';
    //启用禁用按钮
    $('td[openTab="start-use"]').click(function () {
        var openTab = $(this).attr('openTab');
        var text = $(this).find('.result').text();
        shade(openTab, text);
        account = $(this).siblings('.use-account').text();
        status = $(this).find('.result').text();
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
        $('div[openContent="reset-pwd"] .pop-content').find('p.unuse').remove();
        $('div[openContent="reset-pwd"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
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
        $('div[openContent="delete-account"] .pop-content').find('p.unuse').remove();
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
    var page = parseInt($('.pages').text());
    var pageTotal = parseInt($('.pageTotal').text());
    if (page == 1) {
        $('.prev').removeClass('active');
        $(".prev-page").addClass('disabled');

    } else {

        $('.prev').addClass('active');
    }
    if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next-page").addClass('disabled');

    } else {

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
    var uname = GetUrlParam("uname");
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
    $('#username').val(decodeURI(uname));
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
        if (!pageNum) {
            pageNum = 1;
        }
        if (!pageSize) {
            pageSize = 10;
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

function condition(pageSize, pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1);
    } else {
        var url2 = url + '?';
    }
    var account = $('#account').val();
    var uname = $('#username').val();
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
    var newUrl = url2 + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&account=' + account + '&uname=' + uname + '&fid=' + company + '&roleId=' + role + '&startDate=' + startDate + '&endDate=' + endDate;
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
$(function () {
    //如果备忘录为空时
    // $('.memo-edit').click(function(){
    //     $('div[openContent="memo-edit"]').addClass('active');
    //     var width = window.screen.width;
    //     var height = window.screen.height;
    //     $('.hide-iframe').addClass('active');
    //     $('.hide-iframe').css({
    //         'width': width,
    //         'height': height
    //     })
    // })
    // $('div[openContent="memo-edit"] button.reduce').click(function(){
    //     $('div[openContent="memo-edit"]').removeClass('active');
    //     $('.hide-iframe').removeClass('active');
    // })
    //如果备忘录不为空时
    $('.memo-edit').click(function (event) {
        event.stopPropagation();
        $(this).parent('td').addClass('active');
        $(this).parent().parent('tr').siblings('tr').children('td').removeClass('active');

    })
    $('body').click(function () {
        $('.memo-edit-has').parent('td').removeClass('active');
    })
    $('.meno-nav img,.memo-edit2').click(function (event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').addClass('active');
        $('div[openContent="memo-edit"] .pop-content').find('p.unuse').remove();
        $(".wishContent").text('');
        var content = $(this).parent().siblings('div').text();
        var account = $(this).parents('tr').children('td').eq(0).text();
        if (content != '') {
            $(".wishContent").val(content);
        }
        $("#memo-account").val(account);
        $(".wordsNum").html(checkStrLengths(content, 200) + '/200');
        var width = window.screen.width;
        var height = window.screen.height;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
})

//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {
    //获取输入内容
    var userDesc = $(this).val();
    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200);
    } else {
        len = 0
    }
    // console.log(len);
    //显示字数
    $(".wordsNum").html(len + '/200');
});

$('.search-result table td.status1').on({
    mouseover: function () {
        var text = $(this).find('.result').text();
        $(this).find('.end').addClass('active');
        // $(this).find('.result').css('color','#999');
    },
    mouseout: function () {
        // $(this).find('.result').css('color','#0B78CE');
        $(this).find('.end').removeClass('active');
    }
})
