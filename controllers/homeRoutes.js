const router = require('express').Router();
const { Events, Members, Assignment } = require('../models');
const checkIfAdmin = require('../utils/admin');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const eventData = await Events.findAll({
    });

    // Serialize data so the template can read it
    const eventVar = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      eventVar, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/ourstory', async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const eventData = await Events.findAll({
    });

    // Serialize data so the template can read it
    const eventVar = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('ourStory', { 
      eventVar, 
      logged_in: req.session.logged_in,
      whiteheader: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/events', async (req, res) => {
  try {
    // Get all events and JOIN with user data
    const eventData = await Events.findAll()
    const eventsList = eventData.map(event => event.get({plain: true}))
    console.log(eventsList);
        res.render('event-list', {
          eventsList,
          logged_in: req.session.logged_in
        });
    } catch (error) {
      console.log("error message")
        console.log(error)
      res.status(500).json(error)
    }
});

router.get('/events/:id', async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
    });

    const eventVar = eventData.get({ plain: true });

    res.render('event-details', {
      ...eventVar,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newevent', withAuth, checkIfAdmin, async (req, res) => {
  try {
    // Get all projects and JOIN with user data

    const eventData = await Events.findAll({
    });

    // Serialize data so the template can read it
    const eventVar = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('event', { 
      eventVar, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const membersData = await Members.findByPk(req.session.memberID, {
      attributes: { exclude: ['password'] },
    });


    const assignmentsData = await Assignment.findAll({
      where: { 
      member_id: req.session.memberID
    }
    });
    
    console.log(assignmentsData);

    const eventsData = await Events.findAll({
      where: {
      id: 3
      }
    });

    console.log(eventsData);

    const memberRender = membersData.get({ plain: true });
    const assignmentRender = assignmentsData.map((event) => event.get({ plain: true }));
    const eventsRender = eventsData.map((event) => event.get({ plain: true }));
    
    
    res.render('profile', {

    memberData: memberRender,
    assignmentData: assignmentRender,
    eventData: eventsRender,
    logged_in: true

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('*', async (req,res) => {
  try {
    // Get all projects and JOIN with user data
    const eventData = await Events.findAll({
      // include: [
      //   {
      //     model: events,
      //     attributes: ['name'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const eventVar = eventData.map((event) => event.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      eventVar, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
