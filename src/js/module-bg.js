let bgArr = [
  '#f8be6c', '#9988ff', '#50dae3', '#fb6bae', '#6bb7f8', '#ff9393',
  '#f2c94f', '#6cb7f8', '#76d28e', '#6fb8f8', '#00cfe9', '#5abe74'
]

function randomsort (a, b) {
  return Math.random() > 0.5 ? -1 : 1
}

export default function getRandomBg () {
  let arr = bgArr.sort(randomsort)
  return arr
}
