let Resolve = require('path').resolve
let express = require('express')
let ServeIndex = require('serve-index')
let ServeStatic = require('serve-static')
//let Static = require('../lib/Static')

module.exports = (server, options) => {

	let app = express()
	app.use(require('cors')())
	app.use(ServeIndex('D:/ttscloud/www', {icons: true}))
	app.use(ServeStatic('D:/ttscloud/www', {index: false}))

	return app
}

