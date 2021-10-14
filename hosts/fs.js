let express = require('express')
let Resolve = require('path').resolve
let ServeIndex = require('serve-index')
let ServeStatic = require('serve-static')

module.exports = (server, options) => {
	let app = module.exports = express()
	app.get('/', (req, res, next) => {
		server.Render('fs.html', {}, (error, html) => {
			if (error) {return next(error)}
			res.send(html)
		})
	})

	app.use('/d', ServeStatic(Resolve('D:/'), {index: ['index.html']}), ServeIndex(Resolve('D:'), {icons: true}))
	app.use('/c', ServeStatic(Resolve('C:/'), {index: ['index.html']}), ServeIndex(Resolve('C:'), {icons: true}))

	return app
}

function Filter (filename) {
	return filename == 'System Volume Information' ? false : true
}
