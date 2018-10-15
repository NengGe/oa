/**
 * getUrlSearch
 * 取 url search 参数值
 *
 * @return 没有返回null
 * */
export default function (name, search) {
  let reg = new RegExp(name + '=([^&]+)')
  let match = reg.exec(search)

  if (match) {
    return match[1]
  }
  return match
}
