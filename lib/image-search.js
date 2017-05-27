'use strict'

const queryStirng = require("querystring");
const got = require("got");
const baseUrl = 'https://www.googleapis.com/';
module.exports = class ImageSearch {

    constructor(cseId, apiKey) {
        this.cseId = cseId;
        this.apiKey = apiKey;
    }

    search(query, options) {
        if (!this.cseId || !this.apiKey) {
            throw new Error('Key is required.');
        }
        if (!query) {
            throw new Error('Expected a query');
        }
        return got(baseUrl + 'customsearch/v1?' + getOptions(query, options), {
                json: true
            })
            .then(buildResult)
            .catch((err) => {
                return err;
            });
    }
};

/* private helper function */
function getOptions(query, options) {
    if (!options) {
        options = {};
    }
    let result = {
        q: query.replace(/\s/g, '+'),
        searchType: 'image',
        cx: this.cseId,
        key: this.apiKey
    };
    if (options.page) {
        result.start = options.page;
    }
    return queryStirng.stringify(result);
}

function buildResult(res) {
    return (res.body.items || []).map((item) => {
        return {
            'url': item.link,
            'thumbnail': item.image.thumbnailLink,
            'snippet': item.title,
            'context': item.image.contextLink
        };
    });
}
