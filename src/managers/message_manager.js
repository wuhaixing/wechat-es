/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
* 管理消息
*/

const massUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/mass/"
const customUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/custom/"

class MessageManager {

	static textToTag(content,tagId) {
		let filter = {"is_to_all":true}
		if(tagId) {
			filter = { "is_to_all":false,"tag_id":tagId }
		}
        return {
				  "url":`${massUrlPrefix}sendall`,
				  "method" : "post",
				  "body": {
							   "filter":filter,
							   "text":{
							      "content":content
							   },
							   "msgtype":"text"
							}
				}
    }

    static textToCustom(content,openId) {
    	return {
				  "url":`${customUrlPrefix}send`,
				  "method" : "post",
				  "body": {
							   "touser":openId,
							    "msgtype":"text",
							    "text":
							    {
							         "content":content
							    }
							}
				}
    }

}

export default MessageManager
