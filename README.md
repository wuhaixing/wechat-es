# weixin

## Install

    npm i -S weixin


## Waiter

The following example need express and xmlparser,you should install them first:

    npm i -S express
    npm i -S express-xml-bodyparser

Then, create an express app,define routes and handle incoming request.

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
