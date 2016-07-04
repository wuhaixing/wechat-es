import crypto from 'crypto'

class Waiter {
	constructor(options) {
		this.appId = options.appId
		this.appSecret = options.appSecret
		this.token = options.token
	}
	/**
	* Verify Signature in request from Weixin
	* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN
	* @param signature
	* @param timestamp
	* @param nonce
	*/
	verifySignature(signature,timestamp,nonce) {

		console.log('verify siganture',signature)
	  const token = this.token

	  let shasum = crypto.createHash('sha1');
		let arr = [token, timestamp, nonce].sort();
		shasum.update(arr.join(''));

		return shasum.digest('hex') === signature;
	}
  /**
   * http://mp.weixin.qq.com/wiki/14/89b871b5466b19b3efa4ada8e577d45e.html
  */
	process(req) {
		const {
			signature,timestamp,nonce
		} = req.query
		var reply = 'success'

		if(this.verifySignature(signature,timestamp,nonce)) {
			const message = req.body.xml
			const _reply = this.populateReply(message)

			var replyContent = false

			switch(_reply && _reply.msgtype) {
				case 'text':
					replyContent = `<Content><![CDATA[${_reply.content}]]></Content>`
					break
				case 'image':
					replyContent = `<Image>
									<MediaId><![CDATA[${_reply.mediaId}]]></MediaId>
									</Image>`
					break
				case 'voice':
					replyContent = `<Voice>
									<MediaId><![CDATA[${_reply.mediaId}]]></MediaId>
									</Voice>`
					break
				case 'video':
					replyContent = `<Video>
										<MediaId><![CDATA[${_reply.mediaId}]]></MediaId>
										<Title><![CDATA[${_reply.title}]]></Title>
										<Description><![CDATA[${_reply.description}]]></Description>
									</Video>`
					break
				case 'music':
					replyContent = `<Music>
										<Title><![CDATA[${_reply.title}]]]></Title>
										<Description><![CDATA[${_reply.description}]]></Description>
										<MusicUrl><![CDATA[${_reply.musicUrl}]]></MusicUrl>
										<HQMusicUrl><![CDATA[${_reply.hqMusicUrl}]]></HQMusicUrl>
										<ThumbMediaId><![CDATA[${_reply.mediaId}]]></ThumbMediaId>
									</Music>`
					break
				case 'news':
				    var articleItems = _reply.articles.map((article) => {
				    	return `<item>
								<Title><![CDATA[${article.title}]]></Title>
								<Description><![CDATA[${article.description}]]></Description>
								<PicUrl><![CDATA[${article.picurl}]]></PicUrl>
								<Url><![CDATA[${article.url}]]></Url>
								</item>`
				    })

					replyContent = `<ArticleCount>${_reply.articles.length}</ArticleCount>
									<Articles>
										${articleItems.join('')}
									</Articles>`
					break
				default:
				break
			}
			reply = replyContent ?
			         `<xml>
								<ToUserName><![CDATA[${message.fromusername}]]></ToUserName>
								<FromUserName><![CDATA[${message.tousername}]]></FromUserName>
								<CreateTime><![CDATA[${Date.now()}]]></CreateTime>
								<MsgType><![CDATA[${_reply.msgtype}]]></MsgType>
								${replyContent}
							  </xml>`
					  :
					  false
		}
		return reply
	}

  populateReply(message) {
    const reply = {
    		msgtype : 'text',
    		content: '已收到您的消息!'
    }
		return reply
  }

}

export default Waiter
