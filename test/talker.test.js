import 'babel-polyfill'
import chai from 'chai'
import qs from 'qs'
import xmlparser from 'express-xml-bodyparser'
import request from 'supertest'
import express from 'express'
import multer from 'multer'

import Weixin,{ UserManager,MediaManager }  from '../lib'

const app = express()

const weixin = new Weixin({
  appId:'appId',
	appSecret: 'appSecret',
	token:'token'
})

const talker = weixin.getTalker()

var upload = multer({ dest: 'test/uploads/' })

app.get("/users", function (req, res, next) {
  talker.send(UserManager.usersGet())
        .then(response => response.json)
        .then(json => {
          res.send('success')
        })
});

app.post("/upload", upload.single('avatar'),function (req, res, next) {
  const uploadedImg = req.file.path
  talker.send({
      		"url":'https://api.weixin.qq.com/cgi-bin/media/uploadimg',
      		"method" : "upload",
      		"body" : {"media" : uploadedImg }
      	})
        .then(response => response.json)
        .then(json => {
          res.send('success')
        })
});

chai.should()

describe('Weixin Talker:', function () {

  describe('send message', function () {
    it('should get users', function (done) {
      request(app)
      .get('/users')
      .expect('success', done);
    });

    it('should upload image', function (done) {
      request(app)
      .post("/upload")
      .attach('avatar', 'test/images/boy.jpg')
      .expect('success', done);
    });
  });
});
