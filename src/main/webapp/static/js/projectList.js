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
//    $(function() {
//        //复选框
//        var dataAccount = 0;
//        $('.checkbox img').click(function () {
//            var hasCheckbox = false;
//            var imgUrl = $(this).attr('src');
//            var isCheckbox = '/alink-hq/static/img/checkbox-gou.png';
//            var noCheckbox = '/alink-hq/static/img/checkbox.png';
//            if (imgUrl == noCheckbox) {
//                $(this).attr('src', isCheckbox);
//                dataAccount++;
//            } else {
//                $(this).attr('src', noCheckbox);
//                dataAccount--;
//            }
//            $('tbody .checkbox img').each(function () {
//                var imgUrl2 = $(this).attr('src');
//                if (imgUrl2 == noCheckbox) {
//                    hasCheckbox = true;
//                }
//            })
//            if (!hasCheckbox) {
//                $('.all-checkbox img').attr('src', isCheckbox);
//            } else {
//                $('.all-checkbox img').attr('src', noCheckbox);
//            }
//            $('.amount').text(dataAccount);
//        })
//        $('.all-checkbox img').click(function () {
//            var imgUrl = $(this).attr('src');
//            var isCheckbox = '/alink-hq/static/img/checkbox-gou.png';
//            var noCheckbox = '/alink-hq/static/img/checkbox.png';
//            if (imgUrl == noCheckbox) {
//                dataAccount=$('tbody tr').length;
//                $(this).attr('src', isCheckbox);
//                $('tbody .checkbox img').each(function () {
//                    $(this).attr('src', isCheckbox);
//                })
//            } else {
//                dataAccount=0;
//                $(this).attr('src', noCheckbox);
//                $('tbody .checkbox img').each(function () {
//                    $(this).attr('src', noCheckbox);
//                })
//            }
//            $('.amount').text(dataAccount);
//        })
//    })

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
    $('.toTop').click(function(){
        var sortFlag='1';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum,sortFlag);
    })
    $('.toBottom').click(function(){
        var sortFlag='';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum,sortFlag);
    })
    $('.toBottom1').click(function(){
        var sortFlag='2';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum,sortFlag);
    })
    $('.toTop1').click(function(){
        var sortFlag='3';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum,sortFlag);
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
//            console.log('pageNum',pageNum);
        condition(pageSize, pageNum,sortFlag);
    })
    //选择页数变化
    $('#page-select').change(function () {
        var pageSize = $(this).children('option:selected').val();
        var pageNum = parseInt($('#skipPage').val());
        condition(pageSize, pageNum);
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
        condition(pageSize, pageNum,sortFlag);
    })
})
function condition(pageSize, pageNum,sortFlag) {
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
    var newUrl = url2 + '&pageNum=' + pageNum+'&sortFlag='+sortFlag + '&pageSize=' + pageSize + '&projectName=' + projectName + '&account=' + account + '&startCreateDate=' + startCreateDate + '&endCreateDate=' + endCreateDate + '&startUpdateDate=' + startUpdateDate + '&endUpdateDate=' + endUpdateDate;
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