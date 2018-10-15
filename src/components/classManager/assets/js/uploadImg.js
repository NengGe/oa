import { UploadFileList } from '@/js/file-upload.js'
export default function (context, imgUrl) {
  let needUpImgList = [] // 保存需要上传的图片
  let noUpImgList = [] // 保存已经上传的图片
  if (typeof imgUrl === 'string') {
    imgUrl = imgUrl.replace(/^\s*(.*?)\s*$/, '$1') // 去除前后空格
    imgUrl = imgUrl === '' ? [] : imgUrl.split(',')
  }
  for (let i = 0; i < imgUrl.length; i++) {
    if (imgUrl[i].indexOf('file://') > -1) {
      needUpImgList.push(imgUrl[i])
    } else {
      noUpImgList.push(imgUrl[i])
    }
  }
  // console.log(imgUrl)
  if (needUpImgList.length) { // 有需要上传的情况
    return UploadFileList(needUpImgList).then(dataList => {
      // console.log(dataList)
      if (dataList.length) {
        dataList = dataList.map(ele => {
          return ele.src
        })
        noUpImgList.push(...dataList)
        return noUpImgList.join(',')
      } else {
        context.$simpleMsg('图片上传失败，请重新提交')
        return Promise.reject(new Error('图片上传失败，请重新提交'))
      }
    })
  } else if (noUpImgList.length && !needUpImgList.length) { // 不需要上传的情况，直接调用后台保存接口 比如只是删除已经上传的图片
    // console.log(1111)
    return new Promise((resolve, reject) => {
      resolve(noUpImgList.join(','))
    })
  } else { // 无图片情况
    return new Promise((resolve, reject) => {
      resolve('')
    })
  }
}
