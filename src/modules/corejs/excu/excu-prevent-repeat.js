export default function excuPreventRepeat (func, time = 300) {
  if (func.status) return
  func.status = true
  func()
  setTimeout(() => {
    func.status = false
  }, time)
}
