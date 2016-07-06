import 'babel-polyfill'
import chai from 'chai'
import qs from 'qs'
import xmlparser from 'express-xml-bodyparser'
import request from 'supertest'
import express from 'express'
import Weixin from '../lib'
import {getQueryStr,toXML} from './msg_populator'
const app = express()

const weixin = new Weixin({
	appId:'wx212af6a39faa2819',
	appSecret: 'ab0590c7f4d5fc9acbab77ac8408d9d7',
	token:'token'
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
  waiter.populateReply = function(message) {
    var reply = false
		switch(message.msgtype) {
			case 'text':
				reply = {
					msgtype:'text',
					content: message.content
				}
				break
			case 'image':
				reply = {
					msgtype:'image',
					mediaId: message.mediaid
				}
				break
			case 'voice':
				reply = {
					msgtype:'voice',
					mediaId: message.mediaid
				}
				break
			case 'video':
			case 'shortvideo':
			case 'location':
			case 'link':
			case 'event':
			default:
			break
		}
		return reply
  }
  const reply = waiter.process(req)
  res.set('Content-Type', 'text/xml')
  res.send(reply)
});

chai.should()

describe('weixin', function () {

  describe('waiter verify signature', function () {
    it('should echo echostr when get valid signature', function (done) {
      var q = {
        timestamp: new Date().getTime(),
        nonce: parseInt((Math.random() * 10e10), 10)
      };
      var s = ['token', q.timestamp, q.nonce].sort().join('');
      q.signature = require('crypto').createHash('sha1').update(s).digest('hex');
      q.echostr = 'hello world';
      request(app)
      .get(waiterUrl + '?' + qs.stringify(q))
      .expect('hello world', done);
    });

    it('should reply "error" when get invalid signature', function (done) {
      var q = {
        timestamp: new Date().getTime(),
        nonce: parseInt((Math.random() * 10e10), 10)
      };
      q.signature = 'invalid_signature';
      q.echostr = 'hello world';
      request(app)
      .get(waiterUrl + '?'  + qs.stringify(q))
      .expect('error', done);
    });
  });
  describe('waiter process message', function () {
    it('should echo text when get text message', function (done) {
      let msg = {
        fromusername:'user',
        tousername:'waiter',
        msgtype:'text',
        content:'Hello!'
      }
      request(app)
      .post(waiterUrl + getQueryStr())
      .type('xml')
      .send(toXML(msg))
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        var body = res.text.toString();
        body.should.include('<ToUserName><![CDATA[user]]></ToUserName>');
        body.should.include('<FromUserName><![CDATA[waiter]]></FromUserName>');
        body.should.match(/<CreateTime><!\[CDATA\[\d{13}\]\]><\/CreateTime>/);
        body.should.include('<MsgType><![CDATA[text]]></MsgType>');
        body.should.include('<Content><![CDATA[Hello!]]></Content>');
        done();
      });
    });
  });

});
