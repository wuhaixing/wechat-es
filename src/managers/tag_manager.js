/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

const tagUrlPrefix = "https://api.weixin.qq.com/cgi-bin/tags/"

function create(name) {
		return {
			"url":`${tagUrlPrefix}create`,
			"method" : "post",
			"body": {
				"tag" : {
					"name" : name
				}
			}
		}
}

function get() {
		return {
			"url":`${tagUrlPrefix}get`,
			"method" : "get"
		}
}

function update(tagId,name) {
		return {
			"url":`${tagUrlPrefix}update`,
			"method" : "post",
			"body": {
				"tag" : {
					"id":tagId,
					"name" : name
				}
			}
		}
}

function del(tagId,name) {
		return {
			"url":`${tagUrlPrefix}delete`,
			"method" : "post",
			"body": {
				"tag" : {
					"id":tagId
				}
			}
		}
}

function batchTagging(tagId,users) {
		return {
			"url":`${tagUrlPrefix}members/batchtagging`,
			"method" : "post",
			"body": {
				"openid_list" : users,
				"tagid":tagId
			}
		}
}

function batchUntagging(tagId,users) {
		return {
			"url":`${tagUrlPrefix}members/batchuntagging`,
			"method" : "post",
			"body": {
				"openid_list" : users,
				"tagid":tagId
			}
		}
}

function getTagsOfUser(userId) {
		return {
			"url":`${tagUrlPrefix}getidlist`,
			"method" : "post",
			"body": {
				"openid" : userId
			}
		}
}

export default {
	create,get,update,del,batchTagging,batchUntagging,getTagsOfUser
}
