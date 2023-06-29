const { MongoClient, ListCollectionsCursor } = require('mongodb')
let dbConnection

// let uri = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/Inventory"
let uri4 = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/?retryWrites=true&w=majority"

let uri = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/Inventory?retryWrites=true&w=majority"
// let uri3 = "mongodb+srv://Sanjais24:test1234@cluster0.nbkds1x.mongodb.net/"

let uri2 = "mongodb://localhost:27017/Inventory"

module.exports = {
    connectToDb: (callback) => {
         MongoClient.connect(uri)
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