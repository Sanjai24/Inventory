const { MongoClient } = require('mongodb')
let dbConnection

let uri = "mongodb+srv://sanjais24:test123@cluster0.dfx4kp5.mongodb.net/?retryWrites=true&w=majority"
let uri2 = "mongodb://localhost:27017/Inventory"

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri2)
        .then((client) => {
            dbConnection = client.db()
            console.log("Database connected")
            return callback()
        })
        .catch((err) => {
            console.log(err)
            return callback(err)
        })
    },
    getDb: () => dbConnection
}