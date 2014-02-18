/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-18
 * Time: 下午4:42
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connect success!');
});

var Cat = mongoose.model(
  'Cat', {
    name: String,
    age: Number
  }
);
var kitty = new Cat({ name: '小黑', age: 3 });
kitty.save(function (err) {
  if (err) // ...
    console.log('meow');
});
