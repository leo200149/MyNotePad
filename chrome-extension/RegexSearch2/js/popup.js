$(document).ready(function () {
    var regexBox = $("#regexBox");
    var searching = false;
    regexBox.bind('keyup', function () {
        var regexPattern = $(this).val();
        if (!searching) {
            searching = true;
            chrome.tabs.executeScript({
                code: "serachAndMark('" + cleanPattern(regexPattern) + "');"
            }, function (result) {
                searching = false;
            });
        }
    });

    function cleanPattern(pattern){
        pattern = pattern.split("\\").join("\\\\");
        pattern = pattern.split("\'").join("\\'");
        pattern = pattern.split("\"").join("\\\"");
        pattern = $.trim(pattern);
        return pattern;
    }

    regexBox.focus();
});