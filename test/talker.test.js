import 'babel-polyfill'
import chai from 'chai'
import request from 'supertest'
import express from 'express'
import multer from 'multer'

import Weixin,{ UserManager,MediaManager,MaterialManager }  from '../lib'

const app = express()

const weixin = new Weixin({
  appId:'appId',
	appSecret: 'appSecret',
	token:'token'
})

const talker = weixin.getTalker()

const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname  )
  }
})

const upload = multer({ storage: storage })

app.get("/users", function (req, res, next) {
  talker.send(UserManager.getList())
        .then(json => {
          res.send(json)
        })
});

app.post("/upload/material", upload.single('material'),function (req, res, next) {
  const uploadedImg = req.file.path
  talker.send(MaterialManager.image(uploadedImg))
        .then(json => {
          res.send(json)
        })
});

app.post("/upload/media", upload.single('media'),function (req, res, next) {
  const uploadedImg = req.file.path
  talker.send(MediaManager.image(uploadedImg))
        .then(json => {
          res.send(json)
        })
});

chai.should()

describe('Weixin Talker:', function () {

  describe('send message', function () {
    it('should get users', function (done) {
      request(app)
      .get('/users')
      .expect( {
        "total":2,
        "count":2,
        "data": {
          "openid":["","OPENID1","OPENID2"]
        },
        "next_openid":"NEXT_OPENID"
      }, done);
    });

    it('should upload material image', function (done) {
      request(app)
      .post("/upload/material")
      .attach('material', 'test/images/boy.jpg')
      .expect(
        {
          "media_id":"mediaId",
          "url":"url"
        }, done);
    });

    it('should upload media image', function (done) {
      request(app)
      .post("/upload/media")
      .attach('media', 'test/images/boy.jpg')
      .expect({
        "url":"url"
      }, done);
    });
  });
});
