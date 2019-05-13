/**
 * Created by qian.chen on 2019/5/10.
 */
$(function () {
    var tabs = "meshList";
    var index = 0;
    left(tabs, index);
    var deleteArray=[];

    $("#multiDel").click(function () {
        var ids = [];
        $('input[name="ids"]:checked').each(function () {
            ids.push($(this).val());
        });
        if (ids.length > 0) {
            $('div[openContent="delete-place"]').addClass('active');
            var width = document.body.scrollWidth;
            var height = document.body.scrollHeight;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            });
        }
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
    $('div[openContent="reset-name"]  .pop-btn .yes').click(function () {
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
                url: "/alink-hq/scene/rename",
                data: {
                    "sceneName": name,
                    "sid": id
                },
                async: true,
                success: function (res) {
                    console.log(res);
                    if (res.result == "000") {
                        location.reload();
                    } else if(res.result == "307") {
                        $('p.rename-hint').text('已存在，请重新输入');
                    }else if(res.result == "200"){
                        console.log('系统错误');
                    }
                }
            })
        }
    });
    //重命名取消按钮
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
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
    //单选删除
    $('.singleDel').click(function () {
        // ids = $(this).parent().siblings('.checkbox').find('input').val();
        var  sid=parseInt($(this).parent().siblings('.sid').find('input').val());
        var sceneId=parseInt($(this).parent().siblings('.sceneId').text());
        $('div[openContent="delete-place"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
        var msg={
            id:sid,
            sceneId:sceneId
        }
        deleteArray.push(msg);
        console.log(deleteArray);
    })
    $('div[openContent="delete-place"] .pop-btn .reduce').click(function () {
        $('div[openContent="delete-place"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });
    $('div[openContent="delete-place"] .pop-btn .yes').click(function () {
        var newJsonArray=JSON.stringify(deleteArray);
        console.log(newJsonArray);
        $('div[openContent="delete-place"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        $.ajax({
            type: "POST",
            url: "/alink-hq/scene/delete",
            data: {sceneInfo: newJsonArray},
            dataType: "json",
            success: function (res) {
                if (res.result == '000') {
                    location.reload();
                    $('tbody tr td.checkbox input').prop('checked',false);
                    $('#all').prop('checked',false);
                } else if (res.result == '200') {
                    console.log('系统错误');
                }
            }
        })
    });

    // $('.pop-btn .yes').click(function () {
    //     console.log("ids=" + ids);
    //     deletePlace(ids);
    // })
    // function deletePlace(ids) {
    //     if (ids) {
    //         location.href = "/alink-hq/place/move?ids=" + ids;
    //     }
    // }
});
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
//id不能为非数字
$('#sceneId').on('input propertychange',function(){
    var sceneId=$(this).val();
    if(sceneId!=''  && isNaN(sceneId)){
        $(this).val('');
    }
})
//条件筛选
$(function () {
    //向左向右
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('.prev').removeClass('active');
        $(".prev").addClass('disabled');
    } else {
        $('.prev').addClass('active');
    }
    if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next").addClass('disabled');
    } else {
        $(".next").addClass('active');
    }
    var sceneName = decodeURIComponent(GetUrlParam("sceneName"));
    var sceneId  = decodeURIComponent(GetUrlParam("sceneId"));
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    if(!pageSize){
        pageSize=10;
    }
    if(!pageNum){
        pageNum='';
    }
    $('#sceneName').val(sceneName);
    $('#sceneId').val(sceneId);
    if(pageNum==''){
        $('#page').val('1');
    }else{
        $('#page').val(pageNum);
    }
    $('#size').children('option[value='+pageSize+']').prop('selected','selected');
    //点击查询按钮时
    $('.search-button button').click(function () {
        sceneName = $('#sceneName').val();
        sceneId = $('#sceneId').val();
        condition(sceneName, sceneId,pageSize,pageNum);
    })
    //选择页数变化
    $('#size').change(function () {
         pageSize = $(this).children('option:selected').val();
         pageNum = $('#page').val();
        if (pageNum == '') {
            pageNum == 1;
        } else {
            pageNum = parseInt(pageNum);
        }
        condition(sceneName, sceneId,pageSize, pageNum);
    })
    //点击上一页
    $('#prev').click(function(){
        if(pageNum==''){
            pageNum=1;
        }
        pageNum=parseInt(pageNum)-1;
        condition(sceneName,sceneId,pageSize,pageNum)
    })
    //点击下一页
    $('#next').click(function(){
        if(pageNum==''){
            pageNum=1;
        }
        pageNum=parseInt(pageNum)+1;
        condition(sceneName,sceneId,pageSize,pageNum)
    })
    //点击跳转
    $('#skip').click(function(){
        if($('#page').val()!=''&& parseInt($('#page').val())>=parseInt(pageTotal)){
            pageNum= parseInt(pageTotal);
            condition(sceneName,sceneId,pageSize,pageNum)
        }else if($('#page').val()!=''&& parseInt($('#page').val())<=1){
            pageNum= 1;
            condition(sceneName,sceneId,pageSize,pageNum)
        }else if($('#page').val()==''){
            pageNum= 1;
            condition(sceneName,sceneId,pageSize,pageNum)
        }else{
            pageNum=$('#page').val();
            condition(sceneName,sceneId,pageSize,pageNum)
        }
    })
})

//查询条件
function condition(sceneName,sceneId,pageSize,pageNum) {
    var url = window.location.href;
    var i = url.indexOf("?");
    if (i != -1) {
        var url2 = url.substring(0, i + 1);
    } else {
        var url2 = url + '?';
    }
    var newUrl = url2+'&meshName=测试网络01&meshId=71501234&mid=731'+'&pageSize='+pageSize+'&pageNum='+pageNum + '&sceneName=' + sceneName + '&sceneId=' + sceneId;
    location.href = newUrl;
}
