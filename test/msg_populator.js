import 'babel-polyfill'
import qs from 'qs'

export function toXML(message) {
  let replyContent = ''
  switch(message.msgtype) {
    case 'text':
      replyContent = `<Content><![CDATA[${message.content}]]></Content>`
      break
    case 'image':
        replyContent = `<Image>
                <MediaId><![CDATA[${message.mediaId}]]></MediaId>
                </Image>`
        break
      case 'voice':
        replyContent = `<Voice>
                <MediaId><![CDATA[${message.mediaId}]]></MediaId>
                </Voice>`
        break
      case 'video':
        replyContent = `<Video>
                  <MediaId><![CDATA[${message.mediaId}]]></MediaId>
                  <Title><![CDATA[${message.title}]]></Title>
                  <Description><![CDATA[${message.description}]]></Description>
                </Video>`
        break
      case 'music':
        replyContent = `<Music>
                  <Title><![CDATA[${message.title}]]]></Title>
                  <Description><![CDATA[${message.description}]]></Description>
                  <MusicUrl><![CDATA[${message.musicUrl}]]></MusicUrl>
                  <HQMusicUrl><![CDATA[${message.hqMusicUrl}]]></HQMusicUrl>
                  <ThumbMediaId><![CDATA[${message.mediaId}]]></ThumbMediaId>
                </Music>`
        break
      case 'news':
          var articleItems = message.articles.map((article) => {
            return `<item>
              <Title><![CDATA[${article.title}]]></Title>
              <Description><![CDATA[${article.description}]]></Description>
              <PicUrl><![CDATA[${article.picurl}]]></PicUrl>
              <Url><![CDATA[${article.url}]]></Url>
              </item>`
          })

        replyContent = `<ArticleCount>${message.articles.length}</ArticleCount>
                <Articles>
                  ${articleItems.join('')}
                </Articles>`
        break
    default:
    break
  }
  return `<xml>
           <ToUserName><![CDATA[${message.tousername}]]></ToUserName>
           <FromUserName><![CDATA[${message.fromusername}]]></FromUserName>
           <CreateTime><![CDATA[${Date.now()}]]></CreateTime>
           <MsgType><![CDATA[${message.msgtype}]]></MsgType>
           ${replyContent}
           </xml>`
}

export function getQueryStr() {
  var q = {
    timestamp: new Date().getTime(),
    nonce: parseInt((Math.random() * 10e10), 10)
  };
  var s = ['token', q.timestamp, q.nonce].sort().join('');
  q.signature = require('crypto').createHash('sha1').update(s).digest('hex');
  q.echostr = 'hello';
  return `?${qs.stringify(q)}`
}
