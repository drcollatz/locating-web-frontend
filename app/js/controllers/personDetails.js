function PersonDetailsCtrl($stateParams, $location, Person, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;
  var id = $stateParams.id;

  var update = false;

  if (id) {
    Person.get(id, function(person){
      vm.person = person;
    });
    vm.title = 'Edit Person';
    update = true;
  } else {
    vm.title = 'New Person';
    vm.person = Person({
      name: "",
      mac: "",
      devices: []
    });
  }

  vm.save = function() {
    vm.person.save(function(person) {
      vm.close();
    });
  }

  vm.close = function() {
    $location.path("/people");
  }

  vm.addDevice = function() {
    var device = {
      name: vm.newName,
      mac: vm.newMac
    };

    if (!vm.person.devices) {
      vm.person.devices = [];
    }
    vm.person.devices.push(device);
    vm.newName = null;
    vm.newMac = null;
  }

  vm.deleteDevice = function(device) {
    vm.person.devices.splice(vm.person.devices.indexOf(device), 1);
  }

}

export default {
  name: 'PersonDetailsCtrl',
  fn: PersonDetailsCtrl
};
