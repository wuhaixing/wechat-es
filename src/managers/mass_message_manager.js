/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
* 管理消息
*/

const massUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/mass/"

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
*
*/

/**
* 图文消息
*/
function newsToTag(mediaId,tagId) {
		return _mediaToTag("mpnews",mediaId,tagId)
}

/**
* 音频消息
*/
function voiceToTag(mediaId,tagId) {
	return _mediaToTag("voic",mediaId,tagId)
}

/**
* 图片消息
*/
function imageToTag(mediaId,tagId) {
	return _mediaToTag("image",mediaId,tagId)
}

/**
* 视频消息
*/
function videoToTag(mediaId,tagId) {
	return _mediaToTag("mpvideo",mediaId,tagId)
}

/**
* 文本消息
*/
function textToTag(content,tagId) {
	const msg = {
		'type':'text',
		'content':{"content":content}
	}
	return _msgToTag(msg,tagId)
}

/**
* 卡券消息
*/
function cardToTag(cardId,tagId) {
	const msg = {
		'type':'wxcard',
		'content':{"card_id":cardId}
	}
	return _msgToTag(msg,tagId)
}

function _mediaToTag(type,mediaId,tagId) {
	const msg = {
		'type':type,
		'content': {"media_id":mediaId}
	}
	return _msgToTag(msg,tagId)
}

function _msgToTag(msg,tagId) {
	let filter = {"is_to_all":true}
	if(tagId) {
		filter = { "is_to_all":false,"tag_id":tagId }
	}
	let body = {
		"filter":filter,
		"msgtype":msg.type
	}
	body[msg.type] = msg.content
	return {
		"url":`${massUrlPrefix}sendall`,
		"method" : "post",
		"body": body
	}
}

/**
* 图文消息
*/
function newsToUsers(mediaId,users) {
		return _mediaToUsers("mpnews",mediaId,users)
}

/**
* 音频消息
*/
function voiceToUsers(mediaId,users) {
	return _mediaToUsers("voic",mediaId,users)
}

/**
* 图片消息
*/
function imageToUsers(mediaId,users) {
	return _mediaToUsers("image",mediaId,users)
}

/**
* 视频消息
*/
function videoToUsers(mediaId,users) {
	return _mediaToUsers("mpvideo",mediaId,users)
}

/**
* 文本消息
*/
function textToUsers(content,users) {
	const msg = {
		'type':'text',
		'content':{"content":content}
	}
	return _msgToUsers(msg,users)
}

/**
* 卡券消息
*/
function cardToUsers(cardId,users) {
	const msg = {
		'type':'wxcard',
		'content':{"card_id":cardId}
	}
	return _msgToUsers(msg,users)
}

function _mediaToUsers(type,mediaId,users) {
	const msg = {
		'type':type,
		'content': {"media_id":mediaId}
	}
	return _msgToUsers(msg,users)
}

function _msgToUsers(msg,users) {
	let body = {
		"touser":users,
		"msgtype":msg.type
	}
	body[msg.type] = msg.content
	return {
		"url":`${massUrlPrefix}send`,
		"method" : "post",
		"body": body
	}
}

export default {
	newsToTag,voiceToTag,imageToTag,videoToTag,cardToTag,textToTag,
	newsToUsers,voiceToUsers,imageToUsers,videoToUsers,cardToUsers,textToUsers,
}
