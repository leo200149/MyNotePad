$(document).ready(function () {
  var CountTimeTool = function () {
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
      isStart: function () {
        return isStart;
      },
      start: function () {
        if (!isStart) {
          countTime();
          isStart = true;
        }
      },
      end: function () {
        isEnd = true;
      }
    }
  };

  function initTypingBoard(text) {
    var textResult = '';
    var texts = text.split('<br>');
    for (var j = 0; j < texts.length; j++) {
      var txt = texts[j];
      textResult += '<div class="line" line="' + (j + 1) + '">';
      for (var i = 0; i < txt.length; i++) {
        textResult += '<span class="word">' + txt[i] + '</span>';
      }
      textResult += '</div>';
    }
    text = text.split('<br>').join('');
    $('#selectShow').append(textResult);
    $('#typingTxt').focus();
    var txtSpans = [];
    $('.word').each(function () {
      txtSpans.push($(this));
    });
    $('.line').bind('toTop', function () {
      var parentDiv = $('#selectShow');
      parentDiv.scrollTop(parentDiv.scrollTop() + $(this).position().top - 100);
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
              var line = item.parent().attr('line');
              item.parent().trigger('toTop');
            } else {
              item.removeClass('keydoneWord');
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
  var typingText = Storage.getValue('typingSelectText');
  Storage.removeValue('typingSelectText');
  initTypingBoard(typingText);
});
