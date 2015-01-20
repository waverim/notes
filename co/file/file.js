var fs = require('fs'),
    co = require('co')

module.exports = {
    sync_file: function (src) {
	var filenames = fs.readdirSync(src);

	for (var i in filenames) {
	    console.log(filenames[i]);
	}
    },

    async_file: function (src) {
	fs.readdir(src, function (err, filenames) {
	    for (var i in filenames) {
		console.log(filenames[i]);
	    }
	});
    },

    co_file: function (src) {
	co(function *() {
	    try {
		var filenames = yield Promise.resolve( fs.readdirSync(src) );
		console.log(filenames);
	    } catch (e) {
		console.log(e);
	    }
	});
    },

    co_promise_file: function (src) {
	co(function *() {
	    return yield Promise.resolve( fs.readdirSync(src) );
	}).then(function (filenames) {
	    console.log(filenames);
	}, function (err) {
	    console.log(err);
	});
    }
}
