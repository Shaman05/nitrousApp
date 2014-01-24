/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-1-20
 * Time: 下午2:35
 */

//var User = require('./user');

function UserList(limit){
	//最大用户数
	this.limit = limit;
	//当前用户数
	this.size = 0;
	//用户哈希表
	this.list = {};
}

UserList.prototype = {
	add: function(socket){
		if(this.size < this.limit){
      this.list[socket.id] = socket;
      this.size += 1;
		}else{
      console.log('聊天室已满!');
    }
		return this;
	},
	remove: function(id){
		var clients = this.list;
		if(clients[id]){
			delete clients[id];
			this.size -= 1;
		}
		return this;
	},
	getAll: function(){
		var clients = this.list;
		var list = [];
		for(var id in clients){
			if(clients.hasOwnProperty(id)){
				list.push(clients[id]);
			}
		}
		return list;
	},
	getUserById: function(id){
		return this.list[id] || null;
	},
  getUserByName: function(name){
    var users = this.list;
    for(var userId in users){
      if(users.hasOwnProperty(userId)){
        if(users[userId].name === name){
          return users[userId];
        }
      }
    }
    return null;
  }
};

exports.create = function(total){
  return new UserList(total);
};