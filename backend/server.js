const express = require("express")
const db = require("mongoose")
const cors = require("cors")
const routes = require('./routes/todoRoutes')
require("dotenv").config();
const port = process.env.PORT || 7000;
const app = express()

db.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected ...')).catch(err => console.log(err.message))

app.use(express.json())
app.use(cors())

app.use(routes)

app.listen(port, () => console.log('server connect on port ' + port))