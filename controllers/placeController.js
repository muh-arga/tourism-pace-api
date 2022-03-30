const Place = require("../models/place.js");

exports.create = (req, res) => {
  if (!req.body) {
    req.status(400).send({
      message: "Fill all data!",
    });
  }

  const imageAsset = req.protocol + "://"+ req.get('host') + "/" + req.file.filename;

  const place = new Place({
    name: req.body.name,
    location: req.body.location,
    imageAsset: imageAsset,
    description: req.body.description,
    openDay: req.body.openDay,
    openHour: req.body.openHour,
    ticketPrice: req.body.ticketPrice,
  });
  Place.create(place, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error when creating Place.",
      });
    } else res.send({data: data});
  });
};

exports.findAll = (req, res) => {
  const name = req.query.title;
  Place.getAll(name, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error when get Place.",
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Place.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Place with id ${req.params.id}`,
        });
      } else {
        req.status(500).send({
          message: "Error get Place with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill all data!",
    });
  }

  const imageAsset = req.get('host') + req.file.filename;

  const place = new Place({
    name: req.body.name,
    location: req.body.location,
    imageAsset: imageAsset,
    description: req.body.description,
    openDay: req.body.openDay,
    openHour: req.body.openHour,
    ticketPrice: req.body.ticketPrice,
  });

  console.log(req.body);
  Place.updateById(req.params.id, place, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Place with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Place with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Place.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Place with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Place with id " + req.params.id,
        });
      }
    } else res.send({ message: "Place deleted successfully!" });
  });
};
