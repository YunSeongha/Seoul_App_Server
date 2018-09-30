'use strict';

const data = require('./data_parkinglot0.json');
const maxlength = data.length;
async function closest_park0(lat, lng){
  var max = 100;//임시로 100
      var temp, result, lnn, laa;
      for(var i=0; i<maxlength; i++){
        lnn = data[i].lng - lng; //a^2+b^2=c^2임 그래서 직선거리를 구함
        laa = data[i].lat - lat;
        temp = Math.sqrt((lnn*lnn)+(laa*laa)); //대각선 거리를 계산
        if(temp < max){ //만약에 max보다 지금 계산한게 작으면
          max = temp; //지금 계산한게 max
          result = data[i]; //그 데이터를 결과에 저장
        }//if
      }//for
      return result;
}//async function

async function closest_park0_free(lat, lng){
  var max = 100;//임시로 100
      var temp, result, lnn, laa;
      console.log('무료');
      for(var i=0; i<maxlength; i++){
        lnn = data[i].lng - lng; //a^2+b^2=c^2임 그래서 직선거리를 구함
        laa = data[i].lat - lat;
        temp = Math.sqrt((lnn*lnn)+(laa*laa)); //대각선 거리를 계산
        if(temp < max && data[i].pay_nm == "무료"){ //만약에 max보다 지금 계산한게 작으면
          max = temp; //지금 계산한게 max
          result = data[i]; //그 데이터를 결과에 저장
        }//if
      }//for
      return result;
}//async function

async function closest_park0_pay(lat, lng){
  var max = 100;//임시로 100
      var temp, result, lnn, laa;
      console.log("유료");
      for(var i=0; i<maxlength; i++){
        lnn = data[i].lng - lng; //a^2+b^2=c^2임 그래서 직선거리를 구함
        laa = data[i].lat - lat;
        temp = Math.sqrt((lnn*lnn)+(laa*laa)); //대각선 거리를 계산
        if(temp < max && data[i].pay_nm == "유료"){ //만약에 max보다 지금 계산한게 작으면
          max = temp; //지금 계산한게 max
          result = data[i]; //그 데이터를 결과에 저장
        }//if
      }//for
      return result;
}//async function
module.exports = {
  closest_park0 : closest_park0,
  closest_park0_free : closest_park0_free,
  closest_park0_pay : closest_park0_pay
}
