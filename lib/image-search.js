'use strict';
const got = require("got");
const { getOptions, buildResult } = require('./helper');
const baseUrl = 'https://www.googleapis.com/';
module.exports = class ImageSearch {
    constructor(cseId, apiKey) {
        this.cseId = cseId;
        this.apiKey = apiKey;
        if (!this.cseId || !this.apiKey) {
            throw new Error('Api Key Or CSE ID is required!');
        }
    }
    search(query, options = {}) {
        if (!query || typeof query !== 'string') {
            throw new Error('Expected a query in string format!');
        }
        return got(baseUrl + 'customsearch/v1?' + getOptions(query, options, this), {
            json: true
        }).then(buildResult);
    }
};