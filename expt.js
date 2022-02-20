const emptyArray = [null, undefined, false, 0, 0n, NaN, "", '', ``].filter(Boolean)

// (??) is a special case of (||)
const notNullish = null ?? undefined ?? {}

class Day {
  #days = ['日', '月', '火', '水', '木', '金', '土']

  which(idx = null) {
    return this.#days[idx || new Date().getDay()]
  }
}

class GoldDay extends Day {
  #idx = 5
  
  constructor () {
    super() // Day.prototype.constructor.call(this)
  }

  print () {
    console.log('%c' + super.which(this.#idx), 'color: gold')
  }
}

new GoldDay().print()

const q = 
  new Proxy(
    new URLSearchParams(search), 
    { get: (params, prop) => params.get(prop) }
  )

$=_=>$>_ // `${$}`