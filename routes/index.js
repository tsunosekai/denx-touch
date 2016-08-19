var express = require('express');
var passport = require('passport');
var Strategy = require('passport-slack').Strategy;
var json5 = require('json5');
var fs = require('fs');

var router = express.Router();
var config = json5.parse(fs.readFileSync('./config/config.json'));

var db = require('../apps/db');

passport.use(new Strategy({
    clientID: config.slack.clientID,
    clientSecret: config.slack.clientSecret,
    callbackURL: 'http://'+config.serverDomain+'/auth/slack/callback',
    scope: 'users:read',
    extendedUserProfile: true
  },
  function(accessToken, refreshToken, profile, done) {
//    console.log('useのなか'+JSON.stringify(profile));
    return done(null, profile);
  }
));

//passport.serializeUser(function(user, cb) {
//  cb(null, user);
//});
//
//passport.deserializeUser(function(obj, cb) {
//  cb(null, obj);
//});

router.get('/test', (req, res)=>{console.log(req.session.a); req.session.a = req.query.a || 'aaa'; res.redirect('/test2');});
router.get('/test2', (req, res)=>{console.log(JSON.stringify(req.session)); res.send('aaa');});

router.get('/authredirect',(req, res)=>{
  console.log('/authredirect cardId:'+req.query.cardId);
  req.session.cardId = req.query.cardId;
  console.log('/authredirect session:'+JSON.stringify(req.session));
  res.redirect('/auth/slack');
});

router.get('/auth/slack',
  passport.authorize('slack'));

router.get('/auth/slack/callback', 
  passport.authorize('slack', { failureRedirect: '/login' }),
  function(req, res) {
    //下2つのデータがここで取得できない
//    console.log('callback req.user:'+JSON.stringify(req.user));
    console.log('callback session:'+JSON.stringify(req.session));
    console.log('callback b:'+req.session.b);
  
//    db.register(req.headers.cookie, req.user.username)
//      .then(()=>res.send('登録完了'))
//      .catch(err=>res.send('ERROR:'+err));
    // Successful authentication, redirect home.
    res.redirect('/test2');
  });

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
  db.register(req.body.cardId, req.body.username)
    .then(()=>res.send('登録完了'))
    .catch(err=>res.send('ERROR:'+err));
});


// 例 http://localhost:3000/touch?cardId=432809483&place=box233

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
          console.log('['+date+']'+user.username+'さんが'+place+'から退室しました');
          db.changePlace(cardId, null);
          db.touch(cardId, place, date, 'out');
          res.send({ success: true, username: user.username, inOrOut: 'out' });
        }else{
          var date = (new Date()).toLocaleString();
          console.log('['+date+']'+user.username+'さんが'+place+'へ入室しました');
          db.changePlace(cardId, place);
          db.touch(cardId, place, date, 'in');
          res.send({ success: true, username: user.username, inOrOut: 'in' });
        }
      }
    });
});

module.exports = router;
