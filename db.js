const mysql = require("mysql2/promise");

let env = process.env

const pool = mysql.createPool({
    connectionLimit: 10,    
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
    port: env.DB_PORT
});


async function Query(sql, params) {
    try {
        let con = await pool.getConnection()
        let [results, fields] = await con.execute(sql, params)
        con.release()
        return [results, fields]
    } catch (err) {
        console.log("query: " + sql + "     :     " + params)
        console.log(err)
        throw err
    }
}

module.exports = { 
    Query,
}
