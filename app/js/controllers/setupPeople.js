function SetupPeopleCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'Setup people to detect';

  vm.people = [
    { name: 'Florens',
      mac: 'adsfadfasdf'},
    { name: 'Adriana',
      mac: 'asdfasdfasdf'},
    { name: 'Mark',
      mac: 'adfadfafd'}
    ];

}

export default {
  name: 'SetupPeopleCtrl',
  fn: SetupPeopleCtrl
};
