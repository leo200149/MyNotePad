$(document).ready(function () {
  var selectText = null;

  var startClick = function (info, tab) {
    chrome.tabs.executeScript({
      code: "getSelectionText();"
    }, function (selection) {
      selectText = selection;
      var value = $('<textarea>');
      value.text(selectText);
      Storage.setValue('typingSelectText', value.text());
      alertTypingBoard();
    });
  };

  var alertTypingBoard = function () {
    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html"),
      type: "popup",
      height: 600,
      width: 800
    });
  };

  chrome.contextMenus.create({ "title": "Typing Now!!", "contexts": ["selection"], "onclick": startClick });
});
