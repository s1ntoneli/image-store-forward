var request = require('request');
var rp = require('request-promise');

var API_URL = 'https://us-central1-tools-4ce04.cloudfunctions.net';

function requestAPI(route, params) {
    //return rp.get(API_URL+'/'+route+"?key=ohash");
    var options = {
        uri: API_URL + '/' + route,
        qs: params
    }
    return rp(options);
}

var firebase = {
    find: async (key, res, error) => {
        var result = JSON.parse(await requestAPI('find_transformed_image', {key: key}));
        if (result && result.galleryHash) {
            res(result);
        } else {
            error('not found');
        }
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
//firebase.find('ohash',console.log, console.error).catch(console.error);
