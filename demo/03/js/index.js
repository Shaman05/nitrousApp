/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-1-15
 * Time: 上午11:16
 */

var fs = require('fs');
var gui = require('nw.gui');
var menu = new gui.Menu();

fs.readFile('index.html', 'utf8', function(err, data){
  document.getElementById('print').value = data;
});

menu.append(new gui.MenuItem({label: 'Item A'}));
menu.append(new gui.MenuItem({label: 'Item B'}));
menu.append(new gui.MenuItem({type: 'separator'}));
menu.append(new gui.MenuItem({label: 'Item C'}));

document.addEventListener('contextmenu', function(ev){
  ev.preventDefault();
  menu.popup(ev.x, ev.y);
  return false;
});