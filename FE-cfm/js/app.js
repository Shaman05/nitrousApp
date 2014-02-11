/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-11
 * Time: 下午4:12
 */

(function(){
  // Load native UI library
  var gui = require('nw.gui');
  var item;

  // Create a separator
  //item = new gui.MenuItem({ type: 'separator' });

  // Create a normal item with label and icon
  item = new gui.MenuItem({
    type: "normal",
    label: "I'm a menu item",
    icon: "image/1.png"

  });

  // Or you can omit the 'type' field for normal items
  //item = new gui.MenuItem({ label: 'Simple item' });

  // Bind a callback to item
  /*item = new gui.MenuItem({
   label: "Click me",
   click: function() {
   console.log("I'm clicked");
   }
   });*/

  // You can have submenu!
  var submenu = new gui.Menu();
  var menuItem = new gui.MenuItem({
    label: 'Click me!',
    icon: "image/1.png",
    enabled: false,
    click: function(){
      var p = document.createElement('p');
      p.innerHTML = 'submenu clicked!';
      document.body.appendChild(p);
    }
  });
  submenu.append(new gui.MenuItem({ label: 'Item 1' }));
  submenu.append(new gui.MenuItem({ label: 'Item 2' }));
  submenu.append(menuItem);
  item.submenu = submenu;

  var menu = new gui.Menu();
  menu.append(item);

  // And everything can be changed at runtime
  /*item.label = 'New label';
   item.click = function() {
   alert('New click callback');
   };*/

  document.addEventListener('contextmenu', function(ev){
    ev.preventDefault();
    menu.popup(ev.x, ev.y);
    return false;
  });
})();