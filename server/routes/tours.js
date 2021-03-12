const router = require('express').Router();
const Tour = require('../db/models/tour');
const User = require('../db/models/user');
const Avia = require('../db/models/avia');
const { authenticated } = require('./middleware');
const group = require('../group')

// ================getTours==============

router.post('/', authenticated,
  async (req, res) => {
    const currentUser = await User.findById(req.session.passport.user);
    let { minTemp, maxTemp } = req.body;
    if (!minTemp) minTemp = -999;
    if (!maxTemp) maxTemp = Infinity;
    let tours;
    try {
      tours = await (await Tour.find())
        .filter((tour) => tour.temperature >= minTemp && tour.temperature <= maxTemp);
      currentUser.searchTours = tours;
      currentUser.sortTours = tours;
      await currentUser.save();
      let toursGrouped = group(tours);
      return res.status(200).json(toursGrouped.map(el => el.sort((a, b) => a.price - b.price)).sort((a, b) => a[0].price - b[0].price));
    } catch (error) {
      console.log(error);
      return res.sendStatus(501);
    }
  });

router.post('/avia', authenticated,
  async (req, res) => {
    const currentUser = await User.findById(req.session.passport.user);
    let { minTemp, maxTemp } = req.body;
    if (!minTemp) minTemp = -Infinity;
    if (!maxTemp) maxTemp = Infinity;
    let avia;
    try {
      avia = await (await Avia.find())
        .filter((aviaItem) => aviaItem.temperature >= minTemp && aviaItem.temperature <= maxTemp);
      currentUser.searchAvia = avia;
      currentUser.sortAvia = avia;
      await currentUser.save();
      return res.status(200).json(avia.sort((a, b) => a.price - b.price));
    } catch (error) {
      console.log(error);
      return res.sendStatus(501);
    }
  });

router.post('/sortation', authenticated, async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.passport.user);
    const { criteria } = req.body;
    const tours = group(currentUser.sortTours);
    switch (criteria) {
      case 'tempMinToMax':
        return res.status(200).json(tours.map(el => el.sort((a, b) => a.temperature - b.temperature)).sort((a, b) => a[0].temperature - b[0].temperature));
      case 'tempMaxToMin':
        return res.status(200).json(tours.map(el => el.sort((a, b) => b.temperature - a.temperature)).sort((a, b) => b[0].temperature - a[0].temperature));
      case 'price':
        console.log('qqq')
        return res.status(200).json(tours.map(el => el.sort((a, b) => a.price - b.price)).sort((a, b) => a[0].price - b[0].price));
      case 'rating':
        return res.status(200).json(tours.map(el => el.sort((a, b) => b.rating - a.rating)).sort((a, b) => b[0].rating - a[0].rating));
      case 'toSeaDistance':
        return res.status(200).json(tours.map(el => el.sort((a, b) => a.toSeaDistance - b.toSeaDistance)).sort((a, b) => a[0].toSeaDistance - b[0].toSeaDistance));
      case 'reviewsCount':
        return res.status(200).json(tours.map(el => el.sort((a, b) => b.reviewsCount - a.reviewsCount)).sort((a, b) => b[0].reviewsCount - a[0].reviewsCount));
      case 'tourDuration':
        return res.status(200).json(tours.map(el => el.sort((a, b) => b.tourDuration - a.tourDuration)).sort((a, b) => b[0].tourDuration - a[0].tourDuration));
      case 'stars':
        return res.status(200).json(tours.map(el => el.sort((a, b) => b.stars - a.stars)).sort((a, b) => b[0].stars - a[0].stars));
      default:
        return res.status(200).json(tours.map(el => el.sort((a, b) => a.price - b.price)).sort((a, b) => a[0].price - b[0].price));
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(501);
  }
});

router.post('/sortationAvia', authenticated, async (req, res) => {
  console.log('priliteli v sortationAvia', req.body);
  try {
    const currentUser = await User.findById(req.session.passport.user);
    const avia = currentUser.sortAvia;
    const { criteria } = req.body;
    switch (criteria) {
      case 'tempMinToMax':
        return res.status(200).json(avia.sort((a, b) => a.temperature - b.temperature));
      case 'tempMaxToMin':
        return res.status(200).json(avia.sort((a, b) => b.temperature - a.temperature));
      case 'price':
        return res.status(200).json(avia.sort((a, b) => a.price - b.price));
      default:
        return res.status(200).json(avia.sort((a, b) => a.price - b.price));
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(501);
  }
});

router.post('/filter', async (req, res) => {
  let currentUser = await User.findById(req.session.passport.user);
  const { minPrice, maxPrice, minRate, minStars } = req.body;
  if (minRate === '') minRate = -Infinity
  const tours = [...currentUser.searchTours];
  if (!maxPrice) {
    const filteredTours = tours.filter(el => el.price >= minPrice && el.rating >= minRate && el.stars >= minStars)
    currentUser.sortTours = filteredTours
    await currentUser.save()
    const toursGrouped = group(filteredTours)
    return res.json(toursGrouped.map(el => el.sort((a, b) => a.price - b.price)).sort((a, b) => a[0].price - b[0].price))
  } else {
    const filteredTours = tours.filter(el => el.price >= minPrice && el.price <= maxPrice && el.rating >= minRate && el.stars >= minStars)
    currentUser.sortTours = filteredTours
    await currentUser.save()
    const toursGrouped = group(filteredTours)
    return res.json(toursGrouped.map(el => el.sort((a, b) => a.price - b.price)).sort((a, b) => a[0].price - b[0].price))
  }
})

// ---------------------------------------------
router.post('/filterAvia', async (req, res) => {
  console.log('Post filterAvia', req.body);
  let currentUser = await User.findById(req.session.passport.user);
  const { minPrice, maxPrice } = req.body;
  const avia = [...currentUser.searchAvia];
  if (!maxPrice) {
    const filteredAvia = avia.filter(el => el.price >= minPrice);
    currentUser.sortAvia = filteredAvia
    await currentUser.save()
    return res.json(filteredAvia.sort((a, b) => a.price - b.price))
  } else {
    const filteredAvia = avia.filter(el => el.price >= minPrice && el.price <= maxPrice);
    currentUser.sortAvia = filteredAvia
    await currentUser.save()
    return res.json(filteredAvia.sort((a, b) => a.price - b.price));
  }
})
module.exports = router;
