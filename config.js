
module.exports = {

	port: 9003,
	devBaseUrl: 'http://localhost',

  paths: {
		srcServerMain: './server/babelServer.js',
		srcServerjs: ['./server/**/*.js', './config.js'],
		srcHtml: './app/assets/index.html',
		mainJs: './app/app.js',
		js: ['./app/**/*.js'],
		css: [
			'./app/**/*.css',
		],
		dist: './public'
	},

  database: 'mongo'

};



