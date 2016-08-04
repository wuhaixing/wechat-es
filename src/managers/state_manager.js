/**
* 数据统计
*/

const stateUrlPrefix = "https://api.weixin.qq.com/datacube/"

function _populateMessage(stateType,beginDate,endDate) {
	return {
		"url":`${stateUrlPrefix}${stateType}`,
		"method" : "post",
		"body": {
			"begin_date": beginDate,
			"end_date": endDate
		}
	}
}
/**
* 用户分析数据接口
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141082&token=&lang=zh_CN
*/
function userSummary(beginDate,endDate) {
		return _populateMessage('getusersummary',beginDate,endDate)
}

function userCumulate(beginDate,endDate) {
		return _populateMessage('getusercumulate',beginDate,endDate)
}

/**
* 图文分析数据接口
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141084&token=&lang=zh_CN
*/

/**
*
*获取图文群发每日数据,最大时间跨度 1
*/
function articleSummary(beginDate,endDate) {
		return _populateMessage('getarticlesummary',beginDate,endDate)
}

/**
*
*获取图文群发总数据,最大时间跨度 1
*/
function articleTotal(beginDate,endDate) {
		return _populateMessage('getarticletotal',beginDate,endDate)
}

/**
*
*获取图文统计数据,最大时间跨度 3
*/
function read(beginDate,endDate) {
		return _populateMessage('getuserread',beginDate,endDate)
}

/**
*
*获取图文统计分时数据,最大时间跨度 1
*/
function readHour(beginDate,endDate) {
		return _populateMessage('getuserreadhour',beginDate,endDate)
}

/**
*
*获取图文分享转发数据,最大时间跨度 7
*/
function share(beginDate,endDate) {
		return _populateMessage('getusershare',beginDate,endDate)
}

/**
*
*获取图文分享转发分时数据,最大时间跨度 1
*/
function shareHour(beginDate,endDate) {
		return _populateMessage('getusersharehour',beginDate,endDate)
}

/**
* 消息分析数据接口
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141085&token=&lang=zh_CN
*/

/**
*
* 获取消息发送概况数据,最大时间跨度 7
*/
function msg(beginDate,endDate) {
		return _populateMessage('getupstreammsg',beginDate,endDate)
}

/**
*
* 获取消息分送分时数据,最大时间跨度 1
*/
function msgHour(beginDate,endDate) {
		return _populateMessage('getupstreammsghour',beginDate,endDate)
}

/**
*
* 获取消息发送周数据,最大时间跨度 30
*/
function msgWeek(beginDate,endDate) {
		return _populateMessage('getupstreammsgweek',beginDate,endDate)
}

/**
*
* 获取消息发送月数据,最大时间跨度 30
*/
function msgMonth(beginDate,endDate) {
		return _populateMessage('getupstreammsgmonth',beginDate,endDate)
}

/**
*
* 获取消息发送分布数据,最大时间跨度 15
*/
function msgDist(beginDate,endDate) {
		return _populateMessage('getupstreammsgdist',beginDate,endDate)
}

/**
*
* 获取消息发送分布周数据,最大时间跨度 30
*/
function msgDistWeek(beginDate,endDate) {
		return _populateMessage('getupstreammsgdistweek',beginDate,endDate)
}

/**
*
* 获取消息发送分布月数据,最大时间跨度 30
*/
function msgDistMonth(beginDate,endDate) {
		return _populateMessage('getupstreammsgdistmonth',beginDate,endDate)
}

/**
* 接口分析数据接口
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141086&token=&lang=zh_CN
*/

/**
*
* 获取接口分析数据,最大时间跨度 30
*/
function interfaceSummary(beginDate,endDate) {
		return _populateMessage('getinterfacesummary',beginDate,endDate)
}

/**
*
* 获取接口分析分时数据,最大时间跨度 1
*/
function interfaceSummaryHour(beginDate,endDate) {
		return _populateMessage('getinterfacesummaryhour',beginDate,endDate)
}

export default {
	userSummary,userCumulate,
	articleSummary,articleTotal,read,readHour,share,shareHour,
	msg,msgHour,msgWeek,msgMonth,
	msgDist,msgDistWeek,msgDistMonth,
	interfaceSummary,interfaceSummaryHour
}
