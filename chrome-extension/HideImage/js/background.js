$(document).ready(function () {
    chrome.tabs.onUpdated.addListener(function (tabId) {
        var hideSwitchValue = Storage.getValue('hideSwitchValue');
        chrome.tabs.executeScript(null,{code:"window.hideSwitchValue="+hideSwitchValue});
    })
});