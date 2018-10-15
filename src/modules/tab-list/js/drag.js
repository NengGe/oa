function drag ({ el, onStart = () => { }, onMove = () => { }, onEnd = () => { }, enableX = false, enableY = false, enable = false }) {
  let onStartReturnV, onMoveReturnV
  let _startSite = { x: 0, y: 0 }
  let _moveSite = { x: 0, y: 0 }
  let _elSite = { x: 0, y: 0 }
  function touchstart (e) { // 开始
    onStartReturnV = onStart(e)
    if (enable || enableX) { // 左右拖拽
      _startSite.x = e.changedTouches[0].pageX
    }
    if (enable || enableY) { // 上下拖拽
      _startSite.y = e.changedTouches[0].pageY
    }
    document.addEventListener('touchmove', touchmove)
    document.addEventListener('touchend', touchend)
  }
  function touchmove (e) { // 移动
    onMoveReturnV = onMove(e, onStartReturnV, _elSite)
    if (enable || enableX) { // 左右拖拽
      _moveSite.x = e.changedTouches[0].pageX
      let elSiteX = _moveSite.x - _startSite.x + _elSite.x
      // console.log('move', elSiteX)
      _translate(el, { x: elSiteX })
    }
    if (enable || enableY) { // 上下拖拽
      _moveSite.y = e.changedTouches[0].pageY
      let elSiteY = _moveSite.y - _startSite.y + _elSite.y
      _translate(el, { y: elSiteY })
    }
  }
  function touchend (e) { // 结束
    onEnd(e, onMoveReturnV, _elSite)
    if (enable || enableX) { // 左右拖拽
      _elSite.x = _moveSite.x - _startSite.x + _elSite.x
    }
    if (enable || enableY) { // 上下拖拽
      _elSite.y = _moveSite.y - _startSite.y + _elSite.y
    }
    document.removeEventListener('touchmove', touchmove)
    document.removeEventListener('touchend', touchend)
  }
  el.addEventListener('touchstart', touchstart)
  return function () {
    document.removeEventListener('touchstart', touchstart)
  }
}
function _translate (el, { x, y }) {
  el.style.transform = el.style.transform || 'translate(0px,0px)'
  if (x !== undefined) {
    el.style.transform = el.style.transform.replace(/(\s)*\((-){0,1}\w*(\s)*,/, `(${x}px,`)
  }
  if (y !== undefined) {
    el.style.transform = el.style.transform.replace(/,(\s)*(-){0,1}(\w)*(\s)*\)/, `,${y}px)`)
  }
}
export { drag }
