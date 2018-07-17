<template>
  <div class="hello">
   <div>
     <!-- message list -->
      <ul>
        <ol>聊天信息列表</ol>
        <ol class="chat-list" v-for="item in messageList" :key='item.time'>
          <div>
            <span>{{item.name}}</span>
          <p>{{item.time | formatTimes}}</p>
          </div>
          <div>
          {{item.message}}
          </div>
        </ol>
      </ul>
     </div> 
     <input type="text" v-model.trim="inputMessage"><button @click = "send">提交</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      inputMessage: '',
      messageList: [] // 返回信息
    }
  },
  mounted () {
    let self = this
     /*建立socket连接，使用websocket协议，端口号是服务器端监听端口号*/ 
    this.socket = io("ws://localhost:8989");
    this.socket.on('receiveMessage',function(data){
        console.log('接收到了服务端信息');
        self.messageList.push(data)
        console.log(self.messageList)
    })
  },
  filters: {
    formatTimes (data) {
       var date = data ? new Date(data) : new Date();
       var time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + 
       date.getDate() + ' ' + date.getHours() + ':' +
        (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + 
        ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
      return time;
    }
  },
  methods: {
    send () {
        console.log(this.inputMessage)
      if (this.inputMessage) {
        this.socket.emit("sendMessage",{name:'孙丹平',message:this.inputMessage})
        this.inputMessage = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input[type ='text']{
  border: 1px solid #333;
  cursor: pointer;
}
.chat-list{
  display: flex
}
ol:nth-child(even){
  background-color:#999;
}
.chat-list>div{
  flex:1;
}
.chat-list>div:last-child{
  text-align: left;
}
</style>
