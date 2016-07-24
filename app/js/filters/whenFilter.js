function WhenFilter() {

  return function(str) {
    var _ = require('lodash')

    let minutes = parseFloat(str)
    return minutes < 1 ? 'just now' : minutes < 2 ? '1 minute ago' : _.floor(minutes) + ' minutes ago'
  };

}

export default {
  name: 'WhenFilter',
  fn: WhenFilter
};
