var mysql = require('mysql');
var config = require('./config.json');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : config.dbhost,
  user            : config.dbuser,
  password        : config.dbpassword,
  database        : config.dbname
});

exports.handler =  (event, context, callback) => {
  //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err){
      return err;
    }

    var post  = {password: 'duh', username: 'test'};
    // Use the connection
    connection.query('INSERT INTO users (password, username) VALUES (?,?);',event,function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) callback(error);
      else callback(null,results[0].username);
    });
  });
};