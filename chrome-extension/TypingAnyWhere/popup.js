

function getSelectionText() {
  var selectText = window.getSelection().toString();
  selectText = selectText.split("\n").join("<br>");
  selectText = selectText.split("\t").join("");
  selectText = selectText.split("&nbsp;").join("");
  selectText = selectText.split("&emsp;").join("");
  selectText = selectText.split("　").join("");
  selectText = selectText.split("'").join("\\'");
  selectText = selectText.replace(/ {2,}/gm,"");
  selectText = selectText.replace(/^ /gm,"");
  return selectText;
}


var CountTimeTool = function(){
  var time = 0;
  var isStart = false;
  var isEnd = false;
  function countTime() {
    function addSecond() {
      time++;
      $('#countTime').text(time);
      var words = $('.keydoneWord').size();
      var cpm = Math.floor(words / time * 60);
      $('#countWPM').text(cpm);
      if (!isEnd) {
        setTimeout(addSecond, 1000);
      } else {
        alert('use time:' + time + ' sec\nword count:' + words + '\nspeed:' + cpm + ' cpm/' + Math.floor(cpm / 5) + 'wpm');
      }
    }
    setTimeout(addSecond, 1000);
  }
  return {
    isStart:function(){
      return isStart;
    },
    start:function(){
      if (!isStart) {
        countTime();
        isStart = true;
      }
    },
    end:function(){
      isEnd = true;
    }
  }
};

function popUpTypingBoard(text) {
  var box = $.fancybox.open('<div class=\"message\" style=\"width:80%\">' +
    '<div style=\"font-size:35px\">Typing Now<span style=\"float:right;font-size:15px\" ><span id="countTime">0</span> SEC / <span id="countWPM">0</span> CPM</span></div>' +
    '<div id=\"selectShow\" style=\"margin-top:20px;font-size:25px\"></div>' +
    '<div align=\"center\" style=\"margin-top:20px\"><input type=\"text\" id="typingTxt" style=\"width:100%;height:30px;font-size:25px;\"></div>' +
    '</div>',{
      beforeClose:function(){
        countTimeTool.end();
      }
    });
  var textResult = '';
  var texts = text.split('<br>');
  for (var i in texts) {
    var txt = texts[i];
    for (var i = 0; i < txt.length; i++) {
      textResult += '<span class="word">' + txt[i] + '</span>';
    }
    textResult += '<br>';
  }
  text = text.split('<br>').join('');
  $('#selectShow').append(textResult);
  $('#typingTxt').focus();
  var txtSpans = [];
  $('.word').each(function () {
    txtSpans.push($(this));
  });

  var countTimeTool = CountTimeTool();
  $('#typingTxt').on('keyup', function (event) {
    var value = $(this).val();
    countTimeTool.start();
    if (text.startsWith(value)) {
      if (event.keyCode == 13) {
        var startIndex = text.indexOf(value);
        var endIndex = startIndex + value.length - 1;
        text = text.slice(value.length);
        txtSpans = txtSpans.slice(value.length);
        if (txtSpans[0].text() == ' ') {
          text = text.slice(1);
          txtSpans = txtSpans.slice(1);
        }
        $(this).val('');
      } else {
        var startIndex = text.indexOf(value);
        var endIndex = startIndex + value.length;
        for (var i in txtSpans) {
          var item = txtSpans[i];
          if (i >= startIndex && i < endIndex) {
            item.addClass('keydoneWord');
            item.css('color', 'green');
          } else {
            item.removeClass('keydoneWord');
            item.css('color', '');
          }
        }
      }
      if (value == text) {
        countTimeTool.end();
        $(this).hide();
      }
    }
  });
}