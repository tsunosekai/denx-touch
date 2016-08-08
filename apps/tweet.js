var Twit = require('twit')

var T = new Twit({
  consumer_key:         '',
  consumer_secret:      '',
  access_token:         '',
  access_token_secret:  '',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var tweet = (text)=>{
  console.log('ツイート'+text);
//  T.post('statuses/update', { status: text }, function(err, data, response) {
//    console.log(data);
//  });
}

module.exports = tweet;
