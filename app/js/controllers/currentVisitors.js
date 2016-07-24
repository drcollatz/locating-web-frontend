function CurrentVisitorsCtrl(LocatingService, $interval, AppSettings) {
  'ngInject';
  var _ = require('lodash');
  // ViewModel
  const vm = this;
  vm.title = 'Current Visitors'
  let timeRange = AppSettings.currentVisitorTimeRange

  callAtInterval();
  $interval(callAtInterval, 15000)

  function callAtInterval() {
    LocatingService.get(timeRange, function(x) {
      let peopleLastSeen = _.map(x, p => _.assign(p, {
        lastSeen: _.chain(p.devices).map('lastSeen').max().value()
      }))

      vm.people = peopleLastSeen;
    });
  }

  vm.calculateOpacity = (lastSeen) => {
    let difference = vm.calculateMinutesSeen(lastSeen)
    let opacity = 1 - difference / (timeRange / 60)

    // return opacity > 0.2 ? _.ceil(opacity, 1) : 0.2
    return _.ceil(opacity, 1)
  }

  vm.calculateMinutesSeen = (lastSeen) => {
    let lastSeenDate = new Date(lastSeen)
    let now = new Date()

    return (now - lastSeenDate) / 60000

  }


  vm.transformDevices = function(devices) {
    let names = _.map(devices, 'device')
    return names.length < 2 ? _.head(names) : _.reduce(_.initial(names), (x, y) => x + ', ' + y) + ' and ' + _.last(names);

  }

}

export default {
  name: 'CurrentVisitorsCtrl',
  fn: CurrentVisitorsCtrl
};
