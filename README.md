# denx-touch
学生証を用いた入室ツイートのサーバサイド

``` bash
cd denx-touch
npm install
node app
```

## API Refetence

1. カードタッチ時　/touch?cardId=111111111111111111&place=box234

  1. 未登録のcardIdの場合
   
    response例 : {"success":false,"url":"/register?cardId=0114C42F3214F005"}
   
    url は登録用ページ　これを開いてください
   
  1. 登録済みのcardId場合
   
     1. 退室時（，またはほかの場所に入室時）にタッチ
       
       response例 : {"success":true,"twitterId":"@tsunosekai","inOrOut":"in", place: "box233"}
  　    
     1. 入室時にタッチ
       
       response例 : {"success":true,"twitterId":"@tsunosekai","inOrOut":"out", place: "box233"}
       
1. 入室者確認ページ /places
