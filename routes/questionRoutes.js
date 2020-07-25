const express = require('express');
const helpController = require('./../controllers/helpController');
const authController = require('./../controllers/authController');
const answerRouter = require('./answerRoutes');

const router = express.Router();

router.use(authController.protect);
router.use('/:questionId/answers', answerRouter);

router.get('/', helpController.getAllQuestions);
router.post('/', helpController.setUserIds, helpController.createQuestion);

router.get('/:id', helpController.getQuestion);
router.delete('/:id', helpController.deleteQuestion);

module.exports = router;
