/* eslint-disable no-multiple-empty-lines */
let passiveSupported = false
try { // 检测浏览器 是否支持passive
  var options = Object.defineProperty({}, 'passive', {
    get: function () {
      passiveSupported = true
    }
  })
  window.addEventListener('test', null, options)
} catch (err) { }


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
    this.isRunning = false

    this.elSite = { x: 0, y: 0 }
    this.elSitetouchStart = { x: 0, y: 0 }
    this.elSiteBeforeScrollTo = { x: 0, y: 0 }

    this.touchStartSite = { x: 0, y: 0 }
    this.touchMoveSite = { x: 0, y: 0 }
    // this.touchEndSite = { x: 0, y: 0 }

    this.timer_scrollTo = null
  }

  init () {
    this.remove()
    this.el.addEventListener('touchstart', this)
  }

  remove () {
    this.el.removeEventListener('touchstart', this)
  }

  reset (time, bezier) {
    this.scrollTo(this.elSitetouchStart, time = 300, bezier = '')
  }

  goback (time = 0, bezier = '') {
    scrollTo(this.elSiteBeforeScrollTo, time, bezier)
  }

  scrollTo ({ x, y }, time = 0, bezier = '') {
    this.elSiteBeforeScrollTo = Object.assign({}, this.elSite) // 缓存 scrollTo方法之前元素位置
    this.isRunning = true
    this.el.style.transition = `transform ${time}ms ${bezier}`
    this.translate({ x, y })
    clearTimeout(this.timer_scrollTo)
    this.timer_scrollTo = setTimeout(() => {
      this.el.style.transition = ''
      this.isRunning = false
    }, time)
  }

  removeEvent () {
    document.removeEventListener('touchmove', this, passiveSupported
      ? { passive: true } : false)
    document.removeEventListener('touchend', this)
  }

  start (e) {
    if (this.onStart(e, this) === false) return
    document.addEventListener('touchmove', this, passiveSupported
      ? { passive: true } : false)
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

  translate ({ x, y }, needRecordOfSiteBeforeTranslate) {
    x = Number(x)
    y = Number(y)
    // needRecordOfSiteBeforeTranslate && (this.elSiteBeforeScrollTo = {x, y})
    let { enable, enableX, enableY } = this
    x = (enable || enableX) ? x : 0
    y = (enable || enableY) ? y : 0
    this._translate(this.el, { x, y })
    this.elSite = { x, y }
  }

  _translate (el, { x = this.elSite.x, y = this.elSite.y }) {
    el.style.transform = el.style.transform || 'translate3d(0px,0px, 0px)'
    el.style.transform = `translate3d(${x}px,${y}px, 0px)`
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
    if (this.disable === true || this.isRunning === true) return
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
