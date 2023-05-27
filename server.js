const PORT = 3000
const http = require('http').Server()
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
})

io.on('connection', function (socket) {
    console.log('A user connected');
    setInterval(()=>{
        let obj = {
            name:'test',
            age:23
        }
        socket.emit('user',obj)
    },1000)
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(PORT,()=>{
    console.log(`Server is running on the port=${PORT}`);
})