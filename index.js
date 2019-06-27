var storeForward = require('./storeForward.js');

module.exports = (req, res) => {
    var url = req.query.url;
    if (url) {
        storeForward.store(url, result => {
            res.json(result);
	}, error => {
            res.end('转存失败');
	})
    } else {
        res.end('参数不正确');
    }
}
