'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Waiter = function () {
	function Waiter(options) {
		_classCallCheck(this, Waiter);

		this.appId = options.appId;
		this.appSecret = options.appSecret;
		this.token = options.token;
	}
	/**
 * Verify Signature in request from Weixin
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421135319&token=&lang=zh_CN
 * @param signature
 * @param timestamp
 * @param nonce
 */


	_createClass(Waiter, [{
		key: 'verifySignature',
		value: function verifySignature(signature, timestamp, nonce) {

			var token = this.token;

			var shasum = _crypto2.default.createHash('sha1');
			var arr = [token, timestamp, nonce].sort();
			shasum.update(arr.join(''));

			return shasum.digest('hex') === signature;
		}
		/**
   * http://mp.weixin.qq.com/wiki/14/89b871b5466b19b3efa4ada8e577d45e.html
  */

	}, {
		key: 'process',
		value: function process(req) {
			var _req$query = req.query;
			var signature = _req$query.signature;
			var timestamp = _req$query.timestamp;
			var nonce = _req$query.nonce;

			var reply = 'error';

			if (this.verifySignature(signature, timestamp, nonce)) {
				var message = req.body.xml;
				if (!message) {
					return reply;
				}
				var _reply = this.populateReply(message);

				var replyContent = false;

				switch (_reply.msgtype) {
					case 'text':
						replyContent = '<Content><![CDATA[' + _reply.content + ']]></Content>';
						break;
					case 'image':
						replyContent = '<Image>\n\t\t\t\t\t\t\t\t\t<MediaId><![CDATA[' + _reply.mediaId + ']]></MediaId>\n\t\t\t\t\t\t\t\t\t</Image>';
						break;
					case 'voice':
						replyContent = '<Voice>\n\t\t\t\t\t\t\t\t\t<MediaId><![CDATA[' + _reply.mediaId + ']]></MediaId>\n\t\t\t\t\t\t\t\t\t</Voice>';
						break;
					case 'video':
						replyContent = '<Video>\n\t\t\t\t\t\t\t\t\t\t<MediaId><![CDATA[' + _reply.mediaId + ']]></MediaId>\n\t\t\t\t\t\t\t\t\t\t<Title><![CDATA[' + _reply.title + ']]></Title>\n\t\t\t\t\t\t\t\t\t\t<Description><![CDATA[' + _reply.description + ']]></Description>\n\t\t\t\t\t\t\t\t\t</Video>';
						break;
					case 'music':
						replyContent = '<Music>\n\t\t\t\t\t\t\t\t\t\t<Title><![CDATA[' + _reply.title + ']]]></Title>\n\t\t\t\t\t\t\t\t\t\t<Description><![CDATA[' + _reply.description + ']]></Description>\n\t\t\t\t\t\t\t\t\t\t<MusicUrl><![CDATA[' + _reply.musicUrl + ']]></MusicUrl>\n\t\t\t\t\t\t\t\t\t\t<HQMusicUrl><![CDATA[' + _reply.hqMusicUrl + ']]></HQMusicUrl>\n\t\t\t\t\t\t\t\t\t\t<ThumbMediaId><![CDATA[' + _reply.mediaId + ']]></ThumbMediaId>\n\t\t\t\t\t\t\t\t\t</Music>';
						break;
					case 'news':
						var articleItems = _reply.articles.map(function (article) {
							return '<item>\n\t\t\t\t\t\t\t\t<Title><![CDATA[' + article.title + ']]></Title>\n\t\t\t\t\t\t\t\t<Description><![CDATA[' + article.description + ']]></Description>\n\t\t\t\t\t\t\t\t<PicUrl><![CDATA[' + article.picurl + ']]></PicUrl>\n\t\t\t\t\t\t\t\t<Url><![CDATA[' + article.url + ']]></Url>\n\t\t\t\t\t\t\t\t</item>';
						});

						replyContent = '<ArticleCount>' + _reply.articles.length + '</ArticleCount>\n\t\t\t\t\t\t\t\t\t<Articles>\n\t\t\t\t\t\t\t\t\t\t' + articleItems.join('') + '\n\t\t\t\t\t\t\t\t\t</Articles>';
						break;
					default:
						break;
				}
				reply = replyContent ? '<xml>\n\t\t\t\t\t\t\t\t<ToUserName><![CDATA[' + message.fromusername + ']]></ToUserName>\n\t\t\t\t\t\t\t\t<FromUserName><![CDATA[' + message.tousername + ']]></FromUserName>\n\t\t\t\t\t\t\t\t<CreateTime><![CDATA[' + Date.now() + ']]></CreateTime>\n\t\t\t\t\t\t\t\t<MsgType><![CDATA[' + _reply.msgtype + ']]></MsgType>\n\t\t\t\t\t\t\t\t' + replyContent + '\n\t\t\t\t\t\t\t  </xml>' : false;
			}
			return reply;
		}
	}, {
		key: 'populateReply',
		value: function populateReply(message) {
			var reply = {
				msgtype: 'text',
				content: '已收到您的消息!'
			};
			return reply;
		}
	}]);

	return Waiter;
}();

exports.default = Waiter;