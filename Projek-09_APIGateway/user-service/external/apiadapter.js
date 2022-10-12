const axios = require("axios");

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    timeout: 60000,
  });
};
