const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors())
const connect = require('./db/connect')
const UserRoute = require('./routes/user')

connect()

const port = process.env.PORT || 3005

app.use(UserRoute)

app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`)
})

