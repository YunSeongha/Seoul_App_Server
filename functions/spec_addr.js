'use strict';

const data = require('./data.json');
const maxlength = data.length;
const nanumkey = '6568456d4768727031303062546a4643';

var getJSON = require('get-json');
var utf8 = require('utf8');
var location = '둔촌동역';
var loc = utf8.encode(location);
var url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+loc+'&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD2h9IEq_ZZBVcPQ8OJl3cvUBDHZ2oo9UU';
getJSON(url, function(error, response){
   console.log(response.candidates[0].geometry.location);
});

module.export{
  spec_addr:spec_addr
};
