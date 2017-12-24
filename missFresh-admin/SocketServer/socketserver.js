// 服务创建
var WebsocketServer = require('ws').Server
wss = new WebsocketServer({port: 9000})

var clientMap = new Object()
var i = 0

wss.on('connection', function (ws) {
    console.log(ws + '上线了');
    ws.name = ++i

    clientMap[ws.name] = ws

    // 接收客户数据
    ws.on('message', function (msg) {
        broadcast(msg, ws)
    })

    // 客户端关闭监听
    ws.on('close', function () {
        delete clientMap[ws.name]
        console.log(ws.name + '离开');
    })
})

function broadcast(msg, ws) {
  for (var key in clientMap) {
    clientMap[key].send(msg)
  }
}
