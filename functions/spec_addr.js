'use strict';

var getJSON = require('get-json');
var utf8 = require('utf8');

async function spec_addr(addr){
  var latlng;
  console.log('addr addr : ' + addr);
  var loc = utf8.encode(addr);
  var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+loc+'&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD2h9IEq_ZZBVcPQ8OJl3cvUBDHZ2oo9UU';
  getJSON(url, function(error, response){//json파싱
    latlng = response.candidates[0].geometry.location;
    console.log('addr : ' + latlng);
    return latlng;//json을 리턴해서 index에서 lat = latlng.lat; lng = latlng.lng;로 한다음에 closest에 집어넣자
  });//

}//spec_addr

module.exports = {
  spec_addr:spec_addr
};
