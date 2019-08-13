$(function () {
    var id;
    var ids = [];
    var lname, mname;
    $('.rename').click(function () {
        $('#rename').val('');
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        $('.showList').hide();
    });
    $('div[openContent="reset-name"] button.yes').click(function () {
        var name = $('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if (name == '') {
            $('p.rename-hint').text('请输入新名称')
        } else if (!userNameResult) {
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字')
        } else {
            $.ajax({
                type: "post",
                url: "/alink-hq/light/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    if (res == "success") {
                        location.reload();
                    }
                }
            })
        }
    });
    $('div[openContent="reset-name"] button.reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        ids.push(id);
        lname = $(this).parent().parent().parent().siblings('td.lname').find('a').text();
        mname = $(this).parent().parent().parent().siblings('td.mname').text();
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        $('.showList').hide();
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除' + lname + '吗？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除该灯将会退出' + mname + '网络，请慎重！');
    });
    $('div[openContent="delete-pop"] button.yes').click(function () {
        if (ids) {
            location.href = "/alink-hq/light/delete?pid=" + $("#projectId").val() + "&mid=" + $("#mid").val() + "&ids=" + ids;
            ids = []
        }
    });
    $('div[openContent="delete-pop"] button.reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $("#multiDel").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        ids = idss;
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            adjust(selector);
            showOverlay();
            $('.showList').hide();
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的灯吗？');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除该灯将会退出所属网络，请慎重！');
        }
    });
    $("#multiMove").click(function () {
        var idss = [];
        var pidArr = [];
        var meshIdArr=[];
        var projectIdArr=[];
        var uidArr=[];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function () {
            var pid = $(this).siblings('input[name="p_id"]').val();
            var uid = $(this).siblings('input[name="u_id"]').val();
            var meshId=($(this).next('.mid').val());
            var projectId=$(this).parent().siblings('.project_id').find('a').attr('alt');
            idss.push($(this).val());
            pidArr.push(pid);
            uidArr.push(uid);
            meshIdArr.push(meshId);
            projectIdArr.push(projectId);
        });
        if (pidArr.length > 0) {
            for (var i = 0; i < pidArr.length; i++) {
                if (pidArr.indexOf(pidArr[i]) != 0) {
                    isTrue = false;
                    break
                }
            }
        }
        // console.log('idss',idss);
        // console.log('meshIdArr',meshIdArr);
        // console.log('projectIdArr',projectIdArr);
        // console.log('pidArr', pidArr);
        // console.log('uidArr', uidArr);
        // console.log('isTrue', isTrue);
        // var result1 = isAllEqual(idss);
        var result1 = isAllEqual(projectIdArr);
        var result2 = isAllEqual(meshIdArr);
        var result3 = isAllEqual(pidArr);
        var result4 = isAllEqual(uidArr);
        if (isTrue && result1 && result2 && result3 && result4 ) {
            if (idss.length > 0) {
                location.href = "/alink-hq/light/move?mid=" +meshIdArr[0] + "&ids=" + idss
            }
        } else {
            var selector = $('div[openContent="exchange"]');
            selector.addClass('active');
            $('div[openContent="exchange"] .reset-pwd p').text('不同区域下的灯不可进行移动!');
            adjust(selector);
            showOverlay();
            $('.showList').hide();
        }
    });
    $('div[openContent="exchange"] .yes,div[openContent="exchange"] .reduce').click(function () {
        var selector = $('div[openContent="exchange"]');
        selector.removeClass('active');
        hideOverlay();
    })
});

function nameKeyUp() {
    var name = $('#rename').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = regUserName.test(name);
    if (name != '' && !userNameResult) {
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字')
    } else {
        $('p.rename-hint').text('')
    }
}

$('#meshId').bind('input propertychange', function () {
    var val = $(this).val();
    if (val != '' && isNaN(val)) {
        $(this).val('');
    }
});