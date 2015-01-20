var file = require('./file');

for (var i in file) {
    if ('function' == typeof file[i]) {
	file[i](".");
    }
}
