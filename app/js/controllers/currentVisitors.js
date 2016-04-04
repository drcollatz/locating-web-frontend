function CurrentVisitorsCtrl(LocatingService, $interval) {
  'ngInject';
  var _ = require('lodash');
  // ViewModel
  const vm = this;
  vm.title = 'Current Visitors';

  callAtInterval();
  $interval(callAtInterval, 15000);

  function callAtInterval() {
    LocatingService.get(function(x) {
      vm.people = x;
    });
  }


  vm.transformDevices = function(devices) {
    return devices.length < 2 ? _.head(devices) : _.reduce(_.initial(devices), (x, y) => x + ', ' + y) + ' and ' + _.last(devices);

  }

}

export default {
  name: 'CurrentVisitorsCtrl',
  fn: CurrentVisitorsCtrl
};
