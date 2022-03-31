const dotenv = require('dotenv')

dotenv.config()

const { 
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    DATABASE_URL,
    STORAGE_BUCKET,
    MESAGING_SENDER_ID,
    APP_ID 
} = process.env;

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    databaseURL: DATABASE_URL,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESAGING_SENDER_ID,
    appId: APP_ID
}

module.exports =  { firebaseConfig }