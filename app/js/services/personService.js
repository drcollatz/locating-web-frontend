function PersonService($http, SpringDataRestAdapter, Config) {
  'ngInject';

  var _ = require('lodash');



  function Person(person) {
    if (person._resources) {
      person.resources = person._resources('self', {}, {
        update: {
          method: 'PUT'
        }
      });
      person.save = function(callback) {
        person.resources.update(person, function() {
          callback && callback(person);
        });
      };

      person.remove = function(callback) {
        person.resources.remove(function() {
          callback && callback(person);
        });
      };
    } else {
      person.save = function(callback) {
        Person.resources.save(person, function(item, headers) {
          var deferred = $http.get(headers().location);
          return SpringDataRestAdapter.process(deferred).then(function(newPerson) {
            callback && callback(new Person(newPerson));
          });
        });
      };
    }

    return person;
  }

  Person.query = function(callback) {
    var deferred = $http.get(Config.get('apiUrl') + '/people');
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      Person.resources = data._resources('self');
      callback && callback(_.map(data._embeddedItems, function(item) {
        return new Person(item);
      }));
    });
  };

  Person.get = function(id, callback) {
    var deferred = $http.get(Config.get('apiUrl') + '/people/' + id);
    return SpringDataRestAdapter.process(deferred).then(function(data) {
      callback && callback(new Person(data));
    });
  };

  Person.getByDevices = (showAll = true) => {
    return new Promise((resolve, reject) => {
      Person.query(persons => {
        let byDevices = _(persons).chain()
          .flatMapDeep(p => _.map(p.devices, d => {
            return {
              name: p.name,
              device: d.name,
              mac: d.mac,
              enabled: d.enabled
            }
          }))
          .filter(x => showAll || x.enabled)
          .keyBy('mac')
          .value()

        resolve(byDevices);
      });
    });
  }

  Person.resources = null;
  Person.query();
  return Person;

}

export default {
  name: 'Person',
  fn: PersonService
};
