function CurrentVisitorsCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'Current Visitors';

  vm.people = [
    { name: 'Florens',
      time: 10},
    { name: 'Adriana',
      time: 2},
    { name: 'Mark',
      time: 31}
    ];

}

export default {
  name: 'CurrentVisitorsCtrl',
  fn: CurrentVisitorsCtrl
};
