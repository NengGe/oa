// 放大看图
import click from '@/modules/corejs/dom/click'
import pictureZoomPopup from '@/modules/zoom-touch/picture-zoom-popup'

click(document.body, function (e) {
  let {target} = e
  if (target.tagName === 'IMG' && target.dataset.type === '1') {
    // 放大看图
    pictureZoomPopup(target.src)
  }
})
