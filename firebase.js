const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
/*
var docRef = db.collection('image_map').doc('ABCDEFT');
var setAda = docRef.set({
    originalUrl: 'http://google.com/icon2.ico',
    galleryUrl: 'http://baidu.com/gallery/123.ico',
    originalHash: 'ABCDEFT',
    galleryHash: 'HADJSOFSJj'
})
console.log('finished');

var query = db.collection('image_map').doc('ABCDEFT');
var queryRef = query.get()
.then(doc=> {
	if (!doc.exists) {
			console.log('No such document!');
	} else {
			console.log('Document data:', doc.data());
	}
}).catch(err=>{
	console.log('error', err);
});
*/


var firebase = {
    find: (key, res, error) => {
        var docRef = db.collection('image_map').doc(key);
        var queryRef = docRef.get()
            .then(doc => {
                if (doc.exists) {
                    res(doc.data());
                } else {
                    err('Document not exists');
                }
            }).catch(err => {
                error(err);
            });
    },
    save: (key, originalUrl, originalHash, galleryUrl, galleryHash, rawData) => {
        var docRef = db.collection('image_map').doc(originalHash);
        //console.log('save', galleryUrl, galleryHash, rawData);
        docRef.set({
            originalUrl: originalUrl,
            originalHash: originalHash,
            galleryUrl: galleryUrl,
            galleryHash: galleryHash,
            rawData: rawData
        });
    }
}

module.exports = firebase;
