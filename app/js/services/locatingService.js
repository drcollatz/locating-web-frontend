function LocatingService($http, Signal, Person) {
  'ngInject';

  var _ = require('lodash');
  const service = {};

  service.get = function(timeRange, callback) {
    var start = new Date();
    start.setSeconds(start.getSeconds() - timeRange);
    var end = new Date();

    Person.getByDevices().then(function(resolvedMacs) {
      Signal.queryByDateAndMacs(start, end, Object.keys(resolvedMacs), x => {

        var devicesByUser = {};
        let macs = _.chain(x)
          .map('mac')
          .uniq()
          .map(m => _.get(resolvedMacs, m))
          .map(d => _.assign(d, {
            lastSeen: _.chain(x).filter(m => m.mac == d.mac).maxBy('timestamp').get('timestamp').value()
          }))
          .groupBy('name')
          .mapValues((val, key, object) => {
            return {
              name: key,
              devices: _.omit(val, 'name')
            }
          })
          .values()
          .value()

        callback(macs)

      });
    });

  };

  return service;

}

export default {
  name: 'LocatingService',
  fn: LocatingService
};
