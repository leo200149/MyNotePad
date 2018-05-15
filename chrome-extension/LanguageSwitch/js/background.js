$(document).ready(function () {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            console.log(details);
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Accept-Language') {
                    setLanguage(details.requestHeaders[i]);
                    break;
                }
            }
            return { requestHeaders: details.requestHeaders };
        },
        { urls: ['<all_urls>'] },
        ['blocking', 'requestHeaders']
    );

    function setLanguage(header) {
        Storage.setValue('defaultLanguage', header.value);
        header.value = Storage.getValue('currentLanguage');
        console.log(header);
    }
});