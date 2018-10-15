import Vue from 'Vue'
let $vue = new Vue()
export default function (url) {
  $vue.$preloaderFull.show({ mask: true })
  return $vue.$axios.get(url).then(({ data }) => {
    $vue.$preloaderFull.close()
    if (data.status === 200) {
      return data.result
    } else {
      return Promise.reject(new Error(data.message))
    }
  }).catch((erro) => {
    $vue.$preloaderFull.close()
    console.log(erro)
  })
}
