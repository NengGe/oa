export default {
  set (name, val) {
    if (!val) return
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    window.sessionStorage.setItem(name, val)
  },
  get (name) {
    name = name || ''
    return window.sessionStorage.getItem(name) || 0
  },
  del (name) {
    name = name || ''
    window.sessionStorage.removeItem(name)
  }
}
