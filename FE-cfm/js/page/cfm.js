/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-14
 * Time: 上午9:49
 */

(function(win, $){

  'use strict';

  var webSql = new win.webStorage.WebSql();

  console.log(webSql)

  $(function(){
    $('.niceScroll').niceScroll({
      cursorcolor: '#cfcfcf',
      cursorborder: 'none'
    });
  });

})(window, jQuery);