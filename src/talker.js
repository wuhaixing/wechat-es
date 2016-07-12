import fetch from 'isomorphic-fetch'
import qs from 'qs'
import FormData from 'form-data'
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
		return this.tokenKeeper.accessToken
				.then(accessToken => {
					if(accessToken)	 {
						const url = this._populateUrl(message,accessToken)
						switch(message.method) {
							case "get":
								return this._get(url)
							case "post":
								return this._post(url,message)
							case "upload":
								return this._upload(url,message)
							default:
								throw {
											 	errcode:10001,
											 	errmsg:"There is no method in message"
											 }
						}
					} else {
						throw {
							 	errcode:10000,
							 	errmsg:"There is no access token avaliable"
							 }
					}
				}).catch(err => {
					console.log(err)
					throw err
				})
	}

	_populateUrl(message,accessToken) {
		let {url,parameters} = message
		if(parameters) {
			url = `${url}?access_token=${accessToken}&${qs.stringify(parameters)}`
		} else {
			url = `${url}?access_token=${accessToken}`
		}
		return url
	}

	_get(url) {
		//console.log(`get ${url}`)
		return fetch(url)
	}

	_post(url,message) {
		const body = JSON.stringify(message.body)
		//console.log(`post ${body} to ${url}`)
		return fetch(url, {
		  method: 'POST',
		  headers: headers,
		  body: body
		})
	}

	_upload(url,message) {
		const form = new FormData()
		form.append('media',fs.createReadStream(message.media))
		return fetch(url, {
		  method: 'POST',
		  body: form
		})
	}

}

export default Talker
