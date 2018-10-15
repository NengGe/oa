let rAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) { window.setTimeout(callback, 1000 / 60) }
let cAF = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.clearTimeout

export default class Animation {
  constructor (excu, { num, duration, interval }, complete = () => { }) {
    this.excu = excu
    this.num = num
    this.duration = duration
    this.interval = interval
    this.complete = complete
    this.frameId = null
    this.n = 0
  }
  run () {
    this.frameId = rAF(this.step.bind(this))
  }
  stop () {
    cAF(this.frameId)
    this.complete()
  }
  step () {
    this.n++
    // console.log('n', this.n)
    this.run()
    this.excu() === false && this.stop()
  }
}
