/**
 * Crayola colors in JSON format
 * from: https://gist.github.com/jjdelc/1868136
 */

var data = [
    {'id': '0', 'label': 'zero'},
    {'id': '1', 'label': 'one'},
    {'id': '2', 'label': 'two'},
    {'id': '3', 'label': 'three'},
    {'id': '4', 'label': 'four'},
    {'id': '5', 'label': 'five'},
    {'id': '6', 'label': 'six'},
    {'id': '7', 'label': 'seven'},
    {'id': '8', 'label': 'eight'},
    {'id': '9', 'label': 'night'},
    {'id': '10', 'label': 'ten'}
];

$(function () {
    $('input').autocompleter({source:data,limit:5});
    // $("#nope").focus.autocomplete("/alink-hq/mesh/getProjects", {
    //     formatItem: function (row, i, max) {
    //         console.log("row="+JSON.stringify(row));
    //         var obj = eval("(" + row + ")"); //转换成js对象
    //         return obj.name;
    //     },
    //     formatResult: function (row) {
    //         var obj = eval("(" + row + ")"); //转换成js对象
    //         return obj.name;
    //     }
    // });
});
// $(function () {
//     console.log("autocompleter...");
//     $(':input').autocompleter({
//         // marker for autocomplete matches
//         // highlightMatches: true,
//
//         // object to local or url to remote search
//         source: data,
//
//         // custom template
//         template: '{{ label }} <span>({{ id }})</span>',
//
//         // show hint
//         // hint: true,
//
//         // abort source if empty field
//         empty: false,
//
//         // max results
//         limit: 5,
//
//         callback: function (value, index, selected) {
//             if (selected) {
//                 $('.icon').css('background-color', 'blue');
//             }
//         }
//     });
// });