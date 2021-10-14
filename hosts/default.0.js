let express = require('express')
//let handlers = {
//	api: require('../lib/TypeHandlers/api')
//}

module.exports = (server, options) => {

	let app = module.exports = express()
	app.use('/~', require('./admin')(server, options))
	//app.use.apply(app, handlers.api(server, {root: 'D:/ttsclod/www'}))

	return app
}

