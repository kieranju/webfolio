var scrollTimer = 0;


function addClass(className) {
    $(this).addClass(className);
}

function disableHover() {
    clearTimeout(scrollTimer);
    document.body.classList.add("disable-hover");
    scrollTimer = setTimeout(function() {
        document.body.classList.remove("disable-hover");
    }, 350);
}

function inView(className, callback) {
    var args = Array.prototype.slice.call(arguments);
    args.splice(0,2);
    
    $(className).each(function(i) {
        var objectBottom = $(this).position().top + $(this).outerHeight();
        var windowBottom = $(window).scrollTop() + $(window).height();

        if (windowBottom > objectBottom) {
            callback.apply(this, args);
        }
    });
}


// initial elements on screen
inView(".proj-group", addClass, "proj-group-view");

// while scrolling
$(window).scroll(function() {
    inView(".proj-group", addClass, "proj-group-view");
    disableHover();
});