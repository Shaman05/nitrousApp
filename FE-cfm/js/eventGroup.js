/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-12
 * Time: 下午4:00
 */

(function(win){

  'use strict';

  var gui = require('nw.gui');
  var Window = gui.Window.get();
  var maxFlag = false;
  var $section = $('#section');

  win.eventGroup = {
    /*-------UI-------*/
    //最小化
    minWindow: function(){
      Window.minimize();
    },
    //最大化
    maxWindow: function(){
      maxFlag ? Window.unmaximize() : Window.maximize();
      maxFlag = !maxFlag;
    },
    //关闭
    closeWindow: function(){
      Window.close();
    },

    /*-------功能-------*/
    //正则表达式测试
    regex: function(){
      loadPage('./page/regex.html', function(){});
    }
  };

  function loadPage(url, callback){
    $section.load('./page/regex.html', callback);
  }

  Window.on('maximize', resizeWrap);
  Window.on('unmaximize', resizeWrap);

  function resizeWrap(){
    //todo
  }

})(window);