var express = require('express')
var app = express()
var cors = require('cors')
var morgan = require('morgan')
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:8080'
}))
