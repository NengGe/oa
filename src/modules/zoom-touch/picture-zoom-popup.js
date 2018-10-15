/**
 *
 * png 图背景透明情况，黑图案可能看不清，是否针对的提供定制css情况？是否从图片源解决是更好的解决方案？
 * 通过 url 井号传参 #backgroundColor=#fff
 * */
import ZoomTouch from './index'
import popup from '../popup/popup-single'
import imgComplete from '../corejs/dom/img-complete'
import autoPrefix from '../corejs/dom/css/autoprefix'
import click from '../corejs/dom/click'

export default function (src) {
  function fullCenter (img) {
    let {innerHeight, innerWidth} = window
    let {width: imgw, height: imgh} = img
    let boxRatio = innerWidth / innerHeight
    let imgRatio = imgw / imgh
    let w
    let h
    if (boxRatio > imgRatio) {
      h = innerHeight
      w = h * imgRatio
    } else {
      w = innerWidth
      h = w / imgRatio
    }
    return {
      w,
      h
    }
  }

  popup({
    created () {
      imgComplete(src, img => {
        let elem = document.createElement('div')
        let {w, h} = fullCenter(img)
        let eStyle = elem.style
        eStyle.width = '100%'
        eStyle.height = '100%'
        img.width = w
        img.height = h
        // img.style.backgroundColor = '#fff'
        elem.appendChild(img)

        let {elemCont} = this
        let {style} = elemCont
        style.maxHeight = '100%'
        style.width = '100%'
        style.height = '100%'
        style.overflow = 'visible'
        style.left = '0'
        style.top = '0'
        style[autoPrefix('transform')[1]] = 'none'
        style.boxShadow = 'none'
        style.backgroundColor = 'transparent'
        elemCont.replaceChild(elem, elemCont.firstElementChild)

        let zoomTouch = new ZoomTouch()

        zoomTouch.init({
          elem,
          elemz: img
        })

        zoomTouch.center(0.8)

        click(elem, () => {
          this.close()
        })
      })
    }
  })
}
