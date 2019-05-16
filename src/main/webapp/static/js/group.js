/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    // var tabs='groupList';
    // var index=0;
    // left(tabs,index);
    var id;
    var ids = [];
    //重命名弹框
    $('.rename').click(function () {
        id = $(this).attr("alt");
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    //重命名确定
    $('div[openContent="reset-name"] button.yes').click(function () {
        var name = $('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if (name == '') {
            $('p.rename-hint').text('请输入新名称');
        } else if (!userNameResult) {
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
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
                    console.log(res);
                    if (res == "ok") {
                        location.reload();
                    } else {
                        $('p.rename-hint').text('已存在，请重新输入');
                    }
                }
            })
        }
    })
    //重命名取消
    $('div[openContent="reset-name"] button.reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="reset-name"]').removeClass('active');
    })

    //删除弹框出现--单选
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        ids.push(id);
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    //删除确定--单选或复选框
    $('div[openContent="delete-mesh"] button.yes').click(function () {
        console.log(ids);
        if (ids) {
            location.href = "/alink-hq/group/delete?uid="+$("#uid").val()+"&ids=" + ids;
            ids = [];
        }
    })
    //删除取消--单选或复选框
    $('div[openContent="delete-mesh"] button.reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="delete-mesh"]').removeClass('active');
    })
    //删除多选
    $("#multiDel").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        ids = idss;
        if (ids.length > 0) {
            console.log(ids);
            $('div[openContent="delete-mesh"]').addClass('active');
            var width = document.body.scrollWidth;
            var height = document.body.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        }
    })
    //移交多选
    $("#multiMove").click(function () {
        var idss = [];
        var meshArr = [];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function () {
            var meshName = $(this).parent().siblings('.meshName').text();
            idss.push($(this).val());
            meshArr.push(meshName);
        });
        // console.log(idss);
        // console.log(meshArr);
        if (meshArr.length > 0) {
            for (var i = 0; i < meshArr.length; i++) {
                if (meshArr.indexOf(meshArr[i]) != 0) {
                    isTrue = false;
                    break;
                }
            }
        }
        // console.log(isTrue);
        if (isTrue) {
            if (idss.length > 0) {
                location.href = "/alink-hq/group/move?projectName=" + $("#projectName").val() + "&ids=" + idss;
            }
        } else {
            $('div[openContent="exchange"]').addClass('active');
            var width = document.body.scrollWidth;
            var height = document.body.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        }
    })
    //无法移动的确定以及取消
    $('div[openContent="exchange"] .yes,div[openContent="exchange"] .reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="exchange"]').removeClass('active');
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
$('#meshId').bind('input propertychange',function(){
    var val= $(this).val();
    // console.log(val);
    if(val!=''&& isNaN(val)){
        $(this).val('');
    }
})