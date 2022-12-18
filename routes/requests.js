var express = require('express');
var router = express.Router();
require('../models/connection');

const Request = require("../models/requests");
const { checkBody } = require('../modules/checkBody');


// DO A REQUEST TO AN ARTIST
router.post('/sendRequest', (req, res) => {
    if (!checkBody(req.body, ['text', 'email', 'firstname', 'lastname'])) {
        res.json({ result: false, error: 'missing field', message: 'Veuillez remplir tous les champs obligatoires' });
        return;
    }
    const newRequest = new Request({
        user: {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
        },
        address: {
            postalCode: req.body.postalCode,
            city: req.body.city,
        },
        text: req.body.text,
        artist: req.body.artist
    });
    newRequest.save().then(newDoc => {
        res.json({result: true, newDoc})
    });
});






module.exports = router;