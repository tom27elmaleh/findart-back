var express = require('express');
var router = express.Router();
require('../models/connection');

const Artist = require('../models/artists');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');

// get artist
router.get('/', (req, res) => {
    Artist.find()
    .populate('event')
    .then(data => {
        res.json({ artistsData : data});
    });
});


//SIGNUP
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['type', 'email', 'username', 'password', 'description'])) {
      res.json({ result: false, error: 'missing field', message: 'Veuillez remplir tous les champs obligatoires' });
      return;
    }
    // Check if the artist has not already been registered
    Artist.findOne({ email: req.body.email }).then(data => {
      if (data === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        let eventID;

        switch (req.body.event) {
            case 'weedings':
                eventID = "63974244c4543aec0e8a2681"
                break;
            case 'privateEvents':
                eventID = "63974b4aca18ba79d6e9f3f0"
                break;
            case 'courses':
                eventID = "63974b17ca18ba79d6e9f3ef"
                break;
            default:
                break;
        }
  
        const newArtist = new Artist({
          token: uid2(32),
          type: req.body.type,
          email: req.body.email,
          username: req.body.username,
          password: hash,
          photo: req.body.photo,
          description: req.body.description,
          insta: req.body.insta,
          address: {
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.county,
          },
          rate: {
            hourly: req.body.hourly,
            package: req.body.package,
          },
          instrument: req.body.instrument,
          formatPhoto: req.body.formatPhoto,
          camera: req.body.camera,
          link: req.body.link,
          style: req.body.style,
          event: eventID,
        });
  
        newArtist.save().then(newDoc => {
          res.json({ result: true, token: newDoc.token, id: newDoc._id, username: newDoc.username });
        });
      } else {
        // Email already exists in database
        res.json({ result: false, error: 'Email already exists' });
      }
    });
  });

module.exports = router;
