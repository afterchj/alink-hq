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
                        $('.roleName').text('XXX')
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
                        $('.roleName').text('乙方管理员')
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
                        $('.roleName').text('施工人员')
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
    $('#allChecked').click(function () {
        var selector = $('input.singleChecked:checkbox')
        if ($(this).prop('checked')) {
            selector.each(function () {
                var childSelector = $(this).parent().parent().siblings('.list-content').find('input.singleListChecked:checkbox')
                $(this).prop('checked', true)
                childSelector.prop('checked', true)
            })
        } else {
            selector.each(function () {
                var childSelector = $(this).parent().parent().siblings('.list-content').find('input.singleListChecked:checkbox')
                $(this).prop('checked', false)
                childSelector.prop('checked', false)
            })
        }
    })
    $('input.singleChecked:checkbox').click(function () {
        var singleLength = $('.singleChecked').length
        var singleCheckedLength = $('.singleChecked:checked').length
        $('#allChecked').prop('checked', singleLength == singleCheckedLength)
    })
//复选横向
    $('input.allListChecked:checkbox').click(function () {
        var selector = $(this).parent().parent().siblings('.list-content').find('.one')
        if ($(this).prop('checked')) {
            selector.children().each(function () {
                $(this).find('input.singleListChecked:checkbox').prop('checked', true)
            })
        } else {
            selector.children().each(function () {
                $(this).find('input.singleListChecked:checkbox').prop('checked', false)
            })
        }
    })
    $('input.singleListChecked:checkbox').click(function () {
        var singleListLength = $(this).parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox').length
        var singleListCheckedLength = $(this).parent().parent().parent('.list-content').find(
            'input.singleListChecked:checkbox:checked').length
        $(this).parent().parent().parent().siblings('.list-title').find('input.allListChecked:checkbox').prop(
            'checked', singleListLength == singleListCheckedLength)
        $('#allChecked').prop('checked', $('.singleChecked').length == $('.singleChecked:checked').length)
    })

//单选纵向
//可查看数据
    $('input#isAllRadio:radio').click(function () {
        var selector = $(this).parent().parent().parent().siblings('.tab-content-part').find('input.singleIsRadio:radio[value=0]');
        selector.each(function () {
            $(this).prop('checked', true);
        })
    })
//不可查看数据
    $('input#noAllRadio:radio').click(function () {
        var selector = $(this).parent().parent().parent().siblings('.tab-content-part').find('input.singleNoRadio:radio[value=1]');
        selector.each(function () {
            $(this).prop('checked', true);
        })
    })
    $('.list input.singleIsRadio:radio[value=0]').click(function () {
        var singleIsRadioLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleIsRadio:radio[value=0]').length;
        var singleIsRadioCheckedLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleIsRadio:radio[value=0]:checked').length;
        $('input#isAllRadio:radio').prop('checked', singleIsRadioLength == singleIsRadioCheckedLength);
        $('input#noAllRadio:radio').prop('checked', false);
    })
    $('.list input.singleNoRadio:radio[value=1]').click(function () {
        var singleNoRadioLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleNoRadio:radio[value=1]').length;
        var singleNoRadioCheckedLength = $(this).parent().parent().parent().parent().parent('.tab-content-part').find('input.singleNoRadio:radio[value=1]:checked').length;
        $('input#noAllRadio:radio').prop('checked', singleNoRadioLength == singleNoRadioCheckedLength);
        $('input#isAllRadio:radio').prop('checked', false);
    })
})
