$(document).ready(function () {
    var canHide = true;
    function hideImages() {
        $('a:not(noAfter)').each(function () {
            var element = $(this);
            element.addClass('noAfter');
            if (element.css('background-image') != 'none' && element.height()>50) {
                element.addClass('hiddenImg');
            }
        });
        $('iframe:not(hiddenIframe)').each(function (iframe) {
            if (checkIframeIsCross(iframe)) {
                $(this).addClass('hiddenIframe');
                $(this).hide();
            }
        });
        canHide = true;
    }
    function checkIframeIsCross(iframe) {
        var result = false;
        try {
            var loc = iframe.contentDocument.location.href;
        } catch (e) {
            result = true;
        }
        return result;
    }

    function init(){
        $('body').addClass('hideImageBody');
        hideImages();
        $('a,button,input').bind('click', function () {
            canHide = false;
            setTimeout(hideImages, 1000);
        });
        $(window).scroll(function () {
            canHide = false;
            setTimeout(hideImages, 1000);
        });
    }
    if(window.hideSwitchValue){
        init();
    }
});