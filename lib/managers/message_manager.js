"use strict";

Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140549&token=&lang=zh_CN
* 管理消息
*/

var massUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/mass/";
var customUrlPrefix = "https://api.weixin.qq.com/cgi-bin/message/custom/";

var UserManager = function () {
			function UserManager() {
						_classCallCheck(this, UserManager);
			}

			_createClass(UserManager, null, [{
						key: "textToTag",
						value: function textToTag(content, tagId) {
									var filter = { "is_to_all": true };
									if (tagId) {
												filter = { "is_to_all": false, "tag_id": tagId };
									}
									return {
												"url": massUrlPrefix + "sendall",
												"method": "post",
												"body": {
															"filter": filter,
															"text": {
																		"content": content
															},
															"msgtype": "text"
												}
									};
						}
			}, {
						key: "textToCustom",
						value: function textToCustom(content, openId) {
									return {
												"url": customUrlPrefix + "send",
												"method": "post",
												"body": {
															"touser": openId,
															"msgtype": "text",
															"text": {
																		"content": content
															}
												}
									};
						}
			}]);

			return UserManager;
}();

exports.default = UserManager;