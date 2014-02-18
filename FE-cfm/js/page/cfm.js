/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-14
 * Time: 上午9:49
 */

(function(win, $){

  'use strict';

  var gui = require('nw.gui');
  var mongoose = require('mongoose');
  var db = mongoose.connect('mongodb://localhost/test');

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
    console.log('connect success!');
  });

  $(function(){
    $('.niceScroll').niceScroll({
      cursorcolor: '#cfcfcf',
      cursorborder: 'none'
    });
  });

})(window, jQuery);