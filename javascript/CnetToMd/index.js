const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.handler = function (event, context, callback) {
    if (event.queryStringParameters!=null && event.queryStringParameters.cnetUrl != null) {
        var url = event.queryStringParameters.cnetUrl;
        genMarkdownNews(url,callback);
    }else{
         callback(null, {
            "statusCode": 200,
            "headers": { 
                "Access-Control-Allow-Origin": "*" 
            },
            "body": JSON.stringify({resultCode:0}),
            "isBase64Encoded": false
        });
    }
}


// function test2(){
//     var url = 'https://www.cnet.com/news/uber-self-driving-car-fatality-in-arizona-has-people-asking-how-safe-are-driverless-cars/';
//     genMarkdownNews(url,function(a,b){
//         console.log(b.body);
//     });
// }
// test2();

function genMarkdownNews(url,callback){
    try{
        JSDOM.fromURL(url, {}).then(dom => {
            const doc = dom.window.document;
            var article = {};
            article.title = (doc.querySelector(".speakableText").textContent);
            article.subTitle = (doc.querySelector(".article-dek").textContent);
            article.author = (doc.querySelector(".authorInfo").textContent.replace(/\s+/g,'-'));
            article.contents = [];
            var tags = doc.querySelector("#article-body").querySelectorAll("p, h1, h2, h3, h4, h5");
            for(var i in tags){
                tag = tags[i];
                if (tag.parentNode && tag.parentNode.classList.contains("article-main-body")) {
                    var content = '';
                    if (tag.tagName.startsWith("H")) {
                        content+=("---\n\n");
                        content+=("#");
                        var hSize = parseInt(tag.tagName.substring(1));
                        for (var i = 0; i < hSize; i++) {
                            content+=("#");
                        }
                        content+=(" ");
                    }
                    content+=(tag.textContent);
                    article.contents.push(content);
                }
            }
            var result =  parseMarkDown(article);
            var fileName = new Date().toISOString().slice(0,10) +'-'+ article.title.replace(/[^\w]+/g, "-") + ".md";
            var response = {
                "statusCode": 200,
                "headers": { 
                    "Access-Control-Allow-Origin": "*" ,
                    "Content-Type": "text/markdown" ,
                    "Content-Disposition" : 'attachment; filename="'+fileName+'"'
                },
                "body": result,
                "isBase64Encoded": false
            };
            callback(null, response);
        });
    }catch(e){
        callback(null, {
            "statusCode": 200,
            "headers": { 
                "Access-Control-Allow-Origin": "*" 
            },
            "body": JSON.stringify({resultCode:0}),
            "isBase64Encoded": false
        });
    }
}

function parseMarkDown(article){
    var template = "# {title}\n\n" + "> {subTitle}\n\n" + "**{author}**\n\n" + "{content}";
    var content = '';
    for(var i in article.contents){
        var str = article.contents[i];
        content += str+ "\n\n";
    }
    var result = template.replace("{title}", article.title).replace("{subTitle}", article.subTitle)
            .replace("{author}", article.author).replace("{content}", content);
    return result;
}