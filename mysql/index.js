const mysql = require("mysql");
const {
    database
} = require('../config');
const pool = mysql.createPool(database);

const query = (sql, options, callback) => {
    pool.getConnection((err, conn) => {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, (err, results, fields) => {
                callback(err, results, fields);
                conn.release();
            });
        }
    });
}

module.exports = query;