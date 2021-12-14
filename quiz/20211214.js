const arr1 = [
  ['id', 'name', 'age', 'status'],
  ['1', 'Hem', '26', 'indie'],
  ['2', 'Evan', undefined, 'Vue'],
  ['3', 'Dan', undefined, 'React']
]

const arr2 = [
  ['id', 'name', 'location'],
  ['1', 'Hem', 'Japan'],
  ['2', 'Evan', 'Singpore'],
  ['3', 'Dan', 'UK']
]

const process = (arr) => {
  const [headings, ...records] = arr

  return records.map(record => {
    const newRecord = {}

    for (const [idx, attr] of headings.entries()) {
      newRecord[attr] = record[idx] || ''
    }

    return newRecord
  })
}

const data = [...process(arr1), ...process(arr2)]

const merge = (data) => {
  const map = new Map()

  for (const item of data) {
    if(map.has(item.id)) {
      const newValue = {
        ...map.get(item.id),
        ...item
      }
      map.set(item.id, newValue)
      continue
    }

    map.set(item.id, item)
  }

  return [...map.values()]
}

console.table(merge(data))