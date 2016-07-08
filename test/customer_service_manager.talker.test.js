import 'babel-polyfill'
import chai from 'chai'
import chaiAsPromised  from 'chai-as-promised'
import Weixin from '../lib'
import CustomerServiceManager from '../lib/managers/customer_service_manager'

const weixin = new Weixin({
	appId:'wx212af6a39faa2819',
	appSecret: 'ab0590c7f4d5fc9acbab77ac8408d9d7',
	token:'wx212af6a39faa2819'
})

const talker = weixin.getTalker()

chai.use(chaiAsPromised)

describe('weixin talker', function (done) {
  describe('customer service manager', function () {
    it('should add account success', function () {
			return talker.send(
					CustomerServiceManager.add('test1@test','test1','passwd')
			).then(response => response.json())
			 .catch(response => {
					const result = response.json()
					console.log(result)
					throw json.errcode
			 })
			 .then(result => {
				 console.log(result.errmsg)
				 return result.errcode
			 })
			 .should.eventually.equal(0)
	    });

			it('should delete account success', function () {
				return talker.send(
						CustomerServiceManager.delete('test1@test','test1','passwd')
				).then(response => response.json())
				 .catch(response => {
						const result = response.json()
						console.log(result)
						throw json.errcode
				 })
				 .then(result => {
					 console.log(result.errmsg)
					 return result.errcode
				 })
				 .should.eventually.equal(0)
		    });
  });
});
