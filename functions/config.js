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

async function park_list(location){
  var park;
  var list = new Array;
  const nanumdb = await database.ref('DATA');
  //console.log("디비사이즈1 : "+nanumdb.length);
  for(var index=0; index<500; index++){
  //for(var index in nanumdb){
    var temp = await nanumdb.child(index).child('adres').once('value');
    //var temp = await database.ref('DATA/'+index).child('adres').once('value');
    if(temp.val().indexOf(location) != -1){
      await list.push(temp.val());
      console.log(temp.val());
    }//if
  }//for
  return list;
}

module.exports = {
  returnaddr: returnaddr
  park_list: park_lists
};
