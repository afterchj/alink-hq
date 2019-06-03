/**
 * Created by qian.chen on 2019/5/28.
 */
//日期选择
laydate.render({
    elem: '#create-time',
    // type: 'datetime'
    // range: true
});
laydate.render({
    elem: '#end-time',
    // type: 'datetime'
    // range: true
});
var width = window.screen.width;
var height = window.screen.height;

$(function () {


    //  2-12 位中文、字母、数字
    var match = /^[0-9A-Za-z_\u4e00-\u9fa5]{2,12}$/;
    var text = "请输入2-12 位中文、字母、数字包括下划线";
    $('#page-select option').each(function () {
        if ($(this).val() == $("#pageSize").val()) {
            $(this).attr("selected", "selected");
        }
    })
//选择页数变化
    $('#page-select').change(function () {
        var pageSize = $(this).children('option:selected').val();
        var pageNum = $('.pages').text();
        condition(pageSize, pageNum);
    });
//跳转页数变化
    $('#skipPageBtn').click(function () {
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        condition(pageSize, pageNum);
    });

    var tid;
    var mid;
    // 点击重命名
    $("tr[class='timerLineTr']").on('click','.p-r .reset-name',function () {
        $(".confirm-on-off").addClass("active");
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });

        tid = $(this).parent().siblings("input").val();
        mid = $(this).parent().siblings().eq(3).text();
    });
    //点击取消
    $(".pop-btn .reduce").click(function () {
        $(".confirm-on-off").removeClass("active");
        $(".rename-hint").removeClass("active").text("");
        $("#rename").val("");
        $('.hide-iframe').removeClass('active');
    });
    //点击确定
    $(".pop-btn .yes").click(function () {
        var renameValue = $("#rename").val();
        if (isEmpty(renameValue)){
            //输入框为空
            $(".rename-hint").removeClass("active").text("");
            $(".rename-hint").addClass("active").text("请输入新名称");
        }else if (!match.test(renameValue)){
            //输入值不匹配
            $(".rename-hint").removeClass("active").text("");
            $(".rename-hint").addClass("active").text(text);
        }else {
            $.post("/alink-hq/timer/updateTname",{mid:mid,id:tid,tname:renameValue},
                function (data) {
                    var flag = data.flag;
                    if (flag=="true"){
                        //同一网络下 时间线名称重复
                        $(".rename-hint").removeClass("active").text("");
                        $(".rename-hint").addClass("active").text("已存在，请重新输入");
                    }else {
                        $(".confirm-on-off").removeClass("active");
                        // tname.text(renameValue);
                        // $(".rename-hint").removeClass("active").text("");
                        // $("#rename").val("");
                        window.location.href="/alink-hq/timer/list?id="+mid+ '&pageNum=' + $(".pages").text() + '&pageSize=' + $("#pageSize").val();
                    }
                })
        }
    });
    //匹配输入框
    $("#rename").bind(
        "input propertychange change",
        {hint:"rename-hint",context:"#rename",text:text,match:match},
        matchInput);
    //时间排序
    $("th[class='p-r'] .p-a").click(function () {
        var timeFlag = $(this).attr("id");
        window.location.href="/alink-hq/timer/list?id="+$("#mid").val()+ '&pageNum=' + $(".pages").text() + '&pageSize=' + $("#pageSize").val()+'&timeFlag='+timeFlag+'&tname='+$("#tname").val()+'&createDate='+$("#createDate").val()+'&endTime='+$("#endTime").val()+'&state='+$("#state").val();
    });
})
$(function () {

    //点击查询
    $(".search-button button").click(function () {
        var tname = $("#projectName").val();//定时名称
        var state = $("#status").val();//定时状态
        var createTime = $("#create-time").val();//创建时间
        var endTime = $("#end-time").val();//结束时间
        if (isEmpty(tname)){
            tname="";
        }else {
            tname = String(tname);
        }
        if (isEmpty(createTime)){
            createTime="";
        }
        if (isEmpty(endTime)){
            endTime="";
        }
        window.location.href="/alink-hq/timer/list?id="+$("#mid").val()+ '&pageNum=' + $(".pages").text() + '&pageSize=' + $("#pageSize").val()+'&tname='+tname+'&createDate='+createTime+'&endTime='+endTime+'&state='+state;
    });
})

function isEmpty(value){
    if(value == null || value == "" || value == "undefined" || value == undefined ){
        return true;
    }
    else{
        value = value.replace(/\s/g,"");
        if(value == ""){
            return true;
        }
        return false;
    }
}
/**
 * 匹配输入框
 * @param event
 */
function matchInput(event) {
    var context = $(event.data.context).val();
    if (!(event.data.match).test(context)){
        $('p.'+event.data.hint).removeClass('active').text('');
        $('p.'+event.data.hint).addClass('active').text(event.data.text);
    }else {
        $('p.'+event.data.hint).removeClass('active').text('');
    }
}


function mouseDown() {
    $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip-color.png');
}
function mouseUp() {
    $('#skipPageBtn').attr('src', '/alink-hq/static/img/skip.png');
}

function condition(pageSize, pageNum) {
    var url = window.location.href;
    var test = new RegExp("\\?");
    if (test.test(url)){
        url = url.substring(0,url.lastIndexOf("?"));
    }
    var newUrl = url +'?id='+$("#mid").val()+ '&pageNum=' + pageNum + '&pageSize=' + pageSize+'&tname='+$("#tname").val()+'&createDate='+$("#createDate").val()+'&endTime='+$("#endTime").val()+'&state='+$("#state").val();
    location.href = newUrl;
}
