const express = require('express')
const cors = require('cors')
const connectToDb = require('./utils/database')
const router = require('./routes/routes')

const app = express()
app.use(express.json())
app.use(router)

connectToDb()  

app.listen(4000, ()=> {
    console.log("Inventory is listening to port 4000")
})

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
