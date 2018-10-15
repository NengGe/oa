// 检测--加粗
function testBold (elList) {
  let flag = elList.find((el) => {
    return el.tagName.toLowerCase() === 'b'
  })
  return Boolean(flag)
}
// 检测--字体大小
function testFontSize (elList) {
  let ele = elList.find((el) => {
    return el.tagName.toLowerCase() === 'font' && el.size
  })
  return ele ? ele.size : 0
}
// 检测--字体颜色
function testFontColor (elList) {
  let ele = elList.find((el) => {
    // console.log(el.tagName.toLowerCase())
    return el.tagName.toLowerCase() === 'font' && el.color
  })
  // console.log('ele', ele)
  return ele ? ele.color : 0
}
// 检测--居中 OR 居左
function testCenter (elList) {
  let ele = elList.find((el) => {
    return el.style['text-align']
  })
  return ele ? ele.style['text-align'] === 'center' : 0
}
// 检测--有序列表
function testOrderedList (elList) {
  let ele = elList.find((el) => {
    return el.tagName.toLowerCase() === 'ol'
  })
  return Boolean(ele)
}
// 检测--无序列表
function testUnorderedList (elList) {
  let ele = elList.find((el) => {
    return el.tagName.toLowerCase() === 'ul'
  })
  return Boolean(ele)
}
export default function testStyle (elList) {
  return {
    currFontSize: testFontSize(elList),
    currFontColor: testFontColor(elList),
    isActiveBold: testBold(elList), // 字体--加粗
    isActiveCenter: testCenter(elList), // 文本--居中 or 居左
    isActiveUl: testUnorderedList(elList), // 无序列表
    isActiveOl: testOrderedList(elList) // 无序列表
  }
}
