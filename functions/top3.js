'use strict';

var data = require('./data.json');

const maxlength = data.length;

async function top3(la, lo){
  var dist, lat, lng;
  // var la = 37.540389;
  // var ln = 127.069236;
  for(var i=0; i<maxlength; i++){
    lat = data[i].la - la;
    lng = data[i].lo - ln;
    dist = Math.sqrt((lat*lat)+(lng*lng));
    data[i].dist = dist;
    console.log(data[i].dist);
  }//for
}
data.sort(customSort);
console.log(data[0].adres);
console.log(data[1].adres);
console.log(data[2].adres);

function customSort(a, b) { if(a.dist == b.dist){ return 0} return a.dist > b.dist ? 1 : -1; }

module.exports = {
  top3: top3
};
