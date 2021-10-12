function TypeHandler (type, handler) {
	return (server, options) => {
		let fn = (req, res, next) => {
			handler(req, res, next, server, options)
		}
		return ['/*.'+type+'$', fn]
	}
}

module.exports = TypeHandler
