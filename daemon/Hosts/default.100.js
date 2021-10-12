let Resolve = require('path').resolve
let express = require('express')
let Static = require('../lib/Static')

module.exports = (server, options) => {

	let app = module.exports = express()
	app.use(Static(Resolve('D:/ttscloud/www'), {}, server))

	return app
}

