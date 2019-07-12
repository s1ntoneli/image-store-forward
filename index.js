var storeForward = require('./storeForward.js');
var imageStoreForward = require('./image-store-forward.js');
var firebase = require('./firebase-api.js');
var crypto = require('crypto');
const app = require('express')()

function handle(req, res) {
    imageStoreForward.work(req.query.url, d=>res.json(d), d=>res.end(d));
}
module.exports = handle
app.get('/', handle);
app.listen(3010)
