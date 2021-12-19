console.log('{ \u{1f9ab} }')

const hem = {
  age: 26,
  job: 'full-stack dev',
  fav: 'javascript'
}

//#region javascript
// read-only
// Object.defineProperty(hem, 'fav', { writable: false })

const { getOwnPropertyDescriptor: getDesc, defineProperty: upsertProp } = Object
//@ts-ignore
function decorate ( o, prop, fn ) {
  const desc = getDesc(o, prop)
  upsertProp(o, prop, fn(desc))
}

decorate(hem, 'fav', (desc) => {
  desc.writable = false
  return desc
})

hem.fav = 'golang'

console.table(Object.getOwnPropertyDescriptor(hem, 'fav'))

class Dev {
  constructor(age = 23) {
    this.age = age
  }

  isSE() {
    console.log(this.age >= 26)
  }
}

function readOnlyDecorator ( target, key, descriptor ) {
  return {
    ...descriptor,
    writable: false
  }
}

class Hem extends Dev {
  @readOnlyDecorator age = 26

  constructor(exp) {
    super()
    this.exp = exp
  }
}

const me = new Hem(3.5)
me.age = 23
console.log(me)
//#endregion

// 0. using closure to log how many times a function is called
let sum = (...args) => args.reduce((acc, num) => acc + num)

const callCounter = (fn) => {
  let count = 0

  return (...args) => {
    // write to logs, console, db, etc
    console.log(`sum has been called ${count += 1} times`)
    return fn(...args)
  }
}

sum = callCounter(sum)

// 1. check for valid data and number of params
let rectangleArea = (length, width) => length * width

const countParams = (fn) => (...params) => 
  params.length !== fn.length
    ? (() => { throw new Error(`Incorrect number of parameters`) })()
    : fn(...params)

const requireIntegers = (fn) => (...params) => {
  params.forEach(param => !Number.isInteger(param) && (() => { throw new TypeError(`Params must be integers`) })())

  return fn(...params)
}

rectangleArea = requireIntegers(countParams(rectangleArea))

rectangleArea(20, 30)

function getBody (fn) {
  const entire = fn.toString();
  
  return entire.substring(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
}

// decorate async api call
let requestData = async (url) => {
  try {
    return await (await fetch(url)).json()
  } catch (err) {
    console.log(err)
  }
}

const dataResponseTime = (fn) => async (url) => {
  console.time('api')
  const data = await fn(url)
  console.timeEnd('api')
  return data
}