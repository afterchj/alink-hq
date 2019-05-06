/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    myBrowser();
    var height=$(document).height();
    $('.main-left').css('height',height);
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == 'groupList') {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    $('.on-off-triangle').click(function () {
        var imgUrl = $(this).attr('src');
        if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
            $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
            $(this).parent().parent('.one-list').find('.two-list').addClass('active');
        } else {
            $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
            $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
        }
    });
    var id;
    var ids=[];
    //重命名弹框
    $('.rename').click(function(){
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
    $('div[openContent="reset-name"] button.yes').click(function(){
        var name=$('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if(name==''){
            $('p.rename-hint').text('请输入新名称');
        }else if(!userNameResult){
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
        }else{
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
                        }else{
                            $('p.rename-hint').text('已存在，请重新输入');
                        }
                    }
                })
        }
    })
    //重命名取消
    $('div[openContent="reset-name"] button.reduce').click(function(){
        $('.hide-iframe').removeClass('active');
        $('div[openContent="reset-name"]').removeClass('active');
    })

    //删除弹框出现--单选
    $('.singleDel').click(function(){
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
    $('div[openContent="delete-mesh"] button.yes').click(function(){
        console.log(ids);
        if(ids){
            location.href = "/alink-hq/group/delete?ids=" + ids;
            ids=[];
        }
    })
    //删除取消--单选或复选框
    $('div[openContent="delete-mesh"] button.reduce').click(function(){
        $('.hide-iframe').removeClass('active');
        $('div[openContent="delete-mesh"]').removeClass('active');
    })
    //删除多选
    $("#multiDel").click(function () {
        var idss=[];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        ids=idss;
        console.log(ids);
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
   //移交
    $("#multiMove").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        console.log(idss);
        if(idss.length>0){
            location.href = "/alink-hq/group/move?ids=" + idss;
        }

    });
});
$(function () {
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('#prev').attr('src', '/alink-hq/static/img/left-arrow.png');
        $("#prev").addClass('disabled');
    } else {
        $('#prev').attr('src', '/alink-hq/static/img/left-arrow-color.png');
    }
    if (page == pageTotal) {
        $('#next').attr('src', '/alink-hq/static/img/right-arrow.png');
        $("#next").addClass('disabled');
    } else {
        $('#next').attr('src', '/alink-hq/static/img/right-arrow-color.png');
    }
})
function nameKeyUp(){
    var name=$('#rename').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = regUserName.test(name);
    if(name!='' && !userNameResult){
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
    }else{
        $('p.rename-hint').text('');
    }
}
