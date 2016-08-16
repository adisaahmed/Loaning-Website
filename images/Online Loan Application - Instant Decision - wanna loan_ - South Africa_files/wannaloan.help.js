

$(document).ready(function() {
    $('.help_icon').each(function() {

        var box = $(this).children('.help_info').first();
        $(this).click(function() {
            
            CloseOther(box);

            box.slideToggle("normal");

            //box.slideDown("normal");

        });

//        box.click(function() {
//            box.slideUp("normal");
//        });


    });
});

function CloseOther(openbox) {
    $('.help_icon').each(function() {
        var box = $(this).children('.help_info').first();
        if (box.attr('id') != openbox.attr('id'))
            box.slideUp("fast");
    });
}

