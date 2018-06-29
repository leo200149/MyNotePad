$(document).ready(function () {
    var hideSwitchValue = Storage.getValue('hideSwitchValue');
    var hideSwitch = $('#myonoffswitch');
    hideSwitch.bind('change',function(){
        var switchValue = $(this).prop("checked");
        Storage.setValue('hideSwitchValue',switchValue);
        chrome.tabs.executeScript(null,{code:switchValue?"$('body').addClass('hideImageBody')":"$('body').removeClass('hideImageBody')"});
    });
    hideSwitch.prop("checked",hideSwitchValue);
});