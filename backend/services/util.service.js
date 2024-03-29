module.exports = {
  makeId,
  getRandomInt,
  debounce,
  generateRandomName,
  timeAgo,
}

function makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomName() {
  const names = [
    'Jhon',
    'Wick',
    'Strong',
    'Dude',
    'Yep',
    'Hello',
    'World',
    'Power',
    'Goku',
    'Super',
    'Hi',
    'You',
    'Are',
    'Awesome',
  ]
  const famName = [
    'star',
    'kamikaza',
    'family',
    'eat',
    'some',
    'banana',
    'brock',
    'david',
    'gun',
    'walk',
    'talk',
    'car',
    'wing',
    'yang',
    'snow',
    'fire'
  ]
  return (
    names[Math.floor(Math.random() * names.length)] +
    famName[Math.floor(Math.random() * names.length)]
  )
}

function timeAgo(ms = new Date()) {
  const date = ms instanceof Date ? ms : new Date(ms)
  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  const timeUnits = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  const formatter = new Intl.RelativeTimeFormat('en')

  for (let timeUnit in timeUnits) {
    if (timeUnits[timeUnit] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / timeUnits[timeUnit]

      let time = formatter.format(Math.round(delta), timeUnit)
      if (time.includes('in')) {
        time = time.replace('in ', '')
        time = time.replace('ago', '')
        time += ' ago'
      }
      return time 
    }
  }
}