const router = require('express').Router();
const User = require('../db/models/user');
const Tour = require('../db/models/tour');
const Avia = require('../db/models/avia');

const { authenticated } = require('./middleware');

router.get('/tours', authenticated, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userID);
    console.log('userTours', currentUser.usersTours);
    return res.json(currentUser.usersTours);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/:id/addtour', authenticated, async (req, res) => {
  try {
    let { _id } = req.body;
    const currentUser = await User.findById(req.params.id);
    // let currentUser = await User.findById(req.session.UserID);
    let tourToAdd = await Tour.findById(_id);
    currentUser.usersTours.push(tourToAdd);
    await currentUser.save();
    return res.json(tourToAdd);
  } catch (error) {
    return res.sendStatus(501);
  }
 
});

router.delete('/:id/deletetour', async (req, res) => {
  const { _id } = req.body;
  const currentUser = await User.findById(req.params.id);
  const tourToDelete = await Tour.findById(_id);
  console.log(currentUser.usersTours.length)
  currentUser.usersTours.splice(currentUser.usersTours.indexOf(tourToDelete), 1);
  await currentUser.save();
  console.log(currentUser.usersTours.length)
  res.sendStatus(200);
});

router.post('/:id/addavia', authenticated, async (req, res) => {
  try {
    let { _id } = req.body;
    const currentUser = await User.findById(req.params.id);
    // let currentUser = await User.findById(req.session.UserID);
    const aviaToAdd = await Avia.findById(_id);
    currentUser.usersAvia.push(aviaToAdd);
    await currentUser.save();
    return res.json(aviaToAdd);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.delete('/:id/deleteavia', async (req, res) => {
  const { _id } = req.body;
  const currentUser = await User.findById(req.params.id);
  const aviaToDelete = await Tour.findById(_id);
  console.log(currentUser.usersTours.length)
  currentUser.aviaToAdd.splice(currentUser.usersAvia.indexOf(aviaToDelete), 1);
  await currentUser.save();
  console.log(currentUser.usersTours.length)
  res.sendStatus(200);
});

module.exports = router;
