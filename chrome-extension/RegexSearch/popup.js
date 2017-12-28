

function getSelectionText() {
  var selectText = window.getSelection().toString();
  return selectText;
}

function getMatches(str, regex) {
  var matches = [];
  var match = regex.exec(str);
  while (match != null) {
    console.log(match[0]);
    matches.push(match[0]);
    match = regex.exec(str);
  }
  return matches;
}

function checkIsCorrectRegex(regexStr){
  var isValid = true;
  try {
      new RegExp(regexStr);
  } catch(e) {
      isValid = false;
  }
  return isValid;
}

function popUpRegexBoard() {
  var text = getSelectionText();
  var box = $.fancybox.open('<div class=\"message\" style=\"width:80%\">' +
    '<div style=\"font-size:35px\">Regex Finder</div>' +
    '<div align=\"center\" style=\"margin-top:20px\">/<input type=\"text\" id="typingTxt" style=\"width:90%;height:30px;font-size:25px;\">/g</div>' +
    '<div align=\"center\" style=\"margin-top:20px\"><h2>selector</h2><textarea id=\"selectShow\" style=\"margin-top:20px;font-size:25px;width:90%;height:300px;\"/></div>' +
    '<div align=\"center\" style=\"margin-top:20px\"><h2>result</h2><textarea id=\"resultShow\" style=\"margin-top:20px;font-size:25px;width:90%;height:300px;\"/></div>' +
    '</div>', {
      beforeClose: function () {
      }
    });
  var selectShow = $('#selectShow');
  var resultShow = $('#resultShow');
  selectShow.text(text);
  $('#typingTxt').on('keyup', function () {
    resultShow.text('');
    var regexStr = $.trim($(this).val());
    if(!checkIsCorrectRegex()){
      resultShow.css('color','red');
      return false;
    }else{
      resultShow.css('color','none');
    }
    if (regexStr!=null && regexStr.length > 0) {
      var regex = new RegExp($(this).val(),"g");
      var matches = getMatches(selectShow.text(), regex);
      console.log(matches);
      var str = '';
      for (var i in matches) {
        str += matches[i] + '\n';
      }
      resultShow.text(str);
    }
  });
}