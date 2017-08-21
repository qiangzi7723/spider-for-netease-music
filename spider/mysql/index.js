const mysql = require("mysql");
const {
    database
} = require('../config');
const pool = mysql.createPool(database);

const query = (sql, options, callback) => {
    pool.getConnection((err, conn) => {
        if (!err) {
            conn.query(sql, options, (err, results, fields) => {
                callback(err, results, fields);
                conn.release();
            });
        } else {
            callback(err, null, null);
        }
    });
}

module.exports = query;