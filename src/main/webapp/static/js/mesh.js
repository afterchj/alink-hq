/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    $("#multiMove").click(function () {
        var ids = [];
        var uid=[];
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
            uid.push($(this).next('.uid').val());
        });
        console.log('uid',uid);
        var result= isRepeat(uid);
        console.log(result);
        if(ids.length==1){
            location.href = "/alink-hq/mesh/move?ids=" + ids;
        }else if(result && ids.length>1  ){
            location.href = "/alink-hq/mesh/move?ids=" + ids;
        }else{
            $('div[openContent="exchange"]').addClass('active');
            var width = document.body.scrollWidth;
            var height = document.body.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            });
        }
    });
    var ids = [];
    $("#multiDel").click(function () {
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
        });
        if(ids.length>0){
            $('div[openContent="delete-mesh"]').addClass('active');
            var width = document.body.scrollWidth;
            var height = document.body.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            });
        }

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
    $('div[openContent="delete-mesh"] .pop-btn .reduce').click(function () {
        $('div[openContent="delete-mesh"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });
    $('div[openContent="exchange"]  .pop-btn .reduce').click(function(){
        $('div[openContent="exchange"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    $('div[openContent="exchange"]  .pop-btn .yes').click(function(){
        $('div[openContent="exchange"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    $('div[openContent="delete-mesh"] .pop-btn .yes').click(function () {
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
//只能输入
$('#mid').bind('input propertychange',function(){
    var val= $(this).val();
    // console.log(val);
    if(val!=''&& isNaN(val)){
        $(this).val('');
    }
})