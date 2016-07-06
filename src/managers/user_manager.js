/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const tagUrlPrefix = "https://api.weixin.qq.com/cgi-bin/tags/"
const userUrlPrefix = "https://api.weixin.qq.com/cgi-bin/user/"

class UserManager {
	
	static tagCreate(name) {
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

    static tagGet() {
        return {
				  "url":`${tagUrlPrefix}get`,
				  "method" : "get"
				}   	
    }

    static usersGet(nextOpenId) {
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

}

export default UserManager