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

const frequencies = (arr) => arr.reduce((a, v) => {
  a[v] = a[v] ? a[v] + 1 : 1
  return a
}, {})

// * hooks
const useInterval = (callback, delay) => {
  const savedCallback = React.useRef()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    const tick = () => { savedCallback.current() }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const createApi = (url) => {
  return new Proxy({}, {
    get(target, key) {
      return async function(id="") {
        const response = await fetch(`${url}/${key}/${id}`)

        if(response.ok) {
          return response.json()
        }
        return Promise.resolve({ error: "Malformed Request" })
      }
    }
  })
}

const api = createApi('https://jsonplaceholder.typicode.com')
const todos = await api.todos()
const firstTodo = await api.todos(1)