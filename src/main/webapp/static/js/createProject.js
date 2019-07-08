$('.confirm-create').click(function() {
    var projectName = $('#projectName').val();
    var account = $('#account').val();
    var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regName.test(projectName);
    if (account == '') {
        $('.account-hint').text('请输入施工人员账号')
    } else {
        $('.account-hint').text('')
    }
    if (!renameResult && projectName != '') {
        $('.project-hint').text('请输入 2-16 位汉字、字母、数字')
    } else if (projectName == '') {
        $('.project-hint').text('请输入项目名称')
    } else {
        $('.project-hint').text('')
    }
    if (projectName != '' && account != '' && renameResult) {
        $.ajax({
            type: "post",
            url: "/alink-hq/project/create",
            data: {
                "projectName": projectName,
                "account": account
            },
            async: true,
            success: function(res) {
                if (res.result == "305") {
                    $('.account-hint').text('该账号不存在')
                } else if (res.result == '304') {
                    $('.account-hint').text('不是同一个公司的账号')
                } else if (res.result == '306') {
                    $('.project-hint').text('该项目名已存在')
                } else if (res.result == '000') {
                    location.href = '/alink-hq/project/list';
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('创建成功！')
                } else {
                    $('#preload-anim').addClass('active');
                    $('#preload-anim .title').text('加载失败，请重新尝试');
                    setTimeout(function() {
                        $('#preload-anim').removeClass('active')
                    }, 1000)
                }
            }
        })
    }
})
function nameKeyUp() {
    var projectName = $('#projectName').val();
    var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regName.test(projectName);
    if (projectName != '' && !renameResult) {
        $('.project-hint').text('请输入 2-16 位汉字、字母、数字')
    } else {
        $('.project-hint').text('')
    }
}