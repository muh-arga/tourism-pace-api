const Galery = require("../models/galery.js");
const Place = require("../models/place.js");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { storage } = require("../services/firebase");

module.exports = {
  create: async (req, res) => {
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
          const galery = new Galery({
            imageAsset: downloadUrl,
            place_id: req.body.place_id,
          });

          try {
            galery.save((err, ress) => {
              if (err) return res.status(400).json({ response: err });
              Place.findOneAndUpdate(
                req.body.place_id,
                {
                  $push: { galeries: downloadUrl },
                },
                { new: true, upsert: true },
                (error, place) => {
                  if (error) return res.status(400).json({ response: err });
                  return res.status(200).json(galery);
                }
              );
            });
          } catch (err) {
            if (err) return res.status(400).json({ response: err });
          }
        });
      }
    );
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
            let galeryParams = {
              imageAsset: downloadUrl,
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
        });
      }
    );
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await Galery.deleteOne({ _id: id }, (err, ress) => {
      if (err) return res.status(400).json({ response: err });
      return res.status(200).json({ response: "Deleted galery with id " + id });
    });
  },
};
