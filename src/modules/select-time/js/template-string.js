export default class templateString {
  arrToStr (temStr, arr) {
    return temStr.replace(/\$\{(\w+)\}/g, function (match, key) {
      return arr[key]
    })
  }
  strToArr (temStr, str) {
    let regStr = temStr.replace(/\$\{(\w+)\}/g, '([\\u4e00-\\u9fa5\\w]+)')
    let reg = new RegExp(regStr)
    let _arr = str.match(reg)
    console.log('_arr', _arr)
    let arr = Array.from(_arr)
    arr.shift()
    let indexArr = this.getIndexArr(temStr)
    return this.adjustOrder(arr, indexArr)
  }
  getIndexArr (temStr) {
    let reg = /\$\{(\w+)\}/g
    let arr = temStr.match(reg)
    return arr.map(item => {
      return item.slice(2, item.length - 1)
    })
  }
  adjustOrder (dataArr, indexArr) {
    let arr = []
    indexArr.forEach((item, i) => {
      arr[item] = dataArr[i]
    })
    return arr
  }
  jug
}
