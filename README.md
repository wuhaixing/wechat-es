# weixin

## Install

    npm i -S weixin
    npm i -S express
    npm i -S express-xml-bodyparser

## Waiter


```js
    const app = express()

    const weixin = new Weixin({
    	appId: 'YourAppId',
    	appSecret: 'YourAppSecret',
    	token: 'Token'
    })
    const waiterUrl = '/api/weixin'

    app.use(express.query())

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

    app.post(waiterUrl,xmlparser({trim: true, explicitArray: false}),function (req, res, next) {
      const waiter = weixin.getWaiter()
      /**
      * Your need provide a populateReply method for waiter to
      * response what you want.
      */
      //waiter.populateReply = function(message) {}

      const reply = waiter.process(req)
      res.set('Content-Type', 'text/xml')
      res.send(reply)
    });
```
