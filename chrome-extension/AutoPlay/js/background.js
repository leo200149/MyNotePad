$(document).ready(function () {
    function fullscreen(){
        chrome.tabs.executeScript(null,{code:"console.log('test background');$('.vjs-fullscreen-control').click()"});
        console.log('test background');
    }
    chrome.tabs.onUpdated.addListener(function (tabId) {
        setTimeout(fullscreen,6000);
    })
});