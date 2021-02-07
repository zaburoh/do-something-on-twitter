'use strict';

class AxiosBase {
  constructor(baseURL) {
    this.axios = require('axios').create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    });
  }

  get(resource) {
    return this.axios.get(resource);
  }
}

module.exports = AxiosBase;