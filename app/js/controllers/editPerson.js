function EditPersonCtrl($stateParams, $location, PeopleService, $scope) {
    'ngInject';

  // ViewModel
  const vm = this;
  vm.person = $stateParams.person;

  var update = false;

  if(vm.person){
    vm.title = 'Edit Person';
    update = true;
  }else{
    vm.title = 'New Person';
  }

  vm.save = function(){
    if(!update){
      PeopleService.put(vm.person).then(x => {
        vm.close();
        $scope.$apply();
      });

    }else{
      PeopleService.update(vm.person).then(x => {
        vm.close();
        $scope.$apply();
      });
    }
  }

  vm.close = function(){
    $location.path("/people");
  }

  vm.addDevice = function(){
    var device = {  name: vm.newName,
                    mac:  vm.newMac
                  };

    if(!vm.person.devices){
      vm.person.devices = [];
    }
    vm.person.devices.push(device);
    vm.newName = null;
    vm.newMac = null;
  }

  vm.deleteDevice = function(device){
    vm.person.devices.splice(vm.person.devices.indexOf(device), 1);
  }



}

export default {
  name: 'EditPersonCtrl',
  fn: EditPersonCtrl
};
