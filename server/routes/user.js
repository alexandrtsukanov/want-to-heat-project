const router = require('express').Router();
const User = require('../db/models/userTsukanov');
const Tour = require('../db/models/tourTsukanov');
const { authenticated } = require('./middleware');

router.get('/tours', async (req, res) => {
  // let currentUser = await User.findById(req.session.UserID)
  let currentUser = await User.findOne({ login: 'a' });
  let usersTours = currentUser.usersTours
  res.json(usersTours)
})

router.post('/:id/addtour', async (req, res) => {
  let { _id } = req.body
  // let currentUser = await User.findById(req.session.UserID)
  let currentUser = await User.findById(req.params.id);
  let tourToAdd = await Tour.findById(_id)
  currentUser.usersTours.push(tourToAdd);
  await currentUser.save();
  res.json(tourToAdd)
})

router.delete('/:id/deletetour', async (req, res) => {
  let { _id } = req.body;
  let currentUser = await User.findById(req.params.id);
  let tourToDelete = await Tour.findById(_id)
  currentUser.usersTours.splice(currentUser.usersTours.indexOf(tourToDelete), 1);
  await currentUser.save();
  res.sendStatus(200);
})


module.exports = router;
