var request = require('request');
var upload = require('./upload.js');
var tempfile = require('./tempfile.js');
var fs = require('fs');

var storeForward = {
    store: function(url, success, error) {
        const TEMP_DIR = "/tmp/"
        if (!fs.existsSync(TEMP_DIR)) {
            fs.mkdirSync(TEMP_DIR);
        }
        var filename = tempfile.filename();
        var tempFilePath = TEMP_DIR + filename
        console.log('md5 ' + filename);
        var filewriter = fs.createWriteStream(tempFilePath)
        request.get(url).pipe(filewriter).on('close', ()=> {
            upload.uploadFile(fs.createReadStream(tempFilePath), res => {
                fs.unlinkSync(tempFilePath);
                success(res);
            }, err => {
                fs.unlinkSync(tempFilePath);
                error(err);
            })
        });
    }
}

module.exports = storeForward
