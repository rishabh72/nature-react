const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Question must belong to user'],
    },
    text: {
      type: String,
      required: [true, 'Question must have text'],
      maxlength: [
        250,
        'Question text must have less or equal then 250 characters',
      ],
      minlength: [
        15,
        'Question text must have more or equal then 15 characters',
      ],
    },
    title: {
      type: String,
      required: [true, 'Question must have a title'],
      maxlength: [
        50,
        'Question title must have less or equal then 50 characters',
      ],
      minlength: [
        10,
        'Question title must have more or equal then 10 characters',
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

questionSchema.virtual('answers', {
  ref: 'Answer',
  foreignField: 'question',
  localField: '_id',
});

questionSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: '-__v',
  });

  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
