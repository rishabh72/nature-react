const factory = require('./handlerFactory');
const Question = require('./../models/questionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Answer = require('./../models/answerModel');

exports.createQuestion = factory.createOne(Question);
exports.getAllQuestions = factory.getAll(Question);
exports.getQuestion = factory.getOne(Question, { path: 'answers' });
exports.deleteQuestion = factory.deleteOne(Question);

exports.getAllAnswers = factory.getAll(Answer);

exports.createAnswer = factory.createOne(Answer, 'user');

exports.editAnswer = factory.updateOne(Answer);
exports.getAnswer = factory.getOne(Answer);
exports.deleteAnswer = factory.deleteOne(Answer);

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.setQuestionIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.question) req.body.question = req.params.questionId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
