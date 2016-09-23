var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		dbUrl: 'mongodb://x24spartan:x24spartan@ds035826.mlab.com:35826/x24sprtans'

	},
	production: {
		rootPath: rootPath,
		dbUrl: 'mongodb://x24spartan:x24spartan@ds035826.mlab.com:35826/x24sprtans'
	}
}
