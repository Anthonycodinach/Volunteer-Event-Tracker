const router = require('express').Router();
const { Events, Members } = require('../../models');
const checkIfAdmin = require('../../utils/admin');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, checkIfAdmin, async (req, res) => {
  try {
    const newEvent = await Events.create({
      ...req.body,
      members_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, checkIfAdmin, async (req, res) => {
  try {
    const eventData = await Events.destroy({
      where: {
        id: req.params.id,
        members_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
