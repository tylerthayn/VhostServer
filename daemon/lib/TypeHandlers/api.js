let Resolve = require('path').resolve

module.exports = (server, options = {}) => {
	return (req, res, next) => {
		let path = Resolve(req.root, req.path.replace(/^\//, ''))
		require(path)(req, res, next, server)
	}
}
