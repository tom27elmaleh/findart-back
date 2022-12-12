var express = require('express');
var router = express.Router();
require('../models/connection');

const Artist = require('../models/artists');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');

//SIGNUP
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['username', 'country', 'city', 'email', 'password', 'description', 'type'])) {
      res.json({ result: false, error: 'Champs manquant' });
      return;
    }
    // Check if the artist has not already been registered
    Artist.findOne({ email: req.body.email }).then(data => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);
  
        const newArtist = new Artist({
          username: req.body.username,
          email: req.body.email,
          description: req.body.description,
          password: hash,
          token: uid2(32),
          type: req.body.type,
          country: req.body.county,
          events: ["63974244c4543aec0e8a2681"],
          city: req.body.city
        
        });
  
        newArtist.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token, id: newDoc._id });
        });
      } else {
        // Email already exists in database
        res.json({ result: false, error: 'Email already exists' });
      }
    });
  });

module.exports = router;
