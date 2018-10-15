export default {
  set (name, val) {
    if (!val) return
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    }
    window.localStorage.setItem(name, val)
  },
  get (name) {
    name = name || ''
    return window.localStorage.getItem(name)
  },
  del (name) {
    name = name || ''
    window.localStorage.removeItem(name)
  }
}
