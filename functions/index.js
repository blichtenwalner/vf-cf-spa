const http = require('https')
exports.handler = async (event) => {
    return httprequest().then((data) => {
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(data),
        };
        return response;
    });
};
function httprequest() {
    return new Promise((resolve, reject) => {
        const options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?q=Tulsa&units=Imperial&appid=92c778350883d551ce42f1cabbba902c',
            port: 443,
            method: 'GET'
        };
        const req = http.request(options, (res) => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        req.end();
    });
}
