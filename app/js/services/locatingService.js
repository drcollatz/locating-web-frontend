function LocatingService($http) {
  'ngInject';

  const service = {};

  var visitors = [
    { name: 'Florens',
      time: 10},
    { name: 'Christian',
      time: 2},
    { name: 'Mark',
      time: 31}
    ];

  service.get = function() {
    return new Promise((resolve, reject) => {
      resolve(visitors);
    });
  };

  return service;

}

export default {
  name: 'LocatingService',
  fn: LocatingService
};
