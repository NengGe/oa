/* eslint-disable camelcase */
export default class Drag {
  constructor ({ el, onStart = () => { }, onMove = () => { }, onEnd = () => { }, enableX = false, enableY = false, enable = false, disable = false }) {
    this.el = el

    this.dir = ''

    this.onStart = onStart
    this.onMove = onMove
    this.onEnd = onEnd

    this.ratioX = arguments[0].ratioX || 1 // 系数
    this.ratioY = arguments[0].ratioY || 1 // 系数

    this.enable = enable
    this.enableX = enableX
    this.enableY = enableY

    this.disable = disable

    this.elSite = { x: 0, y: 0 } // 元素位置
    this.elSitetouchStart = { x: 0, y: 0 } // 按下时 元素位置

    this.touchStartSite = { x: 0, y: 0 } // 按下时 手势位置
    this.touchMoveSite = { x: 0, y: 0 } // 移动时 手势位置
    // this.touchEndSite = { x: 0, y: 0 }
  }

  init () {
    this.el.addEventListener('touchstart', this)
  }

  remove () {
    this.el.removeEventListener('touchstart', this)
  }

  scrollTo ({ x, y }, time = 0, bezier = '') {
    let disable = this.disable // 记录 使用scrollTo方法之前disable状态
    this.disable = true
    this.el.style.transition = `transform ${time}ms ${bezier}`
    this.translate({ x, y })
    setTimeout(() => {
      this.el.style.transition = ''
      this.disable = disable
    }, time)
  }

  removeEvent () {
    document.removeEventListener('touchmove', this)
    document.removeEventListener('touchend', this)
  }

  start (e) {
    if (this.onStart(e, this) === false) return
    document.addEventListener('touchmove', this)
    document.addEventListener('touchend', this)
    this.elSitetouchStart = Object.assign({}, this.elSite)
    this.touchStartSite = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
  }

  move (e) {
    this.touchMoveSite = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }
    let elSite = {
      x: (this.touchMoveSite.x - this.touchStartSite.x) * this.ratioY + this.elSitetouchStart.x,
      y: (this.touchMoveSite.y - this.touchStartSite.y) * this.ratioY + this.elSitetouchStart.y
    }
    this.dir = this._getDragDir(this.touchStartSite, this.touchMoveSite) // 手势方向

    if (this.onMove(e, this) === false) {
      this.touchStartSite = Object.assign({}, this.touchMoveSite) // 刷新 有效touch初始位置
      return
    }
    this.translate(elSite)
  }

  end (e) {
    this.removeEvent()
    this.onEnd(e, this)
  }

  translate ({ x, y }) {
    x = Number(x)
    y = Number(y)
    let { enable, enableX, enableY } = this
    x = (enable || enableX) ? x : 0
    y = (enable || enableY) ? y : 0
    this._translate(this.el, { x, y })
    this.elSite = { x, y }
  }

  _translate (el, { x, y }) {
    el.style.transform = el.style.transform || 'translate(0px,0px)'
    if (x !== undefined) {
      el.style.transform = el.style.transform.replace(/(\s)*\((-){0,1}(\w|.)*(\s)*,/, `(${x}px,`)
    }
    if (y !== undefined) {
      el.style.transform = el.style.transform.replace(/,(\s)*(-){0,1}(\w|.)*(\s)*\)/, `,${y}px)`)
    }
  }

  _translate_position (el, { x, y }) {
    el.style.position = 'fixed'
    el.style.left = x + 'px'
    el.style.top = y + 'px'
  }

  _getDragDir (a, b) { // 判断手势 方向
    let disX = b.x - a.x
    let disY = b.y - a.y
    let flag = Math.abs(disX) - Math.abs(disY)
    let dir
    if (disY < 0 && flag < 0) { // 向上 ↑
      dir = 'top'
    }
    if (disY > 0 && flag < 0) { // 向下 ↓
      dir = 'bottom'
    }
    if (disX < 0 && flag > 0) { // 向左 ←
      dir = 'left'
    }
    if (disX > 0 && flag > 0) { // 向右 →
      dir = 'right'
    }
    return dir
  }

  handleEvent (e) {
    if (this.disable === true) return
    switch (e.type) {
      case 'touchstart':
        this.start(e)
        break
      case 'touchmove':
        this.move(e)
        break
      case 'touchend':
        this.end(e)
        break
      default: break
    }
  }
}
