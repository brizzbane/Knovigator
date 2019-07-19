const moment = require('moment');

function timeNow () {
  return moment().format('MMMM Do YYYY, h:mm:ss a')
}

modules.export = {
  timeNow: timeNow
}