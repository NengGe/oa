function promise (excu) {
  return new Promise(function (resolve) {
    let filePath
    let SelectFileNum = 0 // 多选--记录选中文件数量
    let SelectFileList = [] // 多选--文件列表
    // 返回本地路径
    window.SelectFile = function (path) { // 单选--回调
      filePath = 'file://' + path
      window.oa.SaveFile('UploadFileCallback', path, checkFileType(path))
    }
    window.UploadFileCallback = function ({src: fileUrl, size}) { // 单选上传--回调
      // let {src: fileUrl, size} = params
      resolve({filePath, fileUrl, size})
    }
    window.SelectFileSingle = function (path) { // 单选--回调
      let filePath = 'file://' + path
      resolve([filePath])
    }
    window.SelectFileMulti = function (pathArrJson) { // 多选--回调
      let pathArr = JSON.parse(pathArrJson)
      let list = pathArr.map(path => {
        return 'file://' + path
      })
      resolve(list)
    }
    window.UploadFileCallbackMulti = function ({src: fileUrl, size}) {
      // let {src: fileUrl, size} = params
      let picInfo = {filePath, fileUrl, size}
      // cb && cb(picInfo)
      SelectFileList.push(picInfo)
      SelectFileNum--
      if (SelectFileNum === 0) {
        resolve(SelectFileList)
      }
    }
    window.UploadFileListCallback = function (status) { // 列表上传--回调
      resolve(status)
    }
    excu()
  })
}
// 相册
function dialogSelect () {
  return promise(() => { window.oa.DialogSelect('SelectFile', '') })
}

// 相机
function openCameraPhoto () {
  return promise(() => { window.oa.OpenCameraPhoto('SelectFileSingle', '') })
}
// function openCameraPhoto () {
//   return promise(() => { window.oa.OpenCameraPhoto('SelectFile', '') })
// }

// 图片多选
function openCameraPhotoMulti () {
  return promise(() => { window.oa.openCameraPhotoMulti('SelectFileMulti', '') })
}

// 视频
function openCameraVideo () {
  return promise(() => { window.oa.OpenCameraVideo('SelectFile', '') })
}

// 上传文件列表
function UploadFileList (fileList) {
  let list = fileList.map(path => {
    return {
      path: path,
      type: checkFileType(path)
    }
  })
  return promise(() => { window.oa.UploadFileList('UploadFileListCallback', JSON.stringify(list)) })
}

// 查看图片
function lookUpPicture (picList, index) {
  let picListTOjson = JSON.stringify(picList)
  return promise(() => { window.oa.lookUpPicture(picListTOjson, index) })
}

// function saveFile() {
//    var filePath = $("#filePath").text();
//    window.oa.SaveFile('UploadFileCallback', filePath, checkFileType(filePath));
// }

function checkFileType (filePath) {
  // 返回String对象中子字符串最后出现的位置.
  let seat = filePath.lastIndexOf('.')
  // 返回位于String对象中指定位置的子字符串并转换为小写.
  let extension = filePath.substring(seat).toLowerCase()

  let imagAllowed = ['.jpg', '.gif', '.png', '.jpeg']
  for (let i = 0; i < imagAllowed.length; i++) {
    if (imagAllowed[i] === extension) {
      return '41'
    }
  }

  let documentAllowed = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.ppt', '.pptx', '.rar', '.zip']
  for (let i = 0; i < documentAllowed.length; i++) {
    if (documentAllowed[i] === extension) {
      return '31'
    }
  }

  let videoAllowed = ['.flv', '.3gp', '.avi', '.rmvb', '.rm', '.divx', '.mpg', '.mpeg', '.mpe', '.wmv', '.mp4', '.mkv', '.vob']
  for (let i = 0; i < videoAllowed.length; i++) {
    if (videoAllowed[i] === extension) {
      return '11'
    }
  }

  let soundAllowed = ['.cd', '.ogg', '.mp3', '.asf', '.wma', '.wav', '.mp3pro', '.midi', '.vqf']
  for (let i = 0; i < soundAllowed.length; i++) {
    if (soundAllowed[i] === extension) {
      return '21'
    }
  }
  return '51'
}

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-func-assign */
  dialogSelect = function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          filePath: 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg',
          fileUrl: 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg',
          size: '600'
        })
      }, 600)
    })
  }

  openCameraPhoto = function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let filePath = 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg'
        resolve([filePath])
      }, 600)
    })
  }

  openCameraVideo = function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          filePath: 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg',
          fileUrl: 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg',
          size: '600'
        })
      }, 600)
    })
  }
  openCameraPhotoMulti = function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let picInfo = 'https://img1.360buyimg.com/da/jfs/t13834/306/1467904705/96371/2490bbb9/5a211009N1468b1a9.jpg'
        let imgList = []
        imgList.push(picInfo)
        console.log('resolve-imgList', imgList)
        resolve(imgList)
      }, 600)
    })
  }
  UploadFileList = function (imgs) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        let imgList = imgs.map(path => {
          return {
            src: path,
            size: '600',
            name: path.match(/[^/]+$/)[0]
          }
        })
        resolve(imgList)
      }, 600)
    })
  }

  lookUpPicture = function (picList, index) {
    return new Promise(function (resolve) {

    })
  }
}

export {
  dialogSelect,
  openCameraPhoto,
  openCameraVideo,
  openCameraPhotoMulti,
  lookUpPicture,
  UploadFileList,
  checkFileType
}
