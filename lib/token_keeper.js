"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140183&token=&lang=zh_CN
* 管理access token
*/

var TokenKeeper = function () {
	function TokenKeeper(options) {
		_classCallCheck(this, TokenKeeper);

		this.appId = options.appId;
		this.appSecret = options.appSecret;
		this.fetchUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + options.appId + "&secret=" + options.appSecret;

		this.store = options.tokenStore;
	}

	_createClass(TokenKeeper, [{
		key: "loadAccessToken",
		value: function loadAccessToken() {
			if (this.store && this.store.loadAccessToken) {
				return this.store.loadAccessToken(this.fetchAccessToken);
			} else {
				return this.fetchAccessToken().then(function (response) {
					return response.json();
				}).then(function (json) {
					if (json.access_token) {
						console.log("Got accessToken:", json);
						return json;
					} else {
						throw json;
					}
				}).catch(function (err) {
					console.log(err);
					return err;
				});
			}
		}
	}, {
		key: "fetchAccessToken",
		value: function fetchAccessToken() {
			console.log("fetch accessToken from " + this.fetchUrl);
			return (0, _isomorphicFetch2.default)(this.fetchUrl);
		}
	}, {
		key: "accessToken",
		get: function get() {
			var _this = this;

			if (this._expiresAt > Date.now()) {
				return new Promise(function (resolve, reject) {
					resolve(_this._accessToken);
				});
			} else {
				return this.loadAccessToken().then(function (result) {
					console.log(result);
					_this._accessToken = result.access_token;
					_this._expiresAt = Date.now() + (result.expires_in - 30) * 1000;
					console.log("Current access token " + _this._accessToken + " will be expires at " + _this._expiresAt);
					return _this._accessToken;
				});
			}
		}
	}]);

	return TokenKeeper;
}();

exports.default = TokenKeeper;