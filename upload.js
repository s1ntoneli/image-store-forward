var request = require('request');

var fs = require('fs');

var upload = {
uploadFile: function(file, success, error) {
var url = 'https://sm.ms/api/upload';
var options = {
    url: url,
    method: 'POST',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    },
    formData: {
        smfile: file
    }
};
request(options, (err, res, body)=> {
	if (!err && res.statusCode == 200) {
        success(body);
    } else {
        error(err);
    }
})
}
}
module.exports=upload
