const mongoose = require('mongoose');
const dateTimeUtils = require('../utils/dateTime');

const AnswerSchema = {
	quest: String,
	body: String,
	author: String,
  branches: [String],
	date: { type: String, default: dateTimeUtils.timeNow },
};

const Answer = mongoose.model('Answer', AnswerSchema, 'Answers');


module.exports = Answer;
