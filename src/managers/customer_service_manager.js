/**
* 客服账号管理
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1
*
*/

const customServiceUrlPrefix = "https://api.weixin.qq.com/customservice/kfaccount/"

class CustomServiceManager {
  /**
	* 添加客服账号
	* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.1
	* @param account 客服账号
	* @param nickname 昵称
	* @param password 密码
	*/
	static add(account,nickname,password) {
        return {
				  "url":`${massUrlPrefix}add`,
				  "method" : "post",
				  "body": {
								     "kf_account" : account,
								     "nickname" : nickname,
								     "password" : password,
									}
				}
    }
		/**
		* 修改客服账号
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547&token=&lang=zh_CN#1.2
		* @param account 客服账号
		* @param nickname 昵称
		* @param password 密码
		*/
    static update(account,nickname,password) {
			return {
				"url":`${massUrlPrefix}update`,
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
		* @param password 密码
		*/
    static delete(account,nickname,password) {
			return {
				"url":`${massUrlPrefix}del`,
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
		* @param file 要上传的文件表单
		* @TODO 实现文件的表单封装
		*/
    static uploadHeadImg(account,fileForm) {
			return {
				"url":`${massUrlPrefix}uploadheadimg`,
				"method" : "post",
				"parameters": {	"kf_account": account },
				"body": {
									 "file" : file
								}
			}
    }
		/**
		* 获取所有客服账号
		* 官方文档：
		* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141014&token=&lang=zh_CN#1.5
		*
	 */
		static getList() {
				return {
					"url":`${menuUrlPrefix}getkflist`,
					"method" : "get"
				}
		}
}
export default CustomServiceManager
