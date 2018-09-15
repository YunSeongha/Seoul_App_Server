'use strict';

const admin = require('firebase-admin');

var config = {
   apiKey: "AIzaSyB5CpWIUm1sd0aygT56NlXKzDHVEmdwGVY",
   authDomain: "chat-bot-mj.firebaseapp.com",
   databaseURL: "https://chat-bot-mj.firebaseio.com",
   projectId: "chat-bot-mj",
   storageBucket: "chat-bot-mj.appspot.com",
   messagingSenderId: "45119854196"
 };
var data = require('./data.json');

admin.initializeApp(config);
const maxlength = data.length;
var database = admin.database();

 async function returnaddr(addr) {
     const adrdata = await database.ref('DATA/'+addr).once('value');
     console.log(adrdata.val().adres + ' config log');
     return adrdata.val().adres;
 }

async function park_list(location){
  var list = new Array;
  for(var i=0; i<maxlength; i++){
    if(data[i].adres.indexOf(location)!=-1){
      await list.push(data[i].adres);
      //console.log(data[i].adres);
    }//if
  }//for
  return list;
}//park_list

async function park_distance(lo, la){
      var result = 1000;
      var temp, temp2, loo, laa;
      for(var i=0; i<maxlength; i++){
        loo = data[i].lo - lo;
        laa = data[i].la - la;
        temp = Math.sqrt((loo*loo)+(laa*laa))
        if(temp < result){
          result = temp;
          temp2 = data[i];
        }//if
        console.log(temp2.adres);
      }//for
      return temp2.adres;
    }//park_distance

module.exports = {
  returnaddr: returnaddr,
  park_list: park_list,
  park_distance: park_distance
};
