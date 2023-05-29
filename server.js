const PORT = 3000
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express()
app.use(express.json())
const userObj = {
    1:{
        name:'test',
        firends:{}
    },
    2:{
        name:'test1',
        firends:{}
    }
}
app.get('/getAllUsers',(req,res)=>{
    let arr = []
    const {userId} = req.query
    for (const id in userObj) {
        if (Object.hasOwnProperty.call(userObj, id)) {
            const {name} = userObj[id];
            if (userId !==id) {
                let tempObj = {
                    id,name
                }
                arr.push(tempObj)
            }
            
        }
    }
    res.json({users:arr})
})
app.post('/addfriend',(req,res)=>{
    const {id,friendId} = req.body
    if (!id || !friendId || id == friendId) {
     res.status(400).json({
        message:'bad request'
     })
     return
    }
    if (!userObj[id]) {
        res.status(404).json({
            message:'user Not Found'
         })
         return
    }
    if (!userObj[friendId]) {
        res.status(404).json({
            message:'friend does not use this application'
         })
         return
    }
    if (userObj[id].firends[friendId]) {
        res.status(409).json({
            message:'both of you are already friends'
         })
         return
    }
    userObj[id].firends[friendId] = {}
    res.json({
        message:'added to friend successfully'
    })
})

app.delete('/remove-friend',(req,res)=>{
    const {id,friendId} = req.body
    if (!id || !friendId || id == friendId) {
     res.status(400).json({
        message:'bad request'
     })
     return
    }
    if (!userObj[id]) {
        res.status(404).json({
            message:'user Not Found'
         })
         return
    }
    if (!userObj[friendId]) {
        res.status(404).json({
            message:'friend does not use this application'
         })
         return
    }
    if (!userObj[id].firends[friendId]) {
        res.status(409).json({
            message:'both of you are not friends'
         })
         return
    }
    delete userObj[id].firends[friendId]
    res.json({
        message:'remove to friend successfully'
    })
})


app.get('/',(req,res)=>{
    const id = uuidv4()
    const {name} = req.query
    userObj[id] = {
        name,
        firends:{}
    }
    res.json({
        name,id
    })
})
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
})

let arr = []



io.on('connection', function (socket) {
    arr.push(socket.id)
    console.log('A user connected');
    setInterval(()=>{
        let obj = {
            name:'test',
            age:23,
        }
        socket.to(arr[0]).emit('user',obj)
    },1000)
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(PORT,()=>{
    console.log(`Server is running on the port=${PORT}`);
})