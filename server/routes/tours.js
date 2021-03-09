const router = require('express').Router();

const Tour = require('../db/models/tour');
const User = require('../db/models/user');
const { authenticated } = require('./middleware');

// ================getTours==============
router.post('/', 
// authenticated, 
async (req, res) => {
  console.log('YYY')
  // let currentUser = await User.findById(req.session.userID);
  let currentUser = await User.findOne({ login: 'Admin' });
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
    return res.sendStatus(501);
  }
});

router.post('/sortation', authenticated, async (req, res) => {
  try {
    // let currentUser = await User.findById(req.session.userID);
    let currentUser = await User.findOne({ login: 'Admin' });
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

router.post('/sortationrate', async (req, res) => {
  try {
    // let currentUser = await User.findById(req.session.userID);
    let currentUser = await User.findOne({ login: 'Admin' });

    const { minRate } = req.body;

    const tours = [...currentUser.searchTours];

    const rateTours = tours.filter(el => el.rating >= Number(minRate));
    if (!rateTours.length) {
      return res.status(204).send('No tours found');
    } else {
      const rateToursSortedByRating = rateTours.sort((a, b) => b.rating - a.rating);
      return res.json(rateToursSortedByRating)
    }

  } catch (error) {
    return res.sendStatus(501)
  }
})

router.post('/sortationstars', async (req, res) => {
  try {
    let currentUser = await User.findOne({ login: 'Admin' });
    const { minStars } = req.body;
    const tours = [...currentUser.searchTours];
    const starsTours = tours.filter(el => el.stars >= Number(minStars));
    if (!starsTours.length) {
      return res.status(204).send('No tours found');
    } else {
      const starsToursSortedByRating = starsTours.sort((a, b) => b.rating - a.rating);
      return res.json(starsToursSortedByRating)
    }
  } catch (error) {
    return res.sendStatus(501)
  }
})

router.post('/filter', async (req, res) => {
  try {
    console.log('TUT?')
    let currentUser = await User.findOne({ login: 'Admin' });
    const { minPrice, maxPrice, minRate, minStars } = req.body;
    console.log(req.body)
    const tours = [...currentUser.searchTours];
    if (!maxPrice) {
      const filteredTours = await tours.filter(el => el.price >= minPrice && el.rating >= minRate && el.stars >= minStars)
      const toursSortedByRating = filteredTours.sort((a, b) => b.price - a.price);
      currentUser.sortTours = toursSortedByRating
      await currentUser.save()
      return res.json(toursSortedByRating)

    } else {
      const filteredTours = await tours.filter(el => el.price >= minPrice && el.price <= maxPrice && el.rating >= minRate && el.stars >= minStars)
      console.log(filteredTours)
      const toursSortedByRating = filteredTours.sort((a, b) => b.price - a.price);
      currentUser.sortTours = toursSortedByRating
      await currentUser.save()
      return res.json(toursSortedByRating)
    }
  } catch (error) {
    return res.sendStatus(501)
  }
})

module.exports = router;
