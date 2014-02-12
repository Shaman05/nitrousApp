/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-11
 * Time: 下午4:12
 */

(function(win, $){

  'use strict';

  //系统托盘
  win.tray.init();

  //事件
  $(function(){
    $(document).on('click', '[data-clickFn]', function(e){
      var _event = $(this).attr('data-clickFn');
      var _args = $(this).attr('data-args');
      win.util.eventExec.call(this, {event: _event, args: _args}, win.eventGroup);
      e.stopPropagation && e.stopPropagation();
      e.cancelBubble && (e.cancelBubble = true);
    })
  });


})(window, jQuery);