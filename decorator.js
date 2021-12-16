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