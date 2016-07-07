# wechat-es

本项目起源于[搭建微信公众号服务器](https://wuhaixing.gitbooks.io/-weixin-server/content/)。

- [环境配置](https://wuhaixing.gitbooks.io/-weixin-server/content/chapter1.html)
- [解读微信公众号开发文档](https://wuhaixing.gitbooks.io/-weixin-server/content/lu_wen_dang.html)
- [被动回复消息](https://wuhaixing.gitbooks.io/-weixin-server/content/wo_gai_ru_he_hui_fu_ni.html)

## 安装

    npm i -S wechat-es


## Waiter

下面这个例子需要用到express和xmlparser：

    npm i -S express
    npm i -S express-xml-bodyparser

然后创建App，定义路由处理请求：

```js
const app = express()
//Initialize an instance of Weixin
const weixin = new Weixin({
	appId: 'YourAppId',
	appSecret: 'YourAppSecret',
	token: 'Token'
})
const waiterUrl = '/api/weixin'

app.use(express.query())
/**
* Process verify signature request with get method
*/
app.get(waiterUrl, function (req, res, next) {
  const waiter = weixin.getWaiter()
  const {
		signature,timestamp,nonce
	} = req.query

	if(waiter.verifySignature(signature,timestamp,nonce)) {
		res.send(req.query.echostr)
	} else {
		res.send('error')
	}
});
/**
* Process other requests with post method
* We use xmlparser to convert xml in request body to json
*/
app.post(waiterUrl,xmlparser({trim: true, explicitArray: false}),function (req, res, next) {
  const waiter = weixin.getWaiter()
  /**
  * Your need provide a populateReply method for waiter to
  * response what you want.The default implement just reply
  * an text message to say 'I received your message'
  */
  //waiter.populateReply = function(message) {}

  const reply = waiter.process(req)
  res.set('Content-Type', 'text/xml')
  res.send(reply)
});
```

### Talker

Talker 可以在任何地方使用，用manager创建消息，然后send这个消息就可以了。

```js
const talker = weixin.getTalker()
talker.send(UserManager.usersGet())
		  .then(response => response.json())
		  .then(json => {
		  	if(!json.errcode) {		  		
				console.log("Get users:",json)
		  		return MessageManager.textToCustom("感谢订阅",json.next_openid)
		  	} else {
		  		console.log("Get user list got error:",json.errmsg)
				throw Error(json.errmsg)
		  	}
		  })
		  .then(message => talker.send(message))
		  .catch(error => {
		  	console.log("There is an error to get nextOpenId")
		  })
		  .then(response => response.json())
		  .then(json => {
			  	if(json.errcode) {		  		
					console.log(`Send text message to customer ${nextOpenId} got error:${json.errmsg}`)
			  	} else {
			  		console.log(`Send text message to ${nextOpenId} success`)		  		
			  	}
		   })
```

## 开发者参考
- [微信官方文档](https://mp.weixin.qq.com/wiki)
- [MDN上的Promise文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN上的Fetch API文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- James K Nelson [Writing NPM packages with ES6 using the Babel 6 CLI](http://jamesknelson.com/writing-npm-packages-with-es6-using-the-babel-6-cli/)
- James K Nelson [Testing in ES6 with Mocha and Babel 6](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)
