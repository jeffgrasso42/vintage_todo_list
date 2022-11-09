const User = require('../../models/User');

const router = require('express').Router();

// POST /api/users - makes a new user
router.post('/', async (req, res) => {
  // get user data from req.body
  const { username, password } = req.body;
  // create a new user
  const user = await User.create({
    username,
    password,
  });
  // add user info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    // send user info back
    res.json(user);
  });
});

// POST /api/users/login - logs a user in
router.post('/login', async (req, res) => {
  // get user data from req.body
  const { username, password } = req.body;
  // create a new user
  const user = await User.findOne({
    where: { username: username },
  });

  // does the user exist
  if (!user) {
    // no? send back a 404
    return res.status(404).json({ message: 'user not found' });
  }

  // is the password correct?
  if (!user.checkPassword(password)) {
    return res
      .status(401)
      .json({ message: 'username or password was incorrect' });
  }
  // no? send back 404

  // add user info to the session
  req.session.save(() => {
    req.session.loggedIn = true;
    req.session.userId = user.id;
    // send user info back
    res.status(200).json({ message: 'successfully logged in' });
  });
});
module.exports = router;
