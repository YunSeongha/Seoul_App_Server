'use strict';

const data = require('./data_toilet.json');
const maxlength = data.length;

async function search_toilet(la, lo){
  var max = 100;//임시로 100
  var temp, result;
  var lnn = 127.1121;
  var laa = 37.1515;
  for(var i=0; i<maxlength; i++){
    lnn = data[i].lng - lnn; //a^2+b^2=c^2임 그래서 직선거리를 구함
    laa = data[i].lat - laa;
    temp = Math.sqrt((lnn*lnn)+(laa*laa)); //대각선 거리를 계산
    if(temp < max){ //만약에 max보다 지금 계산한게 작으면
      max = temp; //지금 계산한게 max
      result = data[i]; //그 데이터를 결과에 저장
    }//if
  }//for
  return(result);
  console.log(result);
}

module.exports = {
  search_toilet:search_toilet
};
