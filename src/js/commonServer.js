function getCurrUserInfo () {
  return this.$axios.get(`/schoolorg/v1/getCurrUserInfo`).then(({data}) => {
    if (data.status === 200) {
      let userInfo = data.result.data
      userInfo.isXiLi = userInfo.campus_id === '4892271197889314468'
      return userInfo
    } else {
      return data
    }
  })
}
export {
  getCurrUserInfo
}
