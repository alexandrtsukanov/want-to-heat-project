const router = require('express').Router();

const Tour = require('../db/models/tour');
const User = require('../db/models/user');
const { authenticated } = require('./middleware');

// ================getTours==============
router.post('/', authenticated, async (req, res) => {
  // let currentUser = await User.findById(req.session.userID);
  let currentUser = await User.findOne({ login: 'Admin' });
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
  try {
  // let currentUser = await User.findById(req.session.userID);
    let currentUser = await User.findOne({ login: 'Admin' });
    const { criteria } = req.body;
    const tours = currentUser.searchTours;
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

router.post('/sortationprice', async (req, res) => {
  try {
    // let currentUser = await User.findById(req.session.userID);
    let currentUser = await User.findOne({ login: 'Admin' });
    const { minPrice, maxPrice } = req.body;
    if ((minPrice !== '' && minPrice !== '0' && !Number(minPrice)) || (maxPrice !== '' && maxPrice !== '0' && !Number(maxPrice))) {
      return res.status(204).send('You have entered incorrect values');
    }
    if (!minPrice) {
      minPrice = -Infinity
    }
    if (!maxPrice) {
      maxPrice = Infinity
    }
    const tours = [...currentUser.searchTours];
    console.log(tours.length)
    const priceTours = tours.filter(el => el.price >= Number(minPrice) && el.price <= Number(maxPrice));
    if (!priceTours.length) {
      return res.status(204).send('No tours found');
    } else {
      const toursSortedByRating = priceTours.sort((a, b) => b.rating - a.rating);
      return res.status(200).json(toursSortedByRating)
    }

  } catch (error) {
    return res.sendStatus(501)
  }
})

router.post('/sortationrate', async (req, res) => {

})

router.post('/sortationstars', async (req, res) => {

})

module.exports = router;
