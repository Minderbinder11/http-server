var mysql = require('mysql');
var settings = require('./settings');


//this is this the interface with the MYSQL database

exports.executeSql = function(sql, callback){
    var connection = mysql.createConnection(settings.dbConfig);

    connection.query(sql, function(err, data) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        callback(null, err);
        return;
      } else{
        console.log('(20) connected as id  inside the executeSql function ' + connection.threadId);
        console.log('(21) data from the execute sql function' + data);
        callback(data);
      }
    });

    //var result = connection.query(sql)
    //  connection.end();
    //  callback(result);
};

/*
exports.executeSql = function (sql, callback) {
    var conn = new sqlDb.Connection(settings.dbConfig);
    conn.connect().then(function () {
        var req = new sqlDb.Request(conn);
        req.query(sql).then(function (recordset) {
            conn.close();
            callback(recordset);
        }).catch(function (err) {
            console.log(err);
            callback(null, err);
        });
    }).catch(function (err) {
        console.log(err);
        callback(null, err);
    });
};
*/
