/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-17
 * Time: 下午5:23
 *
 * Class WebSql
 * 参考祥叔学编程: http://www.cnblogs.com/xumingxiang
 */

(function(win){

  'use strict';

  win.webStorage = win.webStorage || {};

  webStorage.WebSql = function (){
    var _this = this;
    //数据库
    var _dataBase;

    //打开数据库连接或者创建数据库
    this.openDatabase = function (dataBaseName, version, info, size, callback){
      if (!!_dataBase) {
        return _dataBase;
      }
      _dataBase = openDatabase(dataBaseName, version, info, size, function (){
        typeof callback === 'function' && callback();
      });
      /*if (!_dataBase) {
          alert("数据库创建失败！");
      } else {
          alert("数据库创建成功！");
      }*/
      return _dataBase;
    }


    //创建数据表
    //sql example: 'CREATE TABLE IF NOT EXISTS tableName (id REAL UNIQUE, name TEXT)'
    this.createTable = function (tableName, sql){
      var dataBase = _this.openDatabase();
      // 创建表
      dataBase.transaction(function (tx){
        tx.executeSql(
          sql,
          [],
          function () {
            alert('创建' + tableName + '表成功');
          },
          function (tx, error){
            alert('创建' + tableName + '表失败:' + error.message);
          });
      });
    }

    //添加数据, 注意字段与值对应
    //sql example: 'insert into tableName (id, name) values(?, ?)'
    this.insert = function (valueArr, sql){
      var dataBase = _this.openDatabase();
      var id = 'WebSqlId_' + Math.random(); //随机id
      dataBase.transaction(function (tx) {
        tx.executeSql(
          sql,
          [id].concat(valueArr),
          function (){
            alert('添加数据成功');
          },
          function (tx, error){
            alert('添加数据失败: ' + error.message);
          });
      });
    }

    // 查询
    this.query = function () {
      var dataBase = _this.openDatabase();
      dataBase.transaction(function (tx) {
        tx.executeSql(
          "SELECT * FROM stu", [],
          function (tx, result) {
            //result：SQLResultSet对象。
            //其定义为：interface SQLResultSet {
            //  readonly attribute long insertId;
            //  readonly attribute long rowsAffected;
            //  readonly attribute SQLResultSetRowList rows;
            //};
            //             alert(result);
            $("#datalist").children().remove();
            for (var i = 0; i < result.rows.length; i++) {


              var id = result.rows.item(i)['id'];
              var name = result.rows.item(i)['name'];
              var $dataItem = $("<div>Id:" + id + "&nbsp;&nbsp;&nbsp;&nbsp;name：" + name + " &nbsp;&nbsp; &nbsp; </div><br/>");

              $dataItem.append("<a  id='" + id + "' href='javascript:;'>把名字更新为徐明祥</a>&nbsp;");
              $dataItem.append("<a id='" + id + "' href='javascript:;'>把名字更新为祥叔</a>&nbsp;");
              $dataItem.append("<a id='" + id + "' href='javascript:;'>删除</a>&nbsp;");
              $($dataItem.find("a")[0]).click(function () {
                webSql.update($(this).attr("id"), '徐明祥');
              });

              $($dataItem.find("a")[1]).click(function () {
                webSql.update($(this).attr("id"), '祥叔');
              });

              $($dataItem.find("a")[2]).click(function () {
                webSql.del($(this).attr("id"));
                _this.query();
              });

              $("#datalist").append($dataItem);

            }
          },
          function (tx, error) {
            alert('查询失败: ' + error.message);
          });
      });
    }

    //更新数据
    //sql example: 'UPDATE tableName SET fieldName = ? WHERE id= ?'
    this.update = function (id, value, sql) {
      var dataBase = _this.openDatabase();
      dataBase.transaction(function (tx){
        tx.executeSql(
          sql,
          [value, id],
          function (tx, result){
            _this.query();
          },
          function (tx, error){
            alert('更新失败: ' + error.message);
          });
      });
    }

    //删除数据
    //sql example: 'DELETE FROM tableName WHERE fieldName= ?'
    this.del = function (value, sql){
      var dataBase = _this.openDatabase();
      dataBase.transaction(function (tx){
        tx.executeSql(
          sql,
          [value],
          function (tx, result){
            alert('删除成功');
          },
          function (tx, error){
            alert('删除失败: ' + error.message);
          });
      });
    }

    //删除数据表
    this.dropTable = function (tableName){
      var dataBase = _this.openDatabase();
      dataBase.transaction(function (tx) {
        tx.executeSql('DROP TABLE ' + tableName);
      });
    }
  }

})(window);