const router = require('express').Router();
const User = require('../db/models/user');
const Tour = require('../db/models/tour');
const { authenticated } = require('./middleware');

router.get('/tours', authenticated, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userID);
    console.log('userTours', currentUser.usersTours)
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
    return res.sendStatus(501)
  }
 
});

router.delete('/:id/deletetour', async (req, res) => {
  let { _id } = req.body;
    // let currentUser = await User.findById(req.session.UserID);

  let currentUser = await User.findById(req.params.id);
  let tourToDelete = await Tour.findById(_id);
  // tourToDelete.isAdded = false;
  // await tourToDelete.save();
  currentUser.usersTours.splice(currentUser.usersTours.indexOf(tourToDelete), 1);
  await currentUser.save();
  res.sendStatus(200);
});

module.exports = router;
