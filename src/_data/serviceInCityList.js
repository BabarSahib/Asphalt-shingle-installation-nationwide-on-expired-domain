// src/_data/serviceInCityList.js
// Produces array of Tier 1 metro + Material service combinations

const cities = require('./cities.json');
const services = require('./services.json');

module.exports = function() {
  const combinations = [];
  const tier1Cities = cities.filter(c => c.tier === 1);

  tier1Cities.forEach(city => {
    services.forEach(service => {
      combinations.push({
        city,
        service
      });
    });
  });

  return combinations;
};
