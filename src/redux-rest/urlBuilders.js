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
    }
};

export default urlBuilders;