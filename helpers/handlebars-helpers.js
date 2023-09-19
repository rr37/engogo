const hbshelpers = require('handlebars-helpers')()
const dayjs = require('./dayjs-helper')

// 人性化時間顯示：ex. 16 hours age
hbshelpers.relativeTime = function (a) {
  return dayjs(a).fromNow()
}

// 時間格式修正：ex. 2023年06月30(五)
hbshelpers.modifyTime = function (t) {
  return dayjs(t).format('YYYY年MM月DD日(dd)')
}

// 裁減句子功能
hbshelpers.substring = function (str, start, end) {
  if (str.length < 100) return str
  return str.substring(start, end) + '...'
}

module.exports = { hbshelpers }
