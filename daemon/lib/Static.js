let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let ServeStatic = require('serve-static')
let ServeIndex = require('./serve-index')

let defaults = {
	icons: true,
	index: ['index.html', 'index.htm']
}

module.exports = function Static (root, opts, server) {
	let options = new _.Options({}, defaults, opts || {})
	let staticServe = new ServeStatic(root, options)
	let indexServe = new ServeIndex(root, options)

	function HandleDirectory (req, res, next) {
		let path = Path.resolve(root, req.path == '/' ? '' : decodeURIComponent(req.path).replace(/^\//, ''))
		Fs.stat(path, (error, stats) => {
			if (error) {return next(error)}
			if (stats.isDirectory()) {
				return IndexExists(path, _.clone(options.index), index => {
					if (index == null) {
						try {
							return indexServe(req, res, (error) => {
								next(error)
							})
						} catch (e) {server.Error(e);next()}
					}
					next()
				})
			}
			next()
		})
	}

	function HandleTypeHandlers (req, res, next) {
		if (Reflect.has(server.typeHandlers, Path.extname(req.path))) {
			req.root = root
			return server.typeHandlers[Path.extname(req.path)](req, res, next)
		}
		next()
	}

	let handler = function (req, res, next) {
		HandleTypeHandlers(req, res, error => {
			if (error) {server.Error(error)}
			HandleDirectory(req, res, error => {
				if (error) {
					server.Error(error)
					return next()
				}
				staticServe(req, res, next)
			})
		})
	}

	return handler
}


function GenerateIndex (path, cb) {
	cb(null, path)
}

function IndexExists (dir, indexes, cb) {
	function Exists () {
		if (indexes.length == 0) {return cb(null)}
		let index = indexes.shift()
		log(dir + '::' + index)
		Fs.access(Path.resolve(dir, index), error => {
			if (error) {return Exists()}
			return cb(index)
		})
	}
	Exists()
}


