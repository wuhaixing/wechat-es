/**
* MaterialManager
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729&token=&lang=zh_CN
* 永久素材管理
* 除了3天就会失效的临时素材外，开发者有时需要永久保存一些素材，届时就可以通过本接口新增永久素材。
*
* 请注意：
* 1、新增的永久素材也可以在公众平台官网素材管理模块中看到
* 2、永久素材的数量是有上限的，请谨慎新增。图文消息素材和图片素材的上限为5000，其他类型为1000
* 3、素材的格式大小等要求与公众平台官网一致。具体是，图片大小不超过2M，支持bmp/png/jpeg/jpg/gif格式，
*   语音大小不超过5M，长度不超过60秒，支持mp3/wma/wav/amr格式
*/
import Immutable,{List} from 'immutable'

const mediaUrlPrefix = "https://api.weixin.qq.com/cgi-bin/media/"
const materialUrlPrefix = "https://api.weixin.qq.com/cgi-bin/material/"

/**
* 上传图文消息内的图片获取URL
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738726&token=&lang=zh_CN
* 本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。图片仅支持jpg/png格式，大小必须在1MB以下。
* @param media form-data中媒体文件标识，有filename、filelength、content-type等信息
*
*/
function image(image) {
	return {
		"url":`${mediaUrlPrefix}uploadimg`,
		"method" : "upload",
		"body" : {"media":image}
	}
}
/**
* 单条永久图文素材
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729&token=&lang=zh_CN
*
*
* @param title 标题
* @param thumbMediaId 图文消息的封面图片素材id（必须是永久mediaId）
* @param author 作者
* @param digest 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
* @param showCoverPic 是否显示封面，false不显示，true即显示
* @param content 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
* @param contentSourceUrl 图文消息的原文地址，即点击“阅读原文”后的URL
*
*/
function article(title,thumbMediaId,author,digest,showCoverPic,content,contentSourceUrl) {
	let _showCoverPic = showCoverPic ? 1 : 0
	return {
		"url":`${materialUrlPrefix}add_news`,
		"method" : "post",
		"body": {
					 "articles":[{
						 "title":title,
						 "thumb_media_id":thumbMediaId,
						 "author":author,
						 "digest":digest,
						 "show_cover_pic":_showCoverPic,
						 "content":content,
						 "content_source_url":contentSourceUrl
					 }]
				}
	}
}
/**
* 新增单条永久图文素材
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1444738729&token=&lang=zh_CN
*
* @param articles 图文消息列表
* @param article 永久图文素材，结构同 article
*  { title, //标题
*    thumbMediaId, //图文消息的封面图片素材id（必须是永久mediaId）
*    author, //作者
*    digest, //图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
*    showCoverPic, //是否显示封面，false不显示，true即显示
*    content, //图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
*    contentSourceUrl //图文消息的原文地址，即点击“阅读原文”后的URL
* }
*/
function addArticle(article,articles = new List()) {
  if(!article) {
		return articles
	}
  if(!List.isList(articles) ) {
		articles = List.of(articles)
	}
  let _showCoverPic = article.showCoverPic ? 1 : 0

	return articles.push(Immutable.fromJS({
			title              : article.title,
			thumb_media_id     : article.thumbMediaId,
			author             : article.author,
			digest             : article.digest,
			show_cover_pic     : _showCoverPic,
			content            : article.content,
			content_source_url : article.contentSourceUrl
	}))
}

function articles(articles) {
	if(List.isList(articles)) {
		return {
			"url":`${materialUrlPrefix}add_news`,
			"method" : "post",
			"body": {
						 "articles":Immutable.toJS(articles)
					}
		}
	} else {
		throw Error("Articles format should be an Immutable List")
	}

}
/**
* 新增永久素材
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
function material(type,media) {
	const mediaForm = new FormData()
	mediaForm.append("media",media)
	return {
		"url":`${materialUrlPrefix}add_material`,
		"method" : "post",
		"parameters": {	"type": type },
		"body" : mediaForm
	}
}

function video(media,title,introduction) {
	const videoForm = new FormData()
	videoForm.append("media",media)
	const descriptionForm = new FormData()
	descriptionForm.append("description",{
		"title" : title,
		"introduction": introduction
	})
	return {
		"url":`${materialUrlPrefix}add_material`,
		"method" : "post",
		"parameters": {	"type": type },
		"body" : [videoForm,descriptionForm]
		}
}

export default {
	article,articles,material,video,image,addArticle
}
