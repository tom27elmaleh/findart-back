var express = require("express");
var router = express.Router();
require("../models/connection");
const Event = require("../models/events");

// add events
router.post("/add", function (req, res) {
  const newEvent = new Event({
    name: req.body.name,
    image: req.body.image,
  });
  newEvent.save().then(res.json({ result: true, message: "event add" }));
});

router.get("/events", (req, res) => {
  Event.find().then((data) => {
    res.json({ allEvent: data });
  });
});

//GET ONE ARTIST
router.get("/:token", (req, res) => {
  Artist.findOne({ token: req.params.token }).then((data) => {
    if (data) {
      res.json({ result: true, artist: data });
    } else {
      res.json({ result: false, error: "Artist not found" });
    }
  });
});

// MODIFY INFO ARTIST
router.put("/:token", (req, res) => {
  Artist.findOne({ token: req.params.token }).then((data) => {
    if (!data) {
      res.json({ result: false, error: "Artist not found" });
    } else {
      let eventID;

      switch (req.body.event) {
        case "weddings":
          eventID = "6398905c9f4bbb28feb35ec2";
          break;
        case "privateEvents":
          eventID = "639890819f4bbb28feb35ec4";
          break;
        case "courses":
          eventID = "639890969f4bbb28feb35ec6";
          break;
        default:
          break;
      }

      const update = {
        type: req.body.type,
        username: req.body.username,
        description: req.body.description,
        insta: req.body.insta,
        address: data.address,
        rate: data.rate,
        instrument: req.body.instrument,
        formatPhoto: req.body.formatPhoto,
        camera: req.body.camera,
        link: req.body.link,
        style: req.body.style,
        event: eventID,
      };

      if (req.body.country) {
        update.address.country = req.body.country;
      }
      if (req.body.postalCode) {
        update.address.postalCode = req.body.postalCode;
      }
      if (req.body.city) {
        update.address.city = req.body.city;
      }

      if (req.body.hourly) {
        update.rate.hourly = req.body.hourly;
      }
      if (req.body.package) {
        update.rate.package = req.body.package;
      }

      Artist.updateOne({ token: req.params.token }, update)
        .then(res.json({ result: true, message: "modified" }))
        .catch((error) => console.log(error));
    }
  });
});

module.exports = router;
