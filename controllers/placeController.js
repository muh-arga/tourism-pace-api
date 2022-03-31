const Place = require("../models/place");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../services/firebase");

module.exports = {
  create: async (req, res) => {
    // const imageAsset =
    //   req.protocol + "://" + req.get("host") + "/" + req.file.filename;

    if (!req.file) return res.status(400).send("Error: No files found");
    const name = req.file.originalname.replace(/\s+/g, "");
    const filename = `${Date.now()}_${name}`;
    const metadata = {
      contentType: req.file.mimetype,
    };
    const storageRef = ref(storage, "images/" + filename);
    const uploadTask = uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload ispaused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Not authorized");
            break;
          case "storage/canceled":
            console.log("Upload canceled");
            break;
          case "storage/unknwon":
            console.log("Unkwon error");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(function (downloadUrl) {
          console.log("File available at", downloadUrl);
          const place = new Place({
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            imageAsset: downloadUrl,
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
        });
      }
    );
  },

  findAll: async (req, res) => {
    const places = await Place.find({});
    if (!places)
      return res.status(400).json({ response: "Cannot find places" });
    return res.status(200).json({places: places});
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

    if (!req.file) return res.status(400).send("Error: No files found");
    const name = req.file.originalname.replace(/\s+/g, "");
    const filename = `${Date.now()}_${name}`;
    const metadata = {
      contentType: req.file.mimetype,
    };
    const storageRef = ref(storage, "images/" + filename);
    const uploadTask = uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload ispaused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            console.log("Not authorized");
            break;
          case "storage/canceled":
            console.log("Upload canceled");
            break;
          case "storage/unknwon":
            console.log("Unkwon error");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(function (downloadUrl) {
          console.log("File available at", downloadUrl);
          try {
            let placeParams = {
              name: req.body.name,
              location: req.body.location,
              description: req.body.description,
              imageAsset: downloadUrl,
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
        });
      }
    );
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await Place.deleteOne({ _id: id }, (err, ress) => {
      if (err) res.status(400).json({ response: err });
      return res.status(200).json({ response: "Delete place with id " + id });
    });
  },
};
