var fs = require('fs'),
    path = require('path'),
    co = require('co')

module.exports = {
    sync_file: function (dirname) {
        var filenames = fs.readdirSync(dirname);

        for (var i in filenames) {
            console.log("sync_file " + filenames[i]);
        }
    },

    async_file: function (dirname) {
        fs.readdir(dirname, function (err, filenames) {
            for (var i in filenames) {
                console.log("async_file " + filenames[i]);
            }
        });
    },

    co_file: function (dirname) {
        co(function *() {
            try {
                var filenames = yield Promise.resolve( fs.readdirSync(dirname) );
                console.log("co_file " + filenames);
            } catch (e) {
                console.log(e);
            }
        });
    },

    co_promise_file: function (dirname) {
        co(function *() {
            return yield Promise.resolve( fs.readdirSync(dirname) );
        }).then(function (filenames) {
            console.log("co_promise_file " + filenames);
        }, function (err) {
            console.log(err);
        });
    },

    // callback hell
    callback_count: function self (dirname) {
        fs.readdir(dirname, function (err, files) {
            if (err)
                return console.error(err.stack);

            files.forEach(function (filename) {
                var filepath = path.join(dirname, filename);
                fs.stat(filepath, function (err, stat) {
                    if (err)
                        return console.error(err.stack);

                    if(!stat.isFile() && valid_folder(filename))
                        return self(filepath);

                    if(is_js(filename)) {
                        fs.readFile(filepath, 'utf8', function (err, content) {
                            if (err)
                                return console.error(err.stack);

                            console.log("callback_count " + filepath + " has " + content.split('\n').length + " lines.");
                        });
                    }
                });
            });
        });
    },

    co_count: function self (dirname) {
        co(function * count () {
            var files = yield Promise.resolve( fs.readdirSync(dirname) );

            for (var i in files) {
                var filename = files[i];
                var filepath = path.join(dirname, filename);
                var stat = yield Promise.resolve( fs.statSync(filepath) );

                if (!stat.isFile() && valid_folder(filename)) {
                    self(filepath);
                }

                if (is_js(filename)) {
                    var file_detail = yield Promise.resolve( fs.readFileSync(filepath, 'utf8') );
                    console.log("co_count " + filepath + " has " + file_detail.split('\n').length + " lines.")
                }
            }
        });
    }
}

function valid_folder (filename) {
    return 'node_modules' !== filename && '.' !== filename[0]
}

function is_js (filename) {
    return '.js' == path.extname(filename) 
}