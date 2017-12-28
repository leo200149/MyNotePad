$(document).ready(function () {
  var selectText = null;

  chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    switch (request.message) {
      case 'setText':
        window.selectText = request.data
        break;
    }
  });

  var startClick = function (info, tab) {
    chrome.tabs.executeScript({
      code: "getSelectionText();"
    }, function (selection) {
      selectText = selection;
      alertTypingBoard();
    });
  };

  var alertTypingBoard = function () {
    var value = $('<textarea>');
    value.text(selectText);
    chrome.tabs.executeScript({
      code: "popUpTypingBoard('"+value.text()+"');"
    });
  };

  chrome.contextMenus.create({ "title": "Typing Now!!", "contexts": ["selection"], "onclick": startClick });
});
