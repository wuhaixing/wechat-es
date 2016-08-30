# wechat-es

## In Progress,Do Not Use It!

本项目起源于[搭建微信公众号服务器](https://wuhaixing.gitbooks.io/-weixin-server/content/)：

- [环境配置](https://wuhaixing.gitbooks.io/-weixin-server/content/chapter1.html)
- [解读微信公众号开发文档](https://wuhaixing.gitbooks.io/-weixin-server/content/lu_wen_dang.html)
- [被动回复消息](https://wuhaixing.gitbooks.io/-weixin-server/content/wo_gai_ru_he_hui_fu_ni.html)
- [发送消息](https://wuhaixing.gitbooks.io/-weixin-server/content/fa_song_xiao_xi.html)

## 安装

    npm i -S wechat-es

## 功能构成

跟微信公众号开放的API相对应，库主要提供两个服务类，分别是`Waiter`和`Talker`，可以在测试中看到这两个类的主要用法。

### Waiter

Waiter负责接收公众号的消息，进行签名的验证，还可以将响应封装成XML。

![](http://www.ituring.com.cn/download/01ui7wDiwBI1.small)

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

Talker 负责给微信公众号服务器发送消息，可以在任何地方使用，用manager创建消息，然后send这个消息就可以了。

![](http://www.ituring.com.cn/download/01ui7xWDz4BL.small)

```js
const talker = weixin.getTalker()
talker.send(UserManager.getList())
		  .then(result => {
		  	if(!result.errcode) {		  		
				  console.log("Get users:",json)
		  		return CustomerMessageManager.text(result.next_openid,"感谢订阅")
		  	} else {
		  		console.log("Get user list got error:",result.errmsg)
				throw Error(result.errmsg)
		  	}
		  })
		  .then(message => talker.send(message))
		  .catch(error => {
		  	console.log("There is an error to get nextOpenId")
		  })
		  .then(result => {
			  	if(result.errcode) {		  		
					console.log(`Send text message to customer ${nextOpenId} got error:${result.errmsg}`)
			  	} else {
			  		console.log(`Send text message to ${nextOpenId} success`)		  		
			  	}
		   })
```

## 开发者参考
- [微信官方文档](https://mp.weixin.qq.com/wiki)
- [MDN上的Promise文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN上的Fetch API文档](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [form-data](https://github.com/form-data/form-data)
- James K Nelson [Writing NPM packages with ES6 using the Babel 6 CLI](http://jamesknelson.com/writing-npm-packages-with-es6-using-the-babel-6-cli/)
- James K Nelson [Testing in ES6 with Mocha and Babel 6](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)
