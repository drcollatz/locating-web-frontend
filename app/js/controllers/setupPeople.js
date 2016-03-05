function SetupPeopleCtrl($location, PeopleService) {
    'ngInject';
  // ViewModel
  const vm = this;

  vm.title = 'Setup';

  PeopleService.get().then(x => {
    vm.people = x;
  });

  vm.openDetails = function ( person ) {
    if(person){
      $location.path("/person/"+angular.toJson(person));
    }else{
      $location.path("/person");
    }
  };
}

export default {
  name: 'SetupPeopleCtrl',
  fn: SetupPeopleCtrl
};
