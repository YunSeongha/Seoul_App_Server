'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const getJSON = require('get-json');
const utf8 = require('utf8');

const closest = require('./closest.js').closest;
const top3 = require('./top3.js').top3;
const status = require('./status.js');
const spec_electric = require('./spec_electric.js').spec_electric;
const spec_agency = require('./spec_agency.js').spec_agency;
const closest_EVcharge = require('./closest_EVcharge').closest_EVcharge;
const closest_park1 = require('./closest_park1').closest_park1;

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


  async function spec_electric_func(agent){
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];
    var result = await spec_electric(lat, lng);
    console.log(result);
    var msg = result.adres;
    agent.add(msg+';'+result.la+';'+result.lo+';'+result.positn_cd);
    agent.setContext({
      'name' : 'status',
      'lifespan' : 1,
      'parameters' : {
        'positn_cd' : result.positn_cd
      }//parameters
    });//set.Context
  }//spec_electric_func

  async function spec_agency_func(agent){
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];
    var agency = agent.parameters['agency'];

    var result = await spec_agency(lat, lng, agency);
    console.log(agency);
    console.log('index result' + result.adres);
    var msg = result.adres;

    agent.add(msg+';'+result.la+';'+result.lo+';'+result.positn_cd);
    agent.setContext({
      'name' : 'status',
      'lifespan' : 1,
      'parameters' : {
        'positn_cd' : result.positn_cd
      }//parameters
    });//set.Context
  }//spec_agency_func

  async function closest_EVcharge_func(agent){
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];

    var result = await closest_EVcharge(lat,lng);
    console.log(result.cot_conts_name);
    agent.add(result.cot_conts_name);
  }//closest_EVcharge

  async function search_toilet_func(agent){
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];

    var result = await search_toilet(lat, lng);
    var msg = "가장 가까운 화장실을 찾았습니다 ! 지도로 이동하여 표시합니다...";
    console.log(msg+';'+result.lat+';'+result.lng);
  }

  async function closest_park1_func(agent){
    var lat = agent.parameters['lat'];
    var lng = agent.parameters['lng'];

    var result = await closest_park1(lat, lng);
    console.log(result.fly_nam);
    agent.add(result.fly_nam);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('closest', closest_func);
  intentMap.set('top3', top3_func);
  intentMap.set('top3_closest', closest_func);
  intentMap.set('status', status_func);
  intentMap.set('spec_electric', spec_electric_func);
  intentMap.set('spec_agency', spec_agency_func);
  intentMap.set('closest_EVcharge', closest_EVcharge_func);
  intentMap.set('search_toilet', search_toilet_func);
  intentMap.set('closest_park1', closest_park1_func);
  agent.handleRequest(intentMap);
});
