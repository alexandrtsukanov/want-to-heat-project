const router = require('express').Router();
const Tour = require('../db/models/tour');
const User = require('../db/models/user');
const { authenticated } = require('./middleware');

// ================getTours==============
router.post('/', authenticated, async (req, res) => {
  const currentUser = await User.findById(req.session.userID);
  let { minTemp, maxTemp } = req.body;
  if (!minTemp) minTemp = -Infinity;
  if (!maxTemp) maxTemp = Infinity;
  let tours;
  try {
    tours = await (await Tour.find())
      .filter((tour) => tour.temperature >= minTemp && tour.temperature <= maxTemp);
    if (!tours.length) {
      return res.status(204).send('No tours found');
    }
    currentUser.searchTours = tours.sort((a, b) => b.rating - a.rating);
    await currentUser.save();
    return res.status(200).json(tours.sort((a, b) => b.rating - a.rating));
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/sortation', authenticated, async (req, res) => {
  const currentUser = await User.findById(req.session.userID);
  const { criteria } = req.body;
  const tours = currentUser.searchTours;
  try {
    switch (criteria) {
      case 'tempMinToMax':
        return res.status(200).json(tours.sort((a, b) => a.temperature - b.temperature));
      case 'tempMaxToMin':
        return res.status(200).json(tours.sort((a, b) => b.temperature - a.temperature));
      case 'price':
        return res.status(200).json(tours.sort((a, b) => a.price - b.price));
      case 'rating':
        return res.status(200).json(tours.sort((a, b) => b.rating - a.rating));
      case 'toSeaDistance':
        return res.status(200).json(tours.sort((a, b) => a.toSeaDistance - b.toSeaDistance));
      case 'reviewsCount':
        return res.status(200).json(tours.sort((a, b) => b.reviewsCount - a.reviewsCount));
      case 'tourDuration':
        return res.status(200).json(tours.sort((a, b) => b.tourDuration - a.tourDuration));
      case 'stars':
        return res.status(200).json(tours.sort((a, b) => b.stars - a.stars));
      default: return res.status(200).json(tours.sort((a, b) => b.rating - a.rating));
    }
  } catch (error) {
    return res.sendStatus(501);
  }
});

module.exports = router;
