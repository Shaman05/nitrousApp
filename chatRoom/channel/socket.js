/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 13-12-30
 * Time: 下午2:49
 */

//var config = require('../../config')[SERVER_NAME][EVN_NAME];
var io = require('socket.io');
//var bid = require('./bid');  //投标频道
var chat = require('./chat'); //聊天频道

function start(app){
  var server = io.listen(app);

  //读取配置
  //server.configure(EVN_NAME, function(){
  //  config.setting(server);
  //});

  //开启投标频道
  //bid.start(server);
  //开启聊天频道
  chat.start(server);
}

exports.start = start;
