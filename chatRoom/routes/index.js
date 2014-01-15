
/*
 * GET home page.
 */

exports.index = function(req, res){
  var pageData = {
    user: 'shaman',
    power: 'Express',
    title: '测试聊天室 01'
  };
  res.render('index', pageData);
};