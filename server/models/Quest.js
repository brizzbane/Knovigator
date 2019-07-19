const mongoose = require('mongoose');
const dateTimeUtils = require('../utils/dateTime');

const Quest = new mongoose.Schema({
  title: String,
  author: String,
  parent: String,
  highlightedAnswer: String,
  date: { type: String, default: dateTimeUtils.timeNow },
});


Quest.pre('save', function (next) {
  const title = this.get('title')
  const parent = this.get('parent')
  if(parent && !title) {
    this.title = `Comments:`
  }
  next()
})


module.exports = mongoose.model('Quest', Quest, 'Quests');