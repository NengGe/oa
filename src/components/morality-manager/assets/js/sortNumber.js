export default function (arr, word) {
  let temp
  let newarr = arr
  newarr.forEach(ele => {
    ele[word] = parseInt(ele[word])
    // console.log(ele.word)
  })
  for (var i = 0; i < newarr.length - 1; i++) {
    for (var j = i + 1; j < newarr.length; j++) {
      if (newarr[i][word] > newarr[j][word]) {
        temp = newarr[i]
        newarr[i] = newarr[j]
        newarr[j] = temp
      }
    }
  }
  return newarr
}
