export default function () {
  function addStr (str) {
    if (!str) return ''
    return Number(str) >= 10 ? Number(str).toString() : '0' + Number(str)
  }
  let date = new Date()
  let year = date.getFullYear()
  let month = addStr(date.getMonth() + 1)
  let someDay = addStr(date.getDate())
  let hour = addStr(date.getHours())
  let minute = addStr(date.getMinutes())
  return year + '-' + month + '-' + someDay + ' ' + hour + ':' + minute
}
