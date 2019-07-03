var storeForward = require('./storeForward.js');
var firebase = require('./firebase.js');
var crypto = require('crypto');
const app = require('express')()

function md5(text) {
    const hash = crypto.createHash('md5');
    hash.update(text);
    return hash.digest('hex')
}

function handle(req, res) {
    var url = req.query.url;
//    var url = 'https://www.baidu.com/img/bd_logo1.png';
    if (url) {
        const key = md5(url);
        firebase.find(key, data => {
            console.log('found', key, url);
            res.json(data);
        }, err => {
            console.log('not found', key, url);
            storeForward.store(url, result => {
//                console.log('forwarded', result);
                var data = JSON.parse(result).data
                console.log('data', data)
                if (!data) {
                    res.json(JSON.stringify({code: -1, msg: "forward failed"}));
                    return;
                }
                firebase.save(key, url, key, data.url, data.hash, data)
                res.json({
                    originalUrl: url,
                    originalHash: key,
                    galleryUrl: data.url,
                    galleryHash: data.hash,
                    rawData: data
                });
	        }, error => {
                console.log('forward failed');
                res.end('转存失败');
	        })
        })
    } else {
        res.end('参数不正确');
    }
}
//module.exports = handle
app.get('/', handle);
app.listen(3010)
