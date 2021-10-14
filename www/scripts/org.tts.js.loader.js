(function () {
	function InsertScript(file,cb=()=>{}){let script=document.createElement('script');script.type='text/javascript';script.src=file;script.addEventListener('load',function(e){cb(script)});document.getElementsByTagName('head')[0].appendChild(script)}
	function InsertStyle(file,cb=()=>{}){let style=document.createElement('link');style.rel='stylesheet';style.href=file;style.addEventListener('load',function(e){cb(style)});document.getElementsByTagName('head')[0].appendChild(style)}

	let baseDir = document.currentScript.getAttribute('src').split('/').reverse().slice(1).reverse().join('/')
	let libs = document.currentScript.hasAttribute('data-libs') ? document.currentScript.getAttribute('data-libs').replace('std','jquery,jquery-ui,bootstrap,notify').split(',') : []
	let main = document.currentScript.hasAttribute('data-main') ? document.currentScript.getAttribute('data-main') : ''

	require = {
		baseUrl: baseDir,
		paths: {
			'@css': baseDir+'/../styles'
		},
		map: {
			'*': {
				'@js/core': 'org.tts.js.core',
				'@popperjs/core': 'popper'
			}
		},
		shim: {
			'bootstrap': {
				'deps': ['style!@css/bootstrap']
			},
			'jquery-ui': {
				'deps': ['style!@css/jquery-ui']
			},
			'style!@css/org.tts': {
				'deps': ['bootstrap']
			}
		},
		deps: [
			'style!@css/org.tts',
			'@js/core',
			'org.tts.js.lodash'
		],
		skipDataMain: true
	}

	let paths = require.paths
	InsertScript(baseDir+'/require.js', () => {
		define('style',{load:function(name,req,onload,config){let file=name;Object.keys(config.paths).forEach(path=>{file=file.replace(path,config.paths[path])});file=file.endsWith('.css')?file:file+'.css';InsertStyle(file,onload)}});

		require(libs, function() {
			Object.keys(paths).forEach(path => {
				main = main.replace(path, paths[path])
			})
			InsertScript(baseDir+'/'+main+'.js')
			//if (main != '') {
			//	InsertScript(main)
			//}
		})
	})
})()
