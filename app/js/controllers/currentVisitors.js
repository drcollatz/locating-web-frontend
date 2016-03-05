function CurrentVisitorsCtrl(LocatingService) {
    'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'Current Visitors';

  LocatingService.get().then(x => {
    vm.people = x;
  })

}

export default {
  name: 'CurrentVisitorsCtrl',
  fn: CurrentVisitorsCtrl
};
