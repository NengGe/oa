// 给 app 调用的方法
window.oajs = {
  logined ({userId}) {
    window.GLOBAL_PARAMS.userId = userId
  }
}
