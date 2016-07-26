import 'babel-polyfill'
import chai from 'chai'
import chaiAsPromised  from 'chai-as-promised'
import Weixin from '../lib'
import {CustomerServiceManager} from '../lib'

const weixin = new Weixin({
	appId:'appId',
	appSecret: 'appSecret',
	token:'token'
})

const talker = weixin.getTalker()

chai.use(chaiAsPromised)


describe('Weixin Talker:', function (done) {
  describe('customer service manager', function () {
    it('should add account success', function () {
			return talker.send(
					CustomerServiceManager.add('test1@test','test1','passwd')
			).then(result => {
				 return result.errcode
			 })
			 .should.eventually.equal(0)
	    });

		it('should delete account success', function () {
				return talker.send(
						CustomerServiceManager.del('test1@test','test1','passwd')
				).then(result => {
					 return result.errcode
				 })
				 .should.eventually.equal(0)
		    });

		it('should get account list success', function () {
				return talker.send(
						CustomerServiceManager.list()
				).then(result => {
					 return result.errcode
				 })
				 .should.eventually.equal(0)
				});
  });
});
