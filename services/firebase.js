const { initializeApp } = require("firebase/app");
const  {getStorage } = require("firebase/storage")
const config = require("./config");

const firebaseApp = initializeApp(config.firebaseConfig)
const storage = getStorage(firebaseApp)

module.exports = { storage };
