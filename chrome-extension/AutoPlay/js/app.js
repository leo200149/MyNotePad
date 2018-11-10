$(document).ready(function () {
    var autoPlayAniGamer = Storage.getValue('autoPlayAniGamer');
    function init(){
        $('#adult').click();
        setTimeout(playWithAutoNextAndFullScreen,3000);
    }
    function initBtn(){
        $('.ani-tabs').append(
        '<div class="ani-tabs__item">'+
            '<label class="switch">'+
            '<input type="checkbox" id="autoPlaySwitch">'+
            '<span class="slider round"></span>'+
            '</label>'+
        '</div>');
        var autoPlaySwitch = $('#autoPlaySwitch');
        autoPlaySwitch.bind('change',function(){
            var switchValue = $(this).prop("checked");
            Storage.setValue('autoPlayAniGamer',switchValue);
            autoPlayAniGamer = switchValue;
        });
        autoPlaySwitch.prop("checked",autoPlayAniGamer);
    }
    function playWithAutoNextAndFullScreen(){
        var video = $('video')[0];
        var isFullScreen = false;
        if (video != null){
            $(video).bind('ended',function(){
                if (autoPlayAniGamer){
                    isFullScreen = false;
                    $('.playing').next().find('a')[0].click();
                }
            });
            $(video).bind('play',function(){
                if (autoPlayAniGamer){
                    if (!isFullScreen){
                        console.log('fullscreen')
                        setTimeout(fullscreen,5000)
                        isFullScreen = true;
                    }
                }
            });
        }else {
            setTimeout(playWithAutoNextAndFullScreen,1000);
        }
    }
    function fullscreen(){
        $('.vjs-fullscreen-control').click();
    }
    function checkReady(){
        if ($('.R18')!=null) {
            init();
            return
        }
        setTimeout(checkReady,1000);
    }

    initBtn();

    if(autoPlayAniGamer){
        setTimeout(checkReady,1000)
    }
});