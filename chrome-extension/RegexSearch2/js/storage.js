const Storage = {
    localStorage: window.localStorage,
    setValue: function (key, value) {
        Storage.localStorage.setItem(key,JSON.stringify(value));
    },
    getValue: function(key){
        return JSON.parse(Storage.localStorage.getItem(key));
    },
    clear:function(){
        Storage.localStorage.clear();
    }
};
