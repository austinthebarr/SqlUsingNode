var mysql = require('mysql');
var config = require('./config.json');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : config.dbhost,
  user            : config.dbuser,
  password        : config.dbpassword,
  database        : config.dbname
});
var one = 'b';
var two = 'yo';
pool.getConnection(function(err, connection, one, two) {
  if (err) throw err; // not connected!
  var sql = `INSERT INTO users (password, username) VALUES (?,?);`;
  // Use the connection
  // Use the connection
  connection.query(sql, [one,two],function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) throw error;
    else console.log('success')

    process.exit();

    // Don't use the connection here, it has been returned to the pool.
  });
});
