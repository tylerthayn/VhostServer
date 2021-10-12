let _ = require('org.tts.js.lodash')

let Vhost = require('./Server.Vhost')

let host = new Vhost(()=>{}, '*', 80, 3, true, 'TestHost')
log(host)

let host2 = new Vhost(host)
log(host2)

console.log(host.Export())


