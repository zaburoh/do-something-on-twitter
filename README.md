# TwitterAPI、RaspberryPi gpio を利用した何かを作りたい。
## １時間ごとに東京のトレンドをランダムにツイート
### schedule-cron.js
- pm2で動かしている
```
$ pm2 start schedule-cron.js
```
- cronを利用して1時間ごとに'periodic_excution.js'を実行

### periodic_execution.js
- 東京のTwitterトレンドをランダムに選んで実行時間を併せてツイート

## スイッチを押すとRaspberryPiのCPU温度をツイート
### index_gpio.js
- pm2で動かしている
```
$ pm2 start schedule-cron.js
```
- スイッチを押すと現在のRaspberryPiのCPU温度をツイートし、ledを3回点滅させている

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
  - gpio.js
    - gpioを制御するためのコード
### twitter
- TwitterAPIサービスを利用したコード群
  - favolite.js
  - retweet.js
  - search.js
  - timeline.js
  - trends.js
  - tweet.js
### util
- その他必要なコード群
