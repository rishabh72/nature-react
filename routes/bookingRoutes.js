const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);

router.get(
  '/myBookings',
  authController.protect,
  bookingController.getMyBookings
);

router.post(
  '/search',
  authController.protect,
  authController.restrictTo('admin', 'lead-guide', 'guide'),
  searchController.bookingSearch
);

router.route('/').get(bookingController.getAllBookings);
router.route('/:id').delete(bookingController.deleteBooking);

module.exports = router;
