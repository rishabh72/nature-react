const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Answer must belong to user'],
  },
  text: {
    type: String,
    required: [true, 'Answer must have text'],
    maxlength: [250, 'Answer text must have less or equal than 250 characters'],
    minlength: [15, 'Answer text must have more or equal than 15 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
    required: [true, 'Answer must belong to a question.'],
  },
});

answerSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'photo role name email',
  });

  next();
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
