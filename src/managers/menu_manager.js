/**
* 自定义菜单管理接口
*/

const menuUrlPrefix = " https://api.weixin.qq.com/cgi-bin/menu/"

class MenuManager {
  /**
	* 创建菜单项
	* 官方文档：
	*	https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141013&token=&lang=zh_CN
	* @param menuItems 包含自定义菜单项的对象
 */
	static create(menuItems) {
      return {
			  "url":`${menuUrlPrefix}create`,
			  "method" : "post",
			  "body": menuItems
			}
  }
	/**
	* 查询菜单项
	* 官方文档：
	* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141014&token=&lang=zh_CN
	*
 */
	static get() {
      return {
			  "url":`${menuUrlPrefix}get`,
			  "method" : "get"
			}
  }

	/**
	* 删除菜单
	* 官方文档：
	* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141015&token=&lang=zh_CN
 */
	static delete() {
      return {
			  "url":`${menuUrlPrefix}delete`,
			  "method" : "get"
			}
  }
	/**
	* 创建个性化菜单
	* 官方文档：
	*	https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296&token=&lang=zh_CN
	* @param menuItems 包含自定义菜单项的对象
 */
	static addConditional(menuItems) {
      return {
			  "url":`${menuUrlPrefix}addconditional`,
			  "method" : "post",
			  "body": menuItems
			}
  }
	/**
	* 删除个性化菜单
	* 官方文档：
	*	https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296&token=&lang=zh_CN
	* @param menuId 菜单id，可以通过自定义菜单查询接口获取。
 */
	static deleteConditional(menuId) {
      return {
			  "url":`${menuUrlPrefix}delconditional`,
			  "method" : "post",
			  "body": {
					"menuid":menuId
				}
			}
  }
	/**
	* 测试个性化菜单匹配结果
	* 官方文档：
	* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1455782296&token=&lang=zh_CN
	* @param conditional 表示匹配条件的对象
 */
	static tryMatch(conditional) {
      return {
			  "url":`${menuUrlPrefix}trymatch`,
			  "method" : "post",
			  "body": conditional
			}
  }
}

export default MenuManager
