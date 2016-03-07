function PeopleService($http) {
  'ngInject';

  const service = {};

  var people = [
    { name: 'Florens',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   true}]},
    { name: 'Christian',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   false},
                { mac:      '00-80-41-ae-fd-7e',
                  name:     'MacBook',
                  enabled:   true}]},
    { name: 'Stefan',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   false},
                { mac:      '00-80-41-ae-fd-7e',
                  name:     'MacBook',
                  enabled:   true}]},
    { name: 'Danny',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   false},
                { mac:      '00-80-41-ae-fd-7e',
                  name:     'MacBook',
                  enabled:   true}]},
    { name: 'Ute',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   false},
                { mac:      '00-80-41-ae-fd-7e',
                  name:     'MacBook',
                  enabled:   true}]},
    { name: 'Mark',
      devices: [{ mac:      '00-80-41-ae-fd-7e',
                  name:     'iPhone',
                  enabled:   false},
                { mac:      '00-80-41-ae-fd-7e',
                  name:     'MacBook',
                  enabled:   true}]}
    ];

  service.get = function() {
    return new Promise((resolve, reject) => {
      resolve(people);
    });
  };

  service.put = function(person) {
    return new Promise((resolve, reject) => {
      people.push(person);
      resolve(person);
    });
  };

  service.update = function(person) {
    return new Promise((resolve, reject) => {
      resolve(person);
    });
  };

  return service;

}

export default {
  name: 'PeopleService',
  fn: PeopleService
};
