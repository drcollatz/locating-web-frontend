function LocatingService($http, Signal, Person) {
  'ngInject';

  var _ = require('lodash');
  const service = {};



  var getMacs = function() {
    var personByMac = {};
    return new Promise((resolve, reject) => {
      Person.query(x => {
        _.forEach(x, person => {
          var enabledDevices = (_.filter(person.devices, d => d.enabled));
          _.forEach(enabledDevices, device => {
            var entry = {
              name: person.name,
              device: device.name
            }
            personByMac[device.mac] = entry;
          });
        });
        resolve(personByMac);
      });
    });
  };


  service.get = function(callback) {
    var start = new Date();
    start.setSeconds(start.getSeconds() - 60 * 20);
    var end = new Date();

    getMacs().then(function(resolvedMacs) {

      Signal.queryByDateAndMacs(start, end, Object.keys(resolvedMacs), x => {
        var macs = _.uniq(_.map(x, sig => sig.mac));

        var devicesByUser = {};
        _.forEach(macs, mac => {
          if (!devicesByUser[resolvedMacs[mac].name]) {
            var devices = [];
            devices.push(resolvedMacs[mac].device);
            devicesByUser[resolvedMacs[mac].name] = devices;
          } else {
            devicesByUser[resolvedMacs[mac].name].push(resolvedMacs[mac].device);
          }
        });

        var transformed = _.map(_.keys(devicesByUser), u => {
          var result = {
            name: u,
            devices: devicesByUser[u]
          }
          return result;
        });

        callback(transformed);


      });

    });

  };

  return service;

}

export default {
  name: 'LocatingService',
  fn: LocatingService
};
