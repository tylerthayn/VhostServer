let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Resolve = require('path').resolve
let uuid = require('uuid').v4
let Uuid = () => {return uuid(uuid('ttscloud.net'))}

function Vhost (handler, host, port = '*', priority = 5, enabled = true, name = '') {
	if (typeof handler === 'string') {
		_.merge(this, JSON.parse(Fs.readFileSync(Resolve(handler), 'utf-8')))
		this.host = new RegExp('^' + this.host.trim().replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
		this.handler = require(this.handler)
	} else if (typeof handler === 'object' && !(handler instanceof Function)) {
		_.merge(this, handler)
	} else {
		this.enabled = enabled
		this.handler = handler
		this.id = Uuid()
		this.host = new RegExp('^' + host.trim().replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
		this.name = name
		this.port = port
		this.priority = priority
	}
	if (!this.handler instanceof Function) {
		throw new Error('handler must be an instanceof Function')
	}
	return this
}

Vhost.prototype.Match = function (host, port) {
	return this.host.test(host) && (this.port == '*' || this.port.toString() == port.toString())
}

Object.defineProperty(Vhost, 'Uuid', {enumerable: true, value: Uuid})

module.exports = Vhost
