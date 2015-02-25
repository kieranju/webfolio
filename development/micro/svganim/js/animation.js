$(document).ready(function () {

    jQuery.extend(jQuery.easing, {
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        }
    });

    function drawSVGPaths(_parentElement, _timeMin, _timeMax, _timeDelay) {

        var paths = $(_parentElement).find('path');

        $.each(paths, function (i) {

            var totalLength = this.getTotalLength();

            $(this).css({
                'stroke-dashoffset': totalLength,
                'stroke-dasharray': totalLength + ' ' + totalLength
            });

            $(this).delay(_timeDelay * i).animate({
                'stroke-dashoffset': 0
            }, {
                duration: Math.floor(Math.random() * _timeMax) + _timeMin,
                easing: 'easeInOutQuad'
            });
        });
    }

    function startSVGAnimation(_parentElement) {
        _parentElement.css("display", "inline");
        drawSVGPaths(_parentElement, 400, 400, 100);
        
        _parentElement.delay(500).fadeOut(450, function() {
            $(this).attr("class", "").fadeIn(500);
        });
    }

    startSVGAnimation($('#logo-svg'));
});