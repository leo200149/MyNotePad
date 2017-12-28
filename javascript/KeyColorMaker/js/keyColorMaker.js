var boards = {};
var paintBoard = $('#paintBoard');
var currentBoard = {};
var keynum = 0;
var colorHist = {};

function createKeyboard(type){
	var keyboard = new Keyboard();
	var keypad = keyboard.init(keynum++,type,function(){
		var color = {keyColor:$('#colorPicker-key').val(),fontColor:$('#colorPicker-font').val()};
		var id = color.keyColor+color.fontColor;
		colorHist[id] = color;
		updateKeyColorHist();
		return color;
	});
	var panel = $('<div class="panel panel-default"></div>');
	var panelHead = $('<div class="panel-heading"></div>');
	var fontSwitchBtn = $('<input class="bootstrap-switch-label" type="checkbox" data-label-text="Show Font"/>');
	fontSwitchBtn.on('switchChange.bootstrapSwitch', function(event, state) {
		currentBoard.keyboard.fontSwitch(state);
	});
	var fontIconSwitch = $('<input class="bootstrap-switch-label" id="fontIconSwitch" type="checkbox" data-label-text="Change Font Icon"/>');
	fontIconSwitch.on('switchChange.bootstrapSwitch', function(event, state) {
		currentBoard.keyboard.fontIconSwitch(state,function(keyUI){
			var keyId = keyUI.attr('id');
			var child = keyUI.children();
			if(!child.hasClass('keyWord')){
				child = child.children();
			}
			$('#fontWord').text(child.attr('word'));
			$('#keyIdValue').val(keyId);
			$('#popFontIconBtn').trigger('click');
		});
	});
	var panelBody = $('<div class="panel-body"></div>');
	panelHead.text('Paint Box');
	panelHead.append(fontSwitchBtn);
	panelHead.append(fontIconSwitch);
	panelBody.append(keypad);
	panel.append(panelHead);
	panel.append(panelBody);
	var panelObj = {main:panel,head:panelHead,body:panelBody};
	paintBoard.append(panel);
	var board = {keyboard:keyboard,panel:panelObj};
	var tab = createTab(board);
	board.tab = tab;
	boards[keyboard.id] = board;
	currentBoard = board;
	updateKeyboardTabs();
	updateDeleteTabs();
	fontSwitchBtn.bootstrapSwitch({size:'mini',state:true});
	fontIconSwitch.bootstrapSwitch({size:'mini',state:false});
}

function deleteKeyboard(id){
	var board = boards[id];
	board.keyboard.keypad.remove();
	board.panel.main.remove();
	board.tab.remove();
	boards[id] = null;
	delete boards[id];
	var lastKey = Object.keys(boards).sort().reverse()[0];
	currentBoard = boards[lastKey];
	updateKeyboardTabs();
	updateDeleteTabs();
}

function updateKeyboardTabs(){
	var keyboardTabs = $('#keyboardTabs');
	keyboardTabs.html('');
	for(var key in boards){
		var board = boards[key];
		var panel = board.panel.main;
		var tab = board.tab;
		if(board===currentBoard){
			tab.addClass('active');
			panel.show();
		}else{
			tab.removeClass('active');
			panel.hide();
		}
		tab.on('click', function() {
			var id = $(this).attr('keyboardId');
			currentBoard = boards[id];
			updateKeyboardTabs();
		});
		keyboardTabs.append(tab);
	}
}
function updateDeleteTabs(){
	var keyboardDeletes = $('#keyboardDeletes');
	keyboardDeletes.html('');
	for(var key in boards){
		var board = boards[key];
		var tab = createTab(board);
		tab.on('click', function() {
			var id = $(this).attr('keyboardId');
			deleteKeyboard(id);
		});
		keyboardDeletes.append(tab);
	}
}

function createTab(board){
	var keyboard = board.keyboard;
	var tab = $('<li></li>');
	var a = $('<a href="#"></a>');
	a.text(keyboard.id);
	tab.attr('keyboardId',keyboard.id);
	tab.append(a);
	return tab;
}

function updateKeyColorHist(){
	var keyColorHist = $('#keyColorHist');
	keyColorHist.html('');
	if(Object.keys(colorHist).length>4){
		var firstKey = Object.keys(colorHist)[0];
		delete colorHist[firstKey];
	}
	for(var key in colorHist){
		var color = colorHist[key];
		var keyColor = color.keyColor;
		var font = $('<label class="keyWord">A</label>');
		font.css('color',color.fontColor);
		var keyColorMask = $('<span class="keyColor"></span>');
		keyColorMask.css('background',color.keyColor);
		keyColorMask.append(font);
		var keyDiv = $('<div class="key"></div>'); 
		keyDiv.append(keyColorMask);
		keyDiv.bind('click',{color:color},function(e){
			var color = e.data.color;
			$('.colorpicker.cp-key').colorpicker('setValue',color.keyColor);
			$('.colorpicker.cp-font').colorpicker('setValue',color.fontColor);
		});
		keyColorHist.append(keyDiv);
	}
}

$(document).ready(function() {
	$('.colorpicker.cp-key').colorpicker().on('changeColor.colorpicker',function(event){
		$('#demoColor').css('background',event.color);
	});
	$('.colorpicker.cp-font').colorpicker().on('changeColor.colorpicker',function(event){
		$('#demoLabel').css('color',event.color);
	});
	$('.colorpicker.cp-bg').colorpicker().on('changeColor.colorpicker',function(event){
		$('#demoBg').css('background',event.color);
	});
	
	$('#demoColor').css('background',$('#colorPicker-key').val());
	$('#demoLabel').css('color',$('#colorPicker-font').val());
	$('#demoBg').css('background',$('#colorPicker-bg').val());
	
	$('#paintKeys').on('click', function() {
		var color = $('#colorPicker-key');
		var id = currentBoard.keyboard.id;
		var fontIconSwitch = $('#fontIconSwitch').state;
		currentBoard.keyboard.fontIconSwitch(false);
		$('.key.'+id).trigger('click');
		currentBoard.keyboard.fontIconSwitch(fontIconSwitch);
	});
	$('#paintBg').on('click', function() {
		var color = $('#colorPicker-bg').val();
		var panelBody = currentBoard.panel.body;
		panelBody.css('background',color);
	});
	$('.bs-glyphicons-list >li').on('click', function() {
		var icon = $(this).children().attr('class');
		var keyId = $('#keyIdValue').val();
		currentBoard.keyboard.changeKeyIcon(keyId,icon);
		$('.close').click();
	});
	/*
	$('#saveBtn').on('click', function() {
		var data = {boards:boards};
		var json = JSON.stringify(data);
		var bytes = [];
		for (var i = 0; i < json.length; ++i) {
		    bytes.push(json.charCodeAt(i));
		}
        window.open('data:application/csv,charset=utf-8||' + bytes);
	});
	*/
	createKeyboard(104);
	$('#paintKeys').click();
	$('#paintBg').click();
});