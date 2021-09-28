// Documentación API Phillips Hue para NodeJS: https://www.npmjs.com/package/node-hue-api

const nodeHueApi = require('node-hue-api'), discovery = nodeHueApi.discovery, hueApi = nodeHueApi.api;
const hueColorConverter = require('@q42philips/hue-color-converter');

const hueBridgeUser = 'fvQ3-kMabObtJHiVag1JmQ83wu0konJONgp78Sz5';

const getLights = nodeHueApi.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return hueApi.createLocal(host).connect(hueBridgeUser);
  })
  .then(api => {
    return api.lights.getAll();
  })
  .then(allLights => {
    let luces = ""
    allLights.forEach(light => {
      luces+=(`\n${light.data.id}: ${light.data.name}`);
    });
    return luces;
  })
  .catch(err => {
    console.error(err);
  })
;

const setLightColor = (hex,id) => {
  nodeHueApi.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return hueApi.createLocal(host).connect(hueBridgeUser);
  })
  .then(api => {
    colorRGB = hexToRgb(hex);
    // Using a basic object to set the state
    return api.lights.setLightState(id, {on: true, xy: hueColorConverter.calculateXY(colorRGB.r,colorRGB.g,colorRGB.b)});
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
  ;
}

const turnLightOff = (id) => {  
  nodeHueApi.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return hueApi.createLocal(host).connect(hueBridgeUser);
  })
  .then(api => {
    return api.lights.setLightState(id, {on: false});
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
  ;
}

const turnLightOn = (id) => {  
  nodeHueApi.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return hueApi.createLocal(host).connect(hueBridgeUser);
  })
  .then(api => {
    return api.lights.setLightState(id, {on: true});
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
  ;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
//setLightColor(255,0,0,1);

module.exports = {
  getLights:getLights,
  setLightColor:setLightColor,
  turnLightOff: turnLightOff,
  turnLightOn: turnLightOn
}