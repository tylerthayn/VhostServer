let express = require('express')
let Server = require('./Server')

let server = new Server()


let app1 = express()
//app1.get('/', (req, res, next) => {
//	res.send('ttscloud.net')
//})
app1.set('id', server.Use(app1, 'ttscloud.net'))


let app2 = express()
app2.get('/', (req, res, next) => {
	res.end('*.ttscloud.net')
})
app2.set('id', server.Use(app2, '*.ttscloud.net'))

let app3 = express()
app3.get('/', (req, res, next) => {
	res.json(server.servers)
	log(server.servers['80'].address())
})
app3.set('id', server.Use(app3, 'info.*'))


//log(server.hosts)
//log(server.servers)
//log(server.running)

server.Start()

