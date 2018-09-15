'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const returnaddr = require('./config.js').returnaddr;
const park_list = require('./config.js').park_list;

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  // const context = agent.contexts;
  // console.log('this part context: ' + context);

  function welcome (agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback (agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  async function test (agent){
    var adr = await returnaddr();
    const lati = await agent.parameters.lati;
    const loti = await agent.parameters.loti;
    console.log(adr + ': index log')
    console.log('lati: ' + lati + ', loti: ' + loti);
    agent.add(adr + ` test async`)
  }

  async function park_list(agent){
    const location = await agent.parameters['location'];
    console.log("check loc: " + location);
    var list = await park_list(location);
     // for(var i=0; i<list.length; i++){
     //   agent.add(list[i]);
     // }
    agent.add('결과임');
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('test intent', test);
  intentMap.set('park_list', park_list);
  agent.handleRequest(intentMap);
});
