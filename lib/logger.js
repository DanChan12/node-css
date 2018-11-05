const log4js = require('log4js')
const log4jsConfig = {
	appenders:{
		log:{
			type:'file',
			filename:'./logs/logger.log',
			maxLogSize:102400,
			alwaysIncludePattern: true,
			pattern: '-yyyy-MM-dd-hh:mm:ss'
		}
	},
	categories: {
		default: { 
			appenders: ['log'], 
			level: 'all' 
		} 
	}
}
log4js.configure(log4jsConfig)
const logger = log4js.getLogger();
module.exports = logger