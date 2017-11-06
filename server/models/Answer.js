const mongoose = require('mongoose');
const moment = require('moment');

const AnswerSchema = {
	quest: String,
	body: String,
	author: String,
  branches: [String],
	date: { type: String, default: timeNow },
};

const Answer = mongoose.model('Answer', AnswerSchema, 'Answers');


module.exports = Answer;

function timeNow () {return moment().format('MMMM Do YYYY, h:mm:ss a')}