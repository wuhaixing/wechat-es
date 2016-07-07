/**
* 发送客服消息
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN
*/

const customerUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/custom/"

class CustomerMessageManager {

		/**
		* 客服接口-发消息-文本消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param content 要发送的内容
		*/
    static text(openId,content) {
    	return {
				  "url":`${customerUrlPrefix}send`,
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

		/**
		* 客服接口-发消息-图片消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param mediaId 要发送的图片的mediaId
		*/
    static image(openId,mediaId) {
    	return {
				  "url":`${customerUrlPrefix}send`,
				  "method" : "post",
				  "body": {
							   "touser":openId,
							    "msgtype":"image",
									"image":
							    {
							         "media_id":mediaId
							    }
							}
				}
    }
		/**
		* 客服接口-发消息-语音消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param mediaId 要发送的语音的mediaId
		*/
		static voice(openId,mediaId) {
			return {
					"url":`${customerUrlPrefix}send`,
					"method" : "post",
					"body": {
								 "touser":openId,
									"msgtype":"voice",
									"voice":
									{
											 "media_id":mediaId
									}
							}
				}
		}
		/**
		* 客服接口-发消息-视频消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param mediaId 要发送的视频的mediaId
		*
		*/
		static video(openId,mediaId,thumbMediaId,title,description) {
			return {
					"url":`${customerUrlPrefix}send`,
					"method" : "post",
					"body": {
								 "touser":openId,
									"msgtype":"video",
									"video":
									{
											 "media_id":mediaId,
											 "thumb_media_id":thumbMediaId,
									     "title":title,
									     "description":description
									}
							}
				}
		}

		/**
		* 客服接口-发消息-音乐消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param musicUrl 要发送的音乐的url
		*
		*/
		static music(openId,musicUrl,HQMusicUrl,thumbMediaId,title,description) {
			return {
					"url":`${customerUrlPrefix}send`,
					"method" : "post",
					"body": {
								 "touser":openId,
									"msgtype":"music",
									"music":
									{
											 "title":title,
											 "description":description,
											 "musicurl":musicUrl,
											 "hqmusicurl":HQMusicUrl,
											 "thumb_media_id":thumbMediaId
									}
							}
				}
		}
		/**
		* 客服接口-发消息-图文消息
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#2
		*
		* @param openId 消息接收对象的openId
		* @param articles 要发送的图文消息数组
		*
		*/
		static news(openId,articles) {
			return {
					"url":`${customerUrlPrefix}send`,
					"method" : "post",
					"body": {
								 "touser":openId,
									"msgtype":"news",
									"news":
									{
											 "articles":articles
									}
							}
				}
		}
}

export default CustomerMessageManager
