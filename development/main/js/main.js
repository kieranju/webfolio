var scrollTimer = 0;

function addClass(_className) {
    $(this).addClass(_className);
}

function disableHover() {
    clearTimeout(scrollTimer);
    
    $(document.body).addClass("disable-hover");
    scrollTimer = setTimeout(function() {
        $(document.body).removeClass("disable-hover");
    }, 350);
}

function inView(_className, _callback) {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0,2);
    
    $(_className).each(function(i) {
        var objectBottom = $(this).position().top + $(this).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > objectBottom) {
            _callback.apply(this, args);
        }
    });
}

// initial elements on screen
inView(".panel", addClass, "panel-view");

$(window).scroll(function() {
    inView(".panel", addClass, "panel-view");
    disableHover();
});

$(window).resize(function() {
    inView(".panel", addClass, "panel-view");
    disableHover();
});