# TwitterAPI、RaspberryPi gpio を利用した何かを作りたい。
## schedule-cron.js
- pm2で起動している
- cronを利用して15分事に指定したファイルを定期実行する

## periodic_execution.js
- 東京のTwitterトレンドをランダムに選んでツイートしている

## index.js
- テストコード実行用

## config.js
- twitterAPIクライアントの設定
- npmライブラリの dotenv で.envファイルに設定しているkey,secretを取得して設定

## woeid.js
- yahoo!のwhere on earth id のリスト

## lib
### data
- 未実装
### gpio
- RaspberryPiのgpioを利用したコード群
### twitter
- TwitterAPIサービスを利用したコード群
### util
- その他必要なコード群
