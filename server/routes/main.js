const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../db/models/user');

// ================check session==============
router.get('/login', async (req, res) => {
  let user;
  try {
    user = await User.findById(req.session.userID);
    if (!user) return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(501);
  }
  return res.status(200).json(user);
});

// ==================login=======================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      return res.sendStatus(501);
    }
  } catch (error) {
    return res.sendStatus(501);
  }
  req.session.userID = user._id;
  req.session.userLogin = user.login;
  return res.status(200).json(user);
});
// ==================register=======================

router.post('/register', async (req, res) => {
  const { login, password, email } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  let user;
  try {
    user = await User.create({ login, password: hashedPassword, email });
  } catch (error) {
    return res.sendStatus(501);
  }

  req.session.UserID = user._id;
  req.session.UserLogin = user.login;

  return res.status(200).json(user);
});
// ==================logout=======================
router.get('/logout', (req, res) => {
  // Удаляем сессию с сервера (или базы данных, если сессия хранится там).
  req.session.destroy();
  // Говорим клиенту, чтобы он удалил куку.
  res.clearCookie('sid');
  res.sendStatus(200);
});

module.exports = router;
