$(function() {
    var accountNum = 0;
    $('tbody .checkbox input').each(function() {
        if ($(this).prop('checked')) {
            accountNum++
        }
    }) 
    $('#amount').text(accountNum);
    $('#all').click(function() {
        var checked = $(this).prop('checked');
        if (checked) {
            var length = $('tbody tr').length;
            accountNum = length;
            $('tbody .checkbox input').each(function() {
                $(this).prop('checked', true)
            })
        } else {
            accountNum = 0;
            $('tbody .checkbox input').each(function() {
                $(this).prop('checked', false)
            })
        }
        $('#amount').text(accountNum)
    }) 
    $('tbody .checkbox input').click(function() {
        var allChecked = true;
        var checked = $(this).prop('checked');
        if (checked) {
            accountNum++
        } else {
            accountNum--
        }
        $('tbody .checkbox input').each(function() {
            var otherChecked = $(this).prop('checked');
            if (!otherChecked) {
                allChecked = false
            }
        }) 
        $('#amount').text(accountNum);
        if (!allChecked) {
            $('#all').prop('checked', false)
        } else {
            $('#all').prop('checked', true)
        }
    })
}) 
$(function() {
    var deleteArray = [];
    var id;
    $('.reset-name').click(function() {
        $('#rename').val('');
        id = $(this).attr("alt");
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay()
    });
    $('div[openContent="reset-name"]  .pop-btn .yes').click(function() {
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
                url: "/alink-hq/scene/rename",
                data: {
                    "sceneName": name,
                    "sid": id
                },
                async: true,
                success: function(res) {
                    console.log(res);
                    if (res.result == "000") {
                        location.reload()
                    } else if (res.result == "307") {
                        $('p.rename-hint').text('已存在，请重新输入')
                    } else if (res.result == "200") {
                        console.log('系统错误')
                    }
                }
            })
        }
    });
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function() {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay()
    });

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
    $('.singleDel').click(function() {
         deleteArray = [];
        var sid = parseInt($(this).parent().siblings('.sid').find('input').val());
        var sceneId = parseInt($(this).parent().siblings('.sceneId').text());
        var mid = $("#mid").val();
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的场景吗？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后该场景将无法应用，请慎重！');
        adjust(selector);
        showOverlay();
        var msg = {
            id: sid,
            sceneId: sceneId,
            mid: mid
        }
        deleteArray.push(msg);
    })
    $('div[openContent="delete-pop"] .pop-btn .reduce').click(function() {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay()
    });
    $('div[openContent="delete-pop"] .pop-btn .yes').click(function() {
        var newJsonArray = JSON.stringify(deleteArray);
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active') ;
        hideOverlay();
        deleteScene(newJsonArray)
    }) 
    $("#multiDel").click(function() {
        deleteArray = [];
        $('input[name="sid"]:checked').each(function() {
            var sid = parseInt($(this).val());
            var sceneId = parseInt($(this).parent().siblings('.sceneId').text());
            var msg = {
                id: sid,
                sceneId: sceneId
            }
            deleteArray.push(msg);
        });
        if (deleteArray.length > 0) {
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的场景吗？');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后该场景将无法应用，请慎重！');
            adjust(selector);
            showOverlay();
        }
    })
})
function deleteScene(newJsonArray) {
    $.ajax({
        type: "POST",
        url: "/alink-hq/scene/delete",
        data: {
            sceneInfo: newJsonArray
        },
        dataType: "json",
        success: function(res) {
            if (res.result == '000') {
                location.reload();
                $('tbody tr td.checkbox input').prop('checked', false);
                $('#all').prop('checked', false)
            } else if (res.result == '200') {
                console.log('系统错误')
            }
        }
    })
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
$('#sceneId').on('input propertychange', function() {
    var sceneId = $(this).val();
    if (sceneId != '' && isNaN(sceneId)) {
        $(this).val('')
    }
}) 
$(function() {
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('.prev').removeClass('active');
        $(".prev").addClass('disabled')
    } else {
        $('.prev').addClass('active')
    } if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next").addClass('disabled')
    } else {
        $(".next").addClass('active')
    }
    var sceneName = decodeURIComponent(GetUrlParam("sceneName"));
    var sceneId = decodeURIComponent(GetUrlParam("sceneId"));
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    if (!pageSize) {
        pageSize = 10
    }
    if (!pageNum) {
        pageNum = ''
    }
    $('#sceneName').val(sceneName);
    $('#sceneId').val(sceneId);
    if (pageNum == '') {
        $('#page').val('1')
    } else {
        $('#page').val(pageNum)
    }
    $('#size').children('option[value=' + pageSize + ']').prop('selected', 'selected');
    $('.search-button button').click(function() {
        sceneName = $('#sceneName').val();
        sceneId = $('#sceneId').val();
        condition(sceneName, sceneId, pageSize, pageNum)
    })
    $('#size').change(function() {
        pageSize = $(this).children('option:selected').val();
        pageNum = $('#page').val();
        if (pageNum == '') {
            pageNum == 1
        } else {
            pageNum = parseInt(pageNum)
        }
        condition(sceneName, sceneId, pageSize, pageNum)
    }) 
    $('#prev').click(function() {
        if (pageNum == '') {
            pageNum = 1
        }
        pageNum = parseInt(pageNum) - 1;
        condition(sceneName, sceneId, pageSize, pageNum)
    }) 
    $('#next').click(function() {
        if (pageNum == '') {
            pageNum = 1
        }
        pageNum = parseInt(pageNum) + 1;
        condition(sceneName, sceneId, pageSize, pageNum)
    })
    $('#skip').click(function() {
        if ($('#page').val() != '' && parseInt($('#page').val()) >= parseInt(pageTotal)) {
            pageNum = parseInt(pageTotal);
            condition(sceneName, sceneId, pageSize, pageNum)
        } else if ($('#page').val() != '' && parseInt($('#page').val()) <= 1) {
            pageNum = 1;
            condition(sceneName, sceneId, pageSize, pageNum)
        } else if ($('#page').val() == '') {
            pageNum = 1;
            condition(sceneName, sceneId, pageSize, pageNum)
        } else {
            pageNum = $('#page').val();
            condition(sceneName, sceneId, pageSize, pageNum)
        }
    })
})
function condition(sceneName, sceneId, pageSize, pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1)
    } else {
        var url2 = url + '?'
    }
    var meshName = decodeURIComponent(GetUrlParam("meshName"));
    var meshId = decodeURIComponent(GetUrlParam("meshId"));
    var mid = decodeURIComponent(GetUrlParam("mid"));
    var newUrl = url2 + '&meshName=' + meshName + '&meshId=' + meshId + '&mid=' + mid + '&pageSize=' + pageSize + '&pageNum=' + pageNum + '&sceneName=' + sceneName + '&sceneId=' + sceneId;
    location.href = newUrl
}