/**
 * Created by yuanjie.fang on 2019/6/21.
 */
$(function () {

    var role = 'default';
    $('.ad').click(function () {
        role = $(this).attr('alt');
        $(this).css('background','pink').siblings().css('background','#fff')
        console.log(role);
        $('[tabindex=0]').trigger("click");
    })

    // $('#default.ad').trigger("click");
    // $('[tabindex=0]').trigger("click");

//tab切换
    $('.tab-nav>div').on('click', function () {
        var tabindex = $(this).attr('tabindex')
        $(this).addClass('active').siblings().removeClass('active')
        $('.tab-content-part').each(function () {
            var tabContent = $(this).attr('tabContent')
            if (tabContent == tabindex) {
                $(this).addClass('active').siblings().removeClass('active')
                console.log('role1',role)
                //权限;创建时默认
                if (role == 'default') {
                    if (tabindex == 0) {
                        // $('.roleName').text('XXX')
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('.company-select input[value=0]:radio').prop('checked', true);
                        // $('[tabContent=0].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 1) {
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=1].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 2) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=2].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 3) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=3].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    }
                } else if (role == 'Admin') {
                    //权限：管理员
                    if (tabindex == 0) {
                        $('.roleName').text('管理员')
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('.company-select input[value=2]:radio').prop('checked', true);
                        // $('input#allChecked').trigger('click')
                        // $('[tabContent=0].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                        // $('[tabContent=0].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 1) {
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#allChecked').prop('checked', false);
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('.company-select input[value=2]:radio').prop('checked', true);
                        // $('input#allChecked').trigger('click')
                        // $('[tabContent=1].active input.admin-role:checkbox').prop('checked', false).parent().siblings().find('input:checkbox').prop('checked', true);
                        // $('[tabContent=1].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 2) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('input#allChecked').prop('checked', false);
                        // $('[tabContent=2].active input:checkbox').prop('checked', false);
                        // $('[tabContent=2].active input.lookRole:checkbox').prop('checked', true);
                        // $('[tabContent=2].active input.yi-admin-role:checkbox').prop('checked', true);
                        // $('[tabContent=2].active input.builders:checkbox').prop('checked', true);
                        // $('[tabContent=2].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 3) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('input#allChecked').trigger('click')
                        // $('[tabContent=3].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    }
                }else if (role == 'yi-Admin') {
                    //权限：乙方管理员
                    if (tabindex == 0) {
                        // $('.roleName').text('乙方管理员')
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('.company-select input[value=0]:radio').prop('checked', true);
                        // $('[tabContent=0].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 1) {
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=1].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 2) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=2].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 3) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=3].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    }
                }else if(role=='builders'){
                    //权限：施工人员
                    if (tabindex == 0) {
                        // $('.roleName').text('施工人员')
                        // $('.fix-left-nav').removeClass('gray');
                        // $('input#isAllRadio:radio').prop('checked', true);
                        // $('.company-select input[value=0]:radio').prop('checked', true);
                        // $('[tabContent=0].active input.singleIsRadio:radio[value=0]').prop('checked', true);
                    } else if (tabindex == 1) {
                        $('.fix-left-nav').removeClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=1].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 2) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=2].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    } else if (tabindex == 3) {
                        $('.fix-left-nav').addClass('gray');
                        // $('input#noAllRadio:radio').prop('checked', true);
                        // $('[tabContent=3].active input.singleNoRadio:radio[value=1]').prop('checked', true);
                    }
                }


            }
        })
    })
