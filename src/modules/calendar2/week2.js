// let d = {
//   currDate: '', // 当前选择。默认为 startDate。加载数据根据此初始化
//   startDate: '', // 一周的开始时间。可作为id
//   endDate: '', // 一周的结束时间
//   firstDays: [],
//   secondDays: [],
//   // 可快速判断选定天是否在当前星期
//   daysKey: {4: 1, 5: 1}
// }

// function datefill (s) {
//   return s.replace(/-(\d)(?=(-|$))/g, '-0$1')
// }

function numfill (number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}

export default class Week {
  // 从星期1起始，从星期天起始待实现
  // 可以是对象，可以是字符串(2017-12-5)
  buildWeekData (date) {
    date = typeof date === 'string' ? new Date(date.replace(/-/g, '/')) : date
    let currYear = date.getFullYear()
    let currMonth = date.getMonth() + 1
    let currDay = date.getDate() // 当前天
    let currWeek = date.getDay() // 当前星期
    let currDate = `${currYear}-${numfill(currMonth)}-${numfill(currDay)}`
    // 开始日期
    let startDateO = new Date(currYear, currMonth - 1, currDay - currWeek)
    let startDate = `${startDateO.getFullYear()}-${numfill(startDateO.getMonth() + 1)}-${numfill(startDateO.getDate())}`
    // 结束日期
    let endDateO = new Date(currYear, currMonth - 1, currDay + 6 - currWeek)
    let endDate = `${endDateO.getFullYear()}-${numfill(endDateO.getMonth() + 1)}-${numfill(endDateO.getDate())}`
    // 日历数据
    let firstDays = []
    let secondDays = []
    let daysKey = {}
    if (startDateO.getMonth() < date.getMonth()) { // 存在上月日期
      let lastNum = currWeek - currDay + 1 // 当前周 中 上个月day个数
      for (let i = 0; i < 7; i++) {
        let d = new Date(currYear, currMonth - 1, currDay - currWeek + i)
        let dateStr = `${d.getFullYear()}-${numfill(d.getMonth() + 1)}-${numfill(d.getDate())}`
        daysKey[d.getDate()] = dateStr
        if (i < lastNum) { // 上月部分
          firstDays.push(d.getDate())
        } else { // 当月部分
          secondDays.push(d.getDate())
        }
      }
    } else if (endDateO.getMonth() > date.getMonth()) { // 存在下月日期
      let nextNum = 6 - currWeek // 当前周 中 下个月day个数
      for (let i = 0; i < 7; i++) {
        let d = new Date(currYear, currMonth - 1, currDay - currWeek + i)
        let dateStr = `${d.getFullYear()}-${numfill(d.getMonth() + 1)}-${numfill(d.getDate())}`
        daysKey[d.getDate()] = dateStr
        if (i < 7 - nextNum) { // 上月部分
          firstDays.push(d.getDate())
        } else { // 当月部分
          secondDays.push(d.getDate())
        }
      }
    } else { // 全是当月day
      for (let i = 0; i < 7; i++) {
        let d = new Date(currYear, currMonth - 1, currDay - currWeek + i)
        let dateStr = `${d.getFullYear()}-${numfill(d.getMonth() + 1)}-${numfill(d.getDate())}`
        daysKey[d.getDate()] = dateStr
        secondDays.push(d.getDate())
      }
    }

    return {
      currDay,
      currDate, // : datefill(currDate),
      startDate, // : datefill(startDate),
      endDate, // : datefill(endDate),
      firstDays,
      secondDays,
      daysKey
    }
  }
  getTotalDays (year, month) {
    return (new Date(year, month, 0)).getDate()
  }
  // 0 上一半，1 下一半
  // whichHalf (d) {
  //   if (d < this.firstDays[0]) {
  //     return 0
  //   }
  //   return 1
  // }
}
