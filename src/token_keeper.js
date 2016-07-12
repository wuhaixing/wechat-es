import fetch from 'isomorphic-fetch'

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183&token=&lang=zh_CN
* 管理access token
*/

class TokenKeeper {
	constructor(options) {
		this.appId = options.appId
		this.appSecret = options.appSecret
		this.fetchUrl =
			`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${options.appId}&secret=${options.appSecret}`

		this.store = options.tokenStore
	}

	get accessToken() {
  	if(this._expiresAt > Date.now()) {
			return Promise.resolve(this._accessToken)
		} else {
			return this.loadAccessToken().then( result => {
				this._accessToken = result.access_token
				this._expiresAt = Date.now() + (result.expires_in - 30) * 1000
				return this._accessToken
			})
		}
    }

	loadAccessToken() {
		if(this.store && this.store.loadAccessToken) {
			return this.store.loadAccessToken(this.fetchAccessToken)
		} else {
			return this.fetchAccessToken()
				  .then(response => response.json())
		      .then(json => {
		        if(json.access_token) {
						  return json
		        } else {
		          throw json
		        }
		      })
		     .catch( err => {
		     		console.log(err)
		        return err
		      })
		}
	}

	fetchAccessToken() {
		return fetch(this.fetchUrl)
	}

}

export default TokenKeeper
