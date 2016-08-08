var Twit = require('twit')

var T = new Twit({
  consumer_key:         'BheodSH4tWds1TWhULLYCiNMe',
  consumer_secret:      'ycxUij1mSERvNv9sMrABDgSm4VDtjjlai6WhzCjNgonzetfIvB',
  access_token:         '3253194403-JAjsE8LjWOR2aoOCaGcJCWCCUoDT39C51ZtnHme',
  access_token_secret:  'pkp2em6qhX2kPkUvj7LG8YELQKoyV6hiOJDwT3duKbn0n',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

var tweet = (text)=>{
  console.log('ツイート'+text);
//  T.post('statuses/update', { status: text }, function(err, data, response) {
//    console.log(data);
//  });
}

module.exports = tweet;