var express = require('express');
var router = express.Router();
const Artist = require('../models/artists');

router.get('/', (req, res) => {
    Artist.find().then(data => {
        let type = '';
        switch (data.type) {
            case 1:
                type = 'Musique'
                break;
            case 2:
                type = 'Danse'
                break;
            case 3:
                type = 'Photographie'
                break;
            case 4:
                type = 'Design'
                break;
            default: 'Autre catégorie'
                break;
        }
        res.json({ artistsData : data});
    });
});




module.exports = router;