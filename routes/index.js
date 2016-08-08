var express = require('express');
var router = express.Router();

var db = require('../apps/db');

router.get('/places', (req, res, next)=>{
  db.getUsersOfPlaces()
    .then(usersOfPlaces=>{
      console.log(usersOfPlaces);
      res.render('places', { usersOfPlaces: usersOfPlaces });
    })
    .catch(err=>res.send(err));
});

router.get('/register', (req, res, next)=>{
  res.render('register');
});

router.post('/register', (req, res, next)=>{
  db.register(req.body.cardId, req.body.twitterId)
    .then(()=>res.send('登録完了'))
    .catch(err=>res.send('ERROR:'+err));
});


// 例 http://localhost:3000/touch?cardId=432809483&place=box233

//router.get('/cardId', (req, res, next)=>{
router.get('/touch', (req, res, next)=>{
  var cardId = req.query.cardId;
  var place = req.query.place;
  console.log('cardId:'+cardId);
  console.log('place:'+place);
  db.findByCardId(cardId)
    .catch(err=>{ res.send(err); })
    .then(user=>{
      if(user==null){
        res.send({ success: false, url: '/register?cardId='+cardId });
      }else{
        if(user.place==place){
          var date = (new Date()).toLocaleString();
          console.log('['+date+']'+user.twitterId+'さんが'+place+'から退室しました');
          db.changePlace(cardId, null);
          db.touch(cardId, place, date, 'out');
          res.send({ success: true, twitterId: user.twitterId });
        }else{
          var date = (new Date()).toLocaleString();
          console.log('['+date+']'+user.twitterId+'さんが'+place+'へ入室しました');
          db.changePlace(cardId, place);
          db.touch(cardId, place, date, 'in');
          res.send({ success: true, twitterId: user.twitterId });
        }
      }
    });
});

module.exports = router;
