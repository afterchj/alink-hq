/**
 * Created by qian.chen on 2019/4/28.
 */
// $(function(){
//     var tabs="projectList";
//     var index=0;
//     left(tabs,index);
// })

$('.confirm-create').click(function () {
    var projectName = $('#projectName').val();
    var account = $('#account').val();
    var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regName.test(projectName);
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
    if (account == '') {
        $('.account-hint').text('请输入施工人员账号');
    }else{
        $('.account-hint').text('');
    }
    if(!renameResult && projectName!=''){
        $('.project-hint').text('请输入 2-16 位汉字、字母、数字');
    }else if(projectName==''){
        $('.project-hint').text('请输入项目名称');
    }else{
        $('.project-hint').text('');
    }
    console.log(projectName,account);
    if(projectName!='' &&  account!='' && renameResult){
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
                }else if(res.result == '306'){
                    $('.project-hint').text('该项目名已存在');
                } else if (res.result == '000') {
                    console.log('创建成功!');
                    location.href = '/alink-hq/project/list';
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('创建成功！');
                    // setTimeout(function () {
                    //     $('#preload-anim').removeClass('active');
                    //     location.href = '/alink-hq/project/list';
                    // }, 1000)
                } else {
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('加载失败，请重新尝试');
                    setTimeout(function () {
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
