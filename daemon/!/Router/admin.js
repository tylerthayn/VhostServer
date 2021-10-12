let express = require('express')

module.exports = (server) => {
	let app = express()

	app.get('/restart', (req, res, next) => {
		res.end('Restarting... ...')
		server.Restart()
	})

	app.get('/stop', (req, res, next) => {
		res.end('Stopping...')
		process.exit(0)
	})

	app.get('/req', (req, res) => {
		//res.send(Object.keys(req))
		let data = {}
		Object.keys(req).forEach(k => {
			try {
				data[k] = req[k].toString()
			} catch (e) {}
		})
		res.send(JSON.stringify(data, null, 4))
	})

	return app
}

