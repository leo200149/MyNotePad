$(document).ready(function () {
    var autoPlayAniGamer = Storage.getValue('autoPlayAniGamer');
	var isHideTop = false;
    function autoPlay(){
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
	function hideTop(){
		function hideOrShow(){
			if(isHideTop){
				$('.sky').hide();
				$('.mainmenu').hide();
				$('.container-player').css('padding','0');
				$('.container-player').css('max-width','100%');
				$('.BH_background').css('margin-top','0');
				$('.player').css('margin','0');
				$('.anime-title').hide();
				$('.data').hide();
				$('.news_list').hide();
				$('.whilebg').hide();
				$('.footer').hide();
				$('.bullet-send').hide();
			}else{
				$('.sky').show();
				$('.mainmenu').show();
				$('.container-player').css('max-width','');
				$('.BH_background').css('margin-top','');
				$('.player').css('margin-top','');
				$('.anime-title').show();
				$('.data').show();
				$('.news_list').show();
				$('.whilebg').show();
				$('.footer').show();
				$('.bullet-send').show();
			}
			isHideTop = !isHideTop;
		}
		var identEnable = $('.vjs-indent-enable')
		var identEnableBtn = $('.vjs-indent-button');
		if(identEnable.html()!=null){
			isHideTop = true;
		}
		identEnableBtn.bind('click',function(){
			hideOrShow();
		})
		hideOrShow();
	}
	
    function playWithAutoNextAndFullScreen(){
        var video = $('video')[0];
        if (video != null){
            $(video).bind('ended',function(){
                if (autoPlayAniGamer){
                    $('.playing').next().find('a')[0].click();
                }
            });
        }else {
            setTimeout(playWithAutoNextAndFullScreen,1000);
        }
    }
	
    function checkReady(){
        if ($('.R18')!=null) {
			hideTop();
            autoPlay();
            return
        }
        setTimeout(checkReady,1000);
    }

    initBtn();
    if(autoPlayAniGamer){
        setTimeout(checkReady,1000)
    }
});