const { ceil, abs } = Math
const { parse, now } = Date

const millisecondsOfDay = parse('1970-01-02')
const birthday = {
  year: 1995,
  monthIndex: 10,
  hours: 8,
  minutes: 22,
}

const dev = ({ lang = 'javascript', ui, isFullStack = false, birthday }) => ({
  age: `\u{1f525} ${ceil(
    abs(now() - new Date(...Object.values(birthday)).getTime()) /
      millisecondsOfDay
  )} days`,
  lang,
  ui,
  '\u{1f4b0}': isFullStack,
})

const hem = dev({ ui: '\u269b\ufe0f', isFullStack: true, birthday })
