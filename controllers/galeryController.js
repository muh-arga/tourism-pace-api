const Galery = require("../models/galery.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Fill all data!",
    });
  }

  const imageAsset = req.get('host') + req.file.filename;

  const galery = new Galery({
    imageAsset: imageAsset,
    place_id: req.body.place_id,
  });

  Galery.create(galery, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error when creating Galery.",
      });
    } else res.send(data);
  });
};

exports.find = (req, res) => {
  Galery.findByPlaceId(req.params.placeId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Galery with place id ${req.params.placeId}`,
        });
      } else {
        req.status(500).send({
          message: "Error get Galey with place id " + req.params.placeId,
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

  const galery = new Galery({
    imageAsset: imageAsset,
    place_id: req.body.place_id,
  });

  console.log(req.body);
  Galery.updateById(req.params.id, galery, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Galery with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Galery with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Galery.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).send({
          message: `Not found Galery with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: "Error deleting Galery with id " + req.params.id,
        });
      }
    } else res.send({ message: "Galery deleted successfully!" });
  });
};
