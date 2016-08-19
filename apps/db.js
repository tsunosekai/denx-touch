var Enumerable = require('linq');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/denx-touch-test');

var User = mongoose.model('User', { cardId: String, username: String, place: String });
var Touch = mongoose.model('Touch', { cardId: String, place: String, date: String, inOrOut: String });

var register = (cardId, username, place)=>{
  return new Promise((resolve, reject)=>{
    var user = new User({ cardId: cardId, username: username, place: place });
    user.save().then(()=>resolve(), err=>reject(err));
  });
};

var findByCardId = (cardId)=>{
  return new Promise((resolve, reject)=>{
    User.findOne({ cardId: cardId })
      .then(user=>resolve(user), err=>reject(err));
  });
};

var changePlade = (cardId, place)=>{
  return new Promise((resolve, reject)=>{
    User.findOne({ cardId: cardId })
      .then(user=>{
        user.place = place;
        user.save();
        resolve();
      })
      .catch(err=>reject(err));
  });
}

var touch = (cardId, place, date, inOrOut)=>{
  return new Promise((resolve, reject)=>{
    var touch = new Touch({ cardId: cardId, place: place, date: date, inOrOut: inOrOut });
    touch.save().then(()=>resolve(), err=>reject(err));
  });
}

var getUsersOfPlaces = ()=>{
  return new Promise((resolve, reject)=>{
    User.find({})
      .then(users=>{
        var usersOfPlaces = Enumerable.from(users)
          .groupBy('$.place', '$.username', (key, group)=>{
            return {
              place: key,
              usernames: group.toArray()
            }
          })
          .toArray();
        resolve(usersOfPlaces);
      })
      .catch(err=>reject(err));
  });
}

module.exports = {
  register: register,
  findByCardId: findByCardId,
  changePlace: changePlade,
  touch: touch,
  getUsersOfPlaces: getUsersOfPlaces
}
