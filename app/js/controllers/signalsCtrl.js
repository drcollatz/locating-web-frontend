function SignalsCtrl(Signal, Person) {
  'ngInject';
  // ViewModel

  var _ = require('lodash')

  const vm = this;
  vm.title = 'Received signals';

  vm.selected = []

  vm.persons = []
  Person.getByDevices().then(x => {
    vm.persons = x
  })

  vm.today = function() {
    vm.end = new Date();
  };
  vm.today();

  vm.clear = function() {
    vm.end = null;
  };

  vm.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  vm.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    // maxDate: new Date(),
    // minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    // var date = data.date,
    //   mode = data.mode;
    // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    return false;
  }

  vm.toggleMin = function() {
    vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
    vm.dateOptions.minDate = vm.inlineOptions.minDate;
  };

  vm.toggleMin();

  vm.open1 = function() {
    vm.popup1.opened = true;
  };

  vm.open2 = function() {
    vm.popup2.opened = true;
  };

  vm.setDate = function(year, month, day) {
    vm.dt = new Date(year, month, day);
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];
  vm.altInputFormats = ['M!/d!/yyyy'];

  vm.popup1 = {
    opened: false
  };

  vm.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  vm.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < vm.events.length; i++) {
        var currentDay = new Date(vm.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }
    return '';
  }


  vm.signals = []
  vm.signalsCounted = []
  vm.signalsSorted = {}

  let createDateString = day => {
    let date = new Date(day)
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
  }

  let sortInSignalsToSlots = s => {
    let time = new Date(s.timestamp)
    let hours = time.getHours()

    let minutes = (_.floor(time.getMinutes() / 15)) * 15
    let timeString = hours + ':' + (minutes == 0 ? '00' : minutes)

    let dateString = createDateString(time)

    if (!vm.signalsSorted[dateString]) {
      vm.signalsSorted[dateString] = {}
    }

    if (!vm.signalsSorted[dateString][timeString]) {
      vm.signalsSorted[dateString][timeString] = []
    }

    if (!_.includes(vm.signalsSorted[dateString][timeString], s.mac)) {
      vm.signalsSorted[dateString][timeString].push(s.mac)
    }
  }



  vm.select = (x, select) => {
    if (select) {
      vm.selected.push(x)
    } else {
      let index = vm.selected.indexOf(x);
      if (index > -1) {
        vm.selected.splice(index, 1);
      }
    }
  }

  let createTimeRange = (day, time) => {
    let splitTime = time.split(':')
    var date = new Date(day)
    date.setHours(splitTime[0])
    date.setMinutes(splitTime[1])
    date.setSeconds(0)

    var end = new Date(date)
    end.setMinutes(date.getMinutes() + 15)
    return {
      start: date,
      end: end
    }

  }


  vm.macsInSlot = function(day, time) {
    let date = createDateString(day)
    let macs = _(vm.signalsSorted).chain().get(date, {}).get(time, []).value()
    return _.filter(vm.selected, x => _.includes(macs, x))


  }

  vm.macsInSlot_old = function(day, time) {
    if (vm.selected.length == 0) {
      return []
    }

    let range = createTimeRange(day, time)
    let signalsInScope = _.chain(vm.signals).filter(x => new Date(x.timestamp) > range.start && new Date(x.timestamp) < range.end).map(x => x.mac).value()
    return _.chain(vm.selected).filter(x => _.includes(signalsInScope, x)).value()
  }

  vm.days = _.chain(_.range(7)).map(x => {
    var day = new Date()
    return day.setDate(day.getDate() - day.getDay() + x + (day.getDay() == 0 ? -6 : 1))
  }).value()

  vm.nextWeek = x => {
    vm.days = _.map(vm.days, d => {
      var day = new Date(d)
      day.setDate(day.getDate() + 7)
      return day
    })
  }

  vm.prevWeek = x => {
    vm.days = _.map(vm.days, d => {
      var day = new Date(d)
      day.setDate(day.getDate() - 7)
      return day
    })
  }

  vm.hours = _.chain(_.range(0, 24)).map(x => [x + ':00', x + ':15', x + ':30', x + ':45']).flatten().value()

  vm.searching = false
  vm.status = null
  vm.onRefreshbutton = function() {
    vm.status = 'processing data...'
    vm.selected = []
    vm.signals = []
    vm.signalsCounted = []
    vm.searching = true
    Signal.queryByDate(vm.begin, vm.end, sigs => {

      let macCounted = _.countBy(sigs, x => x.mac)
      let vendor = _.chain(sigs).filter(m => m.vendor != null).map(e => {
        return {
          mac: e.mac,
          vendor: e.vendor
        }
      }).keyBy('mac').value()
      console.log(vendor)

      let macs = _.chain(macCounted)
        .keys()
        .map(x => {
          let person = _.get(vm.persons, x, {
            name: '?',
            device: '?'
          })
          return {
            mac: x,
            seen: _.get(macCounted, x),
            person: person.name,
            device: person.device,
            rssi: _.chain(sigs).filter(y => y.mac == x).map('rssi').mean().ceil().value(),
            minRssi: _.chain(sigs).filter(y => y.mac == x).map('rssi').max().value(),
            lastSeen: _.chain(sigs).filter(y => y.mac == x).map('timestamp').max().value(),
            vendor: vendor[x] != null ? vendor[x]['vendor'] : '?',
            ssids: _.chain(sigs).filter(y => y.mac == x).map('ssid').uniq().value()
          }
        })

      .value()


      vm.signals = sigs
      vm.signalsCounted = macs

      _.forEach(vm.signals, s => sortInSignalsToSlots(s))

      vm.searching = false
      vm.status = null
    })
  }


}

export default {
  name: 'SignalsCtrl',
  fn: SignalsCtrl
};
