/**
 * Created by yuanjie.fang on 2019/6/20.
 */
$(function () {
    // var projectId;
    // var account;
    // var deleteArray=[];
    var width = window.screen.width;
    var height = window.screen.height;
    //重命名弹框
    $('.reset-name').click(function () {
        // projectId = parseInt($(this).parent().siblings('.checkbox ').find('input[type=checkbox]').val());
        // account = $(this).parent().siblings('.project-account').text();
        $('div[openContent="reset-name"]').addClass('active');

        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })

    //弹框重命名里操作
    $('div[openContent="reset-name"] .yes').click(function () {
        var rename = $('#rename').val();
        var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
        var renameResult = regName.test(rename);
        if (rename == '') {
            $('p.rename-hint').text('请输入新名称');
        } else if (rename != '' && !renameResult) {
            $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
        } else {
            $('p.rename-hint').text('');
            // $.ajax({
            //     type: "POST",
            //     url: "/alink-hq/project/rename",
            //     data: {projectId: projectId, projectName: rename, account: account},
            //     dataType: "json",
            //     success: function (res) {
            //         console.log(res);
            //         if (res.result == '000') {
            //             $('p.rename-hint').text('');
            //             location.reload();
            //         } else if (res.result == '306') {
            //             $('p.rename-hint').text('已存在，请重新输入');
            //         }
            //     }
            // });
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
        // var newJsonArray = JSON.stringify(deleteArray);
        // $.ajax({
        //     type: "POST",
        //     url: "/alink-hq/project/delete",
        //     data: {projectInfo: newJsonArray},
        //     dataType: "json",
        //     success: function (res) {
        //         // console.log(res);
        //         if (res.result == '000') {
        //             location.reload();
        //             $('tbody tr td.checkbox input').prop('checked',false);
        //             $('#all').prop('checked',false);
        //         } else if (res.result == '200') {
        //             console.log('系统错误');
        //         }
        //     }
        // })
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
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
    } else {
        $('p.rename-hint').text('');
    }
}