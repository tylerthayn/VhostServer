module.exports = {
	ports: [80],
	templatesDir: 'D:/ttscloud/templates',
	typeHandlers: [
		[['.api'], 'api']
	],
	vhosts: [
		{
			enabled: true,
			handler: 'D:/ttscloud/hosts/default.0.js',
			host: /^.*$/,
			id: 'default',
			name: 'default',
			port: 80,
			priority: 0
		},
		{
			enabled: true,
			handler: 'D:/ttscloud/hosts/js.js',
			host:  /^.*$/,
			id: 'js.*',
			name: 'js',
			port: 80,
			priority: 10,
			options: {
				base: 'D:/ttscloud/www'
			}
		},
		{
			enabled: true,
			handler: 'D:/Maps/code/server/index.js',
			host: /maps\..*/,
			id: 'maps',
			name: 'maps',
			port: 80,
			priority: 50
		},
		{
			enabled: true,
			handler: 'D:/ttscloud/hosts/fs.js',
			host: 'fs.ttscloud.net',
			id: 'fs',
			name: 'fs',
			port: 80,
			priority: 60
		},
		{
			enabled: true,
			handler: 'D:/ttscloud/hosts/default.100.js',
			host: /^.*$/,
			id: 'default',
			name: 'default',
			port: 80,
			priority: 100
		}
	]
}

