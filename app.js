// 載入express
const express = require('express')
// 建構應用程式伺服器
const app = express()

// 引用 hbs
const exphbs = require('express-handlebars')
// 引用 helpers
const hbshelpers = require('./helpers/handlebars-helpers')
const session = require('express-session')
const flash = require('connect-flash')

const routes = require('./routes')
const passport = require('./config/passport')
app.use(express.static('public'))
// 設定 helpers
app.engine(
  'hbs',
  exphbs({
    helpers: hbshelpers,
    defaultLayout: 'main',
    extname: '.hbs',
  })
)

app.set('view engine', 'hbs')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 宣告 PORT
const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ThisMySecret',
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.warning_messages = req.flash('warning_messages')
  next()
})

app.use(routes)

// 設定監聽運行訊息
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
