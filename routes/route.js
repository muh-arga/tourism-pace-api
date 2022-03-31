const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../public'));
//   },
//   filename: (req, file, cb) => {
//     let filename = file.originalname;
//     filename = filename.replace(/\s+/g, "");
//     cb(null, `uploads/${Date.now()}-${filename}`);
//   },
// });

const upload = multer({ storage: multer.memoryStorage() });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const places = require("../controllers/placeController.js");
const galeries = require("../controllers/galeryController.js");

router.post("/place/addPlace", upload.single("image"), places.create);
router.get("/places", places.findAll);
router.get("/place/:id", places.findOne);
router.post("/place/updatePlace/:id", upload.single("image"), places.update);
router.get("/place/deletePlace/:id", places.delete);

router.post("/galery/addGalery", upload.single("image"), galeries.create);
router.get("/galery/:placeId", galeries.find);
router.post(
  "/galery/updateGalery/:id",
  upload.single("image"),
  galeries.update
);
router.get("/galery/deleteGalery/:id", galeries.delete);

module.exports = router;
