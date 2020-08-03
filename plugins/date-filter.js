import Vue from 'vue'

Vue.filter('date', (value) => {
  let date = value
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.toLocaleString('pl-PL', {
    // weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'numeric',
  })
})
