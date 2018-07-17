var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(8989);
io.on("connection",function(socket){
    socket.on("sendMessage",function(data){
        let result = {
            name: data.name,
            time: new Date(),
            message: data.message
        }
        console.log(result)
        this.emit('receiveMessage', result);
        console.log("reseive message")
    })
})

console.log('app listen at：8989');
