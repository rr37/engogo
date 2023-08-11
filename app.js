// app.js
// 載入express
const express = require('express')

// 建構應用程式伺服器
const app = express()

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 宣告 PORT
const PORT = process.env.PORT

// 設定路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定監聽運行訊息
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
