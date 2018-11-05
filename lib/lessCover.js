const fs = require('fs')
const less = require('less')
const path = require('path')
const logger = require('./logger.js')
const config = require('../config.json')

let lessCover = async file => {
	try{
		let _data = await fs.readFileSync(file,'utf8')
		less.render(_data, async (err, css) => {
			if(err){
				logger.error(`message:${err.message}\nline:${err.line}\nindex:${err.index}`)
				return
			}
			let _path = file.replace(/\.less$/, config.outputStyle)
			await fs.writeFileSync(_path ,css.css, 'utf8')
			await fs.chmodSync(_path,0o777)
		})
	}
	catch(e){
		logger.error(e)
	}
}

module.exports = lessCover