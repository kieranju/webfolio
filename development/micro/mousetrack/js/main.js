function getAngle(a, b) {
    var x1 = a.x, x2 = b.x;
    var y1 = a.y, y2 = b.y;
    var angleRad = Math.atan2(y2 - y1, x2 - x1);
    var angleDeg = angleRad * (180 / Math.PI);
    
    return angleDeg;
}


// Mouse Tracking //

var mtContain  = $("#mt-contain"),
    mtMouse    = $("#mt-mouse");

var mtContainW = mtContain.innerWidth(),
    mtContainH = mtContain.innerHeight();

var mtTimer;

var point = $("#point"); // temporary point of rotation

$(document).mouseup(function(event) {
    switch (event.which) {
        case 1:
            $("#mt-grad1").css("display", "none");
            break;
        case 3:
            $("#mt-grad2").css("display", "none");
            this.oncontextmenu = function() {
                return false; // disables context menu
            }
            break;
    }
});

$(document).mousedown(function(event) {
    switch (event.which) {
        case 1:
            $("#mt-grad1").css("display", "inline");
            break;
        case 3:
            $("#mt-grad2").css("display", "inline");
            break;
    }
});

$(document).mousemove(function(event) {
    mtPosition(event);
});

function mtPosition(event) {
    
    var mtScaleX = window.innerWidth / mtContainW,
        mtScaleY = window.innerHeight / mtContainH;
    
    var offsetPoint = point.offset(),
        offsetMouse = mtMouse.offset();
    
    var mtRotation = (getAngle(
        { x: offsetPoint.left, y: offsetPoint.top },
        { x: offsetMouse.left, y: offsetMouse.top }
    ) + 90) / 2;
    
    mtMouse.css({
        "left" : event.pageX / mtScaleX,
        "top" : event.pageY / mtScaleY,
        "-webkit-transform" : "rotateZ(" + mtRotation + "deg)",
        "transform" : "rotateZ(" + mtRotation + "deg)"
    });
}



// Mouse Tracking, pure Javascript //

//var mtContain  = document.getElementById("mt-contain"),
//    mtMouse    = document.getElementById("mt-mouse"),
//    mtContainW = mtContain.offsetWidth,
//    mtContainH = mtContain.offsetHeight,
//    mtTimer;
//
//var point = document.getElementById("point"); // temporary point of rotation
//
//document.onmousemove = handleMouseMove;
//function handleMouseMove(event) {
//
//    mtPosition(event);
//    
//    //clearTimeout(mtTimer);
//    //mtTimer = setTimeout(mtPosition, 100, event);
//}
//
//function mtPosition(event) {
//    var eventDoc, doc, body, pageX, pageY;
//    event = event || window.event;
//
//    if (event.pageX == null && event.clientX != null) {
//        eventDoc = (event.target && event.target.ownerDocument) || document;
//        doc = eventDoc.documentElement;
//        body = eventDoc.body;
//
//        event.pageX = event.clientX +
//            (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
//            (doc && doc.clientLeft || body && body.clientLeft || 0);
//        event.pageY = event.clientY +
//            (doc && doc.scrollTop || body && body.scrollTop || 0) -
//            (doc && doc.clientTop || body && body.clientTop || 0);
//    }
//    
//    var scaleX = window.innerWidth / mtContainW,
//        scaleY = window.innerHeight / mtContainH;
//    
//    mtMouse.style.left = (event.pageX / scaleX) + "px";
//    mtMouse.style.top = (event.pageY / scaleY) + "px";
//    
//    var rotation = (getAngle(
//        { x: getOffset(point).left, y: getOffset(point).top },
//        { x: getOffset(mtMouse).left, y: getOffset(mtMouse).top }
//    ) + 90) / 2;
//    
//    mtMouse.style.webkitTransform = "rotateZ(" + rotation + "deg)"; // TODO: add browser support
//}