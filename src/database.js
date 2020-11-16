const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const connectToDatabase = async () => {
    const uri =
        "mongodb://"
        + process.env.DB_USER + ":"
        + process.env.DB_PASS + "@"
        + process.env.DB_HOST;

    const client = new MongoClient(uri);
    await client.connect();
    var db = client.db(process.env.DB_NAME);

    return db
};

module.exports.setup = connectToDatabase;