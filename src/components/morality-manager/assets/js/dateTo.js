function addZero (num) {
  num = typeof num === 'number' ? num : parseInt(num)
  return num < 10 ? '0' + num : num
}
export default function (str) {
  // console.log(str)
  let yearMonthDay = ''
  if (!str) return ''
  if (str.indexOf('T')) {
    let index = str.indexOf('T')
    yearMonthDay = str.substring(0, index)
    let date = new Date(str)
    return yearMonthDay + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes())
  } else {
    let date = new Date(str)
    return addZero(date.getFullYear()) + '-' + (addZero(date.getMonth() + 1)) + '-' + addZero(date.getDate()) + ' ' +
    addZero(date.getHours()) + ':' + addZero(date.getMinutes())
  }
}
