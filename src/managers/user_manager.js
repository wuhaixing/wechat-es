/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const userUrlPrefix = "https://api.weixin.qq.com/cgi-bin/user/"

function getList(nextOpenId) {
	if(nextOpenId) {
		return {
				"url":`${userUrlPrefix}get`,
				"method" : "get",
				"parameters":
					{
						"next_openid": nextOpenId
					}
			}
	} else {
		return {
				"url":`${userUrlPrefix}get`,
				"method" : "get"
			}
	}
}

function getInfo(openId,lang) {
	return {
			"url":`${userUrlPrefix}get`,
			"method" : "get",
			"parameters":
				{
					"openid": openId,
					"lang": lang || "zh-CN"
				}
		}
}

function batchGetInfo(users) {
	return {
		"url":`${tagUrlPrefix}members/batchuntagging`,
		"method" : "post",
		"body": {
			"user_list" : users
	}
}

function setLang(users,lang) {
	if(users && users.length > 0) {
			const params = users.map(user => {
												return {
													"openid":user,
													"lang": lang || "zh-CN"
												}
											})
		  return params
	} else {
		return []
	}

}

export default {
	getList,getInfo,batchGetInfo,setLang
}
