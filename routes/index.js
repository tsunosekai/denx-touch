var express = require('express');
var router = express.Router();

var db = require('../apps/db');
var tweet = require('../apps/tweet');

/* GET home page. */
router.get('/cardId', (req, res, next)=>{
//  res.send('あああ');
  var cardId = req.query.cardId;
  db.findByCardId(cardId)
    .catch(err=>{ res.send(err); })
    .then(docs=>{
      if(docs==null){
//        router.get('/'+cardId, (req, res, next)=>{
//          
//        });
        res.send({ success: false, url: 'http://denx.jp' });
      }else{
        var date = (new Date()).toLocaleString();
        tweet('['+date+']'+docs.twitterId+'さんが入室しました');
        res.send({ success: true, twitterId: docs.twitterId });
      }
    });
});

module.exports = router;
