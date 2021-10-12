let express = require('express')
let Fs = require('fs'), Path = require('path')

module.exports = (server) => {
	let app = express()

	Fs.readdir(__dirname, {withFileTypes: true}, (error, entries) => {
		if (error) {return log(error)}
		entries.filter(e => {return (e.isFile() && e.name.endsWith('.js') && e.name != 'index.js')}).forEach(e => {
			app.use('/'+e.name.replace(/\.js$/, ''), require('./'+e.name)(server))
		})
	})

	return app
}
