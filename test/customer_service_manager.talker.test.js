import 'babel-polyfill'
import chai from 'chai'
import chaiAsPromised  from 'chai-as-promised'
import nock from 'nock'
import Weixin from '../lib'
import {CustomerServiceManager} from '../lib'

const weixin = new Weixin({
	appId:'appId',
	appSecret: 'appSecret',
	token:'token'
})

const talker = weixin.getTalker()

chai.use(chaiAsPromised)
const tokenNock = nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.get('/cgi-bin/token')
										.query({
											'grant_type':'client_credential',
											'appid':'appId',
											'secret':'appSecret'
										})
										.reply(200, {
											'access_token':'accessToken',
											'expires_in':7200
										})
										.persist()

const addNock = nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
								    .post('/customservice/kfaccount/add',{
											"kf_account" : "test1@test",
		 							    "nickname" : "test1",
		 							    "password" : "76a2173be6393254e72ffa4d6df1030a"
										})
										.query({"access_token":'accessToken'})
								    .reply(200, {
											errcode:0,
											errmsg:'ok'
										})

const delNock = nock('https://api.weixin.qq.com/')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.post('/customservice/kfaccount/del',{
											"kf_account" : "test1@test",
		 							    "nickname" : "test1",
		 							    "password" : "76a2173be6393254e72ffa4d6df1030a"
										})
										.query({"access_token":'accessToken'})
								    .reply(200, {
											errcode:0,
											errmsg:'ok'
										})

const listNock = nock('https://api.weixin.qq.com/')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.get('/customservice/kfaccount/getkflist')
										.query({"access_token":'accessToken'})
										.reply(200, {
											errcode:0,
											errmsg:'ok'
										})

describe('Weixin Talker:', function (done) {
  describe('customer service manager', function () {
    it('should add account success', function () {
			return talker.send(
					CustomerServiceManager.add('test1@test','test1','passwd')
			).then(response => response.json())
			 .catch(response => {
					console.log(response)
					Promise.resolve(response)
			 })
			 .then(result => {
				 return result.errcode
			 })
			 .should.eventually.equal(0)
	    });

		it('should delete account success', function () {
				return talker.send(
						CustomerServiceManager.del('test1@test','test1','passwd')
				).then(response => response.json())
				 .catch(response => {
						console.log(response)
						Promise.resolve(response)
				 })
				 .then(result => {
					 return result.errcode
				 })
				 .should.eventually.equal(0)
		    });

		it('should get account list success', function () {
				return talker.send(
						CustomerServiceManager.list()
				).then(response => response.json())
				 .catch(response => {
						console.log(response)
						Promise.resolve(response)
				 })
				 .then(result => {
					 return result.errcode
				 })
				 .should.eventually.equal(0)
				});
  });
});
