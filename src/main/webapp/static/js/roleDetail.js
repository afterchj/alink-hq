/**
 * Created by yuanjie.fang on 2019/6/21.
 */
$(function () {
//tab切换
    $('.tab-nav>div').on('click', function () {
        var tabindex = $(this).attr('tabindex')
        $(this).addClass('active').siblings().removeClass('active')
        $('.tab-content-part').each(function () {
            var tabContent = $(this).attr('tabContent')
            if (tabContent == tabindex) {
                $(this).addClass('active').siblings().removeClass('active')
                if (tabindex == 0 || tabindex == 1) {
                    //项目管理、用户管理权限范围可选
                    $('.fix-left-nav').removeClass('gray');
                    $('.company-select>div').removeClass('gray');
                }else if (tabindex == 2 || tabindex == 3 ) {
                    //角色管理、文件管理权限范围背景灰色
                    $('.fix-left-nav').addClass('gray');
                    $('.company-select>div').removeClass('gray');
                }else if (tabindex == 4 || tabindex == 5){
                    //产品管理、合作管理权限范围 所在账号相关内容不可选
                    $('.fix-left-nav').removeClass('gray');
                    $('.account-related').addClass('gray');
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
            if ($(".tab-content-part.active").attr('id')=='projectManage' ||$(".tab-content-part.active").attr('id')=='fileManage'){
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
        // 固件历史版本查看
        if ($(this).attr('alt')=='viewHistoryOTA'){
            var viewHistoryOTA = $(this).parent().next().find('input:checkbox');
            if (!$(this).prop("checked")){//取消勾选
                //固件历史版本子层全部取消勾选
                viewHistoryOTA.each(function () {
                    $(this).prop('checked',false);
                })
            }else {//勾选
                $(viewHistoryOTA).eq(0).prop('checked',true);
            }
        }
    })
    //创建账号 查看角色权限
    $('input.singleRoleChecked:checkbox').click(function () {
        var singleListLength = $(this).parent().parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox').length
        var singleListCheckedLength = $(this).parent().parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox:checked').length//单个全选勾选数
        $(this).parent().parent().parent().parent().siblings('.list-title').find('input.allListChecked:checkbox').prop(
            'checked', singleListLength == singleListCheckedLength);//左侧复选
        $(this).parents('.tab-content-part.active').find('.allChecked').prop('checked', $(this).parents(".tab-content-part.active").find('.singleChecked').length == $(this).parents(".tab-content-part.active").find('.singleChecked:checked').length);//右侧全选
        if (singleListCheckedLength>=1){
            if ($(".tab-content-part.active").attr('id')=='fileManage'){
                $(this).parent().parent().parent().next().find('input[value=0]').prop('checked',true)//查看数据勾选
            }else {
                var allRadio = $(".tab-content-part.active").find('input[value=0]');
                allRadio.each(function () {
                    $(this).prop('checked',true);
                })
            }
        }
        $("input.singleListChecked:checkbox[alt='createUser']").prop('checked',$("input[alt^='createUser'].singleRoleChecked:checked").length>0);
        $("input.singleListChecked:checkbox[alt='viewHistoryOTA']").prop('checked',$("input[alt^='OTA'].singleRoleChecked:checked").length>0);//固件历史版本查看是否需要勾选
    });

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
