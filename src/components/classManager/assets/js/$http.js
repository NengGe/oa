export default {
  getData (context, url) {
    context.$preloaderFull.show({ mask: true })
    return context.$axios.get(url).then(({ data }) => {
      // console.log(data)
      context.$preloaderFull.close()
      if (data.status === 200) {
        // context.$toast.success()
        return data.result
      } else {
        return Promise.reject(new Error(data.message))
      }
    }).catch((erro) => {
      context.$preloaderFull.close()
      console.log(erro)
    })
  },
  postData (context, url, data, fn) {
    context.$preloaderFull.show({ mask: true })
    return context.$axios.post(url, data).then(({data}) => {
      // console.log(data.status === 200)
      context.$preloaderFull.close()
      if (data.status === 200) {
        // console.log(data)
        fn && fn(data.result || '')
        // return data.result
        // context.$toast.success('保存成功!')
      } else {
        return Promise.reject(new Error(data.message))
      }
    }).catch((err) => {
      context.$preloaderFull.close()
      // context.$toast.error('保存失败!')
      console.log(err)
    })
  },
  deleteDataGet (context, url, fn) { // 删除get
    context.$preloaderFull.show({ mask: true })
    return context.$axios.get(url).then(({ data }) => {
      // console.log(data)
      context.$preloaderFull.close()
      if (data.status === 200) {
        context.$toast.success()
        fn && fn()
        return data.result
      } else {
        context.$toast.error('删除失败！')
        return Promise.reject(new Error(data.message))
      }
    }).catch((erro) => {
      context.$preloaderFull.close()
      context.$toast.error('删除失败！')
      console.log(erro)
    })
  },
  preserveDataPost (context, url, data, fn) { // 保存
    context.$preloaderFull.show({ mask: true })
    return context.$axios.post(url, data).then(({data}) => {
      // console.log(data.status === 200)
      context.$preloaderFull.close()
      if (data.status === 200) {
        // console.log(data)
        fn && fn()
        context.$toast.success()
      } else {
        context.$toast.error('保存失败!')
        return Promise.reject(new Error(data.message))
      }
    }).catch((err) => {
      context.$preloaderFull.close()
      context.$toast.error('保存失败!')
      console.log(err)
    })
  },
  deleteDataPost (context, url, data, fn) { // 保存
    context.$preloaderFull.show({ mask: true })
    return context.$axios.post(url, data).then(({data}) => {
      // console.log(data.status === 200)
      context.$preloaderFull.close()
      if (data.status === 200) {
        // console.log(data)
        fn && fn()
        context.$toast.success()
      } else {
        context.$toast.error('删除失败!')
        return Promise.reject(new Error(data.message))
      }
    }).catch((err) => {
      context.$preloaderFull.close()
      context.$toast.error('删除失败!')
      console.log(err)
    })
  }
}
