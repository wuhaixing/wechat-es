import fetch from 'isomorphic-fetch'
import qs from 'qs'
import fs from 'fs'
import FormData from 'form-data'
import TokenKeeper from './token_keeper'

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
*/
const headers = {'Content-Type':'application/json'}

function _populateUrl(message,accessToken) {
	let {url,parameters} = message
	if(parameters) {
		url = `${url}?access_token=${accessToken}&${qs.stringify(parameters)}`
	} else {
		url = `${url}?access_token=${accessToken}`
	}
	return url
}

function _splitUrl(url) {
	const _index = url.indexOf('//')
	const startAt = _index > 0 ? _index + 2 : 0

	var hostWithPath = url.substring(startAt)
	const _hostLength = hostWithPath.indexOf('/')
	const _host = hostWithPath.substring(0,_hostLength)
	const _path = hostWithPath.substring(_hostLength)
	return {
		host: _host,
		path: _path
	}
}


function _get(url) {
	//console.log(`get ${url}`)
	return fetch(url)
					.then(response => response.json())
					.catch(response => {
		 					console.log(response)
		 					Promise.resolve(response)
		 			 })
}

function _post(url,message) {
	const body = JSON.stringify(message.body)
	//console.log(`post ${body} to ${url}`)
	return fetch(url, {
	  method: 'POST',
	  headers: headers,
	  body: body
	})
	.then(response => response.json())
	.catch(response => {
		 console.log(response)
		 Promise.resolve(response)
	})
}

function _upload(url,message) {
	return new Promise((resolve,reject) => {
			const options = _splitUrl(url)
			const form = new FormData()
			const media = message.body.media
			form.append('media',fs.createReadStream(media))
			form.submit(options,function(err,res) {
						if(err) {
							console.log(err)
							reject(err)
						} else {
							res.on('data',function(chunk) {
								resolve(JSON.parse('' + chunk))
							})
						}
					})
				})
}

class Talker {
	constructor(options) {
		this.tokenKeeper = new TokenKeeper(options)
	}

	send(message) {
		return this.tokenKeeper.accessToken
				.then(accessToken => {
					if(accessToken)	 {
						const url = _populateUrl(message,accessToken)
						switch(message.method) {
							case "get":
								return _get(url)
							case "post":
								return _post(url,message)
							case "upload":
								return _upload(url,message)
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

}

export default Talker
