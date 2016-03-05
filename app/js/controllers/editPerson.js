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

}

export default {
  name: 'EditPersonCtrl',
  fn: EditPersonCtrl
};
