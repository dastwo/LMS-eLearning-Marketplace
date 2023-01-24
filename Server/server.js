const express = require('express');
const {readdirSync} = require('fs');
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
require('./config/database')()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)))

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log(`server run port ${port}`);
})