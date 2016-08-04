function SetupPeopleCtrl($location, Person, LocatingService, AppSettings) {
  'ngInject';
  // ViewModel
  const vm = this;
  let timeRange = AppSettings.currentVisitorTimeRange

  vm.title = 'Setup people';
  var _ = require('lodash')

  let lastSeen = (locatingsByName, name) => {
    return _.chain(locatingsByName)
      .get(name + '.devices', [])
      .map('lastSeen')
      .max()
      .value()
  }


  let resolveStatus = lastSeen => {
    let now = new Date()
    let seen = new Date(lastSeen)
    let diff = now - seen
    return diff < (timeRange * 1000)
  }

  Person.query(x => {
    vm.people = x;
    LocatingService.getByName(60 * 60 * 24 * 30, function(byName) {
      vm.people = _.map(vm.people, p => _.assign(p, {
        lastSeen: lastSeen(byName, p.name),
        active: resolveStatus(lastSeen(byName, p.name))
      }))

    })

  })

  vm.openDetails = function(person) {
    if (person) {
      var id = person._links.self.href.split('/').pop();
      $location.path('/person/' + id);
    } else {
      $location.path('/person');
    }
  };

  vm.deletePerson = function(person) {
    person.remove(function() {
      vm.people.splice(vm.people.indexOf(person), 1);
    });
  };


  vm.updatePerson = function(person) {
    person.save();
  };


}

export default {
  name: 'SetupPeopleCtrl',
  fn: SetupPeopleCtrl
};
