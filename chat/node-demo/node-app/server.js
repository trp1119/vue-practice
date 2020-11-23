const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

// 引入users.js
const users = require('./routes/api/users')
// 引入profiles.js
const profiles = require('./routes/api/profiles')
// 引入messages.js
const messages = require('./routes/api/messages')

// DB config
const db = require('./config/keys').mongoURL

// 使用 body-parser 中间件
app.use(bodyParser.json({ limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// Connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected!!!')
  }).catch(err => {
    console.log('错误', err)
  })

// passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

// 使用routes
app.use('/api/users', users)
app.use('/api/profiles', profiles)
app.use('/api/messages', messages)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})