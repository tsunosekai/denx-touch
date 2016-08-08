var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/denx-touch-test');

var User = mongoose.model('User', { cardId: String, twitterId: String });

//{ cardId: '1234A56B7', twitterId: '@test_man' }

User.find({}, (err, docs)=>console.log(docs));

var register = (cardId, twitterId)=>{
  return new Promise((resolve, reject)=>{
    var user = new User({ cardId: cardId, twitterId: twitterId });
    user.save().then(()=>resolve(), err=>reject(err));
  });
};

var findByCardId = (cardId)=>{
  return new Promise((resolve, reject)=>{
    console.log(cardId);
    User.findOne({ cardId: cardId })
      .then(docs=>resolve(docs), err=>reject(err));
  });
}

module.exports = {
  register: register,
  findByCardId: findByCardId
}