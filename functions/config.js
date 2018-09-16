'use strict';

var data = require('./data.json');

const maxlength = data.length;

async function park_list(location){
  var list = new Array;
  for(var i=0; i<maxlength; i++){
    if(data[i].adres.indexOf(location)!=-1){
      list.push(data[i].adres);
    }//if
  }//for
  return list;
}//park_list이거 나중에 0이면 주소를 다시 입력해달라고 하자 //너무많으면 상세주소를 입력해달라고 하기

async function park_distance(lo, la){
      var result = 100;
      var temp, temp2, loo, laa;
      for(var i=0; i<maxlength; i++){
        loo = data[i].lo - lo;
        laa = data[i].la - la;
        temp = Math.sqrt((loo*loo)+(laa*laa));
        if(temp < result){
          result = temp;
          temp2 = data[i];
        }//if
      }//for
      return temp2;
    }//park_distance

module.exports = {
  returnaddr: returnaddr,
  park_list: park_list,
  park_distance: park_distance
};
