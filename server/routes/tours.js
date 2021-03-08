const router = require('express').Router();
const Tour = require('../db/models/tourTsukanov');
const User = require('../db/models/userTsukanov');

// ================getTours==============
router.post('/', async (req, res) => {
  // currentUser = await User.findById(req.session.userID);
  let currentUser = await User.findOne({ login: 'a' })
  const { minTemp, maxTemp } = req.body
  if ((minTemp !== '' && minTemp !== '0' && !Number(minTemp)) || (maxTemp !== '' && maxTemp !== '0' && !Number(maxTemp))) {
    return res.status(204).send('You have entered incorrect values');
  }
  if (!minTemp) {
    minTemp = -Infinity
  }
  if (!maxTemp) {
    maxTemp = Infinity
  }
  if (maxTemp < minTemp) {
    return res.sendStatus(204).send('You have entered incorrect values')
  }
  let tours;
  try {
    tours = await (await Tour.find()).filter((tour) => tour.temperature >= Number(minTemp) && tour.temperature <= Number(maxTemp));
    if (!tours.length) {
      return res.status(204).send('No tours found');
    } else {
      let toursSortedByRating = tours.sort((a, b) => b.rating - a.rating);
      currentUser.searchTours = toursSortedByRating;
      await currentUser.save();
      return res.status(200).json(toursSortedByRating)
    }
  } catch (error) {
    return res.sendStatus(501);
  }
});

router.post('/sortation', async (req, res) => {
  // currentUser = await User.findById(req.session.userID);
  let currentUser = await User.findOne({ login: 'a' })
  let { criteria } = req.body;
  let tours = currentUser.searchTours;
  console.log(tours.length)
  let toursCopy = [...tours]
  try {
    switch (criteria) {
      case 'tempMinToMax':
        return res.status(200).json(toursCopy.sort((a, b) => a.temperature - b.temperature))
      case 'tempMaxToMin':
        return res.status(200).json(toursCopy.sort((a, b) => b.temperature - a.temperature))
      case 'price':
        return res.status(200).json(toursCopy.sort((a, b) => a.price - b.price))
      case 'rating':
        return res.status(200).json(toursCopy.sort((a, b) => b.rating - a.rating))
      case 'toSeaDistance':
        return res.status(200).json(toursCopy.sort((a, b) => a.toSeaDistance - b.toSeaDistance))
      case 'reviewsCount':
        return res.status(200).json(toursCopy.sort((a, b) => b.reviewsCount - a.reviewsCount))
      case 'tourDuration':
        return res.status(200).json(toursCopy.sort((a, b) => b.tourDuration - a.tourDuration))
      case 'stars':
        return res.status(200).json(toursCopy.sort((a, b) => b.stars - a.stars))
    }
  } catch (error) {
    return res.sendStatus(501)
  }
})

router.post('/sortationprice', async (req, res) => {
  try {
    let currentUser = await User.findOne({ login: 'a' });
    const { minPrice, maxPrice } = req.body;
    if ((minPrice !== '' && minPrice !== '0' && !Number(minPrice)) || (maxPrice !== '' && maxPrice !== '0' && !Number(maxPrice))) {
      console.log('111')
      return res.status(204).send('You have entered incorrect values');
    } else {
      if (!minPrice) {
        console.log('222')
        minPrice = -Infinity
      }
      if (!maxPrice) {
        console.log('333')

        maxPrice = Infinity
      }

      // if (maxPrice < minPrice) {
      //   return res.sendStatus(204).send('You have entered incorrect values')
      // }
      const tours = currentUser.searchTours;
      const priceTours = tours.filter(el => el.price >= minPrice && el.price <= maxPrice);
      console.log('WHERE????', priceTours)
      if (!priceTours.length) {
        return res.status(204).send('No tours found');
      } else {
        const toursSortedByRating = priceTours.sort((a, b) => b.rating - a.rating);
        currentUser.searchTours = toursSortedByRating;
        await currentUser.save();
        return res.status(200).json(toursSortedByRating)
      }
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
