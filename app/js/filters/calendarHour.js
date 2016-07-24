function CalendarHour() {

  return function(str) {
    if (!str) return '';
    let splitStr = str.split(':')
    return splitStr[1] == '00' ? splitStr[0] : ''
  };

}

export default {
  name: 'CalendarHour',
  fn: CalendarHour
};
