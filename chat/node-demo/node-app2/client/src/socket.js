export default {
  // 保证整个项目只有一个 socket 实例
  ws: null, // websocket 实例
  /**
   * 接收消息
   * @param {*} config 
   * @param {*} onMessage 
   * @param {*} onError 
   */
  init (config, onMessage, onError) {
    if (!this.ws) {
      // 实例化 socket 对象
      this.ws = new WebSocket(`ws://localhost:3000/${config.user.id}`)
    }

    // 客户端接收消息
    this.ws.onmessage = event => {
      let message = JSON.parse(event.data)
      onMessage && onMessage(message) // 接收到消息触发的回调
    }
    
    // 出错
    this.ws.onerror = error => {
      onError && onError(error)
    }

    this.ws.onclose = () => {
      this.ws = null
    }
  },
  /**
   * 发送消息
   * @param {*} msgObj
   */
  send (msgObj) {
    console.log(123)
    this.ws.send(JSON.stringify(msgObj))
  }
}