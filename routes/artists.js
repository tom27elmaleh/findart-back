var express = require("express");
var router = express.Router();
require("../models/connection");

const Artist = require("../models/artists");
const uid2 = require("uid2");
const bcrypt = require("bcrypt");
const { checkBody } = require("../modules/checkBody");
const Event = require("../models/events");

//SIGNUP
router.post("/signup", (req, res) => {
  if (
    !checkBody(req.body, [
      "type",
      "email",
      "username",
      "password",
      "description",
    ])
  ) {
    res.json({
      result: false,
      error: "missing field",
      message: "Veuillez remplir tous les champs obligatoires",
    });
    return;
  }
  // Check if the artist has not already been registered
  Artist.findOne({ email: req.body.email }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

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
          country: req.body.country,
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

      newArtist.save().then((newDoc) => {
        res.json({
          result: true,
          token: newDoc.token,
          id: newDoc._id,
          username: newDoc.username,
        });
      });
    } else {
      // Email already exists in database
      res.json({ result: false, error: "Email already exists" });
    }
  });
});

// SIGNIN
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  Artist.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
        token: data.token,
        username: data.username,
        type: data.type,
        id: data._id,
      });
    } else {
      res.json({
        result: false,
        error: "User not found or wrong password",
        message: "Identifiants incorrectes",
      });
    }
  });
});

// GET TOUS LES ARTISTES
router.get("/", (req, res) => {
  Artist.find()
    .populate("event")
    .then((data) => {
      res.json({ artistsData: data });
    });
});

// GET EVENT WEDDING
router.get("/mariage", (req, res) => {
  Event.findOne({ name: "Mariage" }).then((data) => {
    Artist.find({ event: data._id })
      .populate("event")
      .then((data1) => {
        res.json({ artistsData: data1 });
      });
  });
});

// GET EVENT PRIVY EVENT
router.get("/privy", (req, res) => {
  Event.findOne({ name: "Evenement privé" }).then((data) => {
    Artist.find({ event: data._id }).populate("event").then((data1) => {
      res.json({ artistsData: data1 });
    });
  });
});

// GET EVENT COURS
router.get("/cours", (req, res) => {
  Event.findOne({ name: "Cours" }).then((data) => {
    Artist.find({ event: data._id })
      .populate("event")
      .then((data1) => {
        res.json({ artistsData: data1 });
      });
  });
});

// Uniquement les artistes ayant le type "musique"
router.get("/music", (req, res) => {
  Artist.find({ type: "Musique" })
    .populate("event")
    .then((data) => {
      res.json({ musiciansData: data });
    });
});
// Uniquement les artistes ayant le type "danse"
router.get("/danse", (req, res) => {
  Artist.find({ type: "Dance" })
    .populate("event")
    .then((data) => {
      // console.log(data);
      res.json({ dancersData: data });
    });
});
// Uniquement les artistes ayant le type design
router.get("/design", (req, res) => {
  Artist.find({ type: "Design" })
    .populate("event")
    .then((data) => {
      // console.log(data);
      res.json({ designersData: data });
    });
});
// Uniquement les artist ayant le type photo
router.get("/photo", (req, res) => {
  Artist.find({ type: "Photo" })
    .populate("event")
    .then((data) => {
      // console.log(data);
      res.json({ photographsData: data });
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

router.get("/username/:username", (req, res) => {
  Artist.findOne({ username: req.params.username }).then((data) => {
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
