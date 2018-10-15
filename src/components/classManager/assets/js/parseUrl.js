export default function (obj, str = '?') { // 用于将对象转化为url参数
  let args = ''
  if (typeof obj === 'object') {
    let len = Object.keys(obj).length
    if (!len) return
    for (var key in obj) {
      args += `&${key}=${obj[key]}`
    }
    args = str + args.substring(1, args.length)
  }
  return args
}
