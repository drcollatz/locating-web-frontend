function SetupPeopleCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'Setup people to detect';

  vm.people = [
    { name: 'Florens',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Christian',
      macs: ['00-80-41-ae-fd-7e','00-80-41-ae-fd-8e']},
    { name: 'Mark',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Stefan',
      macs: ['00-80-41-ae-fd-7e']},
    { name: 'Danny',
      macs: ['00-80-41-ae-fd-7e']}
    ];

}

export default {
  name: 'SetupPeopleCtrl',
  fn: SetupPeopleCtrl
};
