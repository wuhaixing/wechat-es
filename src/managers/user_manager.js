/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const userUrlPrefix = "https://api.weixin.qq.com/cgi-bin/user/"

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

export default {
	usersGet
}
