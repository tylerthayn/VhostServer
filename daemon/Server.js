let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Resolve = require('path').resolve
let http = require('http')
let https = require('https')
let jSmart = require('jsmart')
let express = require('express')
let finalhandler = require('finalhandler')
let uuid = require('uuid').v4
let Uuid = () => {return uuid(uuid('ttscloud.net'))}

function Server () {
	this.options = typeof arguments[0] === 'undefined' ? require('./config') : typeof arguments[0] === 'string' ? require(arguments[0]) : arguments[0]
	this.servers = {}
	//this.typeHandlers = {}
	this.hosts = []
	Object.defineProperty(this.hosts,'ports',{enumerable:true,get:()=>{let ports=[].concat(this.options.ports || []);this.hosts.forEach(host=>{'*'!=host.port&&!ports.includes(host.port)&&ports.push(host.port)});return ports}})

	//this.options.typeHandlers.forEach(handler => {this.TypeHandler(handler[0], require('./lib/TypeHandlers/'+handler[1])(this))})
	this.options.vhosts.sort(Sort).forEach(vhost => {this.Vhost(vhost)})
	jSmart.prototype.getTemplate = jSmart.prototype.getFile = (name) => {return Fs.readFileSync(Resolve(this.options.templatesDir, name), 'utf8')}

	log(this.hosts.map(h=>{return h.name}))
	return this
}

//Server.prototype.log = log
Server.prototype.Error = console.error //Server.prototype.ErrorHandler

//Server.prototype.ErrorHandler = function (error) {
//	log('error!!!!')
//	log(error)
//}

Server.prototype.Handler = function (req, res) {
	let $this = this
	let hosts = this.Hosts.apply(this, req.headers.host.split(':'))

	function Handle (err) {
		let handler = hosts.next().value
		if (handler instanceof Function) {
			handler(req, res, Handle)
		} else {
			finalhandler(req, res, {onerror: $this.Error})(err)
		}
	}

	Handle()
}

Server.prototype.Hosts = function (host, port = 80) {
	function* Hosts (hosts, host, port) {
		for (i=0;i<hosts.length;i++) {
			if (host.match(hosts[i].host) != null) {
				yield hosts[i].handler
			}
		}
	}
	return Hosts(this.hosts, host, port)
}

Server.prototype.Render = function (template, data, cb) {
	Fs.readFile(Resolve(this.options.templatesDir, template), 'utf-8', (error, contents) => {
		if (error) {return cb(error)}
		let tpl = new jSmart(contents)
		cb(null, tpl.fetch(data))
	})
}

Server.prototype.Restart = function () {
	process.exit(1)
}

Server.prototype.Start = function () {
	let ports = this.hosts.ports.length == 0 ? [0] : this.hosts.ports
	ports.forEach(port => {
		let server = this.servers[port.toString()] = http.createServer(this.Handler.bind(this))
		server.listen(port, () => {console.log('Server started @ port ' + port)})
	})
	return this
}

Server.prototype.Stop = function () {
	process.exit(0)
	/*
	let cb = _.last(arguments)
	let stopService = _.Type(_.first(arguments), 'boolean')

	if (Object.keys(this.servers).length > 0) {
		let port = Object.keys(this.servers).pop()
		this.servers[port].close(() => {
			delete this.servers[port]
			this.Stop(cb)
		})
	} else {
		if (cb instanceof Function) {
			cb()
		}
		if (stopService) {

	const { spawn } = require('child_process')
	spawn(configs.serviceProgram, ['stop', configs.serviceName])
	//	}
	//}
	*/
}

Server.prototype.Stop = function () {
	Object.keys(this.servers).forEach(port => {
		this.servers[port].close(() => {
			delete this.servers[port]
		})
	})
	return this
}

Server.prototype.Use = function (handler, host, port = '*', priority = 5, enabled = true) {
	let vhost = handler instanceof Vhost ? handler : new Vhost(handler, host, port, priority, enabled)
	this.hosts.push(vhost)
	this.hosts.sort(Sort)
	return vhost.id
}

/*
Server.prototype.TypeHandler = function () {
	let types = Array.isArray(_.first(arguments)) ? _.first(arguments) : [_.first(arguments)]
	types.forEach(type => {
		this.typeHandlers[type] = _.last(arguments)
	})
}
*/

Server.prototype.Vhost = function (vhost) {
	console.log('Loading vhost...'+vhost.name)
	try {vhost.handler = require(vhost.handler)(this, vhost.options || {})} catch (e) {this.Error(e);return undefined}
	if (!vhost.handler instanceof Function) {this.ErrorHandler(new Error('handler must be an instanceof Function'))}
	if (typeof vhost.id === 'undefined') {vhost.id = Uuid()}
	if (typeof vhost.host === 'string') {vhost.host = new RegExp('^' + vhost.host.trim().replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')}
	if (typeof vhost.port === 'string') {vhost.port = parseInt(vhost.port)}
	this.hosts.push(vhost)
	this.hosts.sort(Sort)
	return vhost.id
}

function Sort (a, b) {
	if (a.priority > b.priority) return 1
	if (a.priority < b.priority) return -1
	return 0
}


if (require.main === module) {
	let server = new Server(require(process.argv.length > 2 ? process.argv[2] : '../config.js'))
	server.Start()
	global.Server = server
} else {
	module.exports = Server
}
