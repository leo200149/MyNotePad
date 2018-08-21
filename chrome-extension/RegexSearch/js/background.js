$(document).ready(function () {

    var markElements = null;
    var markIndex = 0;
    var currentElement = null;
    var currentRegex = null;

    window.serachAndMark = function (regexPattern, regexFlag) {
        var body = $('body');
        markIndex = 0;
        markElements = null;
        currentElement = null;
        currentRegex = regexPattern;
        body.unmark();
        if (regexPattern != null && regexPattern.length > 0 && checkPattern(regexPattern)) {
            var regex = new RegExp('(' + regexPattern + ')', 'gi');
            body.markRegExp(regex);
            markElements = $('mark');
            selectElement(markElements[0]);
        }
    };

    window.nextMark = function () {
        if (markElements != null && markElements.length > 0) {
            markIndex++;
            if (markIndex >= markElements.length) {
                markIndex = markElements.length - 1;
            }
            selectElement(markElements[markIndex], window.nextMark);
        }
    };

    window.previousMark = function () {
        if (markElements != null && markElements.length > 0) {
            markIndex--;
            if (markIndex <= 0) {
                markIndex = 0;
            }
            selectElement(markElements[markIndex], window.previousMark);
        }
    };

    window.getCurrentRegex = function () {
        return currentRegex;
    };

    function selectElement(element, passToNext) {
        if (element != null && element != currentElement) {
            if ($(element).is(":hidden")) {
                if (passToNext != null) {
                    passToNext();
                }
                return false;
            }
            if (currentElement != null) {
                $(currentElement).removeClass('mark-current');
            }
            currentElement = element;
            if (currentElement != null) {
                $('html, body').animate({
                    scrollTop: $(currentElement).offset().top - 150
                }, 100, 'linear');
                $(currentElement).addClass('mark-current');
            }
        }
    }

    function checkPattern(pattern) {
        var result = true;
        try {
            new RegExp(pattern, 'g');
        } catch (e) {
            result = false;
        }
        return result;
    }

});