// const delay = (t: number) => new Promise(r => setTimeout(r, t))

const loading: boolean = true
const age = 27

enum ActionEnum {
  UP = 0,
  DOWN = 1
}

const list: number[] = [1, 2, 3]
const list2: Array<string> = ['a', 'b', 'c']

interface UserProps {
  name: string;
  age: number;
}

type UserProps2 = UserProps & { isDone: boolean }

function getNumber(
  value?: number,
  defaultValue: number = 0
): number {
  return value || defaultValue
}

const _any: any = 2
const _unknown: unknown = 2 // * unknown -> top(all) type
const n: number = _any
// ! const n2: number = _unknown -> Type 'unknown' is not assignable to type 'number'.
const n3 = typeof _unknown === 'number' ? _unknown : -1

const fn = (param: unknown) => {
  const { log } = console
  switch (typeof param) {
    case 'number': 
      log(Math.round(param))
      break
    case 'string':
      log([...param].at(-1))
      break
    case 'object':
      if (Array.isArray(param)) log(param.push(1))
      break
    default:
      throw new Error('Invalid Type Error')
  }
}

/** Person Class */
interface Person {
  name: string;
  /** Age */
  age: number;
}
const a: Person = {
  name: 'a',
  age: 0
}

type IconProps = ReactElement | { url: string, onError: () => void }
const renderIcon = (icon: IconProps) => {
  if (isValidElement(icon)) return icon
  else if (typeof icon === 'object') return <div>xxx</div>
  else {
    // * never -> bottom(no) type
    const exhaustiveCheck: never = icon
    throw new Error(`Unknown Type: ${exhaustiveCheck}`)
  }
}
// * 🪛
// obtain the parameters of a function type in a tuple
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
// exclude from T those types that are assignable to U
type Exclude<T, U> = T extends U ? never : T
// extract from T those types that are assignable to U
type Extract<T, U> = T extends U ? T : never

const getArray = (arr: readonly number[]) => {
  console.log(arr[0])
  // ! arr.push(1) -> Error
}

interface UserInfo {
  birthday: string | null;
}
// ! const userInfo: UserInfo = {} -> Error

// * Assertions(avoid using)
const warn = (str: string) => { console.warn(str) }
const log = (msg: null | undefined | string) => {
  warn(msg!) // -> not null or undefined
}
{
  let n!: number
  i()
  console.log(2 * n)
  function i() {
    n = 2
  }
}
function Demo() {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    divRef.current!.scorllIntoView()
  }, [])
  return <div ref={divRef}>Demo</div>
}

const cb = document.getElementById('checkbox') as HTMLInputElement
console.log(cb.checked)
const btn = document.getElementById('button')
console.log((<HTMLButtonElement>btn).type)
interface TextareaProps {
  status?: 'normal' | 'error'
}
type TextareaPropsWithDefault = Required<TextareaProps>
class Textarea extends Component {
  static defaultProps = {
    status: 'normal'
  }
  get className() {
    const { status } = this.props as TextareaPropsWithDefault
    return {
      [`textarea-status-${status}`]: status
    }
  }
}
{
  const list = [new A(), new B(), new B()]
  function isA(item: A | B) {
    return item instanceof A
  }
  const result = list.filter(item => isA(item)) as A[]
}
const slots = {} as RowSlots
expect(h('div', {}, slots)).toMatchObject(createNode('div', {}, slots))
{
  interface Person {
    name: string;
    age: number;
  }
  const person = 'this is a string but not an object' as any as Person
}
const Status = {
  success: 1,
  error: 2
} as const
// ! Status.success = 0 -> Error

// * Guard
{
  function isA(item: A | B): item is A {
    return item instanceof A
  }
  const a = [new A(), new B()].filter(isA)
  console.info(a) // A[]
}

interface UserInfo {
  name: string;
  age: number;
  tel: string;
  address: {
    city: string;
    street: string;
  }
}
interface PreviewUserInfo {
  name: UserInfo['name']
  address: UserInfo['address']
}
type PreviewUserInfo2 = {
  [k in 'name' | 'address']: UserInfo[k]
}
type PreviewUserInfo3 = Pick<UserInfo, 'name' | 'address'>

const defaultOption = { timeout: 500 }
type Option = typeof defaultOption
// ! const option: Option = { timeout: '500' } -> Error

{
  interface User {
    name: string;
    age: number;
  }
  type UserKey = keyof User // "name" | "age" -> get interface's keys

  const user = { name: 'a', age: 2 }
  function getPersonInfo(key: keyof typeof user) {
    return user[key]
  }
  const userName = getPersonInfo('name')
}
{
  // batch convertion
  type Person = {
    name: string;
    age: number;
  }
  type TypeToNumber<T> = {
    [key in keyof T]: number
  }
  const obj: TypeToNumber<Person> = { name: 10, age: 10 }
}
{
  interface API {
    '/user': { name: string },
    '/menu': { foods: string[] }
  }
  const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
    return fetch(url).then(res => res.json())
  }
  get('/user').then(user => user.name)
}

// * Generics
// T/K/V/P/R -> Type/Key/Value/Property/Result
function reverse<T>(items: T[]): T[] {
  return items.reverse()
}
reverse<number>([1, 2, 3])

interface ButtonProps { size: 'md' | 'sm' }
const Button: React.FC<ButtonProps> // ? type PropsWithChildren<T> = T & { children?: ReactNode }
  = props => <button>{props.children}</button>

interface Result<T> {
  code: number,
  message: string,
  result: T
}
function fetchData(): Promise<Result<number>> {
  return get('/api/demo/number')
}
const { result } = await fetchData() // number
// * axios.get<T, Result>(url)

// ? pure n | s extends -> ===, obj -> narrow type
type result1 = 'a' extends 'abc' ? true : false // false
type result2 = 123 extends 1 ? true : false // false
type result3 = { a: true, b: false } extends { a: true } ? true : false // true

type ParamType<T> = T extends (...args: infer P) => any ? P : T
interface User {
  name: string;
  age: number;
}
type GetAge = (user: User) => void
const getAge: GetAge = (user) => {}
type A = ParamType<GetAge> // User
type B = ParamType<string> // string

// * Basic Generics Utilities
type User1 = { name: string }
type partialUser = Partial<User1> // => { name?: string }

type User2 = { name?: string }
type requiredUser = Required<User2> // => { name: string }

interface CatInfo {
  age: number;
  breed: string;
}
type CatName = 'miffy' | 'bob'
type CatMap = Record<CatName, CatInfo> // => { miffy: CatInfo, bob: CatInfo }

type Todo = { title: string, description: string, completed: boolean }
type TodoPreview = Pick<Todo, 'title' | 'completed'> // => { title: string, completed: boolean }
type TodoInfo = Omit<Todo, 'title' | 'completed'> // => { description: string }

type T0 = Exclude<'a' | 'b' | 'c', 'a'> // => 'b' | 'c'
type T1 = Extract<'a' | 'b' | 'c', 'a'> // => 'a'

type SumFunc = (a: number, b: number) => number
const sum: SumFunc = (a, b) => a + b
type T2 = Parameters<SumFunc> // => [a: number, b: number]
type T4 = ReturnType<typeof sum> // => number
{
  class A {
    constructor(a: number, b: number) {}
  }
  type T3 = ConstructorParameters<typeof A> // => [a: number, b:number]
}
