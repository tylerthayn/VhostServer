let Resolve = require('path').resolve
let express = require('express')
let Static = require('../lib/Static')

module.exports = (server, options) => {
	let app = module.exports = express()
	app.get('/', (req, res, next) => {
		server.Render('fs.html', {}, (error, html) => {
			if (error) {return next(error)}
			res.send(html)
		})
	})
	app.use('/c', new Static(Resolve('C:/'), {filter: Filter, view: 'details'}, server))
	app.use('/d', new Static(Resolve('D:/'), {filter: Filter}, server))
	return app
}

function Filter (filename) {
	return filename == 'System Volume Information' ? false : true
}
