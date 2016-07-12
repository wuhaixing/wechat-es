/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const tagUrlPrefix = "https://api.weixin.qq.com/cgi-bin/tags/"
const userUrlPrefix = "https://api.weixin.qq.com/cgi-bin/user/"

function tagCreate(name) {
		return {
			"url":`${tagUrlPrefix}create`,
			"method" : "post",
			"body": {
				"tag" : {
					"name" : "${name}"
				}
			}
		}
}

function tagGet() {
		return {
			"url":`${tagUrlPrefix}get`,
			"method" : "get"
		}
}

function usersGet(nextOpenId) {
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

const UserManager = {
	tagCreate,tagGet,usersGet
}

export default UserManager
