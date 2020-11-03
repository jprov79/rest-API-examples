const mysql = require('promise-mysql');

require('dotenv').config()
module.exports.setup = _ => {

    // [START cloud_sql_mysql_mysql_create_tcp]
    const createTcpPool = async config => {
        // Extract host and port from socket address
        const dbSocketAddr = process.env.DB_HOST.split(':');
        console.log(">>>>>>>>>>>>>Running cloud_sql_mysql_mysql_create_tcp");
        // Establish a connection to the database
        return await mysql.createPool({
            user: process.env.DB_USER, // e.g. 'my-db-user'
            password: process.env.DB_PASS, // e.g. 'my-db-password'
            database: process.env.DB_NAME, // e.g. 'my-database'
            host: dbSocketAddr[0], // e.g. '127.0.0.1'
            port: dbSocketAddr[1], // e.g. '3306'
            // ... Specify additional properties here.
            ...config,
        });
    };

    // [START cloud_sql_mysql_mysql_create_socket]
    const createUnixSocketPool = async config => {
        const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
        // Establish a connection to the database
        console.log(">>>>>>>>>>>>>Running createUnixSocketPool");
        return await mysql.createPool({
            user: process.env.DB_USER, // e.g. 'my-db-user'
            password: process.env.DB_PASS, // e.g. 'my-db-password'
            database: process.env.DB_NAME, // e.g. 'my-database'
            // If connecting via unix domain socket, specify the path
            //socketPath: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
            socketPath: process.env.DB_SOCKET_PATH,
            // Specify additional properties here.
            ...config,
        });
    };

    const createPool = async () => {
        const config = {
            connectionLimit: 5,
            connectTimeout: 10000, // 10 seconds
            acquireTimeout: 10000, // 10 seconds
            waitForConnections: true, // Default: true
            queueLimit: 0, // Default: 0
        };
        if (process.env.DB_HOST) {
            return await createTcpPool(config);
        } else {
            return await createUnixSocketPool(config);
        }
    };

    return createPool();
}