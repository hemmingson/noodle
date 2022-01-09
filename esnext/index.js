/**
 * stage 1: https://github.com/tc39/proposals/blob/main/stage-1-proposals.md
 * finished: https://github.com/tc39/proposals/blob/main/finished-proposals.md
 */

const arr = [0, 1, 2, 3]

const getLastArrayItem = (arr) => arr.at(-1)

arr.groupBy((i) => i > 2 ? 'more than 2' : 'less than 2')
Array.prototype.groupBy = function(callback) {
  const object = {}
  for(let i = 0; i < this.length; i++) {
    let key = callback(this[i], i, this)
    if(object[key]) {
      object[key].push(this[i])
    }else {
      object[key] = [this[i]]
    }
  }
  return object
}