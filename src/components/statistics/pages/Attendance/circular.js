// import '../css/common.css'
// import '../css/report.css'
import Animation from '@/modules/corejs/animation/animation'

/* eslint-disable no-undef */
export default function ({canvas, num, total}) {
  let {PI} = Math
  // let canvas = document.getElementById('canvas')
  let basewh = 106
  let p = 2 // window.innerWidth * 0.4 / basewh * 2
  let wh = canvas.height = canvas.width = basewh * p
  let ctx = canvas.getContext('2d')

  let lingrad = ctx.createLinearGradient(0, 0, 0, 150)
  lingrad.addColorStop(0, '#58aeff')
  lingrad.addColorStop(1, '#58aeff')

  function draw (v) {
    ctx.clearRect(0, 0, wh, wh)
    ctx.strokeStyle = '#d6d6d6'
    ctx.lineWidth = 12 * p
    // ctx.lineCap = 'round' // 末端样式

    ctx.beginPath()
    ctx.arc(53 * p, 53 * p, 43 * p, 0.5 * PI, 2.5 * PI)
    ctx.stroke()

    ctx.strokeStyle = lingrad
    // ctx.strokeStyle = '#71c81f'
    ctx.beginPath()
    ctx.arc(53 * p, 53 * p, 43 * p, (-1) * 0.5 * PI, ((-1) * 0.5 + 2 * v) * PI)
    ctx.stroke()

    ctx.font = 12 * p + 'px Consolas'
    ctx.textAlign = 'center'
    ctx.fillStyle = '#58aeff'
    ctx.fillText('出勤人数', 53 * p, 68 * p)
    ctx.font = 18 * p + 'px Consolas'
    ctx.fillStyle = '#58aeff'
    ctx.fillText((~~(v * total)) + '/' + total, 53 * p, 52 * p)
  }

  draw(0)

  let animation = new Animation()
  let goValue = num / total
  animation.start(p => {
    draw(p * goValue)
  }, 1500)
}
