let Resolve = require('path').resolve

exports.ports = [80]
exports.templatesDir = 'D:/ttscloud/templates'
exports.typeHandlers = [
	[['.api'], 'api']
]
exports.vhosts = []
exports.vhostsPath = Resolve(__dirname, 'vhosts')

