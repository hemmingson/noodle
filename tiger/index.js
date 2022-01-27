console.log('🐅 year')

// enum
const $ = Object.freeze({
  Remix: 0,
  'Three.js': 1,
  Rust: 2
})

class Dev {
  energy = 100

  eat() {
    console.log(this.energy)
    this.energy + 50
    return this
  }

  code() {
    this.energy = 105
    return this
  }

  sleep() {
    this.energy = 0
    return this
  }
}
let hem = new Dev()
hem
  .code()
  .eat()
  .code()
  .sleep()
  .eat()

hem = {
  age: 26,
  lang: 'Rust'
}
let age, lang
({ age, lang } = hem)