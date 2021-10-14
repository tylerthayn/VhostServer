let Resolve = require('path').resolve
let express = require('express')

module.exports = (server, options) => {
	let app = express()
	options.base = options.base || '..//'

	app.use('/:type/:file', (req, res, next) => {
		if (req.params.type.match(/^(scripts|styles)$/)) {
			log(req.params.type+'/'+req.params.file)
			return res.sendFile(Resolve(options.base, req.params.type, req.params.file))
		}
		next()
	})


	//app.use('/scripts', express.static(Resolve('D:/ttscloud/www/scripts'), {index: false}))
	//app.use('/styles', express.static(Resolve('D:/ttscloud/www/styles'), {index: false}))
	return app
}

