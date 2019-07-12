var request = require('request');
var rp = require('request-promise');

var API_URL = 'https://us-central1-tools-4ce04.cloudfunctions.net';

function requestAPI(route, params, cb) {
    //return rp.get(API_URL+'/'+route+"?key=ohash");
    var options = {
        uri: API_URL + '/' + route,
        qs: params,
        json: true
    }
    return request(options, cb);
}

var firebase = {
    find: (key, res, error) => {
//        console.log('request', key)
        requestAPI('find_transformed_image', {key: key}, (err, response, body)=> {
            if (err) {
                error(err);
            } else if (body && body.galleryHash) {
                //console.log(body);
                res(body);
            } else {
                error('not found');
            }
        })
    },
    save: (key, originalUrl, originalHash, galleryUrl, galleryHash, rawData) => {
        //console.log('save', galleryUrl, galleryHash, rawData);
        requestAPI('save_transformed_image', {
            originalUrl: originalUrl,
            originalHash: originalHash,
            galleryUrl: galleryUrl,
            galleryHash: galleryHash,
            rawData: rawData
        });
    }
}

module.exports = firebase;
//firebase.find('ohash',console.log, console.error)
