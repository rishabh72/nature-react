const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get(
  '/current_user',

  authController.isLoggedin,
  authController.getCurrentUser
);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/account', userController.getMe, userController.getUser);
router.patch(
  '/updateImage',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateImage
);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));
router.route('/search').post(searchController.userSearch);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.patch(
  '/image/:id',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateUserImage
);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
