/**
 * 间隔反复尝试执行，直到返回 false
 * 可实现监听某对象是否加载成功
 *
 * 第一次会同步立马执行
 *
 * */

function excu (cb, time) {
  if (cb() === false) {
    return
  }
  setTimeout(function () {
    // if (cb() !== false) {
    excu(cb, time)
    // }
  }, time)
}

export default function excuIntervalTry (cb, time = 400) {
  excu(cb, time)
}
