function PeopleService($http) {
  'ngInject';

  const service = {};

  var people = [
    { name: 'Florens',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Christian',
      macs: ['00-80-41-ae-fd-7e','00-80-41-ae-fd-8e']},
    { name: 'Mark',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Stefan',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Danny',
      macs: ['00-80-41-ae-fd-7e']}
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
