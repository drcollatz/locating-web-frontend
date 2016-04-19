function NavigationCtrl(AppSettings) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.brand = AppSettings.appTitle;

}



export default {
  name: 'NavigationCtrl',
  fn: NavigationCtrl

};
