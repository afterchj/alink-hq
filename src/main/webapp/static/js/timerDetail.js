$(function () {
    var header = '<div class="scene-msg timer f-l"><div class="scene-content" ><div class="scene-list clearfix"><div class="f-l"><span>场景下的区域信息</span><span>>></span></div><div class="f-l"><span>该区域下的组信息</span><span>>></span></div><div class="f-l"> <span>该组下的灯详情</span></div></div><div class="clearfix  scene-msg-list">';
    $(".sname-a").click(function () {

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
                var px = msg.px;
                var py = msg.py;
                var placeList = msg.placeList;
                var groupList = msg.groupList;
                var lightList = msg.lightList;
                var lightInfo = msg.lightInfo;
                var groupXYList = msg.groupXYList;
                var scene = '';
                var place = '';
                var group = '';
                var light = '';
                var lightXY = '';
                $(".scene-msg").remove();
                // scene += '<div class="scene-msg timer f-l"><div class="scene-content" ><div class="scene-list clearfix"><div class="f-l"><span>场景下的区域信息</span><span>>></span></div><div class="f-l"><span>该区域下的组信息</span><span>>></span></div><div class="f-l"> <span>该组下的灯详情</span></div></div><div class="clearfix  scene-msg-list">';

                place += '<div class="f-l" style="border-right: none;"><ul>';
                $.each(placeList, function (key, value) {

                    if (isEmpty(px)) {
                        //xy值不统一
                        if (key == 0) {
                            //默认第一个选中
                            place += '<li class="pid active">' + value.pname + '（查看详情）</li>';
                        } else {
                            place += '<li class="pid">' + value.pname + '（查看详情）</li>';
                        }
                    } else {
                        if (key == 0) {
                            place += '<li class="pid active">' + value.pname + '(' + px + ',' + py + ')</li>';
                        } else {
                            place += '<li class="pid">' + value.pname + '(' + px + ',' + py + ')</li>';
                        }
                    }
                });
                place += '</ul></div>';
                group += '<div class="f-l" style="border-right: none;" id="groupXYList"><ul>';

                $.each(groupList, function (key, value) {
                    // console.log("key1:"+key1+", value1: "+value1.gid);
                    if (isEmpty(groupXYList[0].x)) {
                        if (key == 0) {
                            group += '<li class="gid active" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">查看详情</span>)</li>';
                        } else {
                            group += '<li class="gid" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">查看详情</span>)</li>';
                        }
                    } else {
                        var count = 0;
                        $.each(groupXYList, function (key2, value2) {
                            // console.log("key2:" + key2 + ", value2: " + value2.gid);
                            if (value.gid == value2.gid) {
                                count++;
                                if (key == 0) {
                                    group += '<li class="gid active" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">' + value2.x + ',' + value2.y + '</span>)</li>';
                                } else {
                                    group += '<li class="gid" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">' + value2.x + ',' + value2.y + '</span>)</li>';
                                }
                            }
                        });
                        //没有找到xy值
                        if (count == 0) {
                            if (key == 0) {
                                group += '<li class="gid active" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">查看详情</span>)</li>';
                            } else {
                                group += '<li class="gid" alt="' + value.gid + '"><span >' + value.gname + '</span>(<span class="groupXy">查看详情</span>)</li>';
                            }
                        }
                    }
                });

                group += '</ul></div>';
                light += '<div class="f-l clearfix"><div class="f-l"><ul class="one">';
                lightXY += '<div class="f-l"><ul class="two">';
                $.each(lightList, function (key, value) {
                    if (key == 0 && lightInfo == null) {
                        light += '<li class="lid active">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid active" style="text-align: center;">' + value.x + '(色温),' + value.y + '(亮度)</li>';
                    } else if (key != 0 && lightInfo == null) {
                        light += '<li class="lid">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid" style="text-align: center;">' + value.x + ',' + value.y + '</li>';
                    } else if (key == 0 && lightInfo != null && value.id == lightInfo.id) {
                        light += '<li class="lid active">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid active" style="text-align: center;">' + value.x + '(色温),' + value.y + '(亮度)</li>';
                    } else if (key != 0 && lightInfo != null && value.id == lightInfo.id) {
                        light += '<li class="lid active">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid active" style="text-align: center;">' + value.x + ',' + value.y + '</li>';
                    } else if (key == 0 && lightInfo != null && value.id != lightInfo.id) {
                        light += '<li class="lid">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid" style="text-align: center;">' + value.x + '(色温),' + value.y + '(亮度)</li>';
                    } else if (key != 0 && lightInfo != null && value.id != lightInfo.id) {
                        light += '<li class="lid">' + value.lname + '(' + value.lmac + ')</li>';
                        lightXY += '<li class="lid" style="text-align: center;">' + value.x + ',' + value.y + '</li>';
                    }
                });

                light += '</ul></div>';
                lightXY += '</ul></div></div>';
                scene += header + place + group + light + lightXY;
                $(".p-content>div:eq(2)").append(scene);
                $(".ssid").val(sid);
            }
        });
    })
})
;
$('.p-content ').on('click', 'li', function () {
    $(this).toggleClass('active').siblings().removeClass('active');
})
$('.p-content ').on('click', '.gid', function () {
    var gid = $(this).attr('alt');
    var sid = $(".ssid").val();
    $('.one li').remove();
    $('.two li').remove();
    var content = '';
    var content1 = '';
    $.ajax({
        type: "post",
        url: "/alink-hq/scene/groupDetail",
        data: {
            "gid": gid,
            "sid": sid
        },
        async: true,
        success: function (res) {
            var lightList = res.lightList;
            $.each(lightList, function (key, value) {
                content += '<li class="lid" alt=' + value.id + '>' + value.lname + '(' + value.lmac + ')' + '</li>';
                if (key == 0) {
                    content1 += '<li class="lid" alt="' + value.id + '" style="text-align: center;">' + value.x + '(色温)，' + value.y + '(亮度)</li>';
                } else {
                    content1 += '<li class="lid" alt="' + value.id + '" style="text-align: center;">' + value.x + '，' + value.y + '</li>';
                }
            })
            $('.one').append(content);
            $('.two').append(content1);
        }
    })


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
