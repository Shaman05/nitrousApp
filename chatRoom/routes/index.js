
/*
 * GET home page.
 */

exports.index = function(req, res){
  var pageData = {
    user: 'shaman',
    power: 'Express'
  };
  res.render('index', pageData);
};