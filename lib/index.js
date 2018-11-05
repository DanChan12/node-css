const config = require('../config.json')
const logger = require('./logger.js')
const lessCover = require('./lessCover.js')
const scssCover = require('./scssCover.js')
const chokidar = require('chokidar')
const arguments = process.argv.splice(2)
!(function(params){
	if(params.length <= 0) return
	let keys = Object.keys(config)
	params.forEach((item, index) => {
		config[keys[index]] = item
	})
})(arguments);
const watcher = chokidar.watch(config.path)

let cover = path => {
	let paths = path.split('/'),
		fileName = paths[paths.length-1]
	if(fileName.match(/^[^\_].*?\.less$/) && (config.compile == 'less' || config.compile == 'all')){
		setTimeout(() => {
			lessCover(path)
		},100)
    }
    if(fileName.match(/^[^\_].*?\.scss$/) && (config.compile == 'scss' || config.compile == 'all')){
		setTimeout(() => {
			scssCover(path)
		},100)
    }
}

if(config.mode == 'now'){
	const fs = require('fs');
	const path = require('path');
	const filePath = path.resolve(config.path);
	let fileDisplay = (filePath) => {
	    fs.readdir(filePath,function(err, files) {
	        if (err) {
	            logger.warn(err)
	        } 
	        else {
	            files.forEach(function(filename) {
	                let filedir = path.join(filePath, filename);
	                fs.stat(filedir, function(eror, stats) {
	                    if (eror) {
	                        logger.warn('获取文件stats失败');
	                    } 
	                    else {
	                        let isFile = stats.isFile(); //是文件
	                        let isDir = stats.isDirectory(); //是文件夹
	                        if (isFile) {
	                        	cover(filedir)
	                        }
	                        if (isDir) {
	                            fileDisplay(filedir);
	                        }
	                    }
	                })
	            });
	        }
	    });
	}
	fileDisplay(filePath);
	setTimeout(() => {
		console.log('告辞')
		process.exit()
	},3000)
}

else{
	watcher.on('change', path => {
		cover(path)
	})
}



