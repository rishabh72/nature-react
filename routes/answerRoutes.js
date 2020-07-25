const express = require('express');
const helpController = require('./../controllers/helpController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get('/', helpController.getAllAnswers);
router.post(
  '/:questionId',
  helpController.setQuestionIds,
  helpController.createAnswer
);
router.get('/:id', helpController.getAnswer);
router.patch('/:id', helpController.editAnswer);
router.delete('/:id', helpController.deleteAnswer);
module.exports = router;
