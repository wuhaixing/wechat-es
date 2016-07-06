"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140837&token=&lang=zh_CN
* 管理用户
*/

var tagUrlPrefix = "https://api.weixin.qq.com/cgi-bin/tags/";
var userUrlPrefix = "https://api.weixin.qq.com/cgi-bin/user/";

var UserManager = function () {
	function UserManager() {
		_classCallCheck(this, UserManager);
	}

	_createClass(UserManager, null, [{
		key: "tagCreate",
		value: function tagCreate(name) {
			return {
				"url": tagUrlPrefix + "create",
				"method": "post",
				"body": {
					"tag": {
						"name": "${name}"
					}
				}
			};
		}
	}, {
		key: "tagGet",
		value: function tagGet() {
			return {
				"url": tagUrlPrefix + "get",
				"method": "get"
			};
		}
	}, {
		key: "usersGet",
		value: function usersGet(nextOpenId) {
			if (nextOpenId) {
				return {
					"url": userUrlPrefix + "get",
					"method": "get",
					"parameters": {
						"next_openid": nextOpenId
					}
				};
			} else {
				return {
					"url": userUrlPrefix + "get",
					"method": "get"
				};
			}
		}
	}]);

	return UserManager;
}();

exports.default = UserManager;