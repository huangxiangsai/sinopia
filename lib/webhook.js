var LocalData = require('./local-data')
var Path = require('path')
var axios = require('axios')

// var PACKAGE_BASE_PATH = '/-/'  // 进入详情页面

/**
 * 钉钉机器人🤖集成
 * 可添加多个机器人🤖
 * 可发送消息给指定机器人🤖
 */
function WebHook () {
  var self = this
  self.localList = LocalData(
    Path.join(
      '', // Path.resolve(Path.dirname(self.self_path), self.storage)
      '.webhook-db.json'
    )
  )
  return self
}

// 添加地址
WebHook.prototype.add = function (obj) {
  var self = this
  if (typeof (obj) === 'object') {
    try {
      obj = JSON.stringify(obj)
    } catch (e) {
      obj = ''
    }
  }
  self.localList.add(_trim(obj))
}

// 删除地址
WebHook.prototype.del = function (index) {
  var self = this
  self.localList.remove(self.localList.get()[index])
}

// 获得地址列表
WebHook.prototype.getList = function () {
  var self = this
  var result = []
  var list = self.localList.get()
  for (var i = 0; i < list.length; i++) {
    result.push(JSON.parse(list[i]))
  }
  return result
}

/**
 * 发送webhook
 * @params {to : [] , msg : {} }
 */
WebHook.prototype.sendMessage = function (params) {
  for (let i = 0; i < params.to.length; i++) {
    axios.post(params.to[i].url, params.msg)
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

/**
 * 包发布通知
 */
WebHook.prototype.publishNotic = function (_package) { 
  var title = _package.name + ' 版本升级到' + _package.version + '了'
  var text = `
  ## **${title}**\n
  **本次更新内容**：${_package.updateInfo || '发布者很懒，没有提供更新说明~~'}\n
  [了解${_package.name}](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.enG9GH&treeId=257&articleId=105735&docType=1)
  `
  var data = {
    'markdown': {
      'title': title,
      'text': text
    },
    'msgtype': 'markdown'
  }
  console.log(text)
  this.sendMessage({to: this.getList(), msg: data})
}

function _trim (str) {
  if (typeof (str) !== 'string') { return str }
  return str.replace(/^\s*|\s*%/g, '')
}


// formData.append('a', 1)
var wh = new WebHook()
// wh.add(JSON.stringify({name: '前端实验组', url: 'https://oapi.dingtalk.com/robot/send?access_token=c0f16aff7bae7fd453bc4b3b959f8c52dcb0525bd96adf07e24901126f246c30'}))
// wh.del(0)
// wh.sendMessage({to: ['http://0.0.0.0:4873/-/webhook/test'], msg: '{a : 1 , b : 2}'})
console.log(wh.getList())
wh.publishNotic({
  name: '钉钉机器人集成',
  version: 'v0.0.8',
  description: '这只是个单纯的测试包，大家可以忽略，大家可以忽略，大家可以忽略！！',
  updateInfo: '小机器人来袭，今天就玩到这，测试钉钉小机器人🤖'
})


