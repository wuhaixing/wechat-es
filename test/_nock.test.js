import nock from 'nock'

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

//========customer service nock=============================//

const addCustomerServiceNock = nock('https://api.weixin.qq.com')
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

const delCustomerServiceNock = nock('https://api.weixin.qq.com')
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

const listCustomerServiceNock = nock('https://api.weixin.qq.com/')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.get('/customservice/kfaccount/getkflist')
										.query({"access_token":'accessToken'})
										.reply(200, {
											errcode:0,
											errmsg:'ok'
										})

//========material nock=============================//
const materialImageNock = nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
								    .post('/cgi-bin/material/add_material')
										.query({
												"access_token":'accessToken',
												"type":"image"
										})
								    .reply(200, {
											"media_id":"mediaId",
											"url":"url"
										})
const articleNock = nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
								    .post('/cgi-bin/material/add_news',{
											"articles" : [{
												"title": "title",
												"thumb_media_id": "thumbMediaId",
												"author": "author",
												"digest": "digest",
												"show_cover_pic": 1,
												"content": "content",
												"content_source_url": "contentSourceUrl"
												}]
										})
										.query({"access_token":'accessToken'})
								    .reply(200, {
											"media_id":"mediaId"
										})
//========user nock=============================//
const userGetNock =  nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.get('/cgi-bin/user/get')
										.query({"access_token":'accessToken'})
										.reply(200, {
                      "total":2,
                      "count":2,
                      "data": {
                        "openid":["","OPENID1","OPENID2"]
                      },
                      "next_openid":"NEXT_OPENID"
                    })
//========media nock=============================//
const mediaImageNock =  nock('https://api.weixin.qq.com')
										.defaultReplyHeaders({
											'Content-Type': 'application/json'
										})
										.post('/cgi-bin/media/uploadimg')
										.query({
											"access_token":'accessToken',
											"type":"image"
										})
										.reply(200,{
                      "url":"url"
                    })
