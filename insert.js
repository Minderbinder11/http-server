var mysql = require('mysql');
var settings = require('./settings');


//this is this the interface with the MYSQL database

exports.executeSql = function(sql, callback){
    var connection = mysql.createConnection(settings.dbConfig);
    connection.connect();

    var result = connection.query(sql)
      connection.end();
      callback(result);
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
