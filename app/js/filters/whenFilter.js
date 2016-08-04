function WhenFilter() {

  return function(str) {

    if (!str) {
      return 'never'
    }

    var _ = require('lodash')

    let calculateMinutesSeen = (lastSeen) => {
      let lastSeenDate = new Date(lastSeen)
      let now = new Date()
      return (now - lastSeenDate) / 60000

    }

    let minutes = _.floor(calculateMinutesSeen(str))
    let hours = _.floor(minutes / 60)
    let days = _.floor(hours / 24)

    if (days > 0) {
      return days > 1 ? days + ' days ago' : '1 day ago'
    } else if (hours > 0) {
      return hours > 1 ? hours + ' hours ago' : '1 hour ago'
    } else {
      return minutes < 1 ? 'just now' : minutes < 2 ? '1 minute ago' : minutes + ' minutes ago'
    }
  };

}

export default {
  name: 'WhenFilter',
  fn: WhenFilter
};
