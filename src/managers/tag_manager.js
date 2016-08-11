/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const tagUrlPrefix = "https://api.weixin.qq.com/cgi-bin/tags/"

function create(name) {
		return {
			"url":`${tagUrlPrefix}create`,
			"method" : "post",
			"body": {
				"tag" : {
					"name" : name
				}
			}
		}
}

function get() {
		return {
			"url":`${tagUrlPrefix}get`,
			"method" : "get"
		}
}

export default {
	create,get
}
