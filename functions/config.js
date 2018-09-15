'use strict';

const admin = require('firebase-admin');

var config = {
    apiKey: "AIzaSyDTVHhaAkYQAhaOG-jxz6Hhjt7kbSxQd8s",
    authDomain: "testaddress-72692.firebaseapp.com",
    databaseURL: "https://testaddress-72692.firebaseio.com",
    projectId: "testaddress-72692",
    storageBucket: "testaddress-72692.appspot.com",
    messagingSenderId: "192573578542"
};
admin.initializeApp(config);

var database = admin.database();

async function returnaddr() {
    const adrdata = await database.ref('DATA/0').once('value');
    console.log(adrdata.val().adres + ' config log');
    return adrdata.val().adres;
}
module.exports = {
  returnaddr: returnaddr
};
