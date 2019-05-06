/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    myBrowser();
    var tabs="lightList";
    var index=0;
    left(tabs,index);
    var id;
    var ids=[];
    var lname,mname;
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
        // lname=$(this).attr('lname');
        // mname=$(this).attr('mname');
        lname=$(this).parent().siblings('td.lname').find('a').text();
        mname=$(this).parent().siblings('td.mname').text();
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
        $('div[openContent="delete-mesh"] .reset-pwd').text('您确定要删除'+lname+'吗？');
        $('div[openContent="delete-mesh"] .reset-pwd-hint').text('删除该灯将会退出'+mname+'网络，请慎重！');
    })
    //删除确定--单选或复选框
    $('div[openContent="delete-mesh"] button.yes').click(function(){
        console.log(ids);
        if(ids){
            location.href = "/alink-hq/light/delete?ids=" + ids;
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
            location.href = "/alink-hq/light/move?ids=" + idss;
        }
    })
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