const router = require('express').Router();
const { Members } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const memberData = await Members.create(req.body);

    req.session.save(() => {
      req.session.id = memberData.id;
      req.session.logged_in = true;

      res.status(200).json(memberData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const memberData = await Members.findOne({ where: { email: req.body.email } });
    const admin = memberData.map()

    if (!memberData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    if (condition) {
      
    }

    const validPassword = await memberData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.id = memberData.id;
      req.session.logged_in = true;
      
      res.json({ user: memberData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
