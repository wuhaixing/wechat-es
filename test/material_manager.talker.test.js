import 'babel-polyfill'
import chai,{assert} from 'chai'
import chaiAsPromised  from 'chai-as-promised'
import nock from 'nock'
import Weixin from '../lib'
import {MaterialManager} from '../lib'
import Immutable,{List} from 'immutable'

const weixin = new Weixin({
	appId:'appId',
	appSecret: 'appSecret',
	token:'token'
})

const talker = weixin.getTalker()

chai.use(chaiAsPromised)

describe('Weixin Talker:', function (done) {
  describe('material manager', function () {
    it('should got media_id after send article success', function () {
			return talker.send(
					MaterialManager.article(
						   "title", //标题
						   "thumbMediaId", //图文消息的封面图片素材id（必须是永久mediaId）
							 "author", //作者
							 "digest", //图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
							 true, //是否显示封面，false不显示，true即显示
							 "content", //图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
							 "contentSourceUrl")
			).then(result => {
				 return result.media_id
			 })
			 .should.eventually.equal("mediaId")
	    });

		it('should add article to empty list success', function () {
			let article = {
					 title       : "title", //标题
					 thumbMediaId: "thumbMediaId", //图文消息的封面图片素材id（必须是永久mediaId）
					 author      : "author", //作者
					 digest      : "digest", //图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
					 showCoverPic: true, //是否显示封面，false不显示，true即显示
					 content     : "content", //图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
					 contentSourceUrl:"contentSourceUrl"
				 }

			let articles = MaterialManager.addArticle(article)

			let expectedList = new List()
			expectedList = expectedList.push(Immutable.fromJS({
				title: "title",
				thumb_media_id: "thumbMediaId",
				author: "author",
				digest: "digest",
				show_cover_pic: 1,
				content: "content",
				content_source_url: "contentSourceUrl"
			}))

			assert.equal(articles.equals(expectedList),true)
		});

  });
});
