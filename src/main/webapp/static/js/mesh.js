/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    myBrowser();
    var tabs="meshList";
    var index=0;
    left(tabs,index);
    $("#multiMove").click(function () {
        var ids = [];//定义一个数组
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
        });
        location.href = "/alink-hq/mesh/move?ids=" + ids;
    });
    var ids = [];//定义一个数组
    $("#multiDel").click(function () {
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
        });
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    });
    $('.pop-btn .yes').click(function () {
        console.log('ids', ids);
        deleteMesh(ids);
    });
    //单选删除
    var ids;
    $('.singleDel').click(function () {
        ids = $(this).parent().siblings('.checkbox').find('input').val();
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    });
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="delete-mesh"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });

    $('.pop-btn .yes').click(function () {
        deleteMesh(ids);
    });
    //单选重命名
    var id;
    $('.reset-name').click(function () {
        id = $(this).attr("alt");
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    });
    $('div[openContent="reset-name"] .pop-btn .yes').click(function () {
        var name=$('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if(name==''){
            $('p.rename-hint').text('请输入新名称');
        }else if(!userNameResult){
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
        }else {
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
                        location.reload();
                    } else {
                        $('p.rename-hint').text('已存在，请重新输入');
                    }
                }
            })
        }
    })
    //取消按钮
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        // $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });

})
$('.moment').mousedown(function(){
    var url=$(this).attr('src');
    var newUrl=url.substr(0, url.length-4)+'-un.png';
    $(this).attr('src',newUrl);
})
$('.moment').mouseup(function(){
    var url=$(this).attr('src');
    var newUrl=url.substr(0, url.length-7)+'.png';
    $(this).attr('src',newUrl);
})
//重命名校验
function nameKeyUp() {
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regreName.test(rename);
    if (rename != '' && !renameResult) {
        $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
    } else {
        $('p.rename-hint').text('');
    }
}

function deleteMesh(ids) {
    if (ids) {
        location.href = "/alink-hq/mesh/delete?ids=" + ids;
    }
}
// $('.on-off-triangle').click(function () {
//     var imgUrl = $(this).attr('src');
//     if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
//         $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
//         $(this).parent().parent('.one-list').find('.two-list').addClass('active');
//     } else {
//         $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
//         $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
//     }
// });
// $(function(){
//     var height=$(document).height();
//     $('.main-left').css('height',height);
// })
