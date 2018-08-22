function getSelectionText() {
    var selectText = window.getSelection().toString();
    selectText = selectText.split("\n").join("<br>");
    selectText = selectText.split("\t").join("");
    selectText = selectText.split("&nbsp;").join("");
    selectText = selectText.split("&emsp;").join("");
    selectText = selectText.split("　").join("");
    selectText = selectText.split("'").join("\\'");
    selectText = selectText.replace(/ {2,}/gm,"");
    selectText = selectText.replace(/^ /gm,"");
    return selectText;
}