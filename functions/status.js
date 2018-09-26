'use strict';

const nanumkey = '6568456d4768727031303062546a4643';

//var nanumurl = 'http://openapi.seoul.go.kr:8088/'+nanumkey+'/xml/NanumcarCarList/1/5/'+positn_cd+'/'+agency;

//var eyes = require('eyes');
var http = require('http');
//var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

async function status_so(positn_cd){
  var agency = 'so';
  var nanumurl = 'http://openapi.seoul.go.kr:8088/'+nanumkey+'/xml/NanumcarCarList/1/5/'+positn_cd+'/'+agency;
  parser.on('error', function(err) { console.log('Parser error', err); });
  var data = '';
  http.get(nanumurl, function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        console.log('data', data);
        parser.parseString(data, function(err, result) {
          console.log('JSON : ', err, result);
          console.log(result.NanumcarCarList.row[0].reservAbleCnt);
          return result.NanumcarCarList.row[0].reservAbleCnt;
        });//parser
      });//end
    }//if
  });//http.get

}//function

async function status_gr(positn_cd){
  var agency = 'gr';
  var nanumurl = 'http://openapi.seoul.go.kr:8088/'+nanumkey+'/xml/NanumcarCarList/1/5/'+positn_cd+'/'+agency;
  parser.on('error', function(err) { console.log('Parser error', err); });
  var data = '';
  http.get(nanumurl, function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {
        console.log('data', data);
        parser.parseString(data, function(err, result) {
          console.log('JSON : ', err, result);
          console.log(result.NanumcarCarList.row[0].reservAbleCnt);
          return result.NanumcarCarList.row[0].reservAbleCnt;
        });//parser
      });//end
    }//if
  });//http.get

}//function

module.export = {
  status_so : status_so,
  status_gr : status_gr
};
