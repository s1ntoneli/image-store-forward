var tempfile = {
    filename: () => {
        var random = Math.floor(Math.random()*(1<<10014));
        var time = new Date().getTime();
        return "" + time + random
    }
}

module.exports = tempfile
