const router = require('express').Router();

const Tour = require('../db/models/tour');
const User = require('../db/models/user');
const Avia = require('../db/models/avia');
const { authenticated } = require('./middleware');

// ================getTours==============


router.post('/', authenticated,
  async (req, res) => {
    console.log('Session', req.session);
    const currentUser = await User.findById(req.session.userID);
    // let currentUser = await User.findOne({ login: 'Admin' });
    let { minTemp, maxTemp } = req.body;
    if (!minTemp) minTemp = -Infinity;
    if (!maxTemp) maxTemp = Infinity;
    let tours;
    try {
      tours = await (await Tour.find())
        .filter((tour) => tour.temperature >= minTemp && tour.temperature <= maxTemp);
      // if (!tours.length) {
      //   return res.status(204).send('No tours found');
      // }

      currentUser.searchTours = tours;
      currentUser.sortTours = tours;
      await currentUser.save();
      return res.status(200).json(tours.sort((a, b) => b.rating - a.rating));
    } catch (error) {
      console.log(error);
      return res.sendStatus(501);
    }
  });

router.post('/avia', authenticated,
  async (req, res) => {
    console.log('Session', req.session);
    const currentUser = await User.findById(req.session.userID);
    // let currentUser = await User.findOne({ login: 'Admin' });
    let { minTemp, maxTemp } = req.body;
    if (!minTemp) minTemp = -Infinity;
    if (!maxTemp) maxTemp = Infinity;
    let avia;
    try {
      avia = await (await Avia.find())
        .filter((aviaItem) => aviaItem.temperature >= minTemp && aviaItem.temperature <= maxTemp);
      // if (!tours.length) {
      //   return res.status(204).send('No tours found');
      // }

      currentUser.searchAvia = avia;
      currentUser.sortAvia = avia;
      await currentUser.save();
      return res.status(200).json(avia);
    } catch (error) {
      console.log(error);
      return res.sendStatus(501);
    }
  });

router.post('/sortation', authenticated, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.userID);
    // let currentUser = await User.findOne({ login: 'Admin' });
    const { criteria } = req.body;
    const tours = currentUser.sortTours;
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

router.post('/filter', async (req, res) => {

  
    let currentUser = await User.findById(req.session.userID);
    console.log('Session', req.session)
    // let currentUser = await User.findOne({ login: 'Admin' });
    const { minPrice, maxPrice, minRate, minStars } = req.body;
    if (minRate === '') minRate = -Infinity
    console.log(req.body)
    const tours = [...currentUser.searchTours];
    console.log(tours.length);
    if (!maxPrice) {
      console.log('ALYO?')
      const filteredTours = tours.filter(el => el.price >= minPrice && el.rating >= minRate && el.stars >= minStars)
      console.log(filteredTours.length)
      const toursSortedByRating = filteredTours.sort((a, b) => a.price - b.price);
      currentUser.sortTours = toursSortedByRating
      await currentUser.save()
      return res.json(toursSortedByRating)

    } else {
      console.log('HERE???')
      const filteredTours = tours.filter(el => el.price >= minPrice && el.price <= maxPrice && el.rating >= minRate && el.stars >= minStars)
      console.log(filteredTours.length)
      const toursSortedByRating = filteredTours.sort((a, b) => a.price - b.price);
      currentUser.sortTours = toursSortedByRating
      await currentUser.save()
      return res.json(toursSortedByRating)
    }

})

module.exports = router;
