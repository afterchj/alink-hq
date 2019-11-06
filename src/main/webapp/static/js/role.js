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
    var roleName = decodeURIComponent(GetUrlParam("roleName"));
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    if (!pageSize) {
        pageSize = 10
    }
    if (!pageNum) {
        pageNum = ''
    }
    $('#roleName').val(roleName);
    if (pageNum == '') {
        $('#page').val('1')
    } else {
        $('#page').val(pageNum)
    }
    $('#size').children('option[value=' + pageSize + ']').prop('selected', 'selected');
    $('.search-button button').click(function() {
        condition(pageSize, pageNum)
    }) 
    $('#size').change(function() {
        pageSize = $(this).children('option:selected').val();
        pageNum = $('#page').val();
        if (pageNum == '') {
            pageNum == 1
        } else {
            pageNum = parseInt(pageNum)
        }
        condition(pageSize, pageNum)
    }) 
    $('#prev').click(function() {
        if (pageNum == '') {
            pageNum = 1
        }
        pageNum = parseInt(pageNum) - 1;
        condition(pageSize, pageNum)
    }) 
    $('#next').click(function() {
        if (pageNum == '') {
            pageNum = 1
        }
        pageNum = parseInt(pageNum) + 1;
        condition(pageSize, pageNum)
    })
    $('#skip').click(function() {
        if ($('#page').val() != '' && parseInt($('#page').val()) >= parseInt(pageTotal)) {
            pageNum = parseInt(pageTotal);
            condition(pageSize, pageNum)
        } else if ($('#page').val() != '' && parseInt($('#page').val()) <= 1) {
            pageNum = 1;
            condition(pageSize, pageNum)
        } else if ($('#page').val() == '') {
            pageNum = 1;
            condition(pageSize, pageNum)
        } else {
            pageNum = $('#page').val();
            condition(pageSize, pageNum)
        }
    }) 
    var roleId;
    $('.reset-name').click(function() {
        $('#rename').val('') 
        roleId = $(this).parent().siblings("input").val();
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay()
    })
    $('div[openContent="reset-name"] .yes').click(function() {
        var rename = $('#rename').val();
        var regName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,6}$/;
        var renameResult = regName.test(rename);
        if (rename == '') {
            $('p.rename-hint').text('请输入新名称')
        } else if (rename != '' && !renameResult) {
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字')
        } else {
            $('p.rename-hint').text('');
            $.ajax({
                type: "POST",
                url: "/alink-hq/role/rename",
                data: {
                    roleId: roleId,
                    roleName: rename
                },
                dataType: "json",
                success: function(res) {
                    console.log(res);
                    if (res.result == '000') {
                        $('p.rename-hint').text('');
                        location.reload()
                    } else if (res.result == '308') {
                        $('p.rename-hint').text('已存在，请重新输入')
                    }
                }
            })
        }
    }) 
    $('div[openContent="reset-name"] .reduce').click(function() {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay();
    }) 
    $('.delete-pop').click(function() {
        $('div[openContent="delete-pop"] p').css('margin-top','5px');
        roleId = $(this).parent().siblings("input").val();
        roleName=$(this).parent().siblings('.role-name').children('a').text();

        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').html('您确定要删除 ' + '<span class="hint-font">'+roleName+'</span> '+ '角色吗 ？');

        // $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后项目中所有信息将无法恢复，请慎重！');
        adjust(selector);
        showOverlay()
    }) 
    $('div[openContent="delete-pop"] .yes').click(function() {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
        $.ajax({
            type: "POST",
            url: "/alink-hq/role/delete",
            data: {
                roleId: roleId
            },
            dataType: "json",
            success: function(res) {
                if (res.result == '000') {
                    location.reload()
                } else if (res.result == '200') {
                    console.log('系统错误')
                }
            }
        })
    }) 
    $('div[openContent="delete-pop"] .reduce').click(function() {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay()
    })
})
function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,6}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字')
    } else {
        $('p.rename-hint').text('')
    }
}

function condition(pageSize, pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1)
    } else {
        var url2 = url + '?'
    }
    var roleName = $('#roleName').val();
    var newUrl = url2 + '&pageNum=' + pageNum + '&pageSize=' + pageSize + '&roleName=' + roleName;
    location.href = newUrl
}