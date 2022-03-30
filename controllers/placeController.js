const Place = require("../models/place");

module.exports = {
  create: async (req, res) => {
    const imageAsset =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    const place = new Place({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      imageAsset: imageAsset,
      openDay: req.body.openDay,
      openHour: req.body.openHour,
      ticketPrice: req.body.ticketPrice,
    });

    try {
      place.save((err, ress) => {
        if (err) return res.status(400).json({ Response: err });
        res.status(200).json(place);
      });
    } catch (err) {
      if (err) return res.status(400).json({ response: err });
    }
  },

  findAll: async (req, res) => {
    const places = await Place.find({});
    if (!places)
      return res.status(400).json({ response: "Cannot find places" });
    return res.status(200).json(places);
  },

  findOne: async (req, res) => {
    const id = req.params.id;
    await Place.findById(id, (err, place) => {
      if (err) return res.status(400).json({ response: err });
      return res.status(200).json(place);
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const imageAsset =
      req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    try {
      let placeParams = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        imageAsset: imageAsset,
        openDay: req.body.openDay,
        openHour: req.body.openHour,
        ticketPrice: req.ticketPrice,
      };

      Place.findOneAndUpdate(
        id,
        {
          $set: placeParams,
        },
        { new: true },
        (err, place) => {
          if (err) return res.status(400).json({ response: err });
          return res.status(200).json(place);
        }
      );
    } catch (err) {
      if (err) return res.status(400).json({ response: err });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await Place.deleteOne({ _id: id }, (err, ress) => {
      if (err) res.status(400).json({ response: err });
      return res.status(200).json({ response: "Delete place with id " + id });
    });
  },
};