//复选纵向
    $('.allChecked').click(function () {
        var selector = $(".tab-content-part.active").find('input.singleChecked:checkbox');
        if ($(this).prop('checked')) {
            selector.each(function () {
                var childSelector = $(".tab-content-part.active").find('input.singleListChecked:checkbox')
                $(this).prop('checked', true)
                childSelector.prop('checked', true)
            })
            //点击全选 查看数据也全选
            var viewInfo = $(".tab-content-part.active").find('input:radio[value=0]');
            $.each(viewInfo,function () {
                $(this).prop('checked',true);
            })
        } else {
            selector.each(function () {
                var childSelector = $(".tab-content-part.active").find('input.singleListChecked:checkbox')
                $(this).prop('checked', false)
                childSelector.prop('checked', false)
            })
        }
    })
    $('input.singleChecked:checkbox').click(function () {
        var singleLength = $(".tab-content-part.active").find('.singleChecked').length;
        var singleCheckedLength = $(".tab-content-part.active").find('.singleChecked:checked').length;
        $(".tab-content-part.active").find('.allChecked').prop('checked', singleLength == singleCheckedLength);
    })
//复选横向
    $('input.allListChecked:checkbox').click(function () {
        var selector = $(this).parent().parent().siblings('.list-content').find('.one')
        if ($(this).prop('checked')) {
            selector.children().each(function () {
                $(this).find('input.singleListChecked:checkbox').prop('checked', true)
            });
            //勾选查看数据
            if ($(".tab-content-part.active").attr('id')=='projectManage'){
                //取消全选不可查看数据
                $(".tab-content-part.active").find('input.noAllRadio').prop('checked',false);
                $(this).parent().parent().siblings('.list-content').find('input.singleIsRadio').prop('checked',true);
                //全选可查看数据
                var allRadio = $(".tab-content-part.active").find('input:radio.singleIsRadio').length;
                var allCheckedRadio = $(".tab-content-part.active").find('input:radio.singleIsRadio:checked').length;
                $(".tab-content-part.active").find('.isAllRadio').prop('checked',allRadio==allCheckedRadio);
            }else {
                var allRadio = $(".tab-content-part.active").find('input[value=0]');
                allRadio.each(function () {
                    $(this).prop('checked',true);
                });
            }
        } else {
            selector.children().each(function () {
                $(this).find('input.singleListChecked:checkbox').prop('checked', false)
            })
        }
    })
    //选择单个权限
    $('input.singleListChecked:checkbox').click(function () {
        var singleListLength = $(this).parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox').length
        var singleListCheckedLength = $(this).parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox:checked').length
        $(this).parent().parent().parent().siblings('.list-title').find('input.allListChecked:checkbox').prop(
            'checked', singleListLength == singleListCheckedLength);
        $(this).parent().parent().parent().parent().parent('.tab-content-part.active').find('.allChecked').prop('checked', $(this).parents(".tab-content-part.active").find('.singleChecked').length == $(this).parents(".tab-content-part.active").find('.singleChecked:checked').length);
        //查看数据选项
        if (singleListCheckedLength>=1){
            if ($(".tab-content-part.active").attr('id')=='projectManage' || $(".tab-content-part.active").attr('id')=='fileManage'){
                $(this).parent().parent().next().find('input[value=0]').prop('checked',true);
                //取消全选不可查看数据
                $(".tab-content-part.active").find('input.noAllRadio').prop('checked',false);
                //全选可查看数据
                var allRadio = $(".tab-content-part.active").find('input:radio.singleIsRadio').length;
                var allCheckedRadio = $(".tab-content-part.active").find('input:radio.singleIsRadio:checked').length;
                // console.log(allRadio)
                // console.log(allCheckedRadio)
                $(".tab-content-part.active").find('.isAllRadio').prop('checked',allRadio==allCheckedRadio);
            }else {
                var allRadio = $(".tab-content-part.active").find('input[value=0]');
                allRadio.each(function () {
                    $(this).prop('checked',true);
                })
            }
        }
        if ($(this).attr('alt')=='createUser'){
            //创建账号
            if (!($(this).prop('checked'))){
                //取消勾选
                $(this).parent().next().find('input:checkbox').each(function () {
                    //取消创建账号时的角色选择
                    $(this).prop('checked',false);
                })
            }else {
                //勾选
                $(this).parent().next().find('input:checkbox:last').prop('checked',true);
            }
        }
        // 固件历史版本查看勾选
        if (!$(this).prop("checked") && $(this).attr('alt')=='viewHistoryOTA'){
            var viewHistoryOTA = $(this).parent().next().find('input:checkbox');
            //固件历史版本子层全部取消勾选
            viewHistoryOTA.each(function () {
                $(this).prop('checked',false);
            })
        }


    })
    //创建账号 查看角色权限
    $('input.singleRoleChecked:checkbox').click(function () {
        var singleListLength = $(this).parent().parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox').length
        var singleListCheckedLength = $(this).parent().parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox:checked').length
        $(this).parent().parent().parent().parent().siblings('.list-title').find('input.allListChecked:checkbox').prop(
            'checked', singleListLength == singleListCheckedLength)
        $(this).parents('.tab-content-part.active').find('.allChecked').prop('checked', $(this).parents(".tab-content-part.active").find('.singleChecked').length == $(this).parents(".tab-content-part.active").find('.singleChecked:checked').length);
        if (singleListCheckedLength>=1){
            if ($(".tab-content-part.active").attr('id')=='projectManage'|| $(".tab-content-part.active").attr('id')=='fileManage'){
                $(this).parent().parent().next().find('input[value=0]').prop('checked',true)
            }else {
                var allRadio = $(".tab-content-part.active").find('input[value=0]');
                allRadio.each(function () {
                    $(this).prop('checked',true);
                })
            }
        }
        $("input.singleListChecked:checkbox[alt='createUser']").prop('checked',$("input[alt^='createUser'].singleRoleChecked:checked").length>0);
        if ($(this).prev("checked")&&$(".tab-content-part.active").attr('id')=='fileManage'){
            $("input.singleListChecked:checkbox[alt='viewHistoryOTA']").prop('checked',true);
        }


    })

    //单选纵向
    //全选可查看数据
    $(' input.isAllRadio:radio').click(function () {
        var selector = $(this).parent().parent().parent().siblings('.list').find('input.singleIsRadio:radio[value=0]');
        selector.each(function () {
            $(this).prop('checked', true);
        })
    })
    //全选不可查看数据
    $(' input.noAllRadio:radio').click(function () {
        var selector = $(this).parent().parent().parent().siblings('.list').find('input.singleNoRadio:radio[value=1]');
        selector.each(function () {
            $(this).prop('checked', true);
        })
        //左侧全部不勾选
        var allCheckbox = $(".tab-content-part.active").find('input:checkbox');
        allCheckbox.each(function () {
            $(this).prop('checked',false);
        })
    })
    //单选可查看数据
    $(' input.singleIsRadio:radio[value=0]').click(function () {
        var singleIsRadioLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleIsRadio:radio[value=0]').length;
        var singleIsRadioCheckedLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleIsRadio:radio[value=0]:checked').length;
        $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.isAllRadio:radio').prop('checked', singleIsRadioLength == singleIsRadioCheckedLength);
        $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.noAllRadio:radio').prop('checked', false);
    })
    //单选不可查看数据
    $(' input.singleNoRadio:radio[value=1]').click(function () {
        var singleNoRadioLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleNoRadio:radio[value=1]').length;
        var singleNoRadioCheckedLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleNoRadio:radio[value=1]:checked').length;
        $(this).parent().parent().parent().parent().parent('.tab-content-part').find(' input.noAllRadio:radio').prop('checked', singleNoRadioLength == singleNoRadioCheckedLength);
        $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.isAllRadio:radio').prop('checked', false);
        //单列不勾选
        var oneListCheckbox =$(this).parent().parent().parent().parent().find('input:checkbox');
        oneListCheckbox.each(function () {
            $(this).prop('checked',false);
        })
        //全选不勾选
        $(".tab-content-part.active").find('input.allChecked:checkbox').prop('checked',false);
    })
})
