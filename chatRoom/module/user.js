/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 13-12-2
 * Time: 下午4:01
 */

function User(id){
  this.id = id;
  this.name = null;
}

User.prototype = {
  setName: function(name){
    this.name = name;
    return this;
  },
  getName: function(){
    return this.name;
  }
};

exports.User = User;