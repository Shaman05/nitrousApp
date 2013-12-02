/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-11-8
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

var User = require('./user').User;

function UserList(limit){
	//最大用户数
	this.limit = limit;
	//当前用户数
	this.size = 0;
	//用户哈希表
	this.list = {};
}

UserList.prototype = {
	add: function(id){
		if(this.size < this.limit){
      if(!!id){
        console.log(User);
			  this.list[id] = new User(id); // ？User类必须在UserList模块里才能正确的new出来
			  this.size += 1;
      }else{
        console.log('参数错误!');
      }
		}else{
      console.log('聊天室已满!');
    }
		return this;
	},
	remove: function(id){
		var users = this.list;
		if(users[id]){
			delete users[id];
			this.size -= 1;
		}
		return this;
	},
	getAll: function(){
		var users = this.list;
		var list = [];
		for(var user in users){
			if(users.hasOwnProperty(user)){
				list.push(users[user]);
			}
		}
		return list;
	},
	getUser: function(id){
		return this.list[id] || null;
	}
};

exports.UserList = UserList;