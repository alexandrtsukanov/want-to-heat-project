const router = require('express').Router();
const Tour = require('../db/models/tour');

// ================getTours==============
router.get('/', async (req, res) => {
  let tours;
  try {
    tours = await (await Tour.find()).filter((tour) => tour.price <= req.query.price);
    if (!tours) return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(501);
  }
  return res.status(200).json(tours);
});

module.exports = router;
