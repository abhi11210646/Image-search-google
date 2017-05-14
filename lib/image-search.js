'use strict'

const queryStirng = require("querystring");
const got = require("got");

module.exports = class ImageSearch{
    
    constructor(cseId, apiKey) {
        this.endPoint = 'https://www.googleapis.com/';
        this.cseId = cseId;
        this.apiKey = apiKey;
    }
    
    search(query, options) {
        if (!query) {
			throw new TypeError('Expected a query');
		}
       return got(this.endPoint + 'customsearch/v1?' + this.getOptions(query, options),{json:true})
        .then(this.buildResult)
        .catch((err)=>{
            return err;
        });
    }
    
    getOptions(query, options) {
        if(!options) {options ={};}
        let result = {
            q: query.replace(/\s/g,'+'),
            searchType: 'image',
            cx: this.cseId,
            key: this.apiKey
        };
        if(options.page) {
            result.start = options.page;
        }
        return queryStirng.stringify(result);
    }
    
    buildResult(res) {
        return (res.body.items || []).map((item)=>{
                return {
                    'url': item.link,
                    'thumbnail':item.image.thumbnailLink,
                    'snippet':item.title,
                    'context': item.image.contextLink
                };
        });
    }
    
};