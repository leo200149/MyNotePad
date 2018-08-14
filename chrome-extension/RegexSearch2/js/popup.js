$(document).ready(function () {
    var regexBox = $("#regexBox");
    var nextBtn = $('#nextBtn');
    var previousBtn = $('#previousBtn');
    var searching = false;

    regexBox.bind('keypress', function (e) {
        if (e.ctrlKey || e.which == 13) {
            return false;
        }
    });

    regexBox.bind('keydown', function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            previousBtn.click();
        } else if (e.which == 13) {
            nextBtn.click();
        }
    });

    regexBox.bind('keyup', function (e) {
        if (e.which == 17 || e.which == 13) {
            return false;
        }
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

    nextBtn.bind('click', function () {
        chrome.tabs.executeScript({
            code: "nextMark();"
        });
    });

    previousBtn.bind('click', function () {
        chrome.tabs.executeScript({
            code: "previousMark();"
        });
    });

    function cleanPattern(pattern) {
        pattern = pattern.split("\\").join("\\\\");
        pattern = pattern.split("\'").join("\\'");
        pattern = pattern.split("\"").join("\\\"");
        pattern = $.trim(pattern);
        return pattern;
    }

    chrome.tabs.executeScript({
        code: "getCurrentRegex();"
    }, function (result) {
        regexBox.val(result);
    });

    regexBox.focus();

});