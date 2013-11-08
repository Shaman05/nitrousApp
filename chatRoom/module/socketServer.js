/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-11-8
 * Time: 上午11:23
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

var io = require('socket.io');
var UserList = require('./userList').UserList;

function start(server){
	var sockets = io.listen(server).sockets;
	var list = new UserList(100);
	sockets.on('connection', function(socket){
		var userID = socket.id;
		list.add({
			id: userID
		});
		console.log(list);

		//新用户加入发送广播
		sockets.emit('notice', {message: userID + ' has join!'});

		//disconnect
		socket.on('disconnect', function(){
			list.remove(userID);
			sockets.emit('lose user', userID + ' has disconnected!');
		});
	});
}

exports.start = start;
