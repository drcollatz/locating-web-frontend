function ConfigService($http) {
  'ngInject';

  const service = {};


  var _environments = {
      dev: {
        host: 'localhost:3000',
        config: {
          backendUrl: 'http://localhost:8080',
          apiUrl: 'http://localhost:8080'
        }
      }
    },
    _environment;


  service.getEnvironment = function() {
    var host = window.location.host;

    if (_environment) {
      return _environment;
    }

    for (var environment in _environments) {
      if (typeof _environments[environment].host && _environments[environment].host == host) {
        _environment = environment;
        return _environment;
      }
    }

    return {
      config: {
        backendUrl: '',
        apiUrl: ''
      }
    };
  }

  service.get = function(property) {
    return _environments[service.getEnvironment()].config[property];
  }


  return service;

}

export default {
  name: 'Config',
  fn: ConfigService
};
