/**
 * stage 1: https://github.com/tc39/proposals/blob/main/stage-1-proposals.md
 * finished: https://github.com/tc39/proposals/blob/main/finished-proposals.md
 */

const arr = [0, 1, 2, 3]

// * at
const getLastArrayItem = (arr) => arr.at(-1)

// * array group
Array.prototype.groupBy = function(callback) {
  const object = {}
  for(let i = 0; i < this.length; i++) {
    const key = callback(this[i], i, this)
    if(object[key]) {
      object[key].push(this[i])
    } else {
      object[key] = [this[i]]
    }
  }
  return object
}
Array.prototype.groupByToMap = function(callback) {
  const map = new Map()
  for(let i = 0; i < this.length; i++) {
    const key = callback(this[i], i, this)
    if(map.get(key)) {
      map.get(key).push(this[i])
    } else {
      map.set(key, [this[i]])
    }
  }
  return map
}
arr.groupBy((i, idx, arr) => i > 2 ? 'more than 2' : 'less than 2')
arr.groupByToMap((i, idx, arr) => i > 2 ? 'more than 2' : 'less than 2')

// * array find from last
;[...arr].reverse().find(i => i % 2 === 1)
arr.findLast(i => i % 2 === 1)
Array.prototype.findLast = function(callback) {
  const len = this.length
  for(let i = len - 1; i > 0; i--) {
    if(callback(this[i], i, this)) return this[i]
  }
  return -1
}
