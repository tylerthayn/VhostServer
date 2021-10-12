let Resolve = require('path').resolve
let express = require('express')

module.exports = (server, options) => {
	let app = module.exports = express()

	app.use('/', express.static(Resolve('D:/TTS.COM/scripts')))
	return app
}

