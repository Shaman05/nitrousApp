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
		var socket = io.connect('http://localhost');

		socket.on('notice', sysHandler);

		socket.on('lose user', sysHandler);

		socket.on('error', function(error){
			console.log('error:', error);
		});

		function sysHandler(message){
			print({type:'sys', text:message});
		}

		function print(message){
			var type = message.type;
			var $row = $('<div class="chatItem"><span class="type"></span><span class="message"></span></div>');
			var $head = $row.find('.type');
			var $body = $row.find('.message');
			//系统消息
			if(type == 'join' || type == 'leave' || type == 'error'){
				$head.addClass('sys').text('【系统】：');
			}
			//聊天消息
			if(type == 'chat'){
				$head.addClass('chat').text('【' +  + '】：');
				if(message.isPrivate){
					$head.addClass('private');
				}
			}
			$body.text(message.text);
			$chatBox.append($row);
		}
	});
})(window, jQuery, io);
