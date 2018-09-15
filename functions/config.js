'use strict';

const admin = require('firebase-admin');
let data = require('./data.json');

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

  // for(var index=0; index<data.length; index++){
  //   // var temp = await database.ref('DATA').child(index).child('adres').once('value');
  //   //var temp = await database.ref('DATA/'+index).child('adres').once('value');
  //   if(data[index].adres.indexOf(location) != -1){
  //     await list.push(data[index].adres);
  //     console.log(data[index].adres);
  //   }//if
  // }//for
  for (var i=0;i<data.length;i++){
    if(data[i].adres.indexOf(location)!=-1){
      await list.push(data[i].adres);
      console.log(data[i].adres);
    }
  }
  return list;
}

module.exports = {
  returnaddr: returnaddr,
  park_list: park_list
};
