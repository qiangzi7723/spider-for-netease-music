const mysql = require("mysql");
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1236',
    database: 'netease',
});

const query = (sql, options, callback) => {
    // console.log(sql);
    pool.getConnection((err, conn) => {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, options, (err, results, fields) => {
                conn.release();
                callback(err, results, fields);
            });
        }
    });
}

module.exports = query;