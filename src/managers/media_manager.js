/**
* MediaManager
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726&token=&lang=zh_CN
* 素材管理
*/

const mediaUrlPrefix = "https://api.weixin.qq.com/cgi-bin/media/"

/**
* 新增临时素材
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726&token=&lang=zh_CN
* 公众号经常有需要用到一些临时性的多媒体素材的场景，例如在使用接口特别是发送消息时，对多媒体文件、
* 多媒体消息的获取和调用等操作，是通过media_id来进行的。素材管理接口对所有认证的订阅号和服务号
* 开放。通过本接口，公众号可以新增临时素材（即上传临时多媒体文件）。
* 请注意：
* 1、对于临时素材，每个素材（media_id）会在开发者上传或粉丝发送到微信服务器3天后自动删除
*（所以用户发送给开发者的素材，若开发者需要，应尽快下载到本地），以节省服务器资源。
* 2、media_id是可复用的。
* 3、素材的格式大小等要求与公众平台官网一致。
* 上传的临时多媒体文件有格式和大小限制，如下：
*     图片（image）: 1M，支持JPG格式
*     语音（voice）：2M，播放长度不超过60s，支持AMR\MP3格式
*     视频（video）：10MB，支持MP4格式
*     缩略图（thumb）：64KB，支持JPG格式
* 4、媒体文件在后台保存时间为3天，即3天后media_id失效。
* 返回说明
* 发送该消息后，正确情况下微信服务器返回的JSON数据包结果如下：
*   {"type":"TYPE","media_id":"MEDIA_ID","created_at":123456789}
* @param type 媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
* @param media form-data中媒体文件标识，有filename、filelength、content-type等信息
*
*/
function media(type,media) {
	return {
		"url":`${mediaUrlPrefix}upload`,
		"method" : "upload",
		"parameters": {	"type": type },
		"body" : {"media" : media }
	}
}

/**
* 获取临时素材
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738727&token=&lang=zh_CN
* 公众号可以使用本接口获取临时素材（即下载临时的多媒体文件）。
* 请注意，视频文件不支持https下载，调用需http协议，所以需指明所获取的是否为视频文件。
*
* @param mediaId 媒体文件ID
* @param isVideo 媒体是否为视频文件
*
*/
function get(mediaId,isVideo) {
	let urlPrefix = isVideo ?
		"http://api.weixin.qq.com/cgi-bin/media/"
		:
		"https://api.weixin.qq.com/cgi-bin/media/"

	return {
		"url":`${urlPrefix}get`,
		"method" : "get",
		"parameters": {	"media_id": mediaId }
	}
}

/**
* 上传图文消息内的图片并获取URL
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729&token=&lang=zh_CN
* 永久图片素材新增后，将带有URL返回给开发者，开发者可以在腾讯系域名内使用（腾讯系域名外使用，图片将被屏蔽）。
* 请注意，本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。
* 图片仅支持jpg/png格式，大小必须在1MB以下
* 返回说明
* 发送该消息后，正确情况下微信服务器返回的JSON数据包结果如下：
*   { "url":  "http://mmbiz.qpic.cn/mmbiz/gLO17UPS6FS2" }
* 其中url就是上传图片的URL，可用于后续群发中，放置到图文消息中。
*
* @param img 文件路径
*
*/
function image(img) {
	return {
		"url":`${mediaUrlPrefix}uploadimg`,
		"method" : "upload",
		"body" : {"media" : img }
	}
}

export {
	get,media,image
}
