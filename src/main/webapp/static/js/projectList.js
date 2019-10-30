/**
 * Created by qian.chen on 2019/4/28.
 */
//日期选择
laydate.render({
    elem: '#start-time',
    range: true
});
laydate.render({
    elem: '#end-time',
    range: true
});


$(function () {
    var accountNum=0;
    $('tbody .checkbox input').each(function () {
        if($(this).prop('checked')){
            accountNum++;
        }
    })
    $('.amount').text(accountNum);
    //复选框监听--监听全选
    $('#all').click(function () {
        var checked = $(this).prop('checked');
        if (checked) {
            var length = $('tbody tr').length;
            accountNum = length;
            $('tbody .checkbox input').each(function () {
                $(this).prop('checked', true);
            })
        } else {
            accountNum = 0;
            $('tbody .checkbox input').each(function () {
                $(this).prop('checked', false);
            })
        }
        $('.amount').text(accountNum);
    })
    //复选框监听--监听单选
    $('tbody .checkbox input').click(function () {
        var allChecked = true;
        var checked = $(this).prop('checked');
        if (checked) {
            accountNum++;
        } else {
            accountNum--;
        }
        $('tbody .checkbox input').each(function () {
            var otherChecked = $(this).prop('checked');
            if (!otherChecked) {
                allChecked = false;
            }
        })
        $('.amount').text(accountNum);
        if (!allChecked) {
            $('#all').prop('checked', false);
        } else {
            $('#all').prop('checked',true );
        }
    })
})

