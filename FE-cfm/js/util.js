/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-12
 * Time: 下午3:53
 */

(function(win){

  'use strict';

  win.util = {
    //执行事件
    eventExec: function(origin, eventGroup){
      var e = eventAnalysis(origin);
      if(typeof eventGroup[e.groupName] === 'function'){
        eventGroup[e.groupName].apply(this, e.args);
        return;
      }
      eventGroup[e.groupName][e.eventFn].apply(this, e.args);
    }
  }

  //事件代理解析, 支持以命名空间形式定义的事件名称
  function eventAnalysis(origin){
    var _event = origin.event.split('.');
    var _eventFn = _event[1]; //获取事件处理句柄
    var _eventGroup = _event[0]; //获取事件分组类型
    var _args = origin.args; //事件参数
    _args = (_args && _args.split(',')) || []; //获取事件参数
    return {
      groupName: _eventGroup,
      eventFn: _eventFn,
      args: _args
    };
  }

})(window);