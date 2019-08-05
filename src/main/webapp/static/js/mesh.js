$(function () {
    $("#multiMove").click(function () {
        var ids = [];
        var uid = [];
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
            uid.push($(this).next('.uid').val())
        });
        var result=isAllEqual(uid);
        console.log("uid",uid[0],'result',result);
        if (ids.length == 1) {
            location.href = "/alink-hq/mesh/move?uid="+uid[0]+"&ids=" + ids
        } else if (result && ids.length > 1) {
            location.href = "/alink-hq/mesh/move?uid="+uid[0]+"&ids="+ ids
        } else {
            var selector = $('div[openContent="exchange"]');
            selector.addClass('active');
            $('div[openContent="exchange"] .reset-pwd p').text('不同账号下的网络不可进行移动!');
            // $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后网络中所有信息将无法恢复，请慎重！');
            adjust(selector);
            showOverlay();  
        }
    });
    var ids = [];
    $("#multiDel").click(function () {
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val())
        });
        if (ids.length > 0) {
            $('.showList').hide();
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除该所选的网络吗？');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后网络中所有信息将无法恢复，请慎重！');
            adjust(selector);
            showOverlay();
        }
    });
    var ids;
    $('.singleDel').click(function () {
        ids =  $(this).attr("alt");
        $('.showList').hide();
        var selector = $('div[openContent="delete-pop"]');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除该所选的网络吗？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后网络中所有信息将无法恢复，请慎重！');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="exchange"]  .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="exchange"]');
        selector.removeClass('active');
        hideOverlay();
    })
    $('div[openContent="exchange"]  .pop-btn .yes').click(function () {
        var selector = $('div[openContent="exchange"]');
        selector.removeClass('active');
        hideOverlay();
    })
    $('div[openContent="delete-pop"] .pop-btn .yes').click(function () {
        deleteMesh(ids);
    });
    var id;
    $('.reset-name').click(function () {
        $('#rename').val('');
        $('.showList').hide();
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="reset-name"] .pop-btn .yes').click(function () {
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
                url: "/alink-hq/mesh/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    if (res == "success") {
                        location.reload()
                    } else {
                        $('p.rename-hint').text('已存在，请重新输入')
                    }
                }
            })
        }
    })
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active')
        hideOverlay()
    })
})

function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字')
    } else {
        $('p.rename-hint').text('')
    }
}

function deleteMesh(ids) {
    var pid=$("#pid").val();
    if (ids) {
        location.href = "/alink-hq/mesh/delete?pid=" + pid + "&ids=" + ids
    }
}

$('#mid').bind('input propertychange', function () {
    var val = $(this).val();
    if (val != '' && isNaN(val)) {
        $(this).val('')
    }
})
