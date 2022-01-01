const timeDifference = (previous: Date, current = new Date()): string => {
  const currentMs = current.getTime()
  const previousMs = previous.getTime()
  const differenceMs = currentMs - previousMs
  const seconds = Math.round(differenceMs / 1000)
  const minutes = Math.round(seconds / 60)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)
  const months = Math.round(days / 30)
  const years = Math.round(months / 12)

  if (seconds < 45) {
    return 'few secs ago'
  } else if (seconds < 90) {
    return 'a min ago'
  } else if (minutes < 45) {
    return minutes + ' mins ago'
  } else if (minutes < 90) {
    return 'an hour ago'
  } else if (hours < 24) {
    return hours + ' hours ago'
  } else if (hours < 42) {
    return 'a day ago'
  } else if (days < 30) {
    return days + ' days ago'
  } else if (days < 45) {
    return 'a month ago'
  } else if (days < 365) {
    return months + ' months ago'
  } else if (years < 1.5) {
    return 'a year ago'
  } else {
    return years + ' years ago'
  }
}

export default timeDifference
