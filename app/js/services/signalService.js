function SignalService($http, SpringDataRestAdapter, AppSettings) {
  'ngInject';

  var _ = require('lodash');

  function Signal(signal) {
    if (signal._resources) {
      signal.resources = signal._resources('self', {}, {
        update: {
          method: 'PUT'
        }
      });
      signal.save = function(callback) {
        signal.resources.update(signal, function() {
          callback && callback(signal);
        });
      };

      signal.remove = function(callback) {
        signal.resources.remove(function() {
          callback && callback(signal);
        });
      };
    } else {
      signal.save = function(callback) {
        Signal.resources.save(signal, function(item, headers) {
          var deferred = $http.get(headers().location);
          return SpringDataRestAdapter.process(deferred).then(function(newSignal) {
            callback && callback(new Signal(newSignal));
          });
        });
      };
    }

    return signal;
  }

  Signal.queryByDateAndMacs = function(start, end, macs, callback) {


    var config = {
      params: {
        start: start.toISOString(),
        end: end.toISOString(),
        macs: macs
      }

    };

    var deferred = $http.get(AppSettings.apiUrl + '/signals/search/findByTimestampBetweenAndMacIn', config);
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      Signal.resources = data._resources('self');
      callback && callback(_.map(data._embeddedItems, function(item) {
        return new Signal(item);
      }));
    });
  };

  Signal.query = function(callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/signals');
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      Signal.resources = data._resources('self');
      callback && callback(_.map(data._embeddedItems, function(item) {
        return new Signal(item);
      }));
    });
  };

  Signal.get = function(id, callback) {
    var deferred = $http.get(AppSettings.apiUrl + '/signals/' + id);
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      callback && callback(new Signal(data));
    });
  };

  Signal.resources = null;
  Signal.query();
  return Signal;

}

export default {
  name: 'Signal',
  fn: SignalService
};
