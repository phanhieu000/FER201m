import $ from "jquery";



$(function () {
    var star = '.star',
        selected = '.selected';

    $(star).on('click', function () {
        console.log('click')
        $(selected).each(function () {
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
    });

});


