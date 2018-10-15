function numfill (number) {
  if (number < 10) {
    return '0' + number
  }
  return number
}
export default {
  getDayCount (year, month) {
    var d = new Date(year, month)
    d.setDate(0)
    d.getMinutes()
    return d.getDate()
  },
  getDayData (year, month) {
    let days = []
    for (let i = 0, len = this.getDayCount(year, month); i < len; i++) {
      days.push(numfill(i + 1))
    }
    return days
  },
  getData (startYear, year, month) {
    let data = [{d: [], i: 0}, {d: [], i: 0}, {d: [], i: 0}]
    let d1 = data[0]
    let d2 = data[1]
    let d3 = data[2]
    for (let i = 20; i--;) {
      d1.d.push(startYear + i)
    }
    for (let i = 1; i < 13; i++) {
      d2.d.push(numfill(i))
    }
    d1.i = year - startYear - 1
    d2.i = month - 1
    d3.d = this.getDayData(year, month)
    return data
  },
  getDateAndTime (startYear, year, month) {
    let data = [{d: [], i: 0}, {d: [], i: 0}, {d: [], i: 0}]
    let d1 = data[0]
    let d2 = data[1]
    let d3 = data[2]
    for (let i = 20; i--;) {
      d1.d.push(startYear + i)
    }
    for (let i = 1; i < 13; i++) {
      d2.d.push(numfill(i))
    }
    d1.i = year - startYear - 1
    d2.i = month - 1
    d3.d = this.getDayData(year, month)
    return data
  },
  getHours () {
    let str = '00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23'
    return str.split(',')
  },
  getMinutes () {
    let minutes = []
    for (let i = 60; i--;) {
      minutes.push(numfill(59 - i + ''))
    }
    return minutes
  }
}
