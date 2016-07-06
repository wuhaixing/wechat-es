import fetch from 'isomorphic-fetch'
import qs from 'qs'
import TokenKeeper from './token_keeper'

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
*/
const headers = {'Content-Type':'application/json'}

class Talker {
	constructor(options) {
		this.tokenKeeper = new TokenKeeper(options)
	}

	send(message) {
		switch(message.method) {
			case "get":
				return this._get(message)
			case "post":
				return this._post(message)
			default:
				return 	new Promise(( resolve,reject) => {
							 reject({
							 	errcode:10001,
							 	errmsg:"There is no method in message"
							 })
				})
		}
	}

	_get(message) {
		return this.tokenKeeper.accessToken
				.then(accessToken => {
					if(accessToken)	 {
						let {url,parameters} = message
						if(parameters) {
							url = `${url}?access_token=${accessToken}&${qs.stringify(parameters)}`
						} else {
							url = `${url}?access_token=${accessToken}`
						}
						return fetch(url)
					} else {
						return new Promise(( resolve,reject) => {
							 reject({
							 	errcode:10000,
							 	errmsg:"There is no access token avaliable"
							 })
						})
					}
				}).catch(err => {
					console.log(err)
					return new Promise(( resolve,reject) => {
								 reject(err)
							})
				})
	}

	_post(message) {
		return this.tokenKeeper.accessToken
				.then(accessToken => {
						if(accessToken)	 {
							return fetch(`${message.url}?access_token=${accessToken}`, {
							  method: 'POST',
							  headers: headers,
							  body: JSON.stringify(message.body)
							})
						} else {
							return new Promise(( resolve,reject) => {
								 reject({
								 	errcode:10000,
								 	errmsg:"There is no access token avaliable"
								 })
							})
						}
				}).catch(err => {
					console.log(err)
					return new Promise(( resolve,reject) => {
								 reject(err)
							})
				})
	}
	/**
	* {
	*   "filter":{
	*     "is_to_all":false,
	*     "tag_id":2
	*   },
	*   "text":{
	*     "content":"CONTENT"
	*   },
	*   "msgtype":"text"
	* }
	* url : https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
	*/
	// sendTextToMass(content,tagId) {
	// 	const reqBody = `{
	// 					   "filter":{
	// 					      "is_to_all":true
	// 					   },
	// 					   "text":{
	// 					      "content":${content}
	// 					   },
	// 					    "msgtype":"text"
	// 					}`
	// 	return this.tokenKeeper.accessToken
	// 		.then(accessToken => {
	// 				console.log(`carry accessToken ${accessToken} send text to mass`)
	// 				if(accessToken)	 {
	// 					return fetch(`${this.messageMassUrl}?access_token=${accessToken}`, {
	// 					  method: 'POST',
	// 					  headers: headers,
	// 					  body: reqBody
	// 					})
	// 				} else {
	// 					return new Promise(( resolve,reject) => {
	// 						 resolve({
	// 						 	errcode:10000,
	// 						 	errmsg:"There is no access token avaliable"
	// 						 })
	// 					})
	// 				}
	// 		}).catch(err => {
	// 			console.log(err)
	// 			return new Promise(( resolve,reject) => {
	// 						 resolve(err)
	// 					})
	// 		})

	// }

	/**
	* {
	*   "filter":{
	*     "is_to_all":false,
	*     "tag_id":2
	*   },
	*   "text":{
	*     "content":"CONTENT"
	*   },
	*   "msgtype":"text"
	* }
	* url : https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
	*/
	// sendTextToCustomer(content,openId) {
	// 	const reqBody = `{
	// 					    "touser":"${openId}",
	// 					    "msgtype":"text",
	// 					    "text":
	// 					    {
	// 					       "content":"${content}"
	// 					    }
	// 					}`
	// 	return this.tokenKeeper.accessToken
	// 		.then(accessToken => {
	// 				console.log(`carry accessToken ${accessToken} send text to customer`)
	// 				if(accessToken)	 {
	// 					return fetch(`${this.messageCustomer}?access_token=${accessToken}`, {
	// 					  method: 'POST',
	// 					  headers: headers,
	// 					  body: reqBody
	// 					})
	// 				} else {
	// 					return new Promise(( resolve,reject) => {
	// 						 resolve({
	// 						 	errcode:10000,
	// 						 	errmsg:"There is no access token avaliable"
	// 						 })
	// 					})
	// 				}
	// 		}).catch(err => {
	// 			console.log(err)
	// 			return new Promise(( resolve,reject) => {
	// 						 resolve(err)
	// 					})
	// 		})

	// }

}

export default Talker
