function SetupPeopleCtrl($location, Person) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.title = 'Setup people';

  Person.query(x => {
    vm.people = x;
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
