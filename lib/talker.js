'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _token_keeper = require('./token_keeper');

var _token_keeper2 = _interopRequireDefault(_token_keeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
*/
var headers = { 'Content-Type': 'application/json' };

var Talker = function () {
	function Talker(options) {
		_classCallCheck(this, Talker);

		this.tokenKeeper = new _token_keeper2.default(options);
	}

	_createClass(Talker, [{
		key: 'send',
		value: function send(message) {
			switch (message.method) {
				case "get":
					return this._get(message);
				case "post":
					return this._post(message);
				default:
					return new Promise(function (resolve, reject) {
						reject({
							errcode: 10001,
							errmsg: "There is no method in message"
						});
					});
			}
		}
	}, {
		key: '_get',
		value: function _get(message) {
			return this.tokenKeeper.accessToken.then(function (accessToken) {
				if (accessToken) {
					var url = message.url;
					var parameters = message.parameters;

					if (parameters) {
						url = url + '?access_token=' + accessToken + '&' + _qs2.default.stringify(parameters);
					} else {
						url = url + '?access_token=' + accessToken;
					}
					return (0, _isomorphicFetch2.default)(url);
				} else {
					return new Promise(function (resolve, reject) {
						reject({
							errcode: 10000,
							errmsg: "There is no access token avaliable"
						});
					});
				}
			}).catch(function (err) {
				console.log(err);
				return new Promise(function (resolve, reject) {
					reject(err);
				});
			});
		}
	}, {
		key: '_post',
		value: function _post(message) {
			return this.tokenKeeper.accessToken.then(function (accessToken) {
				if (accessToken) {
					return (0, _isomorphicFetch2.default)(message.url + '?access_token=' + accessToken, {
						method: 'POST',
						headers: headers,
						body: JSON.stringify(message.body)
					});
				} else {
					return new Promise(function (resolve, reject) {
						reject({
							errcode: 10000,
							errmsg: "There is no access token avaliable"
						});
					});
				}
			}).catch(function (err) {
				console.log(err);
				return new Promise(function (resolve, reject) {
					reject(err);
				});
			});
		}
		/**
  * {
  *   "filter":{
  *     "is_to_all":false,
  *     "tag_id":2
  *   },
  *   "text":{
  *     "content":"CONTENT"
  *   },
  *   "msgtype":"text"
  * }
  * url : https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
  */
		// sendTextToMass(content,tagId) {
		// 	const reqBody = `{
		// 					   "filter":{
		// 					      "is_to_all":true
		// 					   },
		// 					   "text":{
		// 					      "content":${content}
		// 					   },
		// 					    "msgtype":"text"
		// 					}`
		// 	return this.tokenKeeper.accessToken
		// 		.then(accessToken => {
		// 				console.log(`carry accessToken ${accessToken} send text to mass`)
		// 				if(accessToken)	 {
		// 					return fetch(`${this.messageMassUrl}?access_token=${accessToken}`, {
		// 					  method: 'POST',
		// 					  headers: headers,
		// 					  body: reqBody
		// 					})
		// 				} else {
		// 					return new Promise(( resolve,reject) => {
		// 						 resolve({
		// 						 	errcode:10000,
		// 						 	errmsg:"There is no access token avaliable"
		// 						 })
		// 					})
		// 				}
		// 		}).catch(err => {
		// 			console.log(err)
		// 			return new Promise(( resolve,reject) => {
		// 						 resolve(err)
		// 					})
		// 		})

		// }

		/**
  * {
  *   "filter":{
  *     "is_to_all":false,
  *     "tag_id":2
  *   },
  *   "text":{
  *     "content":"CONTENT"
  *   },
  *   "msgtype":"text"
  * }
  * url : https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=ACCESS_TOKEN
  */
		// sendTextToCustomer(content,openId) {
		// 	const reqBody = `{
		// 					    "touser":"${openId}",
		// 					    "msgtype":"text",
		// 					    "text":
		// 					    {
		// 					       "content":"${content}"
		// 					    }
		// 					}`
		// 	return this.tokenKeeper.accessToken
		// 		.then(accessToken => {
		// 				console.log(`carry accessToken ${accessToken} send text to customer`)
		// 				if(accessToken)	 {
		// 					return fetch(`${this.messageCustomer}?access_token=${accessToken}`, {
		// 					  method: 'POST',
		// 					  headers: headers,
		// 					  body: reqBody
		// 					})
		// 				} else {
		// 					return new Promise(( resolve,reject) => {
		// 						 resolve({
		// 						 	errcode:10000,
		// 						 	errmsg:"There is no access token avaliable"
		// 						 })
		// 					})
		// 				}
		// 		}).catch(err => {
		// 			console.log(err)
		// 			return new Promise(( resolve,reject) => {
		// 						 resolve(err)
		// 					})
		// 		})

		// }

	}]);

	return Talker;
}();

exports.default = Talker;