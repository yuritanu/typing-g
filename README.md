**<div style="text-align: center;">タイピングゲーム</div>**
![](https://i.imgur.com/jxLVNAP.png)


## 📄ツール・ライブラリの名前

#### ■Typing Game
単語の正確な入力の精度と、時間を図ることができます。


## 🌐APP URL
https://typingyuri1.herokuapp.com/

## 📕簡単な説明
スペースキーでゲームスタート
スタート前に問題数が選べます。
問題が終了したら、タイピングの精密度とかかった時間が分かります。

入力速度を鍛えたり、読みに問題を書けば、単語を覚えるのに練習にもなります。

## ⛏開発環境
* Ruby on Rails
* Haml
* Sass
* JavaScript
* jQuery
* Github
* heroku
* Visual Studio Code


## ■機能

- 問題数を選ぶことができます
- 選んだ出題数がランダムで出題されます
- 最後にタイピングの正確性と掛かった時間が出ます

## ❗️必要要件

- Chromeの最新版を利用してアクセスしてください。
- ただしデプロイ等で接続できないタイミングもございます。その際は少し時間をおいてから接続ください。
- 接続先ついては、上記の通りです。
- 同時に複数の方がログインしている場合に、ログインできない可能性がございます。

## 🎮使い方

1. 問題数を選びます
2. 「スペースキー」を押してゲームスタート
3. 出てくる問題を入力します
4. 最後に、入力の正解率、間違い率、掛かった時間が出ます
5. 「やりなおす」で最初に戻ります

## ***📺デモ***
![](https://i.imgur.com/OoDCf0X.gif)

## ⏬インストール

```
% git clone https://github.com/yuritanu/typing-g.git
```


## ⭐︎CSS
タイピングゲームらしく、タイトルをタイピングした様にしました。

![](https://i.imgur.com/IqWCYtH.gif)

## その他

自分で問題を変更する際は
「/javascripts/tops.js」内の
```javascript
// 問題一覧
  const MONDAI_LIST = [
    {yomi:'ごはん', text:'gohan'},
    {yomi:'おすし', text:'osusi'},
    {yomi:'サイフ', text:'saifu'},
    {yomi:'バナナ', text:'banana'},
    {yomi:'くつした', text:'kutusita'},
    {yomi:'なべ', text:'nabe'},
    {yomi:'あし', text:'ashi'},
    {yomi:'パソコン', text:'pasokon'},
    {yomi:'けいたい', text:'keitai'},
    {yomi:'ふとん', text:'futon'},
  ];
```
の`'~'`を変更すると問題を変更できます。

## 作者&ライセンス

[@yuritanu](https://twitter.com/yuritanu_0628)