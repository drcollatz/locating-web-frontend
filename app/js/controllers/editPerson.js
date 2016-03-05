function EditPersonCtrl($stateParams) {
    'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'Edit Person';
  vm.person = $stateParams.person;

}

export default {
  name: 'EditPersonCtrl',
  fn: EditPersonCtrl
};
