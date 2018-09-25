'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const closest = require('./closest.js');

// const returnaddr = require('./config.js').returnaddr;//config파일의 returnaddr가져온거임
// const nanum = require('./config.js');
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  console.log(JSON.stringify(response.body));

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
    console.log("lat: " + lat);
    console.log("lng: " + lng);
    var result = await closest.closest(lat, lng);
    agent.add('주소: ' + result.adres);
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
  // intentMap.set('pizzac', pizzac);
  // intentMap.set('return_addr', return_addr);
  // intentMap.set('park_list', park_list);
  // intentMap.set('park_distance', park_distance);
  intentMap.set('closest', closest_func);
  agent.handleRequest(intentMap);
});
