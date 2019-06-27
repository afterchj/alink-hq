/**
 * Created by yuanjie.fang on 2019/6/25.
 */
$(function () {

    /**
     * 初始化插件
     */
    // $myselect.goSelectInput({
    //     // height: 30,
    //     // width: 250
    // });
    var uid = $("#uid").val();
    var pname = '';
    var pid = '';
    var mesh_id = '';
    pid=pid1(pid);
    mesh_id=mesh_id1(mesh_id);
    pname=pname1(pname);
    $.getJSON('/alink-hq/mesh/getProjects', {"uid": uid}, function (data) {
        var content = '';
        $.each(data, function (i, val) {
            content += '<option value="' + val.id + '">' + val.label + '</option>';
        })
        $('#projectId').append(content);
    })
    //监听项目选择
    $('#projectId').change(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        if (pid == '') {
            $('.project-hint').text('请选择项目');
        } else {
            $('.project-hint').text('')
        }
    })
    $('div[step="one-content"] .next-step').click(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        if (pid == '') {
            $('.project-hint').text('请选择项目');
        } else {
            $('.project-hint').text('')
            mesh(pid, mesh_id, pname)
            step2(pid, mesh_id, pname)
        }
    })

    //监听网络选择
    $('#mesh_id').change(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        if (mesh_id == '') {
            $('.mesh-hint').text('请选择网络');
            $('#meshId').val('');
        } else {
            $('.mesh-hint').text('')
            var meshId = mesh_id.substr(mesh_id.indexOf("_") + 1);
            $('#meshId').val(meshId);
        }
    })
    $('div[step="two-content"] .prev-step').click(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        step1(pid, mesh_id, pname)
    })
    $('div[step="two-content"] .next-step').click(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        if (mesh_id == '') {
            $('.mesh-hint').text('请选择网络');
        } else {
            $('.mesh-hint').text('')
            step3(pid, mesh_id, pname);
        }
    })

    //监听区域名称输入
    $('#pname').bind('input propertychange', function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var pnameResult = reg.test(pname);
        if (pname == '') {
            $('.place-hint').text('请输入区域名称')
        } else if (!pnameResult) {
            $('.place-hint').text('请输入2-6位汉字、字母、数字')
        } else {
            $('.place-hint').text('')
        }
    })

    $('div[step="three-content"] .prev-step').click(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        step2(pid, mesh_id, pname)
    })

    $('div[step="three-content"] .next-step').click(function () {
        pid=pid1(pid);
        mesh_id=mesh_id1(mesh_id);
        pname=pname1(pname);
        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var pnameResult = reg.test(pname);
        if (pname == '') {
            $('.place-hint').text('请输入区域名称')
        } else if (!pnameResult) {
            $('.place-hint').text('请输入2-6位汉字、字母、数字')
        } else {
            var mid = mesh_id.substring(0, 5);
            $.ajax({
                type: "get",
                url: "/alink-hq/place/checkName",
                data: {"mid": mid, "name": pname},
                success: function (res) {
                    if (res == 'success') {
                        $('.place-hint').text('')
                        $('#preload-anim').addClass('active');
                        $('#preload-anim .title').text('创建成功！');
                        $("form").submit();
                        // setTimeout(function () {
                        //     $('#preload-anim').removeClass('active');
                        //     $("form").submit();
                        // }, 1000)
                    } else {
                        $('.place-hint').text('已存在，请重新输入')
                    }
                }
            })
        }
    })
})
function step1(pid, mesh_id, pname) {
    $('div[step="one-content"]').addClass('active').siblings().removeClass('active');
    $('div[stepIcon="one"] img').attr('src', '/alink-hq/static/img/fill-1-on.png');
    pid=pid1(pid);
    mesh_id=mesh_id1(mesh_id);
    pname=pname1(pname);
    if (mesh_id && mesh_id != '') {
        $('div[stepIcon="two"] img').attr('src', '/alink-hq/static/img/fill-2-is.png');
    } else {
        $('div[stepIcon="two"] img').attr('src', '/alink-hq/static/img/fill-2-no.png');
    }
    if (pname && pname != '') {
        $('div[stepIcon="three"] img').attr('src', '/alink-hq/static/img/fill-3-is.png');
    } else {
        $('div[stepIcon="three"] img').attr('src', '/alink-hq/static/img/fill-3-no.png');
    }
}
function step2(pid, mesh_id, pname) {
    $('div[step="two-content"]').addClass('active').siblings().removeClass('active');
    $('div[stepIcon="two"] img').attr('src', '/alink-hq/static/img/fill-2-on.png');
    pid=pid1(pid);
    mesh_id=mesh_id1(mesh_id);
    pname=pname1(pname);
    if (pid && pid != '') {
        $('div[stepIcon="one"] img').attr('src', '/alink-hq/static/img/fill-1-is.png');
    } else {
        $('div[stepIcon="one"] img').attr('src', '/alink-hq/static/img/fill-1-no.png');
    }
    if (pname && pname != '') {
        $('div[stepIcon="three"] img').attr('src', '/alink-hq/static/img/fill-3-is.png');
    } else {
        $('div[stepIcon="three"] img').attr('src', '/alink-hq/static/img/fill-3-no.png');
    }
}
function step3(pid, mesh_id, pname) {
    $('div[step="three-content"]').addClass('active').siblings().removeClass('active');
    $('div[stepIcon="three"] img').attr('src', '/alink-hq/static/img/fill-3-on.png');
    pid=pid1(pid);
    mesh_id=mesh_id1(mesh_id);
    pname=pname1(pname);
    if (mesh_id && mesh_id != '') {
        $('div[stepIcon="two"] img').attr('src', '/alink-hq/static/img/fill-2-is.png');
    } else {
        $('div[stepIcon="two"] img').attr('src', '/alink-hq/static/img/fill-2-no.png');
    }
    if (pid && pid != '') {
        $('div[stepIcon="one"] img').attr('src', '/alink-hq/static/img/fill-1-is.png');
    } else {
        $('div[stepIcon="one"] img').attr('src', '/alink-hq/static/img/fill-1-no.png');
    }
}

function mesh(pid, mesh_id, pname) {
    pid=pid1(pid);
    mesh_id=mesh_id1(mesh_id);
    pname=pname1(pname);
    if ($('#mesh_id option').length == 0) {
        $('#mesh_id ').empty();
        $.getJSON('/alink-hq/group/getMesh', {"projectId": pid}, function (data) {
            var content = '<option value="" selected>请选择网络</option>';
            $.each(data, function (i, val) {
                content += '<option value="' + val.id + '"  class="new">' + val.label + '</option>';
            })
            $('#mesh_id ').append(content);
        })
    }
}

function pid1(pid) {
    if ($('#projectId option:selected').length > 0) {
        pid = $('#projectId option:selected').val();
    } else {
        pid = '';
    }
    return pid;
}
function mesh_id1(mesh_id) {
    if ($('#mesh_id option:selected').length > 0) {
          mesh_id = $('#mesh_id option:selected').val();
    } else {
          mesh_id = '';
    }
    return mesh_id;
}
function pname1(pname) {
    if ($('#pname').val().length > 0) {
         pname = $('#pname').val();
    } else {
         pname = '';
    }
    return pname;
}