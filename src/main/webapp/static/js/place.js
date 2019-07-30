$(function () {
    $("#multiDel").click(function () {
        var ids = [];
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val())
        });
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-place"]');
            selector.addClass('active');
            adjust(selector)
            showOverlay()
        }
        $('.pop-btn .yes').click(function () {
            deletePlace(ids)
        })
    });
    var id;
    $('.reset-name').click(function () {
        $('#rename').val('');
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
    });
    $('div[openContent="reset-name"]  .pop-btn .yes').click(function () {
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
                url: "/alink-hq/place/rename",
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
        $('#mid').bind('input propertychange', function () {
            var val = $(this).val();
            if (val != '' && isNaN(val)) {
                $(this).val('')
            }
        })
    });
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active')
        hideOverlay()
    });
    var ids;
    $('.singleDel').click(function () {
        ids = $(this).parent().siblings('.checkbox').find('input').val();
        var selector = $('div[openContent="delete-place"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
    });
    $('.pop-btn .reduce').click(function () {
        var selector = $('div[openContent="delete-place"]');
        selector.removeClass('active')
        hideOverlay()
    });
    $('.pop-btn .yes').click(function () {
        deletePlace(ids)
    })
});

function deletePlace(ids) {
    if (ids) {
        location.href = "/alink-hq/place/move?pid=" + $("#pid").val() + "&mid=" + $("#mid").val() + "&ids=" + ids
    }
}

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