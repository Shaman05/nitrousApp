/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-1-20
 * Time: 下午2:58
 *
 * 聊天频道
 */


var list = require('./modules/list');

var chatChannel = {
  start: function(io){
    //所有客户端, 最大20个
    var clients = list.create(20);

    //chat频道
    var chat = io.of('/chat').on('connection', function(socket){
      var _id = socket.id;
      //存入用户队列
      clients.add(socket);

      chat.emit('refresh online', getOnline());
      socket.broadcast.emit('join', _id + ' 来了, 大家赶紧去喷他~~');

      //群聊消息
      socket.on('message', function(message){
        chat.emit('message', {
          speaker: clients.list[_id].nickName || _id,
          message: message
        });
      });

      //用户改名
      socket.on('rename', function(name){
        var _clients = clients.list;
        var oldName = _clients[_id].nickName || _id;
        _clients[_id].nickName = name;
        chat.emit('refresh online', getOnline());
        chat.emit('rename', oldName + ' 觉得名字不够霸气，于是改名为 ' + _clients[_id].nickName);
      });

      //断开连接
      socket.on('disconnect', function(){
        clients.remove(_id);
        chat.emit('refresh online', getOnline());
        chat.emit('leave', _id + ' 悄悄的离开了~~');
      });
    });

    function getOnline(){
      console.log('当前在线人数：' + clients.size);
      var _users = [];
      var _clients = clients.list;
      for(var _id in _clients){
        if(_clients.hasOwnProperty(_id)){
          _users.push({
            id: _id,
            name: _clients[_id].nickName || null
          });
        }
      }
      return _users;
    }
  }
};

module.exports = chatChannel;
