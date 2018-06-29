function clearFacebook() {
    $('#rightCol').empty();
    $('#pagelet_bluebar,#pagelet_sidebar,#pagelet_composer,#pagelet_group_composer').remove();
    $('#userNav,#universalNav,#headerArea').remove();
    $('.imgWrap,.y_1bor1mvma3').remove();
    $('.UFICommentAuthorWithPresence,.UFIAddComment,.UFICommentReactionsBling,.UFILikeSentence,.UFIShareRow').remove();
    $('.UFILikeLink').parent().parent().parent().remove();
    $('a:not(noAfter)').addClass('noAfter');
}

if (window.location.href.indexOf("facebook") > -1) {
    clearFacebook();
    $('a,button,input').bind('click', function () {
        setTimeout(clearFacebook, 1000);
    });
    $(window).scroll(function(){
        setTimeout(clearFacebook, 1000);
    });
};