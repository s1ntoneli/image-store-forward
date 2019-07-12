var storeForward = require('./storeForward.js');
var firebase = require('./firebase-api.js');
var crypto = require('crypto');
const app = require('express')()

function md5(text) {
    const hash = crypto.createHash('md5');
    hash.update(text);
    return hash.digest('hex')
}

var imageStoreForward = {
    work: function (url, success, error) {
    //    var url = 'https://www.baidu.com/img/bd_logo1.png';
        if (url) {
            const key = md5(url);
            firebase.find(key, data => {
                console.log('found', key, url);
                success(data);
            }, err => {
                console.log('not found', key, url);
                storeForward.store(url, result => {
    //                console.log('forwarded', result);
                    var data = JSON.parse(result).data
                    console.log('data', data)
                    if (!data) {
                        error(JSON.stringify({code: -1, msg: "forward failed"}));
                        return;
                    }
                    firebase.save(key, url, key, data.url, data.hash, data)
                    success({
                        originalUrl: url,
                        originalHash: key,
                        galleryUrl: data.url,
                        galleryHash: data.hash,
                        rawData: data
                    });
    	        }, err => {
                    console.log('forward failed');
                    error(JSON.stringify({code: -1, msg: "forward failed " + err}));
    	        })
            })
        } else {
           error(JSON.stringify({code: -2, msg: "params not right"}));
        }
    }
}
module.exports = imageStoreForward
