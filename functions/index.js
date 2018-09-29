'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const closest = require('./closest.js').closest;
const top3 = require('./top3.js').top3;
const status = require('./status.js');
const spec_addr = require('./spec_addr.js').spec_addr;

// const returnaddr = require('./config.js').returnaddr;//config파일의 returnaddr가져온거임
// const nanum = require('./config.js');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome (agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function closest_func (agent) {
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];
    var result = await closest(lat, lng);
    var msg = result.adres;
    agent.add(msg+';'+result.la+';'+result.lo+';'+result.positn_cd);
    agent.setContext({
      'name' : 'status',
      'lifespan' : 1,
      'parameters' : {
        'positn_cd' : result.positn_cd
      }//parameters
    });//set.Context
    //agent.getContext('status');
  }

  async function top3_func (agent) {
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];
    var temp = await top3(lat, lng);
    console.log('log : ' + temp);
    console.log('log2 : ' + temp[0].la);
    var msg = '가까운 주차장을 찾았어요!';
    var result = msg+';'+temp[0].la+';'+temp[0].lo+';'+temp[1].la+';'+temp[1].lo+';'+temp[2].la+';'+temp[2].lo;
    agent.add(result);
  }

  async function status_func (agent) {
    var positn_cd = agent.getContext('status').parameters['positn_cd'];
    console.log(agent.getContext('status'));
    console.log('positn_cd : ' +positn_cd);
    var result_so = await status.status_so(positn_cd);
    var result_gr = await status.status_gr(positn_cd);
    agent.add(result_so + " : " + result_gr);
  }

  async function spec_addr_func(agent){
      var addr = agent.parameters['addr'];
      console.log('addr : ' + addr);
      var latlng = await spec_addr(addr);
      console.log('index : ' + latlng);
      var lat = await latlng.lat;
      var lng = await latlng.lng;
      var result = await closest(lat,lng);
      console.log(result);
      agent.add(result.adres);
    }
//
//   async function return_addr(agent){
//     var addr = agent.parameters['addr'];
//     var adr = await returnaddr(addr);
//     agent.add(adr)
//   }
//   async function park_list(agent){
//     const location = await agent.parameters['location'];
//     //console.log("check loc: " + location);
//     var list = await nanum.park_list(location);
//      var end = list.length;
//        for(var i=0; i<end; i++){
//          agent.add(list[i]);
//        }
//   }
//
// async function park_distance(agent){
//   const lo = await agent.parameters['longitude'];
//   const la = await agent.parameters['latitude'];
//   var result = await nanum.park_distance(lo, la);
//   agent.add(result.adres);
// }
// function pizzac(agent){
// 	agent.add('kamza');
// }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('closest', closest_func);
  intentMap.set('top3', top3_func);
  intentMap.set('top3_closest', closest_func);
  intentMap.set('status', status_func);
  intentMap.set('spec_addr', spec_addr_func);
  agent.handleRequest(intentMap);
});
