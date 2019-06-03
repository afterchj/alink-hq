/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    var width = window.screen.width;
    var height = window.screen.height;
    var id;
    var ids = [];
    var lname, mname;
    //重命名弹框
    $('.rename').click(function () {
        id = $(this).attr("alt");
        $('div[openContent="reset-name"]').addClass('active');
        // var width = window.screen.scrollWidth;
        // var height = window.screen.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    });
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
                url: "/alink-hq/light/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    console.log(res);
                    if (res == "success") {
                        location.reload();
                    }
                }
            })
        }
    });
    //重命名取消
    $('div[openContent="reset-name"] button.reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="reset-name"]').removeClass('active');
    });

    //删除弹框出现--单选
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        ids.push(id);
        // lname=$(this).attr('lname');
        // mname=$(this).attr('mname');
        lname = $(this).parent().siblings('td.lname').find('a').text();
        mname = $(this).parent().siblings('td.mname').text();
        $('div[openContent="delete-mesh"]').addClass('active');
        // var width = window.screen.scrollWidth;
        // var height = window.screen.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
        $('div[openContent="delete-mesh"] .reset-pwd').text('您确定要删除' + lname + '吗？');
        $('div[openContent="delete-mesh"] .reset-pwd-hint').text('删除该灯将会退出' + mname + '网络，请慎重！');
    });
    //删除确定--单选或复选框
    $('div[openContent="delete-mesh"] button.yes').click(function () {
        console.log(ids);
        if (ids) {
            location.href = "/alink-hq/light/delete?mid=" + $("#mid").val() + "&ids=" + ids;
            ids = [];
        }
    });
    //删除取消--单选或复选框
    $('div[openContent="delete-mesh"] button.reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="delete-mesh"]').removeClass('active');
    });
    //删除多选
    $("#multiDel").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        ids = idss;
        if (ids.length > 0) {
            // console.log(ids);
            $('div[openContent="delete-mesh"]').addClass('active');
            // var width = window.screen.scrollWidth;
            // var height = window.screen.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        } else {
            // alert('请选择至少一个灯')
        }
    });
    //移交
    $("#multiMove").click(function () {
        var idss = [];
        var pidArr = [];
        var isTrue = true;
        $('input[name="ids"]:checked').each(function () {
            var pid = $(this).parent().siblings('.pid').find('input[name="pid"]').val();
            idss.push($(this).val());
            pidArr.push(pid);
        });
        // console.log(idss);
        // if(idss.length>0){
        // location.href = "/alink-hq/light/move?mid=" + $("#mid").val() + "&ids=" + idss;
        // }
        if (pidArr.length > 0) {
            for (var i = 0; i < pidArr.length; i++) {
                if (pidArr.indexOf(pidArr[i]) != 0) {
                    isTrue = false;
                    break;
                }
            }
        }
        // console.log(isTrue);
        if (isTrue) {
            if (idss.length > 0) {
                location.href = "/alink-hq/light/move?mid=" + $("#mid").val() + "&ids=" + idss;
            }
        } else {
            $('div[openContent="exchange"]').addClass('active');
            // var width = window.screen.scrollWidth;
            // var height = window.screen.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        }
    });
    //无法移动的确定以及取消
    $('div[openContent="exchange"] .yes,div[openContent="exchange"] .reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="exchange"]').removeClass('active');
    });
});
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
});