// import swipePlus from '../corejs/drag/swipex'
import autoPrefix from '../corejs/dom/css/autoprefix'
import SliderPositionData from './slider-position-data'

let transform = autoPrefix('transform')[1]

export default class {
  constructor ({eDrag, boxW}) {
    this.isRun = false // 是否动画中

    // 拖动情况 松开时 是否进行滑动的最大偏移值
    // let offset = boxW / 3
    this.moveLength = 0// 当前拖动的长度
    this.boxW = boxW

    this.eMove = eDrag.children[0]
    this.eItems = this.eMove.children

    this.sliderPositionData = new SliderPositionData()
  }
  move (x) {
    this.eMove.style[transform] = 'translate3d(' + x + 'px,0,0)'
  }

  // 向左滑动，向左移动
  // type, 自定义类型，可区别非事件触发情况
  swipeLeft ({ before, type } = {}) {
    // if (this.isRun) return
    this.animateActive(() => {
      before && before()
      this.adjust('l', type)
    })
    this.eMove.style[transform] = 'translate3d(-200%,0,0)'

    this.sliderPositionData.swipeLeft()
  }
  // 向右滑动，向右移动
  swipeRight ({ before, type } = {}) {
    // if (this.isRun) return
    this.animateActive(() => {
      before && before()
      this.adjust('r', type)
    })

    this.eMove.style[transform] = 'translate3d(0,0,0)'

    this.sliderPositionData.swipeRight()
  }
  swipeNot () {
    this.animateActive()
    this.eMove.style[transform] = 'translate3d(-100%,0,0)'
  }
  animateActive (cb) {
    let {eMove} = this
    let {classList} = eMove
    this.isRun = true
    classList.add('animated')
    let transitionend = () => {
      classList.remove('animated')
      eMove.removeEventListener('transitionend', transitionend)
      eMove.removeEventListener('webkitTransitionEnd', transitionend)
      cb && cb()
      this.isRun = false
    }
    eMove.addEventListener('transitionend', transitionend)
    eMove.addEventListener('webkitTransitionEnd', transitionend)
  }
  // 调整归位
  adjust (direct, type) {
    let {eMove, eItems, sliderPositionData} = this
    let {data} = sliderPositionData

    eMove.style[transform] = 'translate3d(-100%,0,0)'
    data.forEach((d, i) => {
      eItems[d.item].style[transform] = `translate3d(${i * 100}%,0,0)`
    })
    this.changeAnimateEnd()
    // onChange && onChange(data, direct, type)
  }

  changeLeft () {}
  changeRight () {}
  changeAnimateEnd () {}
}
