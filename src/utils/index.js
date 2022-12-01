
export function sortAddress(addr) {
  if (addr) return `${addr.slice(0, 5)}...${addr.slice(addr.length - 5)}`;
  return null;
}

export const getDateDiff = (startDate, endDate) => {
  var delta = Math.abs(endDate - startDate) / 1000

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400)
  delta -= days * 86400

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  // what's left is seconds
  var seconds = parseInt(delta % 60) // in theory the modulus is not required

  var difference = endDate - startDate
  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24)
  if (daysDifference < 0) {
    return {
      d: 0,
      h: 0,
      m: 0,
      s: 0,
    }
  } else {
    return {
      d: days,
      h: hours,
      m: minutes,
      s: seconds,
    }
  }
  // return ` ${days} day(s)
  // ${hours} h ${minutes} m ${seconds} s`
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  } else {
    return false
  }
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0'
}


