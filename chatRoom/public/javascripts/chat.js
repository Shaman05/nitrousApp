/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-11-8
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

(function(root, $, io){
	$(function(){
		var $chatBox = $('#chatBox');
    var host = 'ws://localhost:3000';
    //console.log(host);
		var socket = io.connect(host);

		socket.on('notice', sysHandler);

		socket.on('lose user', sysHandler);

		socket.on('error', function(error){
			//console.log('error:', error);
		});

		function sysHandler(message){
			print({type:'sys', text:message});
		}

		function print(message){
      //console.log(message);
			var $row = $('<div class="chatItem"><span class="type"></span><span class="message"></span></div>');
			var $head = $row.find('.type');
			var $body = $row.find('.message');
      var type = message.type;
      var sys = ['sys', '【系统消息】'];
      var chat = ['chat', '【聊天消息】'];
      var typeMap = {
        //系统消息
        sys: sys, join: sys, leave: sys, error: sys,
        //聊天消息
        chat: chat
      };
      $head.addClass(typeMap[type][0]).text(typeMap[type][1]);
      //私聊
      message.isPrivate && $head.addClass('private');
			$body.text(message.text);
			$chatBox.append($row);
		}
	});
})(window, jQuery, io);