//条件筛选
$(function () {
    var url = window.location.href;
    var account = decodeURIComponent(GetUrlParam("account"));
    var uname = decodeURIComponent(GetUrlParam("uname"));
    var projectName = decodeURIComponent(GetUrlParam("projectName"));
    var coname = decodeURIComponent(GetUrlParam("coname"));
    var startCreateDate = GetUrlParam("startCreateDate");
    var endCreateDate = GetUrlParam("endCreateDate");
    var startUpdateDate = GetUrlParam("startUpdateDate");
    var endUpdateDate = GetUrlParam("endUpdateDate");
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    var sortFlag = GetUrlParam("sortFlag");
    // console.log(sortFlag);
    if(sortFlag==''){
        $('.toBottom').attr('src','/alink-hq/static/img/unfold-color.png');
        $('.toTop').attr('src','/alink-hq/static/img/fewer.png');
        $('.toBottom1').attr('src','/alink-hq/static/img/unfold.png');
        $('.toTop1').attr('src','/alink-hq/static/img/fewer.png');
    }else if(sortFlag == '1'){
        $('.toTop').attr('src','/alink-hq/static/img/fewer-color.png');
        $('.toBottom').attr('src','/alink-hq/static/img/unfold.png');
        $('.toBottom1').attr('src','/alink-hq/static/img/unfold.png');
        $('.toTop1').attr('src','/alink-hq/static/img/fewer.png');
    }else if(sortFlag == '2'){
        $('.toBottom1').attr('src','/alink-hq/static/img/unfold-color.png');
        $('.toTop').attr('src','/alink-hq/static/img/fewer.png');
        $('.toBottom').attr('src','/alink-hq/static/img/unfold.png');
        $('.toTop1').attr('src','/alink-hq/static/img/fewer.png');
    }else if(sortFlag == '3'){
        $('.toTop1').attr('src','/alink-hq/static/img/fewer-color.png');
        $('.toTop').attr('src','/alink-hq/static/img/fewer.png');
        $('.toBottom').attr('src','/alink-hq/static/img/unfold.png');
        $('.toBottom1').attr('src','/alink-hq/static/img/unfold.png');
    }
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
    $('#username').val(uname);
    $('#company').val(coname);
    $('.toTop').click(function () {
        var sortFlag = '1';
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, 1, sortFlag);
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
        condition(pageSize, 1, sortFlag);
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
        condition(pageSize, 1, sortFlag);
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
        condition(pageSize, 1, sortFlag);
    })
    //查询按钮点击
    $('.search-button button').click(function () {
        var sortFlag = GetUrlParam("sortFlag");
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        if(!pageNum){
            pageNum ='';
        }
        if(!pageSize){
            pageSize='';
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
    var projectId;
    var account;
    var deleteArray=[];
    //重命名弹框
    $('.reset-name').click(function () {
        $('#rename').attr('placeholder','请输入 2-16 位汉字、字母、数字');
        $('#rename').val('');
        projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        account = $(this).parent().siblings('.project-account').text();
        var selector= $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
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
    //删除项目弹框
    $('.delete-pop').click(function () {
        projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        account = $(this).parent().siblings('.project-account').text();
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的项目吗？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后项目中所有信息将无法恢复，请慎重！')
        var msg = {
            id: projectId,
            account: account
        }
        deleteArray.push(msg);
        if(deleteArray.length!=0){
            var selector=$('div[openContent="delete-pop"]');
            selector.addClass('active');
            adjust(selector)
            showOverlay()
        }
    })
    //确定删除
    $('div[openContent="delete-pop"] .yes').click(function () {
        var newJsonArray = JSON.stringify(deleteArray);
        $.ajax({
            type: "POST",
            url: "/alink-hq/project/delete",
            data: {projectInfo: newJsonArray},
            dataType: "json",
            success: function (res) {
                if (res.result == '000') {
                    location.reload();
                    $('tbody tr td.checkbox input').prop('checked',false);
                    $('#all').prop('checked',false);
                } else if (res.result == '200') {
                    console.log('系统错误');
                } else if(res.result=='120'){
                    $('div[openContent="delete-pop"]').removeClass('active');
                    // hideOverlay();
                    var selector=$('div[openContent="noDelete-pop"]');
                    $('div[openContent="noDelete-pop"] .reset-pwd p').text('该项目下有灯，不可删除！');
                    selector.addClass('active');
                    adjust(selector);
                    console.log('有灯存在');
                }
            }
        })
    })
    $('div[openContent="noDelete-pop"] .yes').click(function(){
        $('div[openContent="noDelete-pop"]').removeClass('active');
        hideOverlay();
    })
    //移交单个
    $('.exchange-project').click(function () {
        var jsonArray = [];
        var ids = [];
        var id = $(this).parent('td').siblings('.project-id').text();
        ids.push(id);
        location.href = '/alink-hq/project/transferPage?ids=' + ids;
    })
    //删除多个弹框
    $('#delete-pop').click(function () {
        $('tbody tr td.checkbox input').each(function () {
            var checked = $(this).prop('checked');
            if (checked) {
                var account = $(this).parent('td').siblings('.project-account').text();
                var projectId =  parseInt($(this).parent('td').siblings('.project-id').text());
                var msg = {
                    id: projectId,
                    account: account
                }
                deleteArray.push(msg);
            }
        })
        if(deleteArray.length!=0){
            var selector=$('div[openContent="delete-pop"]');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的项目吗？');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后项目中所有信息将无法恢复，请慎重！')
            selector.addClass('active');
            adjust(selector)
            showOverlay()
        }
    })

    //移交项目多个
    $('#transfer-project').click(function () {
        var num = 0;
        var ids = [];
        // var jsonArray = [];
        $('tbody tr td.checkbox input').each(function () {
            var checked = $(this).prop('checked');
            if (checked) {
                num++;
                var id = $(this).parent('td').siblings('.project-id').text();
                ids.push(id);
            }
        })
        if(ids.length!=0){
            location.href = '/alink-hq/project/transferPage?ids=' + ids;
        }
    })
    //取消按钮
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        $('div[openContent="delete-pop"]').removeClass('active');
        hideOverlay()
        deleteArray= [];
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
$('.meshNum a').click(function(){
    if($(this).text()==0){
        $(this).prop('href','javascript:return false;');
    }
})

function skipLimit() {
    var skipPage = parseInt($('#skipPage').val());
    var pageTotal = parseInt($('.pageTotal').text());
    if (skipPage < 1 || skipPage > pageTotal) {
        $('#skipPage').val('');
    }
}

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
    if($.trim(account) ==''){
        account='';
    }
    var uname = $('#username').val();
    if($.trim(uname) ==''){
        uname='';
    }
    var projectName = $('#projectName').val();
    if($.trim(projectName) ==''){
        projectName='';
    }
    var coname = $('#company').val();
    if($.trim(coname) ==''){
        coname='';
    }
    var startTime = $('#start-time').val();
    var startCreateDate = startTime.substring(0, 10);
    var endCreateDate = startTime.substring(13, 23);
    var endTime = $('#end-time').val();
    var startUpdateDate = endTime.substring(0, 10);
    var endUpdateDate = endTime.substring(13, 23);
    var newUrl = url2 + '&pageNum=' + pageNum + '&sortFlag=' + sortFlag + '&pageSize=' + pageSize + '&projectName=' + projectName + '&account=' + account + '&uname=' + uname + '&coname=' + coname + '&startCreateDate=' + startCreateDate + '&endCreateDate=' + endCreateDate + '&startUpdateDate=' + startUpdateDate + '&endUpdateDate=' + endUpdateDate;
    location.href = newUrl;
}