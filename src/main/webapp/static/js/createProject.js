/**
 * Created by qian.chen on 2019/4/28.
 */
$(function(){
    var height=$(document).height();
    $('.main-left').css('height',height);
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == 'groupList') {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    $('.on-off-triangle').click(function () {
        var imgUrl = $(this).attr('src');
        if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
            $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
            $(this).parent().parent('.one-list').find('.two-list').addClass('active');
        } else {
            $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
            $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
        }
    });
})

$('.confirm-create').click(function () {
    var projectName = $('#projectName').val();
    var account = $('#account').val();
    if(projectName==''){
        $('.project-hint').text('请输入项目名称');
    }
    if (account == '') {
        $('.account-hint').text('请输入施工人员账号');
    } else {
        $.ajax({
            type: "post",
            url: "/alink-hq/project/create",
            data: {
                "projectName": projectName,
                "account": account
            },
            async: true,
            success: function (res) {
                console.log(res);
                if (res.result == "305") {
                    $('.account-hint').text('该账号不存在');
                } else if (res.result == '304') {
                    $('.account-hint').text('不是同一个公司的账号');
                } else if (res.result == '000') {
                    console.log('创建成功!');
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('创建成功！');
                    setInterval(function () {
                        $('#preload-anim').removeClass('active');
                        location.href = '/alink-hq/project/list';
                    }, 1000)
                } else {
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('加载失败，请重新尝试');
                    setInterval(function () {
                        $('#preload-anim').removeClass('active');
                    }, 1000)
                }
            }
        })
    }
})
//重命名校验
function nameKeyUp() {
    var projectName = $('#projectName').val();
    var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regName.test(projectName);
    if (projectName != '' && !renameResult) {
        $('.project-hint').text('请输入 2-16 位汉字、字母、数字');
    } else {
        $('.project-hint').text('');
    }
}
