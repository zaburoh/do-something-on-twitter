const tweet = require('./lib/twitter/tweet');
const woeid = require('./woeid');
const { place, getRandomTrend } = require('./lib/twitter/trends');
const { search, generateQuery } = require('./lib/twitter/search');
const moment = require('moment');
const MeCab = require('mecab-async');
const mecab = new MeCab();
const Books = require('./lib/books/books');
const books = new Books();

module.exports = {
  params: {
    id: woeid.Tokyo,
    exclude: ''
  },
  trendTweet: function() {
    place(this.params, function(err, trends) {
      if(err) return console.log(err);
      getRandomTrend(trends, function(trend) {
        tweet(moment().format('YYYY-MM-DD HH:mm:ss') + '\n\n' + 'なんで' + trend.name.replace(/#/, '') + 'がトレンドに入っているんだろう...？\n\n');
      })
    });
  },
  isbnTweet: function() {
    const params = { 
      q: generateQuery({
        keyword: '"ISBN"',
        outFilter: 'retweets',
      }),
      result_type: 'recent',
      count: 5,
      lang: 'ja',
      locale: 'ja',
    };
    search(params, function(err, tweets) {
      if(err) return console.log(err);
      tweets.forEach((t) => {
        mecab.parse(t.text, (err, results) => {
          if(err) return console.log(err);
          results.forEach(async (r) => {
            if(r[2] == '数') {
              let isbn = r[0];
              if(isbn.length == 13 || isbn.length == 10) { 
                try {
                  let result = await books.search(isbn);
                  result.forEach(r => {
                    let bookInfo = r.summary;
                    tweet(
                      moment().format('YYYY-MM-DD HH:mm:ss') + '\n\n' 
                      // + bookInfo.isbn + '\n' 
                      + bookInfo.title + '\n' 
                      + bookInfo.author + '\n'
                      // + bookInfo.cover
                    );
                  });
                } catch(e) {
                  return console.log(e);
                }
              }
            }
          });
        });
      });
    });
  }
}