/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-13
 * Time: 下午5:45
 */

(function(win, $){

  'use strict';

  $(function(){
    var $textSour = $('#textSour');
    var $textPattern = $('#textPattern');
    var $textMatchResult = $('#textMatchResult');
    var $optionGlobal = $('#optionGlobal');
    var $optionIgnoreCase = $('#optionIgnoreCase');
    var $selectList = $('#regexList');

    win.util.eventInit();

    $('.niceScroll').niceScroll({
      cursorcolor: '#cfcfcf',
      cursorborder: 'none'
    });

    win.eventGroup = {
      onMatch: function(){
        if (!isValidFields()){
          return false;
        }
        $textMatchResult.val('');
        var regex = buildRegex();
        var result = $textSour.val().match(regex);
        if (null==result || 0==result.length) {
          $textMatchResult.val("（没有匹配）");
          return false;
        }
        if ($optionGlobal[0].checked) {
          var strResult = "共找到 " + result.length + " 处匹配：\r\n";
          for (var i=0;i < result.length;++i){
            strResult = strResult + result[i] + "\r\n";
          }
          $textMatchResult.val(strResult);
        } else {
          $textMatchResult.val("匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0]);
        }
        return true;
      },
      setRegex: function(){
        $textPattern.val($(this).val());
      },
      reset: function(){
        $textSour.val('');
        $textPattern.val('');
        $textMatchResult.val('');
        $selectList[0].selectedIndex = 0;
      }
    };

    //验证输入
    function isValidFields(){
      var textSourVal = $.trim($textSour.val());
      if (!textSourVal) {
        $textSour.focus();
        //alert("请输入待匹配文本");
        return false;
      }
      var textPatternVal = $.trim($textPattern.val());
      if (!textPatternVal) {
        $textPattern.focus();
        //alert("请输入正则表达式");
        return false;
      }
      return true;
    }

    //创建正则表达式
    function buildRegex() {
      var op = "";
      if ($optionGlobal[0].checked){
        op = "g";
      }
      if ($optionIgnoreCase[0].checked){
        op = op + "i";
      }
      return new RegExp($textPattern.val(), op);
    }

  });
})(window, jQuery);