const router = require('express').Router();
const User = require('../db/models/user');
const Tour = require('../db/models/tour');
const { authenticated } = require('./middleware');

router.get('/tours', authenticated, async (req, res) => {
  try {
<<<<<<< HEAD
    const currentUser = await User.findById(req.session.userID);
    console.log('userTours', currentUser.usersTours)
=======
    const currentUser = await User.findById(req.session.UserID);
    // const currentUser = await User.findById({ login: 'Admin' });
>>>>>>> abbc3f472d54c29f5cebabe6d04405b27ede9491
    return res.json(currentUser.usersTours);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/:id/addtour', authenticated, async (req, res) => {
<<<<<<< HEAD
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
 
=======
  const { _id } = req.body;
  const currentUser = await User.findById(req.params.id);
  // let currentUser = await User.findById(req.session.UserID);
  const tourToAdd = await Tour.findById(_id);
  if (!currentUser.usersTours.includes(tourToAdd)) {
    currentUser.usersTours.push(tourToAdd);
    await currentUser.save();
    return res.json(tourToAdd);
  }
  return res.status(204).send('This tour is alreeady in yuor profile');
>>>>>>> abbc3f472d54c29f5cebabe6d04405b27ede9491
});

router.delete('/:id/deletetour', async (req, res) => {
  const { _id } = req.body;
  // let currentUser = await User.findById(req.session.UserID);

<<<<<<< HEAD
  let currentUser = await User.findById(req.params.id);
  let tourToDelete = await Tour.findById(_id);
  // tourToDelete.isAdded = false;
  // await tourToDelete.save();
=======
  const currentUser = await User.findById(req.params.id);
  const tourToDelete = await Tour.findById(_id);
>>>>>>> abbc3f472d54c29f5cebabe6d04405b27ede9491
  currentUser.usersTours.splice(currentUser.usersTours.indexOf(tourToDelete), 1);
  await currentUser.save();
  res.sendStatus(200);
});

module.exports = router;
