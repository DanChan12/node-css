const fs = require('fs')
const sass = require('node-sass')
const path = require('path')
const logger = require('./logger.js')
const config = require('../config.json')

let scssCover = async file => {
	try{
		let css = await sass.renderSync({
			file:file,
			indentWidth:4,
			outputStyle:'expanded'
		})
		let _path = file.replace(/\.scss$/, config.outputStyle)
		await fs.writeFileSync(_path ,css.css, {encoding:'utf8',mode:0o777})
		await fs.chmodSync(_path,0o777)
	}
	catch(e){
		logger.error(e)
	}
}

module.exports = scssCover