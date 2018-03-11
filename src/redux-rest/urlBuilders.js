const urlBuilders = {
    zipper: (url, args) => {
        // url = ['https://hacker-news.firebaseio.com/v0/item/', '.json']
        // args = ['1234']
        let fullURL = url[0];
        args.forEach((arg, i)=>{
            fullURL += arg + url[i+1];
        });
        // fullURL = 'https://hacker-news.firebaseio.com/v0/item/1234.json'
        return fullURL;
    },
    queryParameterAppender: (url, queryObject) => {
        // url = 'http://hn.algolia.com/api/v1/search'
        // queryObject = {query: 'test', tags: 'story'}
        let queryStrings = [];
        Object.keys(queryObject).forEach((queryKey)=>{
            queryStrings.push(`${queryKey}=${queryObject[queryKey]}`)
        });
        // 'http://hn.algolia.com/api/v1/search?tags=story&query=test'
        return `${url}?${queryStrings.join('&')}`;
    }
};

export default urlBuilders;