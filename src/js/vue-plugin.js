
function fillNum (n) {
  let s = n > 9 ? n : '0' + n
  return s
}
export default {
  install (Vue) {
    /*
      功能：整理时间格式
      参数说明：
      dateStr:  String  (ps: 要求能new Date(dateStr) 实例化)
      format：  String  例如：'yy-mm-dd hh:mm-ss'  (ps: 每种类型需在switch中手动添加维护)
      needJudgeToday：  Boolean 说明：需要判断是今天 为true时将不显示 年-月-日
    */
    Vue.prototype.$getTimeStr = function (dateStr, format, needJudgeToday = true) {
      let d = new Date(dateStr)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      let day = d.getDate()

      let hour = d.getHours()
      let min = d.getMinutes()
      let sec = d.getSeconds()

      let isToday = new Date(year, month - 1, day).toDateString() === new Date().toDateString()

      year = fillNum(year)
      month = fillNum(month)
      day = fillNum(day)

      hour = fillNum(hour)
      min = fillNum(min)
      sec = fillNum(sec)

      let str
      switch (format) {
        case 'mm-dd hh:mm':
          if (isToday && needJudgeToday) {
            str = `${hour}:${min}`
          } else {
            str = `${month}-${day} ${hour}:${min}`
          }
          break
        case 'yy-mm-dd':
          str = `${year}-${month}-${day}`
          break
        case 'yy-mm-dd hh:mm':
          if (isToday && needJudgeToday) {
            str = `${hour}:${min}`
          } else {
            str = `${year}-${month}-${day} ${hour}:${min}`
          }
          break
        case 'yy-mm-dd hh:mm-ss':
          if (isToday && needJudgeToday) {
            str = `${hour}:${min}:${sec}`
          } else {
            str = `${year}-${month}-${day} ${hour}:${min}:${sec}`
          }
          break
        default:
          if (isToday && needJudgeToday) {
            str = `${hour}:${min}`
          } else {
            str = `${month}-${day} ${hour}:${min}`
          }
      }
      return str
    }
    /*
      功能：数组排序
      参数说明：
      arr:    Array
      attr:   String||Number  按照该属性排序
    */
    Vue.prototype.$arrSort = function (arr, attr) {
      let a = []
      arr.forEach((item, i) => {
        let index = a.findIndex((m, j) => {
          return m[attr] > item[attr]
        })
        index === -1 ? a.push(item) : a.splice(index, 0, item)
      })
      return a
    }
  }
}
