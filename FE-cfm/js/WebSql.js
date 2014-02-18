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
      if (!_dataBase) {
        alert("数据库创建失败！");
      } else {
        alert("数据库创建成功！");
      }
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
          }
        );
      });
    }

    //添加数据, 注意字段与值对应
    //sql example: 'INSERT INTO tableName (id, name) VALUES(?, ?)'
    this.insert = function (valueArr, sql){
      var dataBase = _this.openDatabase();
      var id = 'WebSqlId_' + Math.random(); //随机id
      dataBase.transaction(function (tx){
        tx.executeSql(
          sql,
          [id].concat(valueArr),
          function (){
            alert('添加数据成功');
          },
          function (tx, error){
            alert('添加数据失败: ' + error.message);
          }
        );
      });
    }

    // 查询
    //sql example: 'SELECT * FROM stu'
    this.query = function (sql, callback){
      var dataBase = _this.openDatabase();
      dataBase.transaction(function (tx){
        tx.executeSql(
          sql, [],
          function (tx, results) {
            //result：SQLResultSet对象。
            //其定义为：
            //interface SQLResultSet {
            //  readonly attribute long insertId;
            //  readonly attribute long rowsAffected;
            //  readonly attribute SQLResultSetRowList rows;
            //};
            typeof callback === 'function' && callback(tx, results);
          },
          function (tx, error) {
            alert('查询失败: ' + error.message);
          }
        );
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
          }
        );
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
          }
        );
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