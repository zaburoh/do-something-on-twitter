# TwitterAPI、RaspberryPi gpio を利用した何かを作りたい。
## schedule-cron.js
- pm2で起動している
- cronを利用して1時間ごとに指定したファイルを定期実行する

## periodic_execution.js
- 東京のTwitterトレンドをランダムに選んでツイート

## index_gpio.js
- スイッチ入力テスト
- コマンドラインからの実行
```
$ sudo node index_gpio [pin番号]
```

## index.js
- テストコード実行用

## config.js
- twitterAPIクライアントの設定
- npmライブラリの dotenv で.envファイルに設定しているkey,secretを取得して設定

## woeid.js
- yahoo!の"where on earth id"のリスト

## lib
### data
- 未実装
### gpio
- RaspberryPiのgpioを利用したコード群
### twitter
- TwitterAPIサービスを利用したコード群
### util
- その他必要なコード群
