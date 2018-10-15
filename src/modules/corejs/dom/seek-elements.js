
export default function seekElements (startEle, endEle, cb) {
  let eleList = []
  if (startEle === endEle || !startEle || !endEle) return eleList // 结束条件
  eleList.push(startEle)
  if (cb instanceof Function) {
    cb(startEle)
  }
  let _eleList = seekElements(startEle.parentNode, endEle, cb)
  return eleList.concat(_eleList)
}
