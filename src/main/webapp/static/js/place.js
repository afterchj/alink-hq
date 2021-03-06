$(function () {
    var ids = [];
    $("#multiDel").click(function () {
         ids = [];
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val())
        });
        console.log('ids',ids);
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的区域吗？删除后将无法恢复，请慎重！');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('（扫描区仅可清除内容，不可删除）');
            $('div[openContent="delete-pop"] .text-msg').css('text-align','left');
            adjust(selector);
            showOverlay();
        }
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
                $(this).val('');
            }
        })
    });
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay();
    });
    // var ids;
    $('.singleDel').click(function () {
        // ids = $(this).parent().siblings('.checkbox').find('input').val();
        ids=[];
        ids.push($(this).parent().siblings('.checkbox').find('input').val());
        console.log('ids',ids);
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的区域吗？删除后将无法恢复，请慎重！');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('（扫描区仅可清除内容，不可删除）');
        $('div[openContent="delete-pop"] .text-msg').css('text-align','left');
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .yes').click(function () {
        // deletePlace(ids);
        $.ajax({
            type: "post",
            url: "/alink-hq/main/checkCount",
            data: {
                "id": JSON.stringify(ids)
            },
            async: true,
            success: function (res) {
                console.log('res',res);
                if(res=='ok'){
                    deletePlace(ids);
                }else if(res=='fail'){
                    $('div[openContent="delete-pop"]').removeClass('active');
                    // hideOverlay();
                    var selector=$('div[openContent="noDelete-pop"]');
                    $('div[openContent="noDelete-pop"] .reset-pwd p').text('该区域下有灯，不可删除！');
                    selector.addClass('active');
                    adjust(selector);
                    console.log('有灯存在');
                }
            }
        })
    })
    $('div[openContent="noDelete-pop"] .yes').click(function(){
        $('div[openContent="noDelete-pop"]').removeClass('active');
        hideOverlay();
    })
});

function deletePlace(ids) {
    if (ids) {
        location.href = "/alink-hq/place/move?pid=" + $("#pid").val() + "&mid=" + $("#mid").val() + "&ids=" + ids
    }
}

function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字')
    } else {
        $('p.rename-hint').text('')
    }
}