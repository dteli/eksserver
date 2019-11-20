const router = require('express').Router();
const JWT = require('jsonwebtoken');
const BC = require('bcryptjs');

let Userprefs = require('../db').import('../models/userprefs');


// POST /
router.post('/', async (req, res) => {

  try {
    let ups = await Userprefs.create({
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      userId: req.user.id
    });

    res.json({
      message: "userprefs created",
      ups
    });

  } catch (err) {

    res.status(500).send(err.message);
  }

})


// GET /
router.get('/', async (req, res) => {
  try {
    let ups = await Userprefs.findOne({
      where: {userId: req.user.id}
    });

    res.json({
      message: "here are your user preferences",
      ups
    });


  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /
router.put('/', async (req, res) => {
  try {

    let firstName = req.body.user.firstName;
    let lastName = req.body.user.lastName;

    const oldUPs = await Userprefs.findOne({where: {userId: req.user.id}});

    if (!firstName) firstName = oldUPs.firstName;
    if (!lastName) lastName = oldUPs.lastName;

    let updated = await Userprefs.update({
      firstName,
      lastName
    }, {where: {userId: req.user.id}}
    );

    res.json({
      message: "userprefs changed",
      updated
    })


  } catch (err) {
    res.status(500).send(err.message);
  }
});



// DELETE /

router.delete('/', async (req, res) => {
  try {

    let result = Userprefs.destroy({
      where: { userId: req.user.id }
    });

    res.json({
      message: "userprefs deleted",
      result
    })



  } catch (err) {
    res.status(500).send(err.message)
  }
});








module.exports = router;