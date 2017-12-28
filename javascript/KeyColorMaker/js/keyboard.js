var Keyboard = function(){
	var keypad = null;
	var keypadId = null;
	var keyOnClickFn = null;
	var fontSwitch = true;
	var fontIconSwitch = false;
	var fontIconFn = null;
	var KEY=
	{
		a:{code:'65',name:'A',css:'key'},
		b:{code:'66',name:'B',css:'key'},
		c:{code:'67',name:'C',css:'key'},
		d:{code:'68',name:'D',css:'key'},
		e:{code:'69',name:'E',css:'key'},
		f:{code:'70',name:'F',css:'key'},
		g:{code:'71',name:'G',css:'key'},
		h:{code:'72',name:'H',css:'key'},
		i:{code:'73',name:'I',css:'key'},
		j:{code:'74',name:'J',css:'key'},
		k:{code:'75',name:'K',css:'key'},
		l:{code:'76',name:'L',css:'key'},
		m:{code:'77',name:'M',css:'key'},
		n:{code:'78',name:'N',css:'key'},
		o:{code:'79',name:'O',css:'key'},
		p:{code:'80',name:'P',css:'key'},
		q:{code:'81',name:'Q',css:'key'},
		r:{code:'82',name:'R',css:'key'},
		s:{code:'83',name:'S',css:'key'},
		t:{code:'84',name:'T',css:'key'},
		u:{code:'85',name:'U',css:'key'},
		v:{code:'86',name:'V',css:'key'},
		w:{code:'87',name:'W',css:'key'},
		x:{code:'88',name:'X',css:'key'},
		y:{code:'89',name:'Y',css:'key'},
		z:{code:'90',name:'Z',css:'key'},
		m0:{code:'48',name:'0',css:'key'},
		m1:{code:'49',name:'1',css:'key'},
		m2:{code:'50',name:'2',css:'key'},
		m3:{code:'51',name:'3',css:'key'},
		m4:{code:'52',name:'4',css:'key'},
		m5:{code:'53',name:'5',css:'key'},
		m6:{code:'54',name:'6',css:'key'},
		m7:{code:'55',name:'7',css:'key'},
		m8:{code:'56',name:'8',css:'key'},
		m9:{code:'57',name:'9',css:'key'},
		n0:{code:'96',name:'0',css:'key key-ins'},
		n1:{code:'97',name:'1',css:'key'},
		n2:{code:'98',name:'2',css:'key'},
		n3:{code:'99',name:'3',css:'key'},
		n4:{code:'100',name:'4',css:'key'},
		n5:{code:'101',name:'5',css:'key'},
		n6:{code:'102',name:'6',css:'key'},
		n7:{code:'103',name:'7',css:'key'},
		n8:{code:'104',name:'8',css:'key'},
		n9:{code:'105',name:'9',css:'key'},
		nPlus:{code:'106',name:'*',css:'key'},
		nEqual:{code:'107',name:'=+',css:'key key-plus'},
		nEnter:{code:'108',name:'Enter',css:'key key-plus'},
		nSubt:{code:'109',name:'-',css:'key'},
		nDot:{code:'110',name:'.',css:'key'},
		nDivide:{code:'111',name:'/',css:'key'},
		f1:{code:'112',name:'F1',css:'key'},
		f2:{code:'113',name:'F2',css:'key'},
		f3:{code:'114',name:'F3',css:'key'},
		f4:{code:'115',name:'F4',css:'key'},
		f5:{code:'116',name:'F5',css:'key'},
		f6:{code:'117',name:'F6',css:'key'},
		f7:{code:'118',name:'F7',css:'key'},
		f8:{code:'119',name:'F8',css:'key'},
		f9:{code:'120',name:'F9',css:'key'},
		f10:{code:'121',name:'F10',css:'key'},
		f11:{code:'122',name:'F11',css:'key'},
		f12:{code:'123',name:'F12',css:'key'},
		backsapce:{code:'8',name:'BackSpace',css:'key key-back'},
		tab:{code:'9',name:'Tab',css:'key key-tab'},
		mEnter:{code:'13',name:'Enter',css:'key key-enter'},
		rShift:{code:'161',name:'Shift',css:'key key-rshift'},
		lShift:{code:'16',name:'Shift',css:'key key-lshift'},
		ctrl:{code:'17',name:'Ctrl',css:'key key-ctrl'},
		alt:{code:'18',name:'Alt',css:'key key-alt'},
		caps:{code:'20',name:'CapsLock',css:'key key-caps'},
		lWin:{code:'91',name:'Win',css:'key key-win'},
		rWin:{code:'92',name:'Win',css:'key key-win'},
		mSelect:{code:'93',name:'Select',css:'key key-rightclick'},
		esc:{code:'27',name:'Esc',css:'key'},
		space:{code:'32',name:'Spacebar',css:'key key-space'},
		fcPgup:{code:'33',name:'PgUp',css:'key'},
		fcPgdn:{code:'34',name:'PgDn',css:'key'},
		fcEnd:{code:'35',name:'End',css:'key'},
		fcHome:{code:'36',name:'Home',css:'key'},
		fcL:{code:'37',name:'←',css:'key'},
		fcU:{code:'38',name:'↑',css:'key'},
		fcR:{code:'39',name:'→',css:'key'},
		fcD:{code:'40',name:'↓',css:'key'},
		fcIns:{code:'45',name:'Ins',css:'key'},
		fcDel:{code:'46',name:'Del',css:'key'},
		nNum:{code:'144',name:'Num',css:'key'},
		mSemi:{code:'186',name:';:',css:'key'},
		mEqual:{code:'187',name:'=+',css:'key'},
		mComma:{code:'188',name:',<',css:'key'},
		fcSclk:{code:'145',name:'ScLk',css:'key'},
		fcPrt:{code:'44',name:'Prt/SR',css:'key'},
		fcPause:{code:'19',name:'Pa/Br',css:'key'},
		mSubt:{code:'189',name:'-_',css:'key'},
		mDot:{code:'190',name:'.>',css:'key'},
		mDivide:{code:'191',name:'/?',css:'key'},
		mMark:{code:'192',name:'`~',css:'key'},
		mLpts:{code:'219',name:'[{',css:'key'},
		mNDivide:{code:'220',name:'\\|',css:'key key-nDivide'},
		mRpts:{code:'221',name:']}',css:'key'},
		mQuotes:{code:'222',name:'\'"',css:'key'},
		pad1:{code:'pad1',name:'',css:'keypadSize1'},
		pad2:{code:'pad2',name:'',css:'keypadSize2'},
		pad5:{code:'pad3',name:'',css:'keypadSize5'},
		padkey:{code:'padkey',name:'',css:'keypadKeySize'},
		unknow:{code:'unknow',name:'',css:'key'}
	};
	var key61 = {
		main:[
			[],
			[KEY.mMark,KEY.m1,KEY.m2,KEY.m3,KEY.m4,KEY.m5,KEY.m6,KEY.m7,KEY.m8,KEY.m9,KEY.m0,KEY.mSubt,KEY.mEqual,KEY.backsapce],
			[KEY.tab,KEY.q,KEY.w,KEY.e,KEY.r,KEY.t,KEY.y,KEY.u,KEY.i,KEY.o,KEY.p,KEY.mLpts,KEY.mRpts,KEY.mNDivide],
			[KEY.caps,KEY.a,KEY.s,KEY.d,KEY.f,KEY.g,KEY.h,KEY.j,KEY.k,KEY.l,KEY.mSemi,KEY.mQuotes,KEY.mEnter],
			[KEY.lShift,KEY.z,KEY.x,KEY.c,KEY.v,KEY.b,KEY.n,KEY.m,KEY.mComma,KEY.mDot,KEY.mDivide,KEY.rShift],
			[KEY.ctrl,KEY.lWin,KEY.alt,KEY.space,KEY.alt,KEY.rWin,KEY.mSelect,KEY.ctrl]
		]
	};
	var key87 = {
		main:[
			[KEY.esc,KEY.pad5,KEY.f1,KEY.f2,KEY.f3,KEY.f4,KEY.pad2,KEY.f5,KEY.f6,KEY.f7,KEY.f8,KEY.pad2,KEY.f9,KEY.f10,KEY.f11,KEY.f12],
			[KEY.mMark,KEY.m1,KEY.m2,KEY.m3,KEY.m4,KEY.m5,KEY.m6,KEY.m7,KEY.m8,KEY.m9,KEY.m0,KEY.mSubt,KEY.mEqual,KEY.backsapce],
			[KEY.tab,KEY.q,KEY.w,KEY.e,KEY.r,KEY.t,KEY.y,KEY.u,KEY.i,KEY.o,KEY.p,KEY.mLpts,KEY.mRpts,KEY.mNDivide],
			[KEY.caps,KEY.a,KEY.s,KEY.d,KEY.f,KEY.g,KEY.h,KEY.j,KEY.k,KEY.l,KEY.mSemi,KEY.mQuotes,KEY.mEnter],
			[KEY.lShift,KEY.z,KEY.x,KEY.c,KEY.v,KEY.b,KEY.n,KEY.m,KEY.mComma,KEY.mDot,KEY.mDivide,KEY.rShift],
			[KEY.ctrl,KEY.lWin,KEY.alt,KEY.space,KEY.alt,KEY.rWin,KEY.mSelect,KEY.ctrl]
		],
		functional:[
			[KEY.fcPrt,KEY.fcSclk,KEY.fcPause],
			[KEY.fcIns,KEY.fcHome,KEY.fcPgup],
			[KEY.fcDel,KEY.fcEnd,KEY.fcPgdn],
			[KEY.padkey,KEY.padkey,KEY.padkey],
			[KEY.padkey,KEY.fcU,KEY.padkey],
			[KEY.fcL,KEY.fcD,KEY.fcR]
		]
	};
	var key104 = {
		main:[
			[KEY.esc,KEY.pad5,KEY.f1,KEY.f2,KEY.f3,KEY.f4,KEY.pad2,KEY.f5,KEY.f6,KEY.f7,KEY.f8,KEY.pad2,KEY.f9,KEY.f10,KEY.f11,KEY.f12],
			[KEY.mMark,KEY.m1,KEY.m2,KEY.m3,KEY.m4,KEY.m5,KEY.m6,KEY.m7,KEY.m8,KEY.m9,KEY.m0,KEY.mSubt,KEY.mEqual,KEY.backsapce],
			[KEY.tab,KEY.q,KEY.w,KEY.e,KEY.r,KEY.t,KEY.y,KEY.u,KEY.i,KEY.o,KEY.p,KEY.mLpts,KEY.mRpts,KEY.mNDivide],
			[KEY.caps,KEY.a,KEY.s,KEY.d,KEY.f,KEY.g,KEY.h,KEY.j,KEY.k,KEY.l,KEY.mSemi,KEY.mQuotes,KEY.mEnter],
			[KEY.lShift,KEY.z,KEY.x,KEY.c,KEY.v,KEY.b,KEY.n,KEY.m,KEY.mComma,KEY.mDot,KEY.mDivide,KEY.rShift],
			[KEY.ctrl,KEY.lWin,KEY.alt,KEY.space,KEY.alt,KEY.rWin,KEY.mSelect,KEY.ctrl]
		],
		functional:[
			[KEY.fcPrt,KEY.fcSclk,KEY.fcPause],
			[KEY.fcIns,KEY.fcHome,KEY.fcPgup],
			[KEY.fcDel,KEY.fcEnd,KEY.fcPgdn],
			[KEY.padkey,KEY.padkey,KEY.padkey],
			[KEY.padkey,KEY.fcU,KEY.padkey],
			[KEY.fcL,KEY.fcD,KEY.fcR]
		],
		num:[
			[KEY.padkey,KEY.padkey,KEY.padkey,KEY.padkey],
			[KEY.nNum,KEY.nDivide,KEY.nPlus,KEY.nSubt],
			[KEY.nEqual,KEY.nEnter],
			[KEY.n7,KEY.n8,KEY.n9],
			[KEY.n4,KEY.n5,KEY.n6],
			[KEY.n1,KEY.n2,KEY.n3],
			[KEY.n0,KEY.nDot]
		]
	};
	var key108 = {
		main:[
			[KEY.esc,KEY.pad5,KEY.f1,KEY.f2,KEY.f3,KEY.f4,KEY.pad2,KEY.f5,KEY.f6,KEY.f7,KEY.f8,KEY.pad2,KEY.f9,KEY.f10,KEY.f11,KEY.f12],
			[KEY.mMark,KEY.m1,KEY.m2,KEY.m3,KEY.m4,KEY.m5,KEY.m6,KEY.m7,KEY.m8,KEY.m9,KEY.m0,KEY.mSubt,KEY.mEqual,KEY.backsapce],
			[KEY.tab,KEY.q,KEY.w,KEY.e,KEY.r,KEY.t,KEY.y,KEY.u,KEY.i,KEY.o,KEY.p,KEY.mLpts,KEY.mRpts,KEY.mNDivide],
			[KEY.caps,KEY.a,KEY.s,KEY.d,KEY.f,KEY.g,KEY.h,KEY.j,KEY.k,KEY.l,KEY.mSemi,KEY.mQuotes,KEY.mEnter],
			[KEY.lShift,KEY.z,KEY.x,KEY.c,KEY.v,KEY.b,KEY.n,KEY.m,KEY.mComma,KEY.mDot,KEY.mDivide,KEY.rShift],
			[KEY.ctrl,KEY.lWin,KEY.alt,KEY.space,KEY.alt,KEY.rWin,KEY.mSelect,KEY.ctrl]
		],
		functional:[
			[KEY.fcPrt,KEY.fcSclk,KEY.fcPause],
			[KEY.fcIns,KEY.fcHome,KEY.fcPgup],
			[KEY.fcDel,KEY.fcEnd,KEY.fcPgdn],
			[KEY.padkey,KEY.padkey,KEY.padkey],
			[KEY.padkey,KEY.fcU,KEY.padkey],
			[KEY.fcL,KEY.fcD,KEY.fcR]
		],
		num:[
			[KEY.unknow,KEY.unknow,KEY.unknow,KEY.unknow],
			[KEY.nNum,KEY.nDivide,KEY.nPlus,KEY.nSubt],
			[KEY.nEqual,KEY.nEnter],
			[KEY.n7,KEY.n8,KEY.n9],
			[KEY.n4,KEY.n5,KEY.n6],
			[KEY.n1,KEY.n2,KEY.n3],
			[KEY.n0,KEY.nDot]
		]
	};
	
	function getKeyDefine(type){
		var keys = null;
		switch(type){
			case 61:
				keys = key61;
				break;
			case 87:
				keys = key87;
				break;
			case 104:
				keys = key104;
				break;
			case 108:
				keys = key108;
				break;
			default:
				keys = key104;
				break;
		}
		return keys;
	}
	function initKeypad(id,callback){
		keypadId = id;
		keyOnClickFn = callback;
		keypad = $('<div class="keypad"></div>');
		keypad.attr('id',keypadId);
		return keypad;
	}
	
	function initLineAndKey(lineUI,line){
		if(line!=null){
			for(var j=0;j<line.length;j++){
				var key = line[j];
				var keyUI = $('<div></div>');
				keyUI.addClass(key.css);
				keyUI.addClass(keypadId);
				keyUI.attr('id',keypadId+'-'+key.code+j);
				keyUI.on('click',function(){
					if(fontIconSwitch){
						fontIconFn($(this));
					}else{
						var color = keyOnClickFn();
						var colorCover = $('<span class="keyColor"></span>');
						colorCover.addClass($(this).attr('class'));
						colorCover.removeClass('key');
						colorCover.attr('style','background:'+color.keyColor);
						var child = $(this).children();
						if(!child.hasClass('keyWord')){
							child = child.children();
						}
						child.css('color',color.fontColor);
						$(this).html('');
						colorCover.append(child);
						$(this).append(colorCover);
					}
				});
				var wordUI = $('<label class="keyWord"></label>');
				wordUI.attr('word',key.name);
				wordUI.text(key.name);
				wordUI.addClass(key.css);
				wordUI.addClass(keypadId);
				wordUI.removeClass('key');
				keyUI.append(wordUI);
				key.ui = keyUI;
				lineUI.append(keyUI);
			}
		}
	}
	
	function initMainKeys(lines){
		if(lines!=null){
			var keypadMain = $('<div class="keypad-main"></div>');
			var topLine = lines[0];
			var topLineUI = $('<div class="keypad-line-top"></div>');
			initLineAndKey(topLineUI,topLine);
			keypadMain.append(topLineUI);
			for(var i = 1;i<lines.length;i++){
				var lineUI = $('<div class="keypad-line"></div>');
				var line = lines[i];
				initLineAndKey(lineUI,line);
				keypadMain.append(lineUI);
			}
			keypad.append(keypadMain);
			keypad.append('<div class="keypadSize1"></div>');
		}
	}
	
	function initFunctionalKeys(lines){
		if(lines!=null){
			var keypadFunc = $('<div class="keypad-func"></div>');
			var topLine = lines[0];
			var topLineUI = $('<div class="keypad-line-top"></div>');
			initLineAndKey(topLineUI,topLine);
			keypadFunc.append(topLineUI);
			for(var i = 1;i<lines.length;i++){
				var lineUI = $('<div class="keypad-line"></div>');
				var line = lines[i];
				initLineAndKey(lineUI,line);
				keypadFunc.append(lineUI);
			}
			keypad.append(keypadFunc);
			keypad.append('<div class="keypadSize1"></div>');
		}
	}
	
	function initNumKeys(lines){
		if(lines!=null){
			var keypadNum = $('<div class="keypad-num"></div>');
			var topLine = lines[0];
			var topLineUI = $('<div class="keypad-line-top"></div>');
			initLineAndKey(topLineUI,topLine);
			keypadNum.append(topLineUI);
			
			var secondLine = lines[1];
			var secondLineUI = $('<div class="keypad-line"></div>');
			initLineAndKey(secondLineUI,secondLine);
			keypadNum.append(secondLineUI);
			
			var keypadNumBottom = $('<div class="keypad-num-bottom"></div>');
			
			var kaypadNumLeft = $('<div class="keypad-num-left"></div>');
			keypadNumBottom.append(kaypadNumLeft);
			
			for(var i = 3;i<lines.length;i++){
				var lineUI = $('<div class="keypad-line"></div>');
				var line = lines[i];
				initLineAndKey(lineUI,line);
				kaypadNumLeft.append(lineUI);
			}
			
			var thirdLine = lines[2];
			var kaypadNumRight = $('<div class="keypad-num-right"></div>');
			initLineAndKey(kaypadNumRight,thirdLine);
			keypadNumBottom.append(kaypadNumRight);
			
			keypadNum.append(keypadNumBottom);
			
			keypad.append(keypadNum);
			keypad.append('<div class="keypadSize1"></div>');
		}
	}
	function changeFontShow(state){
		fontSwitch = state;
		if(fontSwitch){
			$('.keyWord.'+keypadId).show();
		}else{
			$('.keyWord.'+keypadId).hide();
		}
	}
	function changeFontIcon(state,callback){
		fontIconSwitch = state;
		fontIconFn = callback;
	}

	return {
		id:null,
		keypad:null,
		keys:null,
		init:function(id,type,keyOnClickFn){
			this.id = 'keypad'+id+'-'+type;
			this.keys = getKeyDefine(type);
			this.keypad = initKeypad(this.id,keyOnClickFn);
			initMainKeys(this.keys.main);
			initFunctionalKeys(this.keys.functional);
			initNumKeys(this.keys.num);
			return this.keypad;
		},
		fontSwitch:function(state){
			changeFontShow(state);
		},
		fontIconSwitch:function(state,callback){
			changeFontIcon(state,callback);
		},
		changeKeyIcon:function(keyId,icon){
			var keyUI = $('#'+keyId);
			var child = keyUI.children();
			if(!child.hasClass('keyWord')){
				child = child.children();
			}
			child.removeClass(child.attr('icon'));
			child.attr('icon',icon);
			if(icon!='glyphicon'){
				child.text('');
				child.addClass(icon);
			}else{
				child.addClass(child.attr('class'));
				child.text(child.attr('word'));
			}
		}
	}
	
};
