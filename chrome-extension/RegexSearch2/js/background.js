$(document).ready(function () {

    window.serachAndMark = function (regexPattern) {
        if (regexPattern != null && regexPattern.length > 0 && checkPattern(regexPattern)) {
            var regex = new RegExp('('+regexPattern+')', 'g');
            $('*').each(function () {
                var element = $(this);
                var text = element.clone().children().remove().end().text();
                $('mark').unwrap();
                if (regex.test(text)) {
                   element.html(element.html().replace(regex,'<mark>$1</mark>'));
                }
            })
        } else {
            $('*').each(function () {
                var element = $(this);
                element.find('mark').unwrap();
            })
        }

    };

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