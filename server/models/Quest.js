const mongoose = require('mongoose');
const moment = require('moment');

const Quest = new mongoose.Schema({
  title: String,
  author: String,
  parent: String,
  highlightedAnswer: String,
  date: { type: String, default: timeNow },
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


function timeNow () {return moment().format('MMMM Do YYYY, h:mm:ss a')}