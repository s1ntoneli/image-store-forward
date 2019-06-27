var request = require('request');
var upload = require('./upload.js');
var tempfile = require('./tempfile.js');
var fs = require('fs');

function storeForwardImage(url, success, error) {
    const TEMP_DIR = __dirname + "/tmp/"
    if (!fs.existsSync(TEMP_DIR)) {
        fs.mkdirSync(TEMP_DIR);
    }
    //var url = 'https://avatar-static.segmentfault.com/239/289/2392890920-58009fba5b4dc_big64'
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

//module.exports = (req, res) => {
    storeForwardImage('https://avatar-static.segmentfault.com/239/289/2392890920-58009fba5b4dc_big64', result => {
        console.log(result);
//        res.json(result);
    }, err => {
        console.log(err);
    })
//}
