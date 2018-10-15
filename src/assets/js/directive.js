function argsDeal (el, binding) {
  if (!binding) return
  if (!binding.value) {
    binding.arg === 'border' && (el.style.border = '1px solid #cccccc')
    binding.arg === 'back' && (el.style.backgroundColor = 'rgba(236, 233, 233, 1)')
  } else {
    binding.arg === 'border' && (el.style.border = '')
    binding.arg === 'back' && (el.style.backgroundColor = '')
  }
}
export default function (Vue) {
  Vue.directive('gray', { // 该指令用于判断权限，置灰则表示无访问权限(学校德育管理)
    bind (el, binding) {
      // console.log(el)
      if (!binding.value) {
        el.style.color = '#cccccc'
        argsDeal(el, binding)
      }
    },
    update (el, binding) { // 当前组件更新
      if (binding.oldValue === binding.value) {
        return
      }
      if (!binding.value) {
        el.style.color = '#cccccc'
        argsDeal(el, binding)
      } else {
        el.style.color = ''
        argsDeal(el, binding)
      }
    }
  })
}
