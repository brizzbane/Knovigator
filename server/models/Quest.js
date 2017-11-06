const mongoose = require('mongoose');
const moment = require('moment');

const QuestSchema = {
  title: String,
  author: String,
  parent: String,
  highlightedAnswer: String,
  date: { type: String, default: timeNow },
};

const Quest = mongoose.model('Quest', QuestSchema, 'Quests');


module.exports = Quest;

function timeNow () {return moment().format('MMMM Do YYYY, h:mm:ss a')}