import Vue from 'vue'
import Spread from '@/js/OOP/spread'
Vue.directive('spread', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    const spread = new Spread(el)
    el.style.position = 'relative'
    const canvas = spread.createCanvas(el)
    let ctx = canvas.getContext('2d')
    el.addEventListener('click', e => {
      spread.draw(ctx, { x: e.offsetX, y: e.offsetY, radius: 500 })
    })
  }
})
