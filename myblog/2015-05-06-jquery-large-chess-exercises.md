---
layout: post
title: '簡單大盤象棋練習 by jQuery '
date: 2015-05-06 18:08
comments: true
categories: [jquery, html, javascript, 象棋, chess]
---
這篇是大盤象棋的練習，一開始目標是想寫出AI，
但目前寫出象棋本身就開始懶懶的了，目前只支持兩人對戰。

AI的部分先用亂數給他跑For Demo跟Debug用，
等之後心血來潮再來繼續完成吧!（寫半天寫不好也是一個原因）

畫面全部以js+css產生，程式碼的部分拆分成

    1. Chess本體（Chess.js）
    2. UI操作(UIController.js)
    3. 定義檔(Define.js)
    4. 下期規則(Rule.js)
    5. AI(AI.js) 未完成
    
有興趣的可以到github下載[https://github.com/leo200149/Chess](https://github.com/leo200149/Chess)
##Demo如下囉
或者可以直接連到完整網頁[象棋大盤](http://hychome.site90.com/chess/)
<iframe width="100%" height="650" src="//jsfiddle.net/leo_chen/ebLt0y7o/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>