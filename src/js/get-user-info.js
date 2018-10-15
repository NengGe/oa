import axios from '../modules/ajax-mid/index'
import msgSimple from '../modules/popup/msg-simple'
import preloaderFull from '../modules/preloader-full/preloader-full'
let userInfo = null
function getUserInfo () {
  return new Promise(function (resolve, reject) {
    if (userInfo === null) {
      preloaderFull.show()
      axios.get('/schoolorg/v1/getCurrUserInfo').then(({data}) => {
        if (data.status === 200) {
          userInfo = data.result.data
          resolve(userInfo)
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch(e => {
        msgSimple(e)
        reject(e)
      }).then(() => {
        preloaderFull.close()
      })
    } else {
      resolve(userInfo)
    }
  })
}

getUserInfo.set = function () {
  userInfo = null
}

export default getUserInfo
