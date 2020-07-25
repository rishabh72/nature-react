const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const Booking = require('./../models/bookingModel');

exports.userSearch = catchAsync(async (req, res) => {
  const search = req.body.name;
  const filter = req.body.filter;
  // const doc = await User.findOne({
  //   name: { $regex: search, $options: 'i' },
  // }); //case insensitive
  let doc;
  if (!search || search === '') {
    doc = await User.find(filter);
  } else {
    doc = await User.find({ $text: { $search: `${search}` } }).find(filter);
  }

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc,
  });
});

exports.bookingSearch = catchAsync(async (req, res) => {
  const search = req.body.name;
  const filter = req.body.filter;
  console.log(search);
  console.log(filter);
  let doc;
  if (!search || search === '') {
    doc = await Booking.find(filter);
  } else {
    doc = await Booking.find({ $text: { $search: `${search}` } }).find(filter);
  }

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc,
  });
});
