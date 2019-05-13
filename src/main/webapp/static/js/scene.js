/**
 * Created by qian.chen on 2019/5/10.
 */
$(function () {

    var tabs = "meshList";
    var index = 0;
    left(tabs, index);
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
        $('.pop-btn .yes').click(function () {
            console.log("ids=" + ids);
            deletePlace(ids);
        })
    });
    //单选重命名
    var id;
    $('.reset-name').click(function () {
        id = $(this).attr("alt");
        // console.log("id="+id);
        // projectName=$(this).parent().siblings('.project-name').find('a').text();
        // account=$(this).parent().siblings('.project-account').text();
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
                url: "/alink-hq/place/rename",
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
    });
    //取消按钮
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        // $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
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

    //单选删除
    var ids;
    $('.singleDel').click(function () {
        ids = $(this).parent().siblings('.checkbox').find('input').val();
        $('div[openContent="delete-place"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    });
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="delete-place"]').removeClass('active');
        // $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });

    $('.pop-btn .yes').click(function () {
        console.log("ids=" + ids);
        deletePlace(ids);
    })
    function deletePlace(ids) {
        if (ids) {
            location.href = "/alink-hq/place/move?ids=" + ids;
        }
    }
});

$(function () {
    var height = $(document).height();
    $('.main-left').css('height', height);
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
//条件筛选
$(function () {
    var pageSize = GetUrlParam("pageSize");
    var pageNum = GetUrlParam("pageNum");
    if(!pageSize){
        pageSize='';
    }
    if(!pageNum){
        pageNum='';
    }
    //点击查询按钮时
    $('.search-button button').click(function () {
        var sceneName = $('#sceneName').val();
        var sceneId = $('#sceneId').val();
        // console.log(sceneId, sceneName);
        condition(sceneName, sceneId,pageSize,pageNum);
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
    $('#sceneName').val(sceneName);
    $('#sceneId').val(sceneId);
}
