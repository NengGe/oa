const fs = require('fs-extra')
const path = require('path')

module.exports = function findRemove (dir, condition) {
  let dirList = fs.readdirSync(dir)

  dirList.forEach((name) => {
    if (condition.test(name)) {
      fs.removeSync(path.resolve(dir, name))
    }
  })
}
