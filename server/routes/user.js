const router = require('express').Router();
const User = require('../db/models/user');
const Tour = require('../db/models/tour');
const { authenticated } = require('./middleware');

router.get('/tours', authenticated, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.UserID);
    // const currentUser = await User.findById({ login: 'Admin' });
    return res.json(currentUser.usersTours);
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/:id/addtour', authenticated, async (req, res) => {
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
});

router.delete('/:id/deletetour', async (req, res) => {
  const { _id } = req.body;
  // let currentUser = await User.findById(req.session.UserID);

  const currentUser = await User.findById(req.params.id);
  const tourToDelete = await Tour.findById(_id);
  currentUser.usersTours.splice(currentUser.usersTours.indexOf(tourToDelete), 1);
  await currentUser.save();
  res.sendStatus(200);
});

module.exports = router;
