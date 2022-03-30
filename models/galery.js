const sql = require("./db");

const Galery = function (galery) {
  this.imageAsset = galery.imageAsset;
  this.place_id = galery.place_id;
};

Galery.create = (newGalery, result) => {
  sql.query("INSERT INTO galeries SET ?", newGalery, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Created galery: ", { id: res.insertId, ...newGalery });
    result(null, { id: res.insertId, ...newGalery });
  });
};

Galery.findByPlaceId = (placeId, result) => {
  sql.query(`SELECT * FROM galeries WHERE place_id = ${placeId}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.length) {
      console.log("found galeries: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Galery.updateById = (id, galery, result) => {
  sql.query(
    "UPDATE galeries SET imageAsset = ?, place_id = ? WHERE id = ?",
    [galery.imageAsset, galery.place_id, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated galery: ", { id: id, ...galery });
      result(null, { id: id, ...galery });
    }
  );
};

Galery.remove = (id, result) => {
  sql.query("DELETE FROM galeries WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Err: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted galery with id: ", id);
    return null, res;
  });
};

module.exports = Galery;
