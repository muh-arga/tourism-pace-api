const Galery = require("../models/galery.js");

module.exports = {
  create: async (req, res) => {
    const imageAsset =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    const galery = new Galery({
      imageAsset: imageAsset,
      place_id: req.body.place_id,
    });

    try {
      galery.save((err, ress) => {
        if (err) return res.status(400).json({ response: err });
        return res.status(200).json(galery);
      });
    } catch (err) {
      if (err) return res.status(400).json({ response: err });
    }
  },

  find: async (req, res) => {
    const { placeId } = req.params;

    await Galery.find({ place_id: placeId }, (err, galery) => {
      if (err) res.status(400).json({ response: err });
      return res.status(200).json(galery);
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const imageAsset =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    try {
      let galeryParams = {
        imageAsset: imageAsset,
        place_id: req.body.place_id,
      };

      Galery.findOneAndUpdate(
        id,
        { $set: galeryParams },
        { new: ture },
        (err, galery) => {
          if (err) return res.status(400).json({ response: err });
          return res.status(200).json(galery);
        }
      );
    } catch (err) {
      if (err) return res.status(400).json({ response: err });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await Galery.deleteOne({ _id: id }, (err, ress) => {
      if (err) return res.status(400).json({ response: err });
      return res.status(200).json({ response: "Deleted galery with id " + id });
    });
  },
};
