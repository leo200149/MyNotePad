$(document).ready(function () {

    var currentLanguage = Storage.getValue('currentLanguage');
    var languageSelect = $('#language');
    languageSelect.bind('change',function(){
        var language = $(this).val();
        if(currentLanguage!=language){
            Storage.setValue('currentLanguage',language=='default'?Storage.getValue('defaultLanguage'):language);
            chrome.tabs.executeScript(null,{code:"location.reload()"});
        }
    });

    $.ajax({
        type : 'GET',
        dataType : 'json',
        url:'../data/languages.json',
        success:function(languages){
            updateSelectOptions(languages);
        }
    });

    function updateSelectOptions(languages){
        $(languages).each(function(index,language){
            var option = $('<option>');
            option.text(language.name);
            option.val(language.code);
            option.attr('selected',currentLanguage==language.code);
            languageSelect.append(option);
        });
    }

});