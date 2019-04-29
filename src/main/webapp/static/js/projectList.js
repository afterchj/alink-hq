/**
 * Created by qian.chen on 2019/4/28.
 */
//日期选择
laydate.render({
    elem: '#start-time',//指定元素
    range: true
});
laydate.render({
    elem: '#end-time',//指定元素
    range: true
});
$('.one-list li').each(function () {
    var tab = $(this).attr('tab');
    if (tab == 'projectList') {
        $(this).addClass('active').siblings().removeClass('active');
    }
})



$(function () {
    var allChecked = false;
    var accountNum=0;
    //复选框监听--监听全选
    $('#all').click(function () {
        var checked = $(this).prop('checked');
        if (checked) {
            var length= $('tbody tr').length-1;
            accountNum=length;
            $('tbody .checkbox input').each(function () {
                $(this).prop('checked', true);
            })
        } else {
            accountNum=0;
            $('tbody .checkbox input').each(function () {
                $(this).prop('checked', false);
            })
        }
        $('.amount').text(accountNum);
    })
    //复选框监听--监听单选
    $('tbody .checkbox input').click(function () {
        var checked=$(this).prop('checked');
        if(checked){
            accountNum++;
        }else{
            accountNum--;
        }
        $('tbody .checkbox input').each(function () {
            var otherChecked = $(this).prop('checked');
            if (!otherChecked) {
                allChecked = true;
            }else{
                allChecked = false;
            }
        })
        $('.amount').text(accountNum);
        if(!allChecked){
            $('#all').prop('checked',true);
        }else{
            $('#all').prop('checked',false);
        }
    })
})


$(function () {
    myBrowser()
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == 'projectList') {
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
})
$('.on-off-triangle').click(function () {
    var imgUrl = $(this).attr('src');
    if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
        $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
        $(this).parent().parent('.one-list').find('.two-list').addClass('active');
    } else {
        $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
        $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
    }
})


//条件筛选
$(function () {
    var url = window.location.href;
    var account = GetUrlParam("account");
    var projectName = decodeURIComponent(GetUrlParam("projectName"));
    var startCreateDate = GetUrlParam("startCreateDate");
    var endCreateDate = GetUrlParam("endCreateDate");
    var startUpdateDate = GetUrlParam("startUpdateDate");
    var endUpdateDate = GetUrlParam("endUpdateDate");
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    var sortFlag = GetUrlParam("sortFlag");
    $('#skipPage').val(pageNum);
    $('#page-select option').each(function () {
        if ($(this).val() == pageSize) {
            $(this).attr("selected", "selected");
        }
    })
    if (startCreateDate != '' && endCreateDate != '') {
        var startTime = startCreateDate + ' - ' + endCreateDate;
        $('#start-time').val(startTime);
    }
    if (startUpdateDate != '' && endUpdateDate != '') {
        var endTime = startUpdateDate + ' - ' + endUpdateDate;
        $('#end-time').val(endTime);
    }
    $('#account').val(account);
    $('#projectName').val(projectName);
    $('.toTop').click(function () {
        var sortFlag = '1';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
    $('.toBottom').click(function () {
        var sortFlag = '';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
    $('.toBottom1').click(function () {
        var sortFlag = '2';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
    $('.toTop1').click(function () {
        var sortFlag = '3';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
    //查询按钮点击
    $('.search-button button').click(function () {
        var sortFlag = GetUrlParam("sortFlag");
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
    //选择页数变化
    $('#page-select').change(function () {
        var sortFlag = GetUrlParam("sortFlag");
        var pageSize = $(this).children('option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    });
    //跳转页数变化
    $('#skipPageBtn').click(function () {
        var sortFlag = GetUrlParam("sortFlag");
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum, sortFlag);
    })
})
$(function () {
    //重命名
    var projectId;
    var account;
    // var projectName;
    $('.reset-name').click(function () {
        projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        // projectName=$(this).parent().siblings('.project-name').find('a').text();
        account = $(this).parent().siblings('.project-account').text();
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    })
    //取消按钮
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    //弹框重命名里操作
    $('.pop-btn .yes').click(function () {
        var rename = $('#rename').val();
        var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
        var renameResult = regName.test(rename);
        if (rename == '') {
            $('p.rename-hint').text('请输入新名称');
        } else if (rename != '' && !renameResult) {
            $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
        } else {
            $('p.rename-hint').text('');
            console.log(projectId);
            $.ajax({
                type: "POST",
                url: "/alink-hq/project/rename",
                data: {projectId: projectId, projectName: rename, account: account},
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.result == '000') {
                        $('p.rename-hint').text('');
                        location.reload();
                    } else if (res.result == '306') {
                        $('p.rename-hint').text('已存在，请重新输入');
                    }
                }
            });
        }
    })
    $('.delete-project').click(function () {
        $('div[openContent="delete-project"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    })
})
//重命名校验
function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
    } else {
        $('p.rename-hint').text('');
    }
}
//查询条件
function condition(pageSize, pageNum, sortFlag) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1);
    } else {
        var url2 = url + '?';
    }
    var account = $('#account').val();
    var projectName = $('#projectName').val();
    var startTime = $('#start-time').val();
    var startCreateDate = startTime.substring(0, 10);
    var endCreateDate = startTime.substring(13, 23);
    var endTime = $('#end-time').val();
    var startUpdateDate = endTime.substring(0, 10);
    var endUpdateDate = endTime.substring(13, 23);
    var newUrl = url2 + '&pageNum=' + pageNum + '&sortFlag=' + sortFlag + '&pageSize=' + pageSize + '&projectName=' + projectName + '&account=' + account + '&startCreateDate=' + startCreateDate + '&endCreateDate=' + endCreateDate + '&startUpdateDate=' + startUpdateDate + '&endUpdateDate=' + endUpdateDate;
    location.href = newUrl;
}
$('.moment').mousedown(function(){
    var url=$(this).attr('src');
    var newUrl=url.substr(0, url.length-4)+'-un.png';
    console.log(url);
    console.log(newUrl);
    $(this).attr('src',newUrl);
})
// $('.moment').mouseover(function(){
//     var url=$(this).attr('src');
//     var newUrl=url.substr(0, url.length-7)+'.png';
//     $(this).attr('src',newUrl);
// })
// function mouseDown() {
//     // $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip-color.png');
// }
// function mouseUp() {
//     // $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip.png');
// }
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
function skipLimit() {
    var skipPage = parseInt($('#skipPage').val());
    var pageTotal = parseInt($('.pageTotal').text());
    console.log(skipPage, pageTotal)
    if (skipPage < 1 || skipPage > pageTotal) {
        $('#skipPage').val('');
    }
}