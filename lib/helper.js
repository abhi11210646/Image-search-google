const queryStirng = require("querystring");
module.exports = {
    getOptions: (query, options, context) => {
        let result = {
            q: query.replace(/\s/g, '+'),
            searchType: 'image',
            cx: context.cseId,
            key: context.apiKey
        };
        if (options.page) {
            result.start = options.page;
        }
        if (options.num) {
            result.num = options.num;
        }
        return queryStirng.stringify(result);
    },
    buildResult: (res) => {
        return (res.body.items || []).map((item) => {
            return {
                'url': item.link,
                'thumbnail': item.image.thumbnailLink,
                'snippet': item.title,
                'context': item.image.contextLink
            };
        });
    }
}