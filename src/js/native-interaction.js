function OpenScan () { // 打开扫一扫功能 回调传回扫到数据
  return new Promise((resolve, reject) => {
    window.oa.OpenScan('getQRCodeData')
    window.getQRCodeData = function (d) {
      resolve(d)
    }
  })
}

export {
  OpenScan
}
