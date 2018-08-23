$(document).ready(function() {

    var currentInput;

    const emojis =         [{value:"ლ(・ω・ლ)"},
    {value:"╮(╯◇╰)╭"},
    {value:"(=￣ω￣=)"},
    {value:"╭(﹊∩∩﹊)╮"},
    {value:"(^(00)^)"},
    {value:"(=^_^=)"},
    {value:"(^(エ)^)"},
    {value:"＝ ＝+"},
    {value:"＝　＝╬"},
    {value:"<;(￣ ﹌ ￣)>;"},
    {value:"<;(￣ ﹌ ￣)>;"},
    {value:"<;(￣ ﹌ ￣)@m"},
    {value:"╰（‵□′）╯"},
    {value:"┴─┴︵╰（‵□′╰"},
    {value:"┴┴︵╰（‵□′）╯︵┴┴"},
    {value:"(╯-_-)╯ ~╩╩"},
    {value:"（╬￣皿￣）＝○＃（￣＃）３￣）"},
    {value:"＜（‵□′）＞───Ｃε（┬＿┬）３ "},
    {value:"＜( ￣︿￣)︵θ︵θ︵θ︵θ︵☆（＞口＜－）"},
    {value:"〈（＿　＿）〉"},
    {value:"ｍ（＿　＿）ｍ"},
    {value:"（ノ＿　＿）ノ▽"},
    {value:"\(\"▔□▔)/"},
    {value:"(O_o)??"},
    {value:"o_O ||"},
    {value:"◎_◎"},
    {value:"O口O!"},
    {value:"Σ(￣□￣；"},
    {value:"(⊙ˍ⊙)"},
    {value:"(。_。)"},
    {value:"Σ( ° △ °|||)"},
    {value:"(@~@)?"},
    {value:"O<;="},
    {value:"o(〒﹏〒)o"},
    {value:"〒.〒"},
    {value:"(￣口￣)!!"},
    {value:"／︿＼"},
    {value:"(＞x＜)"},
    {value:"(￣.￣)+ …"},
    {value:"(￣▽￣)\""},
    {value:"(￣３￣)a"},
    {value:"(￣0 ￣)y"},
    {value:"(＞﹏＜)"},
    {value:"(→_→)"},
    {value:"(ˇˍˇ)"},
    {value:"(>;////<;)"},
    {value:"≧◇≦"},
    {value:"(#￣▽￣#)"},
    {value:"v(￣︶￣)y"},
    {value:"(￣ー￣)"},
    {value:"Ψ(￣∀￣)Ψ"},
    {value:"<;(‵▽′)>;"},
    {value:"(￣▽￣)~*"},
    {value:"（￣︶￣）↗ "},
    {value:"(￣﹁￣)"},
    {value:"╮(－_－)╭"},
    {value:"╮(╯◇╰)╭"},
    {value:"ㄟ(￣▽￣ㄟ)"},
    {value:"（～￣▽￣～）"},
    {value:"*\(^_^)/*"},
    {value:"-,,-"},
    {value:"( ￣ c￣)y▂ξ"},
    {value:"( ▔___▔)y-～"},
    {value:"（　￣ー￣）ﾉ■☆■ヾ(￣ー￣　)"},
    {value:"ε＝（ノ＿　＿）ノ"},
    {value:"(￣o￣) . z Z"},
    {value:"（￣￢￣）ＺＺＺｚｚｚ・・・"},
    {value:"(^_-)db(-_^) "},
    {value:"ｂ（￣▽￣）ｄ"},
    {value:"O-(///￣皿￣)☞ ─═≡☆゜★█▇▆▅▄▃▂＿"},
    {value:"( ☉_☉)≡☞o────★°"},
    {value:"○(￣︿￣) ○─═★°"},
    {value:"◢▆▅▄▃ ╰(〒皿〒)╯ ▃▄▅▆◣"},
    {value:"╭(′▽`)╭(′▽`)╯"},
    {value:"╭∩╮（￣▽￣）╭∩╮"},
    {value:"＝\"＝凸"},
    {value:"<;(￣3￣)>;"},
    {value:"(￣﹁￣)"},
    {value:"( h_n )"},
    {value:"ˇ.ˇ"},
    {value:"‧★,:*:‧\(￣▽￣)/‧:*‧°★*"},
    {value:"(⊙０⊙)"},
    {value:"( ￣□￣)/ <;(￣ㄧ￣ ) <;(￣ㄧ￣ )"},
    {value:"ε٩(๑>; ₃ <;)۶з"},
    {value:"　(≖‿ゝ≖)✧"},
    {value:"ㅇㅁㅇ"},
    {value:"இдஇ"},
    {value:"ლ(ﾟдﾟლ)"},
    {value:"(๑´ㅂ`๑)"},
    {value:"(๑˘ ₃˘๑)"},
    {value:"(´･ω･`)"},
    {value:"づ(・ω・)づ  "},
    {value:"(・∀・)  "},
    {value:" (ˊ● ω ●ˋ)"},
    {value:"(’・ω・‘) "},
    {value:" (〃∀〃)~♡  "},
    {value:"ヽ(o’Д`o)ノ"},
    {value:"（*ﾟДﾟ）"},
    {value:"(ゝ∀･)"},
    {value:"(●’ω`●）"},
    {value:"ლ(・ω・ლ)"},
    {value:"（ノ≧∀≦）ノ  "},
    {value:"(◕‿◕)"},
    {value:"（♡∀♡）"},
    {value:"（づ¯ ³ ¯）づ"},
    {value:" Σ（゜ロ゜;）"},
    {value:"(*゜Д゜)ゞ”"},
    {value:"ヽ（・∀・）ノ"},
    {value:"（▼皿▼＃"},
    {value:"\（^∀^）メ（^∀^）ノ"},
    {value:"  (((*°▽° *）八（* °▽°*)))♪"},
    {value:"Σ(・ω・ノ)ノ ┴─┴"}];

    window.initEmojiBtn = function() {
        var popupBlock = $('<div>');
        popupBlock.addClass('popupBlock');
        for(var i = 0;i<emojis.length;i++){
            var emoji = emojis[i];
            var emojiBtn = $('<button>');
            emojiBtn.addClass('emojiBtn');
            emojiBtn.text(emoji.value);
            emojiBtn.bind('click',function(){
                if(currentInput!=null){
                    currentInput.val(currentInput.val()+$(this).text());
                    currentInput.focus();
                }
            });
            popupBlock.append(emojiBtn);
        }


        var emojiGroupBtn = $('<button>');
        emojiGroupBtn.addClass('emojiGroupBtn');
        emojiGroupBtn.css('background-image','url('+chrome.extension.getURL('icon.png')+')');
        emojiGroupBtn.bind('click',function(e){
            popup();
            e.preventDefault();
            return false;
        });
        $('body').prepend(popupBlock);
        $('body').prepend(emojiGroupBtn);
        $('body').bind('click',function(){
            $('.popupBlock').hide();
        });
    };

    
    $('input:text:visible').bind('focus',function(){
        currentInput = $(this);
    });

    function popup(){
        if($('.popupBlock').is(':visible')){
            $('.popupBlock').hide();
        }else{
            $('.popupBlock').show();
        }
    }

    initEmojiBtn();
});
