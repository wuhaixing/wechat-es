/**
* 客服账号管理
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1
*
*/
import crypto from 'crypto'

const customerServiceUrlPrefix = "https://api.weixin.qq.com/customservice/kfaccount/"

/**
* 添加客服账号
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.1
* @param account 客服账号
* @param nickname 昵称
* @param password 密码，传入经过md5加密的密文时需要将encrypted设为true
* @param encrypted 是否需要对密码进行加密
*/
function add(account,nickname,password,encrypted) {
	if(!encrypted) {
		const hash = crypto.createHash('md5')
		password = hash.update(password).digest('hex')
	}
	return {
			"url":`${customerServiceUrlPrefix}add`,
			"method" : "post",
			"body": {
								 "kf_account" : account,
								 "nickname" : nickname,
								 "password" : password
							}
		}
}
/**
* 修改客服账号
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.2
* @param account 客服账号
* @param nickname 昵称
* @param password 密码，传入经过md5加密的密文时需要将encrypted设为true
* @param encrypted 是否需要对密码进行加密
*/
function update(account,nickname,password,encrypted) {
	if(!encrypted) {
		const hash = crypto.createHash('md5')
		password = hash.update(password).digest('hex')
	}
	return {
		"url":`${customerServiceUrlPrefix}update`,
		"method" : "post",
		"body": {
							 "kf_account" : account,
							 "nickname" : nickname,
							 "password" : password,
						}
	}
}
/**
* 删除客服账号
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.3
* @param account 客服账号
* @param nickname 昵称
* @param password 密码，传入经过md5加密的密文时需要将encrypted设为true
* @param encrypted 是否需要对密码进行加密
*/

function del(account,nickname,password,encrypted) {
	if(!encrypted) {
		const hash = crypto.createHash('md5')
		password = hash.update(password).digest('hex')
	}
	return {
		"url":`${customerServiceUrlPrefix}del`,
		"method" : "post",
		"body": {
							 "kf_account" : account,
							 "nickname" : nickname,
							 "password" : password,
						}
	}
}
/**
* 设置客服帐号的头像
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.4
* @param account 客服账号
* @param file 要上传的文件
*/
function headImg(account,file) {
	return {
		"url":`${customerServiceUrlPrefix}uploadheadimg`,
		"method" : "upload",
		"parameters": {	"kf_account": account },
		"media" : file
	}
}
/**
* 获取所有客服账号
* 官方文档：
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141014&token=&lang=zh_CN#1.5
*
*/
function list() {
		return {
			"url":`${customerServiceUrlPrefix}getkflist`,
			"method" : "get"
		}
}
export default {
	add,update,del,headImg,list
}
