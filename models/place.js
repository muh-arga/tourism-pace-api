const query = require("express/lib/middleware/query");
const sql = require("./db");

const Place = function (place) {
  this.name = place.name;
  this.location = place.location;
  this.imageAsset = place.imageAsset;
  this.description = place.description;
  this.openDay = place.openDay;
  this.openHour = place.openHour;
  this.ticketPrice = place.ticketPrice;
};

Place.create = (newPlace, result) => {
  sql.query("INSERT INTO places SET ?", newPlace, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("created place: ", { id: res.insertId, ...newPlace });
    result(null, { id: res.insertId, ...newPlace });
  });
};

Place.findById = (id, result) => {
  sql.query(`SELECT * FROM places WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found place: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Place.getAll = (name, result) => {
  let query = "SELECT * FROM places";
  if (name) {
    query += `WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Err: ", err);
      result(null, err);
      return;
    }
    console.log("places: ", res);
    result(null, res);
  });
};

Place.updateById = (id, place, result) => {
  sql.query(
    "UPDATE places SET name = ?, location = ?, imageAsset = ?, description = ?, openDay = ?, openHour = ?, ticketPrice = ? WHERE id = ?",
    [
      place.name,
      place.location,
      place.imageAsset,
      place.description,
      place.openDay,
      place.openHour,
      place.ticketPrice,
      id,
    ],
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
      console.log("updated place: ", { id: id, ...place });
      result(null, { id: id, ...place });
    }
  );
};

Place.remove = (id, result) => {
  sql.query("DELETE FROM places WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted place with id: ", id);
    result(null, res);
  });
};

module.exports = Place;
