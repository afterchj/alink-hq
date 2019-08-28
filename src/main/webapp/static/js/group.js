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
        $('div[openContent="delete-pop"] .text-msg').css('text-align','left');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的组吗？删除后，所选组中所有信息将会被删除，请慎重！');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('(未分组仅可清楚内容，不可删除）');
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
        var placeArr=[];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
            placeArr.push($(this).siblings('.place_id').val());
        });
        ids = idss;
        // var result2 = placeArr.includes('0');
        if (ids.length > 0) {
            var selector = $('div[openContent="delete-pop"]');
            selector.addClass('active');
            $('div[openContent="delete-pop"] .text-msg').css('text-align','left');
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的组吗？删除后，所选组中所有信息将会被删除，请慎重！');
            $('div[openContent="delete-pop"] .reset-pwd-hint').text('(未分组仅可清楚内容，不可删除）');
            // if(result2){
            //     $('div[openContent="delete-pop"] .reset-pwd p').css('margin-top','5px');
            //     $('div[openContent="delete-pop"] .reset-pwd p').text('带有未分组的多选不可删除！');
            // }else{
            //     $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的组吗？删除后，所选组中所有信息将会被删除，请慎重！');
            //     $('div[openContent="delete-pop"] .reset-pwd-hint').text('(未分组仅可清楚内容，不可删除）');
            // }
            adjust(selector);
            showOverlay();
        }
    })
    $("#multiMove").click(function () {
        var idss = [];
        var meshArr = [];
        var placeArr=[];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
            meshArr.push($(this).next('.mid').val());
            placeArr.push($(this).siblings('.place_id').val());
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
        var result1 = isAllEqual(meshArr);
        var result2 = placeArr.includes('0');

        // var result2=isAllEqual(placeArr);
        console.log('result2',result2);
        if (result1 && !result2 &&  isTrue) {
            if (idss.length > 0) {
                location.href = "/alink-hq/group/move?mid=" + meshArr[0] + "&ids=" + idss
            }
        } else {
            var selector = $('div[openContent="exchange"]');
            selector.addClass('active');
            $('div[openContent="exchange"] .reset-pwd p').css('margin-top','5px');
            if(result2){
                $('div[openContent="exchange"] .reset-pwd p').text('未分组不可移动！');
            }else{
                $('div[openContent="exchange"] .reset-pwd p').text('不同网络下的组不可进行移动！');
            }
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