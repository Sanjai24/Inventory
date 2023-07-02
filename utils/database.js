const { MongoClient, ListCollectionsCursor } = require('mongodb')
const mongoose = require('mongoose')
let dbConnection

// let uri = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/Inventory"
// let uri4 = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/?retryWrites=true&w=majority"

let uri = "mongodb+srv://Sanjais24:b6ZRteiKWSetOEIP@cluster0.nbkds1x.mongodb.net/Inventory?retryWrites=true&w=majority"
// let uri3 = "mongodb+srv://Sanjais24:test1234@cluster0.nbkds1x.mongodb.net/"

// let uri2 = "mongodb://localhost:27017/Inventory"

const connectToDb = async() => {
    try{
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Connected to database successfully")
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectToDb

// module.exports = {
//     connectToDb: (callback) => {
//          MongoClient.connect(uri)
//         .then((client) => {
//             dbConnection = client.db()
//             console.log("Database connected")
//             return callback()
//         })
//         .catch((err) => {
//             console.log(err)
//             return callback(err)
//         })
//     },
//     getDb: () => dbConnection
// }