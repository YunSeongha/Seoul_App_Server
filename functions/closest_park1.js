'use strict';

const data = require('./data_parkinglot1.json');
const maxlength = data.length;

async function closest_park1(lat, lng){
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
}//closest_park1

module.exports = {
  closest_park1 : closest_park1
}
