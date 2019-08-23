$(function () {
    // var data=$('#placeId').val();
    // console.log(data);
    var placeId=GetQueryString('placeId');
    console.log('placeId',placeId);
    if(placeId=='0'){
        $('.create').addClass('no-access');
        $('.create').parent('a').addClass('unclick1');
        $('.create').parent('a').attr('href','javascript:void(0);');
    }
    var id;
    var ids = [];
    $('.rename').click(function () {
        $('#rename').val('');
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    })
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
                url: "/alink-hq/group/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    if (res == "ok") {
                        location.reload()
                    } else {
                        $('p.rename-hint').text('已存在，请重新输入')
                    }
                }
            })
        }
    })
    $('div[openContent="reset-name"] button.reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay();
    })
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        ids.push(id);
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的组吗？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后所选组所有的灯将会进入所属网络未分组中请慎重！');
        adjust(selector);
        showOverlay();
    })
    $('div[openContent="delete-pop"] button.yes').click(function () {
        if (ids) {
            location.href = "/alink-hq/group/delete?pid=" + $("#projectId").val() + "&mid=" + $("#mid").val() + "&ids=" + ids;
            ids = [];
        }
    })
    $('div[openContent="delete-pop"] button.reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    })
    $("#multiDel").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val())
        });
        ids = idss;
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的组吗？');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后，所选组中所有信息将会被删除，请慎重！');
            adjust(selector);
            showOverlay();
        }
    })
    $("#multiMove").click(function () {
        var idss = [];
        var meshArr = [];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
            meshArr.push($(this).next('.mid').val());
        });
        if (meshArr.length > 0) {
            for (var i = 0; i < meshArr.length; i++) {
                if (meshArr.indexOf(meshArr[i]) != 0) {
                    isTrue = false;
                    break;
                }
            }
        }
        // console.log('meshArr', meshArr);
        var result = isAllEqual(meshArr);
        // console.log('result',result);
        if (result && isTrue) {
            if (idss.length > 0) {
                location.href = "/alink-hq/group/move?mid=" + meshArr[0] + "&ids=" + idss
            }
        } else {
            var selector = $('div[openContent="exchange"]');
            selector.addClass('active');
            $('div[openContent="exchange"] .reset-pwd p').text('不同网络下的组不可进行移动！');
            adjust(selector);
            showOverlay();
        }
    })
    $('div[openContent="exchange"] .yes,div[openContent="exchange"] .reduce').click(function () {
        var selector = $('div[openContent="exchange"]');
        selector.removeClass('active');
        hideOverlay();
    })
})

function nameKeyUp() {
    var name = $('#rename').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = regUserName.test(name);
    if (name != '' && !userNameResult) {
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
    } else {
        $('p.rename-hint').text('');
    }
}

$('#meshId').bind('input propertychange', function () {
    var val = $(this).val();
    if (val != '' && isNaN(val)) {
        $(this).val('');
    }
})