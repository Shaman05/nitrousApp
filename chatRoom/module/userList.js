/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-11-8
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

function UserList(limit){
	//最大用户数
	this.limit = limit;
	//当前用户数
	this.size = 0;
	//用户哈希表
	this.list = {};
}

UserList.prototype = {
	add: function(user){
		var id = user.id;
		if(this.size < this.limit && !!id){
			this.list[id] = user;
			this.size += 1;
		}
		return this;
	},
	remove: function(userId){
		var users = this.list;
		if(users[userId]){
			delete users[userId];
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
	get: function(userId){
		return this.list[userId] || null;
	}
};

exports.UserList = UserList;