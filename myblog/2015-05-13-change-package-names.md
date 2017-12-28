---
layout: post
title: '更改專案package名稱'
date: 2015-05-13 04:59
comments: true
categories: [java, package, 更換package, Project, tool]
---
我最近寫了一個用來改專案package的小工具，這篇就來簡單介紹一下。
工具名稱：ChangeProjectPackage.jar
Source Code跟已經包好的jar檔已放到Github上可供下載，有興趣的可以摸一摸玩一玩。
[https://github.com/leo200149/ChangeProjectPackage](https://github.com/leo200149/ChangeProjectPackage)。

##UI 操作教學

<img src="https://lh6.googleusercontent.com/-456_xns1tWw/VUXJCJabGJI/AAAAAAAADcg/vsCfzJaX5Gc/w1062-h1080-no/changePackageUI.jpg" width="500" height="500">

    1. Project: 請選擇您的專案目錄
    2. Add:  請選擇您的java source code目錄（可以選擇多個目錄）
    3. Old Package: 請輸入舊的要被更改的package名稱 例如 hyc.edu.emotion
    4. New Package: 請輸入新的package名稱 例如 com.hyc.emotion 
    5. Start Replace: 按下後，工具將會開始將所有舊package改成新的，並搬至相對應的目錄下面。
    6. Log monitor: 將會秀出所有更改的紀錄。
    7. Log file: 會存放在跟執行檔同樣的目錄下面。

##為什麼會想開發這個小工具

    最近想法很多，開了很多Java的小小專案，
    但個人的命名能力不夠豐富，有時會突然覺得原本的package分類名稱不夠好，
    常常碰到需要改package結構跟名稱的狀況，
    但IDE對改package目錄結構的Refactor工具使用上都不太方便，
    對xml裡面設定的package也會漏掉，
    還要自己手動一個一個Refactor真的很麻煩。
    最後，一時心血來潮就寫了這個改package的小工具來使用。
    如果有碰到跟我這狀況相似的朋友，歡迎下載使用啊！

e.g.
package結構跟名稱要調整，且下面的所有檔案也都要改到位。
`edu.hyc.testproject -> edu.hyc.changepackage.main`

##使用了什麼工具及技術

    1. Java.IO API 用於開發這小工具的核心
    2. JavaFX2 用於開發UI
    3. Log4j 用於紀錄執行log

    - 沒什麼特別困難的技術，主要就是用java.io 去讀寫目錄跟檔案而已。
    - 個人覺得自己對於目錄結構讀取的寫法並不是很好，有非常大的改善空間。
    - 由於把核心的部分都封裝起來了，UI只是一個操作的介面，假設我想要換別的技術來做這個UI，要替換是很容易的。

##此工具的優點

    1. 更改package目錄結構很方便
    2. 會把所有檔案中相同的package name一起更改

##已知的缺陷

    1. 舊的package不能只輸入單字，此工具在更新檔案內容時，無法分辨它是package還是單詞，可能會多改導致錯誤。
    2. 如果更改的是Android專案，工具執行完後，建議檢查AndroidManifest.xml，此工具不會更新在檔案中的相對路徑。
    
##警告！請小心您的操作

    1. 建議使用此工具之前，先對專案做個備份
    2. 不當的操作可能會導致破壞您的專案結構，請小心服用。
    3. 若是初次使用此工具，建議可以先建幾個測試專案來試試看，等確定會操作了在正式使用。