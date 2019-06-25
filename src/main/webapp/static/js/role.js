/**
 * Created by yuanjie.fang on 2019/6/20.
 */
$(function () {
    //向左向右
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('.prev').removeClass('active');
        $(".prev").addClass('disabled');
    } else {
        $('.prev').addClass('active');
    }
    if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next").addClass('disabled');
    } else {
        $(".next").addClass('active');
    }
    var roleName = decodeURIComponent(GetUrlParam("roleName"));
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    if(!pageSize){
        pageSize=10;
    }
    if(!pageNum){
        pageNum='';
    }
    $('#roleName').val(roleName);
    if(pageNum==''){
        $('#page').val('1');
    }else{
        $('#page').val(pageNum);
    }
    $('#size').children('option[value='+pageSize+']').prop('selected','selected');

    //点击查询按钮时
    $('.search-button button').click(function () {
        condition(pageSize,pageNum);
    })
    //选择页数变化
    $('#size').change(function () {
        pageSize = $(this).children('option:selected').val();
        pageNum = $('#page').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(pageSize, pageNum);
    })
    //点击上一页
    $('#prev').click(function(){
        if(pageNum==''){
            pageNum=1;
        }
        pageNum=parseInt(pageNum)-1;
        condition(pageSize,pageNum)
    })
    //点击下一页
    $('#next').click(function(){
        if(pageNum==''){
            pageNum=1;
        }
        pageNum=parseInt(pageNum)+1;
        condition(pageSize,pageNum)
    })

    //点击跳转
    $('#skip').click(function(){
        if($('#page').val()!=''&& parseInt($('#page').val())>=parseInt(pageTotal)){
            pageNum= parseInt(pageTotal);
            condition(pageSize,pageNum)
        }else if($('#page').val()!=''&& parseInt($('#page').val())<=1){
            pageNum= 1;
            condition(pageSize,pageNum)
        }else if($('#page').val()==''){
            pageNum= 1;
            condition(pageSize,pageNum)
        }else{
            pageNum=$('#page').val();
            condition(pageSize,pageNum)
        }
    })



    var width = window.screen.width;
    var height = window.screen.height;
    var roleId;
    //重命名弹框
    $('.reset-name').click(function () {
        // projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        // account = $(this).parent().siblings('.project-account').text();
        $('div[openContent="reset-name"]').addClass('active');
        roleId = $(this).parent().siblings("input").val();
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })

    //弹框重命名里操作
    $('div[openContent="reset-name"] .yes').click(function () {
        var rename = $('#rename').val();
        var regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,6}$/;
        var renameResult = regName.test(rename);
        if (rename == '') {
            $('p.rename-hint').text('请输入新名称');
        } else if (rename != '' && !renameResult) {
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
        } else {
            $('p.rename-hint').text('');
            $.ajax({
                type: "POST",
                url: "/alink-hq/role/rename",
                data: {roleId: roleId, roleName: rename},
                dataType: "json",
                success: function (res) {
                    console.log(res);
                    if (res.result == '000') {
                        $('p.rename-hint').text('');
                        location.reload();
                    } else if (res.result == '308') {
                        $('p.rename-hint').text('已存在，请重新输入');
                    }
                }
            });
        }
    })
    //取消删除按钮
    $('div[openContent="reset-name"] .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    //删除角色弹框
    $('.delete-role').click(function () {
        // projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        // account = $(this).parent().siblings('.project-account').text();
        // var msg = {
        //     id: projectId,
        //     account: account,
        // }
        // deleteArray.push(msg);
        // if(deleteArray.length!=0){
        roleId = $(this).parent().siblings("input").val();
        $('div[openContent="delete-role"]').addClass('active');
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        // }
    })
    //确定删除
    $('div[openContent="delete-role"] .yes').click(function () {
        $('div[openContent="delete-role"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
        $.ajax({
            type: "POST",
            url: "/alink-hq/role/delete",
            data: {roleId: roleId},
            dataType: "json",
            success: function (res) {
                // console.log(res);
                if (res.result == '000') {
                    location.reload();
                    // $('tbody tr td.checkbox input').prop('checked',false);
                    // $('#all').prop('checked',false);
                } else if (res.result == '200') {
                    console.log('系统错误');
                }
            }
        })
    })
    //取消删除按钮
    $('div[openContent="delete-role"] .reduce').click(function () {
        // $('div[openContent="reset-name"]').removeClass('active');
        $('div[openContent="delete-role"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })



    })

//重命名校验
function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,6}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
    } else {
        $('p.rename-hint').text('');
    }
}

//查询条件
function condition(pageSize, pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1);
    } else {
        var url2 = url + '?';
    }
    var roleName = $('#roleName').val();
    var newUrl = url2 + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&roleName=' + roleName;
    location.href = newUrl;
}