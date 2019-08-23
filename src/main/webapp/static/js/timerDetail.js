var lightInfo2;
$(function () {
    var header = '<div class="scene-msg  timer f-l" id="time-scene" style=" width: calc(100% - 370px - 50px);"><div class="scene-content" ><div class="scene-list clearfix"><div class="f-l"><span>场景下的区域信息</span><span style="color:#999;font-weight: 300;">>></span></div><div class="f-l"><span>该区域下的组信息</span><span style="color:#999;font-weight: 300;">>></span></div><div class="f-l"> <span>该组下的灯详情</span></div></div><div class="clearfix  time-scene-msg  scene-msg-list">';
    $("#timeTitle .sname-a").click(function () {
        $(this).addClass('active');
        $(this).parent().parent().parent().siblings().find('.sname-a').removeClass('active');
        var sid = $(this).next().val();
        var sceneName = $(this).text();
        var sceneId = $(this).siblings("input").eq(1).val();
        var meshName = $("#mname").text();
        var meshId = $("#mid").text();
        $.ajax({
            url: "/alink-hq/timer/sceneDetail",
            dataType: "json",
            data: {"sid": sid, "sceneName": sceneName, "sceneId": sceneId, "meshName": meshName, "meshId": meshId},
            type: "POST",
            success: function (msg) {
                var placeList = msg.placeList;
                var groupList = msg.groupList;
                var lightList = msg.lightList;
                var lightInfo = msg.lightInfo;
                lightInfo2=lightInfo;
                var scene = '';
                var place = '';
                var group = '';
                var light = '';
                $(".scene-msg").remove();

                place += '<div class="f-l" style="border-right: none;"><ul>';
                $.each(placeList, function (key, value) {

                    if (isEmpty(value.x)) {
                        //xy值不统一
                        if (key == 0) {
                            //默认第一个选中
                            place += '<li class="pid active">' + value.pname + '(查看详情)</li>';
                        } else {
                            place += '<li class="pid">' + value.pname + '(查看详情)</li>';
                        }
                    } else {
                        if (key == 0) {
                            place += '<li class="pid active">' + value.pname + '(' + value.x + ',' + value.y + ')</li>';
                        } else {
                            place += '<li class="pid">' + value.pname + '(' + value.x + ',' + value.y + ')</li>';
                        }
                    }
                });
                place += '</ul></div>';
                group += '<div class="f-l" style="border-right: none;" id="groupMsg"><ul>';
                $.each(groupList, function (key, value) {
                    if (isEmpty(value.x)) {
                        if (key == 0) {
                            group += '<li class="gid active" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span>查看详情</span>)</li>';
                        } else {
                            group += '<li class="gid" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span>查看详情</span>)</li>';
                        }
                    } else {
                        if (key == 0) {
                            group += '<li class="gid active" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span>' + value.x + ',' + value.y + '</span>)</li>';
                        } else {
                            group += '<li class="gid" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span>' + value.x + ',' + value.y + '</span>)</li>';
                        }
                    }
                });

                group += '</ul></div>';
                light += '<div class="f-l clearfix"><div class="f-l" id="lightMsg2"><ul class="one">';
                $.each(lightList, function (key, value) {
                    if (key == 0 && lightInfo == null) {
                        light += '<li class="lid active" alt="'+value.id+'">';
                        light+= '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + '(色温),' + value.y + '(亮度)</span></li>';
                    } else if (key != 0 && lightInfo == null) {
                        light += '<li class="lid" alt="'+value.id+'">';
                        light += '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + ',' + value.y + '</span></li>';
                    } else if (key == 0 && lightInfo != null && value.id == lightInfo.id) {
                        light += '<li class="lid active">';
                        light+= '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + '(色温),' + value.y + '(亮度)</span></li>';
                    } else if (key != 0 && lightInfo != null && value.id == lightInfo.id) {
                        light += '<li class="lid active">';
                        light += '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + ',' + value.y + '</span></li>';
                    } else if (key == 0 && lightInfo != null && value.id != lightInfo.id) {
                        light += '<li class="lid">';
                        light+= '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + '(色温),' + value.y + '(亮度)</span></li>';
                    } else if (key != 0 && lightInfo != null && value.id != lightInfo.id) {
                        light += '<li class="lid">';
                        light += '<span>' + value.lname + '(' + value.lmac + ')</span><span>' + value.x + ',' + value.y + '</span></li>';
                    }
                });

                light += '</ul></div>';
                scene += header + place + group + light;
                $(".p-content>div:eq(2)").append(scene);
                $(".ssid").val(sid);
            }
        });
    });

    $("#timeTitle .sname-a:eq(0)").trigger("click");

});
$('.p-content ').on('click', 'li', function () {
    $(this).toggleClass('active').siblings().removeClass('active');
})


function isEmpty(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined) {
        return true;
    }
    else {
        value = value.replace(/\s/g, "");
        if (value == "") {
            return true;
        }
        return false;
    }
}
$(function () {
    // $("#timeTitle").freezeHeader({ 'height': '300px' });

    if ($(".time .f-l:eq(1) a").length<=0){
        // console.log("null")
        $(".time .f-l:eq(1)>span").append('<a style="pointer-events: none">查看项目详情</a>')
    }
})

$('.clearfix.timerDetail.table').on('click', '.gid', function () {
    var gid = $(this).attr('alt');
    var sid = $(".ssid").val();
    // console.log('gid',gid);
    // console.log('sid',sid);
    var content = '';
    $.ajax({
        type: "post",
        url: "/alink-hq/scene/groupDetail",
        data: {
            "gid": gid,
            "sid": sid
        },
        async: true,
        success: function (res) {
            $('.one li').remove();
            var lightList = res.lightList;
            $.each(lightList, function (key, value) {
                if(lightInfo2==null){
                    if (key == 0) {
                        content += '<li class="lid" alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '(色温)，' + value.y + '(亮度)</span></li>';
                    }else{
                        content += '<li class="lid" alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '，' + value.y + '</span></li>';
                    }
                }else if(lightInfo2!=null && lightInfo2.id==value.id){
                    if (key == 0) {
                        content += '<li class="lid active" alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '(色温)，' + value.y + '(亮度)</span></li>';
                    }else{
                        content += '<li class="lid active" alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '，' + value.y + '</span></li>';
                    }
                }else{
                    if (key == 0) {
                        content += '<li class="lid " alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '(色温)，' + value.y + '(亮度)</span></li>';
                    }else{
                        content += '<li class="lid " alt="' + value.id + '" ><span>' + value.lname + '(' + value.lmac + ')' + '</span><span>' + value.x + '，' + value.y + '</span></li>';
                    }
                }
            })
            $('.timerDetail  .one').append(content);
        }
    })
})

//paraName 等找参数的名称
function GetUrlParam(paraName) {
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 1) {
        var arrPara = arrObj[1].split("&");
        var arr;
        for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
                return arr[1];
            }
        }
        return "";
    }
    else {
        return "";
    }
}
