$(function() {
    var id;
    var ids = [];
    $('.rename').click(function() {
        $('#rename').val('');
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
    })
    $('div[openContent="reset-name"] button.yes').click(function() {
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
                success: function(res) {
                    if (res == "ok") {
                        location.reload()
                    } else {
                        $('p.rename-hint').text('已存在，请重新输入')
                    }
                }
            })
        }
    })
    $('div[openContent="reset-name"] button.reduce').click(function() {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active')
        hideOverlay()
    })
    $('.singleDel').click(function() {
        id = $(this).attr("alt");
        ids.push(id);
        var selector = $('div[openContent="delete-mesh"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
    })
    $('div[openContent="delete-mesh"] button.yes').click(function() {
        if (ids) {
            location.href = "/alink-hq/group/delete?mid=" + $("#mid").val() + "&ids=" + ids;
            ids = []
        }
    })
    $('div[openContent="delete-mesh"] button.reduce').click(function() {
        var selector = $('div[openContent="delete-mesh"]');
        selector.removeClass('active')
        hideOverlay()
    })
    $("#multiDel").click(function() {
        var idss = [];
        $('input[name="ids"]:checked').each(function() {
            idss.push($(this).val())
        });
        ids = idss;
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-mesh"]');
            selector.addClass('active');
            adjust(selector)
            showOverlay()
        }
    })
    $("#multiMove").click(function() {
        var idss = [];
        var meshArr = [];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function() {
            var meshName = $(this).parent().siblings('.meshName').text();
            idss.push($(this).val());
            meshArr.push(meshName)
        });
        if (meshArr.length > 0) {
            for (var i = 0; i < meshArr.length; i++) {
                if (meshArr.indexOf(meshArr[i]) != 0) {
                    isTrue = false;
                    break
                }
            }
        }
        if (isTrue) {
            if (idss.length > 0) {
                location.href = "/alink-hq/group/move?mid=" + $("#mid").val() + "&ids=" + idss
            }
        } else {
            var selector = $('div[openContent="exchange"]');
            selector.addClass('active');
            adjust(selector)
            showOverlay()
        }
    })
    $('div[openContent="exchange"] .yes,div[openContent="exchange"] .reduce').click(function() {
        var selector = $('div[openContent="exchange"]');
        selector.removeClass('active')
        hideOverlay()
    })
})
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
$('#meshId').bind('input propertychange', function() {
    var val = $(this).val();
    if (val != '' && isNaN(val)) {
        $(this).val('')
    }
})