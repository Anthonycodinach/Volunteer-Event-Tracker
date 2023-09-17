const router = require('express').Router();
const { Members } = require('../../models');


router.post('/register', async (req, res) => {
  try {
    const dbmemberData = await Members.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
      birthday: req.body.birthday,
      about_me: req.body.about_me,
      profile_picture: req.body.profile_picture,
      phone_number: req.body.phone_number,
    });

    const memberData = await Members.findOne({where: { email: req.body.email}});


      req.session.save(() => {
      req.session.logged_in = true;
      req.session.memberID = memberData.id;
      res.status(200).json(dbmemberData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    
    const memberData = await Members.findOne({ where: { email: req.body.email } });

    const pass = req.body.password;
    if (!memberData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    if (memberData.password != pass) {
      console.log("pass validated");
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    
      req.session.save(() => {
      req.session.memberID = memberData.id;
      req.session.logged_in = true;
            
      res
      .status(200)
      .json({ user: memberData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
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

